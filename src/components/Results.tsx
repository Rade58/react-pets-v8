import type { FC, ReactNode } from "react";
import Pets, { PropsI as PetsPropsI } from "./Pets";

interface Props {
  children?: ReactNode;
  pets: PetsPropsI["pets"];
}

const Results: FC<Props> = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? <h1>There Is No Pets</h1> : <Pets pets={pets} />}
    </div>
  );
};

export default Results;
