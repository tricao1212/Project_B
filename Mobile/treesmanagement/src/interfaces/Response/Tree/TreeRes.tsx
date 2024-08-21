import { TreeAssignment } from "./TreeAssignment";

interface TreeRes {
    id: string;
    name: string;
    treeCode: string;
    image: string;
    age: number;
    heigh: number;
    diameter: number;
    plantYear: number;
    lat: number;
    lng: number;
    typeTree: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    assignments?: TreeAssignment[];
  }
  
  export type { TreeRes };