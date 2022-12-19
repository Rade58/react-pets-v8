// NO NEED TO IMPORT REACT ANYMORE
// import React from "react";

import type { ReactElement, FC } from "react";

export interface PropsI {
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  children?: ReactElement;
}

const Pet: FC<PropsI> = ({ name, animal, breed }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <h3>{breed}</h3>
    </div>
  );
  /* 
  return React.createElement("div", {}, [
    React.createElement("h1", { key: "name" }, name),
    React.createElement("h2", { key: "animal" }, animal),
    React.createElement("h3", { key: "breed" }, breed),
  ]); */
};

export default Pet;
