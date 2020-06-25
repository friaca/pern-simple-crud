import React from "react";
import Button from "../Button";
import { UserCardWrapper, UserImgWrapper, UserInfoWrapper } from "./styles";

function UserCard(props) {
  const buttonStyle = {
    paddingRight: "10px",
    paddingTop: "10px",
  };

  return (
    <UserCardWrapper>
      <UserImgWrapper>
        <img src="https://via.placeholder.com/75" alt="Imagem do usuário"></img>
      </UserImgWrapper>
      <UserInfoWrapper>
        <p>
          {props.name}, {props.age} anos
        </p>
        <p>{props.tel}</p>
        <p>{props.email}</p>
      </UserInfoWrapper>
      <Button padTop padRight>
        Editar
      </Button>
    </UserCardWrapper>
  );
}

export default UserCard;
