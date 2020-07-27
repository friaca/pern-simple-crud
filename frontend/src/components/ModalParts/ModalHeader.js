import React from "react";
import {
  ModalHeaderStyled,
  CloseElementStyled,
  ModalTitleStyled,
} from "./styles";

export default function ModalHeader(props) {
  return (
    <ModalHeaderStyled>
      <ModalTitleStyled>{props.title}</ModalTitleStyled>
      <CloseElementStyled onClick={props.onCloseClick}>X</CloseElementStyled>
    </ModalHeaderStyled>
  );
}
