import styled, { css } from "styled-components";

export const ButtonStyled = styled.button`
  border: unset;
  border-radius: 2px;
  background-color: ${(props) => {
    switch (props.color) {
      case "green":
        return css`#28a745`;
      case "red":
        return css`#ff5555`;
      default:
        return css`#f9f9f9`;
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case 'green':
      case 'red':
        return 'white';
      default:
        return ''
    }
  }
  };
  width: 75px;
  height: 35px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${(props) => {
      switch (props.color) {
        case "green":
          return css`#23913c`;
        case "red":
          return css`#ea3535`;
        default:
          return css`#e2e2e2`;
      }
    }};
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
