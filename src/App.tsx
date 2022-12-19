// EVEN IN HERE WE DON'T NEED REACT BECAUSE VITE DOES THAT FOR USE
// import React from "react";
// import ReactDOM from "react-dom";
// import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import Pet from "./Pet";
// import Pets from "./Pets";
import SearchParamsPage from "./pages/SearchParams";
import DetailsPage from "./pages/Details";

const container = document.getElementById("root");

/* const router = createBrowserRouter([
  {
    path: "/details/:id",
    element: <DetailsPage />,
  },
  {
    path: "/",
    element: <SearchParamsPage />,
  },
]); */

if (container) {
  const App = () => {
    return (
      <BrowserRouter>
        <div>
          <h1>Adopt Some Pets!</h1>
          {/* <SearchParams /> */}
          {/* <RouterProvider router={router} /> */}
        </div>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/" element={<SearchParamsPage />} />
        </Routes>
      </BrowserRouter>
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
