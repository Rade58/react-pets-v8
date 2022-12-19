import type { QueryFunction } from "@tanstack/react-query";

export interface DataI {
  breeds: string[];
}

const fetchBreeds: QueryFunction<DataI, [string, string]> = async ({
  queryKey,
}) => {
  // SECOND THING THAT WILL BE PASSED TO useQuery BY US
  const animal = queryKey[1]; // BECAUSE FIRST THING NEEDS TO BE A KEY WE MAKE UP ALSO

  const apiRes = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  // IT IS REQUIRED TO THROW AN ERROR ON BAD REQUEST
  if (!apiRes.ok) {
    throw new Error(`/breeds/${animal} fetch not ok`);
  }

  return apiRes.json() as Promise<DataI>;
};

export default fetchBreeds;
