import React from "react";
import { ModalHeaderStyled, CloseElementStyled } from "./styles";

export default function ModalHeader(props) {
  return (
    <ModalHeaderStyled>
      <span>{props.title}</span>
      <CloseElementStyled onClick={props.onCloseClick}>X</CloseElementStyled>
    </ModalHeaderStyled>
  );
}
