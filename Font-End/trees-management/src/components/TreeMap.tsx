import React, { useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon, LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTree } from "@fortawesome/free-solid-svg-icons";
import { TreeRes } from "../interfaces/Response/Tree/TreeRes";
import { TypeTreeRes } from "../interfaces/Response/TypeTree/TypeTreeRes";
import { getAllTypeTree } from "../services/TypeTreeApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

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
  const [selectedTreeId, setSelectedTreeId] = useState<string | null>(null);

  const {
    data: types = [],
    isLoading,
    isError,
  } = useQuery<TypeTreeRes[]>({
    queryKey: ["types"],
    queryFn: () => getAllTypeTree().then((res) => res.data),
  });

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
    <FontAwesomeIcon
      icon={faTree}
      style={{ color: "blue", fontSize: "24px" }}
    />
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
    setSelectedTree(tree);
    setSelectedTreeId(tree.id);
  }, []);

  const handleClose = () => {
    setSelectedTree(null);
    setSelectedTreeId(null);
  };

  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchPlace, setSearchPlace] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value as string);
  };

  const handleSearchToggle = () => setShowSearch((prev) => !prev);

  const removeDiacritics = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPlace(removeDiacritics(event.target.value));
  };

  const filteredData = initialTrees.filter((row) => {
    if (searchPlace === "" && selectedType === "") {
      return false;
    } else {
      const cleanValue =
        row.name + row.treeCode
          ? removeDiacritics(
              row.name.toString() + row.treeCode.toString()
            ).toLowerCase()
          : "";
      return (
        (searchPlace ? cleanValue.includes(searchPlace.toLowerCase()) : true) &&
        (selectedType ? row.typeTree === selectedType : true)
      );
    }
  });

  const render = (
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
            icon={selectedTreeId === tree.id ? treeIcon1 : treeIcon}
            eventHandlers={{
              click: () => handleTreeClick(tree),
            }}
          ></Marker>
        ))}
      </MapContainer>

      <button
        className="absolute top-4 left-14 bg-blue-500 text-white px-4 py-2 rounded z-[1000]"
        onClick={handleSearchToggle}
      >
        <FontAwesomeIcon icon={faSearch} /> Search
      </button>

      {showSearch && (
        <div className="absolute top-4 left-4 bg-white p-4 shadow-md z-[1000] w-96">
          <h2 className="text-xl font-bold mb-2">Search Trees</h2>
          <TextField
            fullWidth
            label="By name or tree code..."
            variant="outlined"
            value={searchPlace}
            onChange={handleSearch}
            style={{ marginBottom: "10px" }}
          />
          <FormControl fullWidth style={{ marginBottom: "5px" }}>
            <InputLabel>Selecet type tree</InputLabel>
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              label="Selecet type tree"
            >
              <MenuItem value="">-</MenuItem>
              {types.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="overflow-y-auto h-64">
            <ul>
              {filteredData.map((tree) => (
                <li
                  key={tree.id}
                  className="p-4 shadow-md rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-bold mb-2 text-green-500">
                      {tree.name}
                    </h2>
                    <p className="text-blue-500">Type: {tree.typeTree}</p>
                    <p>
                      Age: {tree.age} - Height: {tree.heigh}cm - Diameter:{" "}
                      {tree.diameter}cm
                    </p>
                  </div>
                  <Button
                    variant="outlined"
                    size="small"
                    className="self-end"
                    style={{ marginTop: "10px" }}
                    onClick={() => handleTreeClick(tree)}
                  >
                    Go
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleSearchToggle}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error, please try again</div>
      ) : (
        render
      )}
    </>
  );
};

export default TreeMap;
