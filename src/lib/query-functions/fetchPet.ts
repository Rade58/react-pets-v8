import type { QueryFunction } from "@tanstack/react-query";

export interface DataI {
  pets: {
    id: string;
    name: string;
    animal: string;
    breed: string;
    city: string;
    state: string;
    description: string;
  }[];
}

const fetchPet: QueryFunction<DataI, [string, string]> = async ({
  queryKey,
}) => {
  // SECOND THING THAT WILL BE PASSED TO useQuery BY US
  const id = queryKey[1]; // BECAUSE FIRST THING NEEDS TO BE A KEY WE MAKE UP ALSO

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`/details/${id} fetch not ok`);
  }

  return apiRes.json() as Promise<DataI>;
};

export default fetchPet;
