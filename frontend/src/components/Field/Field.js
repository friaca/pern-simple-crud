import React from "react";
//eslint-disable-next-line
import PropTypes from "prop-types";
import { FieldStyled, InputStyled, LabelStyled } from "./styles";

export default function Field({label, inputType, inputValue, placeholder, fieldName, changeHandler}) {
  return (
    <FieldStyled>
      <LabelStyled>{label}</LabelStyled>
      <InputStyled
        type={inputType}
        placeholder={placeholder}
        value={inputValue}
        onChange={(ev) => changeHandler(fieldName, ev)}
      ></InputStyled>
    </FieldStyled>
  );
}

Field.defaultProps = {
  label: "Sem label",
  inputType: "text",
  placeholder: "",
};
