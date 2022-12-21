/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet, { DataI } from "../lib/query-functions/fetchPet";
import Corousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";

interface Props {
  children?: ReactNode;
}

const Details: FC<Props> = () => {
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
          <button>Adopt {pet.name}</button>
          <p>{pet.description}</p>
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

// export default Details;
export default DetailsErrorBoundry;
