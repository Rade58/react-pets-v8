import { createContext, Dispatch, SetStateAction } from "react";

import type { DataI } from "../lib/query-functions/fetchPet";

export type DataType = DataI["pets"][number];

export type ContextData = [DataType, Dispatch<SetStateAction<DataType>>];

export const defaultData: DataType = {
  animal: "",
  breed: "",
  id: "",
  images: [],
  name: "",
  city: "",
  description: "",
  state: "",
};

const AdoptedPetContext = createContext<ContextData>([
  defaultData,
  function () {
    return undefined;
  },
]);

export default AdoptedPetContext;
