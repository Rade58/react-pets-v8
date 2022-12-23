import { lazy, Suspense } from "react";
// import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdoptedPetContext, {
  DataType,
  defaultData,
} from "./contexts/AdoptedPetContext";

const SearchParamsPage = lazy(() => import("./pages/SearchParams"));
const DetailsPage = lazy(() => import("./pages/Details"));

// WE WILL USE SO REMOVE THIS
// const container = document.getElementById("root");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// COMMENTING OUT THIS CONDITIONAL BECAUSE I AM DOING SERVER SIDE RENDERING
// WITH THE APP
// I JUST WANT TO DO DEFAULT EXPORT OF THIS APP

// if (container) {
const App = () => {
  const adoptedPet = useState<DataType>(defaultData);

  return (
    // WE DON'T NEED BROWSER ROUTER BECAUSE WE WILL BE ROUTE ON SERVER SIDE
    // <BrowserRouter>

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
          <Routes>
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/" element={<SearchParamsPage />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </Suspense>
    // </BrowserRouter>
  );
};

// SINCE I AM DOING SERVER SIDE RENDERING SOMWHERE ELSE
// I AM COMMENTING THIS OUT
// AND I AM DOING DEFAULT EXPORT
// const root = createRoot(container);
// root.render(<App />);
// }

export default App;
