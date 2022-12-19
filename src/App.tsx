// EVEN IN HERE WE DON'T NEED REACT BECAUSE VITE DOES THAT FOR USE
// import React from "react";
// import ReactDOM from "react-dom";
// import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchParams from "./components/SearchParams";
// import Pet from "./Pet";
// import Pets from "./Pets";
import DetailsPage from "./pages/Details";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/details/:id",
    element: <DetailsPage />,
  },
  {
    path: "/",
    element: <SearchParams />,
  },
]);

if (container) {
  const App = () => {
    return (
      <div>
        <h1>Adopt Some Pets!</h1>
        {/* <SearchParams /> */}
        <RouterProvider router={router} />
      </div>
    );

    /* return React.createElement("div", {}, [
    React.createElement("h1", { key: "main heading" }, "Adopt Some Pets!"),
    
  ]); */
  };

  // const root = ReactDOM.createRoot(container);

  const root = createRoot(container);
  // root.render(createElement(App));
  root.render(<App />);
}
