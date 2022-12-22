import { useContext, useState } from "react";
import type { FC, ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet, { DataI } from "../lib/query-functions/fetchPet";
import Corousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import Modal from "../components/Modal";
import AdoptedPetContext from "../contexts/AdoptedPetContext";

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
        <h1 className="humongous">{pet.name}</h1>
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

// export default Details;
export default DetailsErrorBoundry;
