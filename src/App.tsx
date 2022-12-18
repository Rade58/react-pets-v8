import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom";

const Pet = ({ name, specie, breed }) => {
  return React.createElement("div", {}, [
    React.createElement("h1", { key: "name" }, name),
    React.createElement("h2", { key: "specie" }, specie),
    React.createElement("h3", { key: "breed" }, breed),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { key: "main heading" }, "Adopt Some Pets!"),
    React.createElement(Pet, {
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
    }),
  ]);
};

const container = document.getElementById("root");
// const root = ReactDOM.createRoot(container);
const root = createRoot(container);

root.render(React.createElement(App));
