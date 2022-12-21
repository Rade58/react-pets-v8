// EVEN IN HERE WE DON'T NEED REACT BECAUSE VITE DOES THAT FOR USE
// import React from "react";
// import ReactDOM from "react-dom";
// import { createElement } from "react";
import { createRoot } from "react-dom/client";
import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
// import Pet from "./Pet";
// import Pets from "./Pets";
//
import { useState } from "react";
//
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//

import SearchParamsPage from "./pages/SearchParams";
import DetailsPage from "./pages/Details";
import AdoptedPetContext, { DataType } from "./contexts/AdoptedPetContext";

const container = document.getElementById("root");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

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
    const adoptedPet = useState<DataType | null>(null);

    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header>
              <Link to="/">
                <h1>Adopt Some Pets!</h1>
              </Link>
            </header>
            {/* <SearchParams /> */}
            {/* <RouterProvider router={router} /> */}
            <Routes>
              <Route path="/details/:id" element={<DetailsPage />} />
              <Route path="/" element={<SearchParamsPage />} />
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
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
