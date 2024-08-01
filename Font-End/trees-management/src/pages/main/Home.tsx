import TreeMap from "../../components/Map";
import { Tree } from "../../interfaces/types";

const trees: Tree[] = [
  { id: 1, name: 'Oak Tree', species: 'Quercus', age: 100, height: 20, lat: 51.505, lng: -0.09 },
  { id: 2, name: 'Maple Tree', species: 'Acer', age: 50, height: 15, lat: 51.51, lng: -0.1 },
  { id: 3, name: 'Pine Tree', species: 'Pinus', age: 75, height: 25, lat: 51.5, lng: -0.08 },
];

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tree Map</h1>
      <TreeMap trees={trees} />
    </div>
  );
};

export default Home;
