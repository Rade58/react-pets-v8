/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet, { DataI } from "../lib/query-functions/fetchPet";

interface Props {
  children?: ReactNode;
}

const Details: FC<Props> = () => {
  const { id } = useParams<"id">();

  const results = useQuery(["details", id || ""], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loading">🖕</h2>
      </div>
    );
  }
  if (!results.data?.pets) {
    return (
      <div className="loading-pane">
        <h2 className="loading">🖕</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
      </div>
    </div>
  );
};

export default Details;
