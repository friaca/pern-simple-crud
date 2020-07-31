import styled from "styled-components";

export const BookCardWrapper = styled.div`
  border-radius: 4px;
  margin-top: 10px;
  background-color: #d17fff;
  display: flex;
  -webkit-box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.25);
  box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.25);
  min-height: 97px;
`;

export const BookInfoWrapper = styled.div`
  padding: 10px;
  flex-grow: 2;
  margin-top: 5px;

  > p {
    margin: 10px;
  }
`;
