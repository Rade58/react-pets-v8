import { useState, useEffect } from "react";

import type { AnimalType } from "../components/SearchParams";
// import { ANIMALS } from "../SearchParams";

const localCache: Record<AnimalType[number], string[] | undefined> = {
  bird: undefined,
  "": undefined,
  cat: undefined,
  dog: undefined,
  rabit: undefined,
  reptile: undefined,
};

export default function useBreedList(animal: AnimalType[number]) {
  const [breedList, setBreedList] = useState<string[] | undefined>([]);

  const [status, setStatus] = useState<"loading" | "unloaded" | "loaded">(
    "unloaded"
  );

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList().catch(() => {});
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json: { breeds: string[] | undefined } = await res.json();

      localCache[animal] = json.breeds || [];

      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return { breedList: breedList || [], status };
}
