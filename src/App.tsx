import { lazy, Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdoptedPetContext, {
  DataType,
  defaultData,
} from "./contexts/AdoptedPetContext";

const SearchParamsPage = lazy(() => import("./pages/SearchParams"));
const DetailsPage = lazy(() => import("./pages/Details"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      // ADDED THID
      suspense: true
    },
  },
});


const App = () => {
  const adoptedPet = useState<DataType>(defaultData);

  return (
  
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
  );
};



export default App;
