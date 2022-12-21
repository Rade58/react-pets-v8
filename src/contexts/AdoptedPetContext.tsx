import { createContext, Dispatch, SetStateAction } from "react";

import type { PropsI } from "../components/Pet";

export type DataType = Omit<PropsI, "children">;

export type ContextData = [DataType, Dispatch<SetStateAction<DataType>>];

export const defaultData: DataType = {
  animal: "",
  breed: "",
  id: "",
  images: [],
  location: "",
  name: "",
};

const AdoptedPetContext = createContext<ContextData>([
  defaultData,
  function () {
    return undefined;
  },
]);

export default AdoptedPetContext;
