import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";

interface TreeMapProps {
  initialTrees: TreeRes[];
  areaCenter: [number, number]; // [latitude, longitude]
  areaSize: [number, number]; // [width, height] in degrees
  minZoom: number;
  maxZoom: number;
}

const TreeMap: React.FC<TreeMapProps> = ({
  initialTrees,
  areaCenter,
  areaSize,
  minZoom,
  maxZoom,
}) => {
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
  const treeIcon = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(iconMarkup)}`,
    iconSize: [16, 16],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  const handleTreeClick = useCallback((tree: TreeRes) => {
    setSelectedTree(tree);
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
      </MapContainer>

      {selectedTree && (
        <div className="absolute top-0 right-0 bg-white p-4 shadow-md z-[1000]">
          <h2 className="text-xl font-bold">{selectedTree.name}</h2>
          <img
            src={`http://localhost:2024/images/${selectedTree.image}`}
            alt="image"
            className="w-52 h-64 rounded-lg object-cover"
          />
          <p><span className="font-bold">Tree code:</span> {selectedTree.treeCode}</p>
          <p><span className="font-bold">Type:</span>  {selectedTree.typeTree}</p>
          <p><span className="font-bold">Age:</span>  {selectedTree.age} years</p>
          <p><span className="font-bold">Height:</span>  {selectedTree.heigh} cm</p>
          <p><span className="font-bold">Diameter:</span>  {selectedTree.diameter} cm</p>
          <p><span className="font-bold">Plant year:</span>  {selectedTree.plantYear}</p>
          <p><span className="font-bold">Description:</span>  {selectedTree.description}</p>
          <p><span className="font-bold">Create by:</span>  {selectedTree.createdBy}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => setSelectedTree(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TreeMap;
