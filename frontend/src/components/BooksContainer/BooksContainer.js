import React, { useState, useEffect } from "react";
import BookCard from "../BookCard";
import Button from '../Button';
import Modal from "react-modal";
import modalStyles from "../../modalStyles";
import ModalParts from "../ModalParts";
import Field from "../Field";
import Dropdown from '../Dropdown';
import { BooksContainerWrapper } from "./styles";
import api from "../../api";
import { emptyBook, simpleBook, formatDropdownAuthor, isValidBook } from '../../utils/books';

function BooksContainer() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [newBook, setNewBook] = useState({ ...emptyBook });
  const [authorsDropdown, setAuthorsDropdown] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");

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

      let formatedAuthors = authorsResponse.data.map(formatDropdownAuthor);
      formatedAuthors.unshift({ id: 0, text: 'Selecione um...' });
      setAuthorsDropdown(formatedAuthors);
      setSelectedAuthor(formatedAuthors[0].id);
    }

    fetchAuthors();
    fetchBooks();
  }, []);

  function handleChangeBook(field, event) {
    const { value } = event.target;
    
    setNewBook(previous => ({
      ...previous,
      [field]: value
    }))
  }

  function onSelectOption(option) {
    const fullAuthor = authors.find(author => author.id === Number(option.id));
    
    setSelectedAuthor(fullAuthor.id);
    handleChangeBook('author', { target: { value: fullAuthor }});
  }

  async function createBook() {
    if (!isValidBook(newBook)) {
      alert('Informações inválidas.');
      return;
    }

    try {
      await api.post('/books', simpleBook(newBook));
      
      books.push(newBook);
      setNewBook({ ...emptyBook });
      closeModal();
    } catch (error) {
      throw error;
    }
  }

  function updateBook(id) {
    return async function(newBook) {
      try {
        await api.put(`/books/${newBook.id}`, simpleBook(newBook));
  
        const ogBooks = [...books];
        const bookIndex = books.findIndex((book) => book.id === id);
  
        ogBooks[bookIndex] = { ...ogBooks[bookIndex], ...newBook };
        setBooks(ogBooks);
      } catch (error) {
        throw error;
      }
    }
  }

  async function deleteBook(id) {
    try {
      await api.delete(`/books/${id}`);

      const ogBooks = [...books];
      const bookIndex = books.findIndex((book) => book.id === id);

      ogBooks.splice(bookIndex, 1);
      setBooks(ogBooks); 
    } catch (error) {
      throw error;
    }
  } 

  let booksDisplay = books.map((book) => (
    <BookCard
      key={book.id}
      id={book.id}
      title={book.title}
      year={book.year}
      author={book.author}
      authorsCollection={authors}
      changeHandler={updateBook(book.id)}
      deleteBook={deleteBook}
    ></BookCard>
  ));

  return (
    <BooksContainerWrapper className="container" id="books-container">
      <div className="flex space-between">
        <h3>Livros</h3>
        <Button color="green" onClick={openModal}>Criar</Button>
      </div>
      <div className="books">{booksDisplay}</div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <ModalParts.Header
            title="Editar livro"
            onCloseClick={closeModal}
          >
          </ModalParts.Header>
          <ModalParts.Body>
            <Dropdown
              label="Autor"
              options={authorsDropdown}
              selected={selectedAuthor}
              onSelect={onSelectOption}
            >
            </Dropdown>
            <Field
              label="Título"
              inputType="text"
              fieldName="title"
              inputValue={newBook.title}
              placeholder="Algum título"
              changeHandler={handleChangeBook}
            ></Field>
            <Field
              label="Ano"
              inputType="number"
              fieldName="year"
              inputValue={newBook.year}
              placeholder="1999"
              changeHandler={handleChangeBook}
            ></Field>
          </ModalParts.Body>
          <ModalParts.Footer>
            <Button color="green" clickAction={createBook}>
              Salvar
            </Button>
          </ModalParts.Footer>
        </Modal>
      )}
    </BooksContainerWrapper>
  );
}

export default BooksContainer;
