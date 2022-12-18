// EVEN IN HERE WE DON'T NEED REACT BECAUSE VITE DOES THAT FOR USE
// import React from "react";
// import ReactDOM from "react-dom";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Pet from "./Pet";
import Pets from "./Pets";

const App = () => {
  return (
    <div>
      <h1>Adopt Some Pets!</h1>
      <Pets />
    </div>
  );

  /* return React.createElement("div", {}, [
    React.createElement("h1", { key: "main heading" }, "Adopt Some Pets!"),
    
  ]); */
};

const container = document.getElementById("root");
// const root = ReactDOM.createRoot(container);

if (container) {
  const root = createRoot(container);
  root.render(createElement(App));
}
