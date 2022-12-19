/* eslint jsx-a11y/anchor-is-valid: 1 */
import React from "react";
import type { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

const Details: FC<Props> = () => {
  const { id } = useParams<"id">();

  return <div>Hi! {id}</div>;
};

export default Details;
