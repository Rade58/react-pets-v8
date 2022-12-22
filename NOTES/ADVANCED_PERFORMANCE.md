# ADVANCED PERFORMANCE: `CODE SPLITTING` AND `SERVER SIDE RENDERING`

<https://react-v8.holt.courses/lessons/advance-react-performance/code-splitting>

<https://react-v8.holt.courses/lessons/advance-react-performance/server-side-rendering>

# CODE SPLITTING (`lazy` AND `Susprnse`)

IN `src/App.tsx` I DID SOME CODE SPLITTING

```tsx
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
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
// INSIDE BUNDLE (INITIAL CHUNK OF CODE SEND TO THE BROWSER)

// BUT IF WE WANT TO HAVE SPLITTED CHUNKS OF JAVASCRIPT LOADED
// SEPARATLY OF INITIAL BUNDLE (FOR EXAMPLE WE WANT CHUNK TO BE 
// LOADED JUST BEFORE RENDERING OF SOMETHING, WE WILL USE lazy AND 
// dynamic import)

// DYNAMIC IMPORT WILL IMPORT THE COMPONENT (OR LIBRARY, OR 
// SOMETHING ELSE ON THE SPOT WHERE THAT IMPORT IS BEING USED)
// AND lazy WILL LOAD THAT THING LAZYLY

// WE REMOVED THESE STATIC IMPORTS (THEY HAPPEN TO BE OUR ROUTES)
//  BECAUSE WE WANT TO LAZY LOAD THEM
// WE DON'T WANT THESE TO BE LOADED IN SAME INITIAL BUNDLE
// import SearchParamsPage from "./pages/SearchParams";
// import DetailsPage from "./pages/Details";
// AS YOU CAN SEE

// OK, LETS INTERPRET THIS
// WE CAN SAY IT LIKE THIS:
// "IF SOMETHING TRIES TO RENDER Details or SearchParams COMPONENTS
// PANIC AND LOAD THESE (SO IT WILL BE IMPORTED WHEN JUST BEFORE RENDERING)"

// NOTICE, THE ARGUMENT OF lazt IS A FUNCTION THAT RETURNS
// DYNAMIC IMPORT, ONCE THAT FUNCTION IS INVOKED
// IMPORT WILL HAPPEN

const SearchParamsPage = lazy(() => import("./pages/SearchParams"));
const DetailsPage = lazy(() => import("./pages/Details"));
//

// BUT WE ALSO NEED RO USE `Suspense` (TO SHOW SOMETHING
// DURING WAITING FOR THE LAZY STUFF TO LOAD)
// WE CAN SHOW SOME SPINNER WHILE AS A FALLBACK FOR EXAMPLE

const container = document.getElementById("root");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});



if (container) {
  const App = () => {
    const adoptedPet = useState<DataType>(defaultData);

    return (
      <BrowserRouter>
        {/* AS YOU SEE IMPORTANT THING THAT WE WRAP
        LAZY THINGS WITH Suspense */}
        <Suspense
        // AND WE NEED TO PROVIDE FLLBACK
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
              {/* FALLBACK WILL BE VISIBLE UNTIL THESE TWO
              ROUTES GET LOADED*/}
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

```



SINCE WE DON'T NEED MODAL UNTIL SOMEONE WANTS TO OPEN IT, WE WILL LAZY LAOD THAT MODAL TOO AS AN EXERCISE

```
code src/pages/Details.tsx
```

```tsx
import { lazy, Suspense, useContext, useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet, { DataI } from "../lib/query-functions/fetchPet";
import Corousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
//
// import Modal from "../components/Modal";
const Modal = lazy(() => import("../components/Modal"));
// WE DON'T NEED Suspense BECAUSE WE DON'T WNT TO SHOW ANYTHING ELSE WHILE WE WAIT FOR MODAL TO LOAD

interface Props {
  children?: ReactNode;
}

const Details: FC<Props> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  const { id } = useParams<"id">();

  const results = useQuery(["details", id || ""], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🖕</h2>
      </div>
    );
  }
  if (!results.data?.pets) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🖕</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Corousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="buttons">
                  <button
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button onClick={() => setShowModal(false)}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundry(props: Props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundry;

```

# SERVER SIDE RENDERING

HERE IS WHAT I'M GOING TO DO

```
code src/App.tsx
```

```tsx

```

```
code src/index.html
```

```html

```

```
code 
```

NOW LETS MAKE CLIENTT AND SERVER APP

```
touch src/ClientApp.tsx
```

```tsx

```

```
touch src/ServerApp.tsx
```

```tsx

```
