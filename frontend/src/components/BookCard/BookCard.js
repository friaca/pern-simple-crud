import React, { useState, useEffect } from "react";
import Button from "../Button";
import Modal from "react-modal";
import modalStyles from "../../modalStyles";
import ModalParts from "../ModalParts";
import Field from "../Field";
import Dropdown from '../Dropdown';
import { BookCardWrapper, BookInfoWrapper } from "./styles";
import { isValidBook, formatDropdownAuthor } from '../../utils/books';

function BookCard({ id, title, year, author, authorsCollection, changeHandler, deleteBook }) {
  const [isModalOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [book, setBook] = useState({ id, title, year, author });
  const [authorsDropdown, setAuthorsDropdown] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    setAuthorsDropdown(authorsCollection.map(formatDropdownAuthor))
    
    const selectedIndex = authorsCollection.findIndex(author => author.id === book.author.id);
    setSelectedAuthor(authorsCollection[selectedIndex].id)
  }, [])

  function handleChangeBook(field, event) {
    const { value } = event.target;
    
    setBook(previous => ({
      ...previous,
      [field]: value
    }))
  }

  function onSelectOption(option) {
    const fullAuthor = authorsCollection.find(author => author.id === Number(option.id));
    
    setSelectedAuthor(fullAuthor.id);
    handleChangeBook('author', { target: { value: fullAuthor }});
  }

  async function saveBook() {
    if (isValidBook(book)) {
      try {
        await changeHandler(book);
        closeModal();
      } catch (e) {
        alert('Deu algo errado');
      }
    } else {
      alert('Informações inválidas!');
    }
  }

  return (
    <BookCardWrapper>
      <BookInfoWrapper>
        <p>
          <b>{title}</b>, {year}
        </p>
        <p>{author.name}</p>
      </BookInfoWrapper>
      <Button padTop padRight clickAction={openModal}>
        Editar
      </Button>
      <Button color="red" padTop padRight clickAction={() => deleteBook(id)}>
        Deletar
      </Button>
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
              inputValue={book.title}
              placeholder="Algum título"
              changeHandler={handleChangeBook}
            ></Field>
            <Field
              label="Ano"
              inputType="number"
              fieldName="year"
              inputValue={book.year}
              placeholder="1999"
              changeHandler={handleChangeBook}
            ></Field>
          </ModalParts.Body>
          <ModalParts.Footer>
            <Button color="green" clickAction={saveBook}>
              Salvar
            </Button>
          </ModalParts.Footer>
        </Modal>
      )}
    </BookCardWrapper>
  );
}

export default BookCard;
