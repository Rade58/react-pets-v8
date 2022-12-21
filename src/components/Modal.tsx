import { FC, ReactNode, useRef, useEffect, createRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children?: ReactNode;
}

const Modal: FC<Props> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>();

  if (!elRef.current) {
    elRef.current = document.getElementById("modal") as HTMLDivElement;
  }

  return null;
};

export default Modal;
