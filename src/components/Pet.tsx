// NO NEED TO IMPORT REACT ANYMORE
// import React from "react";

import type { ReactElement, FC } from "react";

export interface PropsI {
  id: string;
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  children?: ReactElement;
}

const Pet: FC<PropsI> = ({ id, name, animal, breed, images, location }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (images.length) {
    hero = images[0];
  }

  return (
    <a href={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </a>
  );
  /* 
  return React.createElement("div", {}, [
    React.createElement("h1", { key: "name" }, name),
    React.createElement("h2", { key: "animal" }, animal),
    React.createElement("h3", { key: "breed" }, breed),
  ]); */
};

export default Pet;
