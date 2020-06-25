import React from "react";
import { ButtonStyled } from "./styles";

function Button(props) {
  return (
    <div style={props.style}>
      <ButtonStyled onClick={() => (props.action ? props.action() : null)}>
        {props.children}
      </ButtonStyled>
    </div>
  );
}

export default Button;
