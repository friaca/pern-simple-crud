import React from "react";
import { ModalBodyStyled } from "./styles";

export default function ModalBody(props) {
  return <ModalBodyStyled>{props.children}</ModalBodyStyled>;
}
