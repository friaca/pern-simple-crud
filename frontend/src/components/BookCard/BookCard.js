import React from "react";
import Button from "../Button";
import { BookCardWrapper, BookInfoWrapper } from "./styles";

function BookCard(props) {
  const buttonStyle = {
    paddingRight: "10px",
    paddingTop: "10px",
  };

  return (
    <BookCardWrapper>
      <BookInfoWrapper>
        <p>
          {props.title}, {props.year}
        </p>
        <p>{props.author.name}</p>
      </BookInfoWrapper>
      <Button style={buttonStyle}>Editar</Button>
    </BookCardWrapper>
  );
}

export default BookCard;
