import { FC, ReactNode, useRef, useEffect, createRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  children?: ReactNode;
}

const Modal: FC<Props> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>();

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);
    }
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
