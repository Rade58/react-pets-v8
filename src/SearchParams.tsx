import { FC, ReactNode, useState, useEffect } from "react";

const ANIMALS = ["all", "bird", "cat", "dog", "rabit", "reptile"] as const;

interface Props {
  children?: ReactNode;
}

const SearchParams: FC<Props> = () => {
  const [location, setLocation] = useState<string>("Denver, CO");
  const [animal, setAnimal] = useState<typeof ANIMALS[number]>("all");
  const [breed, setBreed] = useState<string>("");

  const [pets, setPets] = useState<string[]>([]);

  const breeds: string[] = [];

  useEffect(() => {
    //
    //
    requestPets()
      .then((data) => {})
      .catch(() => {
        //
      });
  });

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json: { pets: string[] } = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
            {breeds.map((br) => {
              return (
                <option value={br} key={br}>
                  {br}
                </option>
              );
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
