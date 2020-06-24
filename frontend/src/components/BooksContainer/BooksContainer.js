import React, { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import "./BooksContainer.css";
import api from "../../api";

function BooksContainer() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const booksResponse = await api.get("/books");
      setBooks(booksResponse.data);
    }

    fetchBooks();
  }, []);

  let booksDisplay = books.map((book) => (
    <BookCard
      key={book.id}
      title={book.title}
      year={book.year}
      author={book.author}
    ></BookCard>
  ));

  return (
    <div className="container" id="books-container">
      <h3>Livros</h3>
      <div class="books">{booksDisplay}</div>
    </div>
  );
}

export default BooksContainer;
