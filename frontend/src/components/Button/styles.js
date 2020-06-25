import styled, { css } from "styled-components";

export const ButtonStyled = styled.button`
  border: unset;
  border-radius: 2px;
  background-color: #f9f9f9;
  width: 75px;
  height: 35px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #e2e2e2;
  }
`;

export const ButtonStyledWrapper = styled.div`
  ${(props) =>
    props.padTop &&
    css`
      padding-top: 10px;
    `}
  ${(props) =>
    props.padRight &&
    css`
      padding-right: 10px;
    `}
`;
