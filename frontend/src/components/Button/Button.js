import React from "react";
import { ButtonStyled, ButtonStyledWrapper } from "./styles";

function Button(props) {
  return (
    <ButtonStyledWrapper {...props}>
      <ButtonStyled
        color={props.color}
        onClick={() => (props.clickAction ? props.clickAction() : null)}
      >
        {props.children}
      </ButtonStyled>
    </ButtonStyledWrapper>
  );
}

export default Button;
