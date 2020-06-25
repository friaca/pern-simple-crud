import React from "react";
import Button from "../Button";
import { BookCardWrapper, BookInfoWrapper } from "./styles";

function BookCard(props) {
  return (
    <BookCardWrapper>
      <BookInfoWrapper>
        <p>
          {props.title}, {props.year}
        </p>
        <p>{props.author.name}</p>
      </BookInfoWrapper>
      <Button padTop padRight>
        Editar
      </Button>
    </BookCardWrapper>
  );
}

export default BookCard;
