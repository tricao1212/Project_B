import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../components/Toastify";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "leaflet";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import { UserRes } from "../interfaces/Response/User/UserRes";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { createAssignment } from "../services/AssignmentApi";
import { AssignmentReq } from "../interfaces/Request/Assignment/AssignmentReq";
import { WorkContentReq } from "../interfaces/Request/WorkContent/WorkContentReq";
import { QueryObserverResult } from "@tanstack/react-query";
import { AssignmentRes } from "../interfaces/Response/Assignment/AssignmentRes";

interface ActionProps {
  trees: TreeRes[];
  users: UserRes[];
  handleFecth: () => Promise<QueryObserverResult<AssignmentRes[], Error>>;
}

interface TextField {
  id: number;
  value: string;
}

export default function AddAssignmentDialogForm({
  users,
  trees,
  handleFecth,
}: ActionProps) {
  const [open, setOpen] = React.useState(false);
  const [mapOpen, setMapOpen] = React.useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMapOpen = () => setMapOpen(true);
  const handleMapClose = () => setMapOpen(false);
  const [selectedTreeInfo, setSelectedTreeInfo] =
    React.useState<TreeRes | null>(null);
  const [selectedTree, setSelectedTree] = React.useState<TreeRes | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<string | "">("");
  const [fields, setFields] = React.useState<TextField[]>([]);
  const [error, setError] = React.useState("");
  const [errorWork, setErrorWork] = React.useState("");

  const staffs = users.filter((staff) => staff.role == 2);

  const handleChooseTree = (tree: TreeRes) => {
    setSelectedTree(tree);
    setMapOpen(false);
    setError("");
  };

  const handleTreeClick = React.useCallback((tree: TreeRes) => {
    setSelectedTreeInfo(tree);
  }, []);

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSelectedUser(event.target.value);
  };

  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon
      icon={faTree}
      style={{ color: "green", fontSize: "24px" }}
    />
  );

  const treeIcon = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(iconMarkup)}`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  const handleSubmit = async () => {
    if (selectedTree === null) {
      setError("Please choose tree!!!");
    }
    if (fields.length === 0) {
      setErrorWork("Please input work to do!!!");
    }
    if (selectedTree !== null && selectedUser !== "" && fields.length !== 0) {
      setErrorWork("");
      const req = fields.filter((field) => field.value.trim() !== "");
      const newWorkContents: WorkContentReq[] = req.map((field) => ({
        id: null,
        content: field.value,
        status: 0,
      }));

      const assignmentReq: AssignmentReq = {
        treeId: selectedTree.id,
        userId: selectedUser,
        workContent: newWorkContents,
      };

      var res = await createAssignment(assignmentReq, token);
      if (res.isSuccess) {
        await handleFecth();
        showToast("Successful!", "success");
      } else {
        showToast(`${res.message}`, "error");
      }
      setSelectedTree(null);
      setSelectedUser("");
      setFields([]);
      handleClose();
    }
  };

  const handleAddField = () => {
    const newField: TextField = {
      id: fields.length > 0 ? fields[fields.length - 1].id + 1 : 1,
      value: "",
    };
    setFields([...fields, newField]);
  };

  const handleChange = (id: number, value: string) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
    setErrorWork("");
  };

  const handleDeleteField = (id: number) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  const canAddField = () => {
    return (
      fields.length === 0 || fields.every((field) => field.value.trim() !== "")
    );
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new assignment
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmit();
          },
        }}
      >
        <DialogTitle>Add new assignment</DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            required
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <InputLabel id="userId" style={{ color: "black" }}>
              Choose staff
            </InputLabel>
            <Select
              labelId="userId"
              id="userId"
              name="userId"
              label="Choose staff"
              required
              value={selectedUser}
              onChange={handleUserChange}
            >
              {staffs.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            disabled
            required
            margin="dense"
            id="treeId"
            name="treeId"
            label="Tree"
            fullWidth
            variant="standard"
            value={selectedTree?.name}
            InputLabelProps={{
              shrink: true,
              style: { fontWeight: "bold" },
            }}
            error={!!error}
            helperText={error}
          />
          <Button
            onClick={handleMapOpen}
            variant="contained"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Select tree to add assignment
          </Button>

          <div className="mt-5">
            <h1 className="font-bold">List works to do:</h1>
            <p className="text-red-500">{errorWork !== "" ? errorWork : ""}</p>
            {fields.map((field) => (
              <div key={field.id} className="flex items-center mb-4">
                <TextField
                  type="text"
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "48px",
                    },
                  }}
                />
                <Button
                  type="button"
                  onClick={() => handleDeleteField(field.id)}
                  variant="contained"
                  color="error"
                  sx={{
                    height: "48px",
                    minWidth: "80px",
                    ml: 1,
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button
              variant="contained"
              style={{ width: "100%" }}
              onClick={handleAddField}
              disabled={!canAddField()}
            >
              Add more
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={mapOpen} onClose={handleMapClose} maxWidth="lg" fullWidth>
        <DialogTitle>Select tree</DialogTitle>
        <DialogContent style={{ height: "500px", position: "relative" }}>
          <MapContainer
            center={[11.052829, 106.666128]}
            zoom={17}
            className="h-full"
            minZoom={17}
            maxZoom={18}
            zoomControl={true}
            scrollWheelZoom={true}
            doubleClickZoom={true}
            touchZoom={true}
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {trees.map((tree) => (
              <Marker
                key={tree.id}
                position={[tree.lat, tree.lng]}
                icon={treeIcon}
                eventHandlers={{
                  click: () => handleTreeClick(tree),
                }}
              >
                <Popup>{tree.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
          {selectedTreeInfo && (
            <div className="absolute top-0 right-0 bg-white p-4 shadow-md z-[1000]">
              <h2 className="text-xl font-bold">{selectedTreeInfo.name}</h2>
              <img
                src={`http://localhost:2024/images/${selectedTreeInfo.image}`}
                alt="image"
                className="w-36"
              />
              <p>Tree code: {selectedTreeInfo.treeCode}</p>
              <p>Type: {selectedTreeInfo.typeTree}</p>
              <p>Age: {selectedTreeInfo.age} years</p>
              <p>Height: {selectedTreeInfo.heigh} centimeters</p>
              <p>Diameter: {selectedTreeInfo.diameter} centimeters</p>
              <p>Plant year: {selectedTreeInfo.plantYear}</p>
              <p>Description: {selectedTreeInfo.description}</p>
              <p>Create by: {selectedTreeInfo.createdBy}</p>
              <button
                className="mt-2 bg-green-500 text-white px-2 py-1 rounded mr-4"
                onClick={() => handleChooseTree(selectedTreeInfo)}
              >
                choose this tree
              </button>
              <button
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => setSelectedTreeInfo(null)}
              >
                Close
              </button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMapClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
