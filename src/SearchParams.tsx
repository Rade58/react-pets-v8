import { FC, ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
}

const SearchParams: FC<Props> = () => {
  const [location, setLocation] = useState<string>("Denver, CO");

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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
