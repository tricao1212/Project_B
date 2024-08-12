import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../components/Toastify";
import { createTree } from "../services/TreeApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TypeTreeRes } from "../interfaces/Response/TypeTree/TypeTreeRes";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "leaflet";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ActionProps {
  data: TypeTreeRes[];
  trees: TreeRes[];
}

export default function AddTreeDialogForm({ trees, data }: ActionProps) {
  const [open, setOpen] = React.useState(false);
  const [mapOpen, setMapOpen] = React.useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const [typeTree, setTypeTree] = React.useState<string>("");
  const [lat, setLat] = React.useState<string>("");
  const [lng, setLng] = React.useState<string>("");
  const { showToast } = useToast();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMapOpen = () => setMapOpen(true);
  const handleMapClose = () => setMapOpen(false);

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

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTypeTree(event.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => await createTree(formData, token),
    onSuccess: async (data) => {
      if (data.isSuccess) {
        await queryClient.invalidateQueries({ queryKey: ["trees"] });
        showToast("Successful!", "success");
        setLat("");
        setLng("");
        setTypeTree("");
      } else {
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to delete user", "error");
    },
  });

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat.toFixed(6));
        setLng(e.latlng.lng.toFixed(6));
        handleMapClose();
      },
    });
    return null;
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new tree
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            mutation.mutate(formData);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new tree</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="img"
            name="image"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true, // Ensures the label does not overlap the field
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name tree"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="heigh"
            name="heigh"
            label="Heigh"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="diameter"
            name="diameter"
            label="Diameter"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="plantYear"
            name="plantYear"
            label="Plant Year"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lat"
            name="lat"
            label="Lat"
            type="text"
            fullWidth
            variant="standard"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="lng"
            name="lng"
            label="Lng"
            type="text"
            fullWidth
            variant="standard"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <Button
            onClick={handleMapOpen}
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Select Location on Map
          </Button>
          <FormControl fullWidth required style={{ marginTop: "10px" }}>
            <InputLabel id="typeTree" style={{ color: "black" }}>
              Type Tree
            </InputLabel>
            <Select
              labelId="typeTree"
              id="typeTree"
              name="typeTree"
              type="text"
              fullWidth
              value={typeTree}
              onChange={handleChange}
              label="typeTree"
              required
            >
              {data.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />

          {/* ... rest of the fields ... */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={mapOpen} onClose={handleMapClose} maxWidth="md" fullWidth>
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent style={{ height: "400px" }}>
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
                // eventHandlers={{
                //   click: () => handleTreeClick(tree),
                // }}
              >
                <Popup>{tree.name}</Popup>
              </Marker>
            ))}
            <MapEvents />
          </MapContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMapClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
