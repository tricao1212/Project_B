import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tree } from '../interfaces/types';

interface TreeMapProps {
  trees: Tree[];
}

// This component will handle updating the map's center
const ChangeMapView: React.FC<{ center: LatLngExpression }> = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

const TreeMap: React.FC<TreeMapProps> = ({ trees }) => {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51.505, -0.09]);

  const treeIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleTreeClick = (tree : Tree) => {
    setSelectedTree(tree),
    setMapCenter([tree.lat,tree.lng])
  }

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="h-[600px] relative">
      <MapContainer center={mapCenter} zoom={13} className="h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {trees.map((tree) => (
          <Marker 
            key={tree.id} 
            position={[tree.lat, tree.lng]} 
            icon={treeIcon}
            eventHandlers={{
              click: () => handleTreeClick(tree)
            }}
          >
            <Popup>{tree.name}</Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        <ChangeMapView center={mapCenter} />
      </MapContainer>
      {selectedTree && (
        <div className="absolute top-0 right-0 bg-white p-4 shadow-md z-[1000]">
          <h2 className="text-xl font-bold">{selectedTree.name}</h2>
          <p>Species: {selectedTree.species}</p>
          <p>Age: {selectedTree.age} years</p>
          <p>Height: {selectedTree.height} meters</p>
          <button 
            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => setSelectedTree(null)}
          >
            Close
          </button>
        </div>
      )}
      <button 
        className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded z-[1000]"
        onClick={getUserLocation}
      >
        Get My Location
      </button>
    </div>
  );
};

export default TreeMap;