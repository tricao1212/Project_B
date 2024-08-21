import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import InfoIcon from "@mui/icons-material/Info";
import { formatDateOnly, formatDateTime } from "../utils/formatDate";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { UserRes } from "../interfaces/Response/User/UserRes";
import { getUserById } from "../services/UserApi";
import { TreeAssignment } from "../interfaces/Response/Tree/TreeAssignment";
import { getWorkStatus } from "../utils/getWorkStatus";

interface TreeDetailsPopupProps {
  tree: TreeRes;
  assignments: TreeAssignment[];
}

const TreeDetails = ({ tree, assignments }: TreeDetailsPopupProps) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [usernames, setUsernames] = useState<Map<string, string>>(new Map());
  const now = Date.now();

  const fetchUserById = async (id: string): Promise<UserRes> => {
    const res = await getUserById(id);
    return res.data;
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      const userIds = Array.from(new Set(assignments.map((a) => a.userId)));

      const userFetchPromises = userIds.map((id) => fetchUserById(id));
      const users = await Promise.all(userFetchPromises);

      const userMap = new Map(users.map((user) => [user.id, user.fullName]));
      setUsernames(userMap);
    };

    fetchUsernames();
  }, [assignments]);

  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon
      icon={faTree}
      style={{ color: "green", fontSize: "24px" }}
    />
  );

  const treeIcon = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(iconMarkup)}`,
    iconSize: [16, 16],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  return (
    <>
      <IconButton aria-label="details" onClick={() => handleClickOpen()}>
        <InfoIcon color="success"/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          className="bg-green-600 text-white"
          style={{ fontWeight: "bold" }}
        >
          Tree Details: {tree.name}
        </DialogTitle>
        <DialogContent className="mt-4">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                className="font-bold mb-10"
                style={{ fontWeight: "bold" }}
              >
                General Information
              </Typography>
              {tree.image && (
                <img
                  src={`http://localhost:2024/images/${tree.image}`}
                  alt={tree.name}
                  className="w-full h-64 rounded-lg object-cover"
                />
              )}
              <Typography>
                <span className="font-semibold">Tree Code:</span>{" "}
                {tree.treeCode}
              </Typography>
              <Typography>
                <span className="font-semibold">Type:</span> {tree.typeTree}
              </Typography>
              <Typography>
                <span className="font-semibold">Age:</span> {tree.age} years
              </Typography>
              <Typography>
                <span className="font-semibold">Height:</span> {tree.heigh} cm
              </Typography>
              <Typography>
                <span className="font-semibold">Diameter:</span> {tree.diameter}{" "}
                cm
              </Typography>
              <Typography>
                <span className="font-semibold">Plant Year:</span>{" "}
                {tree.plantYear}
              </Typography>
              <Typography
                variant="h6"
                className="font-bold mt-4 mb-2"
                style={{ fontWeight: "bold", margin: "30px 0 0 0" }}
              >
                Description
              </Typography>
              <Typography>
                {tree.description || "No description available."}
              </Typography>
              <Typography
                variant="h6"
                className="font-bold mt-4 mb-2"
                style={{ fontWeight: "bold", margin: "30px 0 0 0" }}
              >
                Metadata
              </Typography>
              <Typography>
                <span className="font-semibold">Created At:</span>{" "}
                {formatDateTime(new Date(tree.createdAt))}
              </Typography>
              {/* <Typography><span className="font-semibold">Updated At:</span> {tree.UpdatedAt.toLocaleString()}</Typography> */}
              <Typography>
                <span className="font-semibold">Created By:</span>{" "}
                {tree.createdBy}
              </Typography>
              {/* <Typography><span className="font-semibold">Updated By:</span> {tree.UpdatedBy}</Typography> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                className="font-bold mt-4 mb-2"
                style={{ fontWeight: "bold" }}
              >
                Location
              </Typography>
              <div className="relative w-full" style={{ height: "300px" }}>
                <MapContainer
                  center={[tree.lat, tree.lng]}
                  zoom={16}
                  className="absolute top-0 left-0 w-full h-full"
                  minZoom={15}
                  maxZoom={18}
                  zoomControl={true}
                  scrollWheelZoom={true}
                  doubleClickZoom={true}
                  touchZoom={true}
                  maxBoundsViscosity={1.0}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[tree.lat, tree.lng]} icon={treeIcon}>
                    <Popup>{tree.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              {assignments.length > 0 && (
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    className="font-bold mt-4 mb-2"
                    style={{ fontWeight: "bold", marginTop: "30px" }}
                  >
                    To do List:
                  </Typography>
                  <List>
                    {assignments.map((assignment) => (
                      <ListItem
                        key={assignment.id}
                        className="mb-2 bg-gray-100 rounded"
                      >
                        <ListItemText
                          primary={
                            <div>
                              <Typography
                                variant="subtitle1"
                                className="font-semibold"
                              >
                                <span className="font-bold">Staff name: </span>
                                {usernames.get(assignment.userId) ||
                                  "Loading..."}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                className="font-semibold"
                              >
                                <span className="font-bold">Created by: </span>
                                {assignment.createdBy}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                className="font-semibold"
                              >
                                <span className="font-bold">Due date: </span>
                                {new Date(assignment.deadLine).getTime() <
                                now ? (
                                  <span className="text-red-500">
                                    {formatDateOnly(
                                      new Date(assignment.deadLine)
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-green-500">
                                    {formatDateOnly(
                                      new Date(assignment.deadLine)
                                    )}
                                  </span>
                                )}
                              </Typography>
                            </div>
                          }
                          secondary={
                            assignment.workContent.length > 0 && (
                              <div>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className="block mt-1 font-bold"
                                >
                                  Works Content:
                                </Typography>
                                {assignment.workContent.map(
                                  (content, index) => (
                                    <div
                                      key={content.id}
                                      className="pl-4 flex justify-between"
                                    >
                                      <Typography variant="body2">
                                        {`${index + 1}. ${content.content}`}
                                      </Typography>
                                      {content.status === 0 ? (
                                        <span className="text-blue-500">
                                          {getWorkStatus(content.status)}
                                        </span>
                                      ) : (
                                        <span className="text-green-400">
                                          {getWorkStatus(content.status)}
                                        </span>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            )
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TreeDetails;
