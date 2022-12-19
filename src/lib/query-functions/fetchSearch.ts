import type { QueryFunction } from "@tanstack/react-query";

import { PropsI as PetsPropsI } from "../../components/Pets";

export interface DataI {
  pets: PetsPropsI["pets"];
}

export interface QueryArgs {
  animal: string;
  location: string;
  breed: string;
}

const fetchSearch: QueryFunction<DataI, [string, QueryArgs]> = async ({
  queryKey,
}) => {
  // INSTEAD OF SINGLE VALUE (ONE KEY)
  // WE CAN PASS OBJECT ON THE PLACE OF SECOND QUERY KEY
  const { animal, breed, location } = queryKey[1]; //

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  // IT IS REQUIRED TO THROW AN ERROR ON BAD REQUEST
  if (!apiRes.ok) {
    throw new Error(`/pets/${animal} fetch not ok`);
  }

  return apiRes.json() as Promise<DataI>;
};

export default fetchSearch;
