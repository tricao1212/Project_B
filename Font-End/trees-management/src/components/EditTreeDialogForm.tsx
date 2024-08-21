import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  IconButton,
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
import { TypeTreeRes } from "../interfaces/Response/TypeTree/TypeTreeRes";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import EditIcon from "@mui/icons-material/Edit";
import { updateTree } from "../services/TreeApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useToast } from "./Toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "./Loading";

interface ActionProps {
  tree: TreeRes;
  typeTreeOptions: TypeTreeRes[];
}

export default function EditTreeDialogForm({
  tree,
  typeTreeOptions,
}: ActionProps) {
  const [mapOpen, setMapOpen] = React.useState(false);
  const [typeTree, setTypeTree] = React.useState<string>(tree.typeTree);
  const [lat, setLat] = React.useState<string>(tree.lat.toString());
  const [lng, setLng] = React.useState<string>(tree.lng.toString());
  const handleMapOpen = () => setMapOpen(true);
  const handleMapClose = () => setMapOpen(false);
  const [open, setOpen] = React.useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const { showToast } = useToast();
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(tree.image);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTypeTree(event.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) =>  await updateTree(tree.id, formData, token),
    onSuccess: async (data) => {
      if(data.isSuccess){        
        await queryClient.invalidateQueries({queryKey : ["trees"]});
        showToast("Successful!", "success");
      }
      else{
        showToast(data.message, "error");
      }
    },
    onError: (error) => {
      showToast(error.message || "Failed to update tree", "error");
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

  React.useEffect(() => {
    setTypeTree(tree.typeTree);
    setLat(tree.lat.toString());
    setLng(tree.lng.toString());
    setPreview(tree.image);
  }, [tree,typeTreeOptions]);

  const render = (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={() => handleClickOpen()}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const imageFile = formData.get("image") as File;
            if (!imageFile || imageFile.size === 0) {
              formData.set("image", "");
            }
            else{
              formData.set("image", imageFile);
            }
            mutation.mutate(formData);
            handleClose();
          },
        }}
      >
        <DialogTitle>Update tree</DialogTitle>
        <DialogContent>
          <div className="flex justify-between">
            <div className="mr-5">
              <p>Current image:</p>
              {file === null ? (
                <img
                  src={`http://localhost:2024/images/${preview}`}
                  alt=""
                  className="w-36 h-20"
                />
              ) : preview ? (
                <img src={preview} alt="" className="w-36 h-20" />
              ) : <img src="" alt="" className="w-36 h-20" />}
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="img"
              name="image"
              label="Select new image"
              type="file"
              fullWidth
              variant="standard"
              InputLabelProps={{
                shrink: true, // Ensures the label does not overlap the field
              }}
              onChange={handleFileChange}
            />
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name tree"
            defaultValue={tree.name}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="age"
            defaultValue={tree.age}
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
            defaultValue={tree.heigh}
            id="heigh"
            name="heigh"
            label="Height (cm)"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            defaultValue={tree.diameter}
            required
            margin="dense"
            id="diameter"
            name="diameter"
            label="Diameter (cm)"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="plantYear"
            name="plantYear"
            defaultValue={tree.plantYear}
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
              defaultValue={typeTree}
              onChange={handleChange}
              label="typeTree"
              required
            >
              {typeTreeOptions.map((item) => (
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
            defaultValue={tree.description}
          />

          {/* ... rest of the fields ... */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
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

            <Marker
              position={[parseFloat(lat), parseFloat(lng)]}
              icon={treeIcon}
              // eventHandlers={{
              //   click: () => handleTreeClick(tree),
              // }}
            >
              <Popup>{tree.name}</Popup>
            </Marker>

            <MapEvents />
          </MapContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMapClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  return ( 
    <>
    {typeTreeOptions ? render : <Loading/>}
    </>
  )
}
