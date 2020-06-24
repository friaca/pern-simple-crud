import React from "react";
import Button from "../Button/Button";
import "./BookCard.css";

function BookCard(props) {
  const buttonStyle = {
    width: "100%",
    textAlign: "end",
    paddingRight: "10px",
    paddingTop: "10px",
  };

  return (
    <div className="book-card">
      <div className="book-info">
        <p>{props.title}</p>
        <p>{props.year}</p>
        <p>{props.author.name}</p>
      </div>
      <Button style={buttonStyle}>Editar</Button>
    </div>
  );
}

export default BookCard;
