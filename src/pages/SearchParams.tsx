import { FC, ReactNode, useState, useEffect, useContext } from "react";
import useBreedList from "../hooks/useBreedList";
import { PropsI as PetsPropsI } from "../components/Pets";
import Results from "../components/Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch, { QueryArgs } from "../lib/query-functions/fetchSearch";
import AdoptedPetContext from "../contexts/AdoptedPetContext";

export const ANIMALS = ["", "bird", "cat", "dog", "rabit", "reptile"] as const;

export type AnimalType = typeof ANIMALS;

interface Props {
  children?: ReactNode;
}

const SearchParams: FC<Props> = () => {
  // const [location, setLocation] = useState<string>("");
  // const [breed, setBreed] = useState<string>("");
  const [animal, setAnimal] = useState<AnimalType[number]>("");

  const [{ breed, location }, setBreedAndLoactionParams] = useState<{
    breed: string;
    location: string;
  }>({
    breed: "",
    location: "",
  });

  const [adoptedPet, _] = useContext(AdoptedPetContext);

  // const [pets, setPets] = useState<PetsPropsI["pets"]>([]);

  const { data } = useQuery<
    {
      pets: PetsPropsI["pets"];
    },
    unknown,
    {
      pets: PetsPropsI["pets"];
    },
    [string, QueryArgs]
  >(["pet-search", { animal, breed, location }], fetchSearch);

  const { breedList: breeds, status: breedsStatus } = useBreedList(animal);

  /* useEffect(() => {
    //
    //
    requestPets().catch(() => {});
  }, []); */ // eslint-disable-line

  /* async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json: { pets: PetsPropsI["pets"] } = await res.json();

    console.log({ json });

    setPets(json.pets);

    const brrs = json.pets.map(({ breed }) => {
      return breed;
    });

    // setBreeds(brrs);
  } */

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // requestPets().catch(() => {});
          // THIS IS POSSIBLE ONLY IN CASE
          // WHEN YOUR FORM CONTROLS HAVE name
          // ATTRIBUTE

          const formData = new FormData(e.currentTarget);
          const ob = {
            location: `${(formData.get("location") as string) || ""}`,
            breed: `${(formData.get("breed") as string) || ""}`,
          };

          //

          setBreedAndLoactionParams(ob);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            // onChange={({ target: { value } }) => {
            //   // setLocation(value);

            // }}
            id="location"
            name="location"
            // value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={({ target: { value } }) => {
              setAnimal(value as typeof ANIMALS[number]);
              // setBreed("");
            }}
          >
            {ANIMALS.map((an) => {
              return (
                <option value={an} key={an}>
                  {an}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            // disabled={breedsStatus !== "loaded"}
            disabled={breedsStatus !== "success"}
            name="breed"
            id="breed"
            // value={breed}
            // onChange={({ target: { value } }) => {
            //   // setBreed(value);

            // }}
          >
            {breeds.map((br, i) => {
              return (
                <option value={br} key={`${br} + ${i}`}>
                  {br}
                </option>
              );
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {/* <Pets pets={pets} /> */}
      <Results pets={data?.pets || []} />
    </div>
  );
};

export default SearchParams;
