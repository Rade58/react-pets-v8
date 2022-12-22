// EVEN IN HERE WE DON'T NEED REACT BECAUSE VITE DOES THAT FOR USE
import { lazy, Suspense } from "react";
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
//
import AdoptedPetContext, {
  DataType,
  defaultData,
} from "./contexts/AdoptedPetContext";

// THESE ABOVE ARE STATIC IMPORTS AND THEY WILL BE INCLUDED
// INSIDE OR BUNDLE

// BUT IF WE WANT TO HAVE CHUNKS OF JAVASCRIPT LOADED
// AFTER INITIAL BUNDLE IS LOADED (WHEN WE WONT THAT TO BE LOADED
// JUST BEFORE RENDERING, WE WILL USE lazy AND dynamic import)

// DYNAMIC IMPORT WILL IMPORT THE COMPONENT (OR LIBRARY, OR NYTHING ELSE
// ON THE SPOT WHERE THAT IMPORT IS BEING USED)
// AND lazy WILL LOA LAZYLY THAT THING

// WE REMOVED THIS BECAUSE WE WANT TO LAZY LOAD THEM
// WE DON'T WANT THESE TO BE LOADED IN SAME BUNDLE
// import SearchParamsPage from "./pages/SearchParams";
// import DetailsPage from "./pages/Details";
// AS YOU CAN SEE

// OK, LETS INTERPRET THIS
// WE CAN SAY IT LIKE THIS:
// "IF SOMETHING TRIES TO RENDER Details or SearchParams COMPONENTS
// PANIC AND LOAD DETAILS (SO IT WILL BE IMPORTED WHEN JUST BEFORE RENDERING)"
const SearchParamsPage = lazy(() => import("./pages/SearchParams"));
const DetailsPage = lazy(() => import("./pages/Details"));
//

// BUT WE ALSO NEED RO USE `Suspense` (TO SHOW SOMETHING
// DURING WAITING FOR THE LAY STUFF TO LOAD)
// WE CAN SHOW SOME SPINNER WHILE AS A FALLBACK

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
    const adoptedPet = useState<DataType>(defaultData);

    return (
      <BrowserRouter>
        {/* FOR CODE SPLITTING */}
        <Suspense
          fallback={
            <div className="loading-pane">
              <h2 className="loader">🖕</h2>
            </div>
          }
        >
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
        </Suspense>
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
