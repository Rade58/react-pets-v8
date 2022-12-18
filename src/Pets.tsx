import React from "react";
import Pet from "./Pet";

const Pets = () => {
  return (
    <>
      <Pet name={"Nakamaoto"} specie="dog" breed={"Shiba"} />
      <Pet name={"Kevin"} specie="dog" breed={"Havanese"} />
      <Pet name={"Pauly"} specie="bird" breed={"Parrot"} />
    </>
  );

  /* React.createElement(Pet, {
    name: "Nakamaoto",
    specie: "dog",
    breed: "Shiba",
    key: "nakamoto",
  }),
  React.createElement(Pet, {
    name: "Kevin",
    specie: "dog",
    breed: "Havanese",
    key: "kevin",
  }),
  React.createElement(Pet, {
    name: "Pauly",
    specie: "bird",
    breed: "Parrot",
    key: "pauly",
  }), */
};

export default Pets;
