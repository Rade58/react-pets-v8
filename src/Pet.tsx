// NO NEED TO IMPORT REACT ANYMORE
// import React from "react";

import type { ReactElement, FC } from "react";

export interface PropsI {
  name: string;
  specie: string;
  breed: string;
  children?: ReactElement;
}

const Pet: FC<PropsI> = ({ name, specie, breed }) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{specie}</h2>
      <h3>{breed}</h3>
    </div>
  );
  /* 
  return React.createElement("div", {}, [
    React.createElement("h1", { key: "name" }, name),
    React.createElement("h2", { key: "specie" }, specie),
    React.createElement("h3", { key: "breed" }, breed),
  ]); */
};

export default Pet;
