import styled from "styled-components";

export const UserCardWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  border-radius: 4px;
  background-color: #91ccff;
  -webkit-box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.25);
  box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.25);
`;

export const UserInfoWrapper = styled.div`
  width: 100%;
  margin-left: 17px;

  > p {
    margin: 13px;
  }
`;
