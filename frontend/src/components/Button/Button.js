import React from "react";
import { ButtonStyled, ButtonStyledWrapper } from "./styles";

function Button(props) {
  return (
    <ButtonStyledWrapper {...props}>
      <ButtonStyled onClick={() => (props.action ? props.action() : null)}>
        {props.children}
      </ButtonStyled>
    </ButtonStyledWrapper>
  );
}

export default Button;
