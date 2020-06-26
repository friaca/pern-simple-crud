import styled from "styled-components";

export const ModalHeaderStyled = styled.div`
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const CloseElementStyled = styled.div`
  cursor: pointer;
`;

export const ModalBodyStyled = styled.div`
  padding: 15px;
  overflow-y: auto;
  flex-grow: 1;
`;

export const ModalFooterStyled = styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;
