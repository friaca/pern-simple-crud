import React from "react";
import Button from "../Button/Button";
import "./UserCard.css";

function UserCard(props) {
  const buttonStyle = {
    paddingRight: "10px",
    paddingTop: "10px",
  };

  return (
    <div className="user-card">
      <div className="user-img">
        <img
          src="https://via.placeholder.com/100"
          alt="Imagem do usuário"
        ></img>
      </div>
      <div className="user-info">
        <p>
          {props.name}, {props.age} anos
        </p>
        <p>{props.tel}</p>
        <p>{props.email}</p>
      </div>
      <Button style={buttonStyle}>Editar</Button>
    </div>
  );
}

export default UserCard;
