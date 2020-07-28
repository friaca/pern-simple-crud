import React, { useState, useEffect } from "react";
import BookCard from "../BookCard";
import Button from '../Button';
import Modal from "react-modal";
import modalStyles from "../../modalStyles";
import ModalParts from "../ModalParts";
import Field from "../Field";
import { BooksContainerWrapper } from "./styles";
import api from "../../api";

function BooksContainer() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [isModalOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    async function fetchBooks() {
      const booksResponse = await api.get("/books");
      setBooks(booksResponse.data);
    }

    async function fetchAuthors() {
      const authorsResponse = await api.get("/users");
      setAuthors(authorsResponse.data);
    }

    fetchAuthors();
    fetchBooks();
  }, []);

  let booksDisplay = books.map((book) => (
    <BookCard
      key={book.id}
      id={book.id}
      title={book.title}
      year={book.year}
      author={book.author}
      authorsCollection={authors}
    ></BookCard>
  ));

  return (
    <BooksContainerWrapper className="container" id="books-container">
      <div className="flex space-between">
        <h3>Livros</h3>
        <Button color="green" onClick={openModal}>Criar</Button>
      </div>
      <div className="books">{booksDisplay}</div>
    </BooksContainerWrapper>
  );
}

export default BooksContainer;
