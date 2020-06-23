import React, { Component } from "react";
import "./BookCard.css";

class BookCard extends Component {
  render() {
    return (
      <div className="book-card">
        <p>{this.props.title}</p>
        <p>{this.props.year}</p>
        <p>{this.props.author.name}</p>
      </div>
    );
  }
}

export default BookCard;
