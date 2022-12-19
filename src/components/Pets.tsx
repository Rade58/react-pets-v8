// import React from "react";
import type { FC, ReactElement } from "react";
import Pet, { PropsI as PetPropsI } from "./Pet";

export interface PropsI {
  pets: (PetPropsI & { id: string })[];
  children?: ReactElement;
}

const Pets: FC<PropsI> = ({ pets }) => {
  return (
    <>
      {pets.map((props) => {
        // I DID HERE SPREADING OF PROPS
        // WHICH IS VERY IMPLICIT
        // IT IS NOT GOOD, YOU SHOULD BE MORE EXPLICIT
        // BUT I'LL LEAVE THIS HERE
        return <Pet {...props} key={props.id} />;
      })}
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
