import { FC, ReactNode, useState, useEffect } from "react";
import Pets, { PropsI as PetsPropsI } from "./Pets";

const ANIMALS = ["", "bird", "cat", "dog", "rabit", "reptile"] as const;

interface Props {
  children?: ReactNode;
}

const SearchParams: FC<Props> = () => {
  const [location, setLocation] = useState<string>("");
  const [animal, setAnimal] = useState<typeof ANIMALS[number]>("");
  const [breed, setBreed] = useState<string>("");

  const [pets, setPets] = useState<PetsPropsI["pets"]>([]);

  console.log({ pets });

  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    //
    //
    requestPets().catch(() => {});
  }, []); // eslint-disable-line

  async function requestPets() {
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
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets().catch(() => {});
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={({ target: { value } }) => {
              setLocation(value);
            }}
            id="location"
            value={location}
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
              setBreed("");
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
            disabled={breeds.length === 0}
            name="breed"
            id="breed"
            value={breed}
            onChange={({ target: { value } }) => {
              setBreed(value);
            }}
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
      <Pets pets={pets} />
    </div>
  );
};

export default SearchParams;
