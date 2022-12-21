import { createContext, Dispatch, SetStateAction } from "react";

import type { PropsI } from "../components/Pet";

export type DataType = (PropsI & { children: never }) | null;

export type ContextData = [DataType, Dispatch<SetStateAction<DataType>>];

const AdoptedPetContext = createContext<ContextData | null>(null);

export default AdoptedPetContext;
