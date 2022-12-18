import React from "react";

const Pet = ({ name, specie, breed }) => {
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
