import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { TreeRes } from "../../interfaces/Response/Tree/TreeRes";
import { Typography } from "@mui/material";
import { getWorkStatus } from "../../utils/getWorkStatus";

interface TreeMapProps {
  initialTrees: TreeRes[];
  taskTrees: TreeRes[];
  areaCenter: [number, number]; // [latitude, longitude]
  areaSize: [number, number]; // [width, height] in degrees
  minZoom: number;
  maxZoom: number;
}

const TreeMapStaff: React.FC<TreeMapProps> = ({
  initialTrees,
  taskTrees,
  areaCenter,
  areaSize,
  minZoom,
  maxZoom,
}) => {
  const [selectedTaskTree, setSelectedTaskTree] = useState<TreeRes | null>(
    null
  );
  const [selectedTree, setSelectedTree] = useState<TreeRes | null>(null);

  // Calculate bounds
  const southWest: [number, number] = [
    areaCenter[0] - areaSize[0] / 2,
    areaCenter[1] - areaSize[1] / 2,
  ];
  const northEast: [number, number] = [
    areaCenter[0] + areaSize[0] / 2,
    areaCenter[1] + areaSize[1] / 2,
  ];
  const bounds: LatLngBoundsExpression = [southWest, northEast];

  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon
      icon={faTree}
      style={{ color: "green", fontSize: "24px" }}
    />
  );

  const iconMarkup1 = renderToStaticMarkup(
    <FontAwesomeIcon icon={faTree} style={{ color: "red", fontSize: "24px" }} />
  );

  const treeIcon = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(iconMarkup)}`,
    iconSize: [16, 16],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  const treeIcon1 = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(iconMarkup1)}`,
    iconSize: [16, 16],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  const handleTreeClick = useCallback((tree: TreeRes) => {
    setSelectedTaskTree(null);
    setSelectedTree(tree);
  }, []);

  const handleTaskTreeClick = useCallback((tree: TreeRes) => {
    setSelectedTree(null);
    setSelectedTaskTree(tree);
  }, []);

  return (
    <div className="h-[600px] relative overflow-hidden rounded-lg">
      <MapContainer
        center={areaCenter}
        zoom={minZoom}
        className="h-full"
        maxBounds={bounds}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {initialTrees.map((tree) => (
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

        {taskTrees.map((tree) => (
          <Marker
            key={tree.id}
            position={[tree.lat, tree.lng]}
            icon={treeIcon1}
            eventHandlers={{
              click: () => handleTaskTreeClick(tree),
            }}
          >
            <Popup>{tree.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedTree && (
        <div className="absolute top-0 right-0 bg-white p-4 shadow-md z-[1000]">
          <h2 className="text-xl font-bold">{selectedTree.name}</h2>
          <img
            src={`http://localhost:2024/images/${selectedTree.image}`}
            alt="image"
            className="w-52 h-64 rounded-lg object-cover"
          />
          <p>
            <span className="font-bold">Tree code:</span>{" "}
            {selectedTree.treeCode}
          </p>
          <p>
            <span className="font-bold">Type:</span> {selectedTree.typeTree}
          </p>
          <p>
            <span className="font-bold">Age:</span> {selectedTree.age} years
          </p>
          <p>
            <span className="font-bold">Height:</span> {selectedTree.heigh} cm
          </p>
          <p>
            <span className="font-bold">Diameter:</span> {selectedTree.diameter}{" "}
            cm
          </p>
          <p>
            <span className="font-bold">Plant year:</span>{" "}
            {selectedTree.plantYear}
          </p>
          <p>
            <span className="font-bold">Description:</span>{" "}
            {selectedTree.description}
          </p>
          <p>
            <span className="font-bold">Create by:</span>{" "}
            {selectedTree.createdBy}
          </p>
          <button
            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => setSelectedTree(null)}
          >
            Close
          </button>
        </div>
      )}

      {selectedTaskTree && (
        <div className="absolute top-0 right-0 bg-white p-4 shadow-md z-[1000] ">
          <div className="flex">
            <div className="flex-1 pr-4 border-r">
              <h2 className="text-xl font-bold">{selectedTaskTree.name}</h2>
              <img
                src={`http://localhost:2024/images/${selectedTaskTree.image}`}
                alt="image"
                className="w-52 h-64 rounded-lg object-cover"
              />
              <p>
                <span className="font-bold">Tree code:</span>{" "}
                {selectedTaskTree.treeCode}
              </p>
              <p>
                <span className="font-bold">Type:</span>{" "}
                {selectedTaskTree.typeTree}
              </p>
              <p>
                <span className="font-bold">Age:</span> {selectedTaskTree.age}{" "}
                years
              </p>
              <p>
                <span className="font-bold">Height:</span>{" "}
                {selectedTaskTree.heigh} cm
              </p>
              <p>
                <span className="font-bold">Diameter:</span>{" "}
                {selectedTaskTree.diameter} cm
              </p>
              <p>
                <span className="font-bold">Plant year:</span>{" "}
                {selectedTaskTree.plantYear}
              </p>
              <p>
                <span className="font-bold">Description:</span>{" "}
                {selectedTaskTree.description}
              </p>
              <p>
                <span className="font-bold">Created by:</span>{" "}
                {selectedTaskTree.createdBy}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => setSelectedTaskTree(null)}
              >
                Close
              </button>
            </div>

            {selectedTaskTree.assignments &&
              selectedTaskTree.assignments.length > 0 && (
                <div className="flex-1 pl-4">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Tasks</h3>
                    <ul>
                      {selectedTaskTree.assignments.map((assignment) => (
                        <li key={assignment.id} className="mb-2">
                          {assignment.workContent.map((content, index) => (
                            <div
                              key={content.id}
                              className="pl-4 flex justify-between"
                            >
                              <Typography variant="body2">
                                {`${index + 1}. ${content.content}`}
                              </Typography>
                              {content.status === 0 ?
                              <Typography className="text-red-500">{getWorkStatus(content.status)}</Typography> : <Typography className="text-green-500">{getWorkStatus(content.status)}</Typography>}
                            </div>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeMapStaff;
