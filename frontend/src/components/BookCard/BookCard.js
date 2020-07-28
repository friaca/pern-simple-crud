import React, { useState, useEffect } from "react";
import Button from "../Button";
import Modal from "react-modal";
import modalStyles from "../../modalStyles";
import ModalParts from "../ModalParts";
import Field from "../Field";
import Dropdown from '../Dropdown';
import { BookCardWrapper, BookInfoWrapper } from "./styles";

function BookCard({ id, title, year, author, authorsCollection }) {
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

  function formatDropdownAuthor(author) {
    return { text: author.name,  id: author.id }
  }

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

  return (
    <BookCardWrapper>
      <BookInfoWrapper>
        <p>
          {book.title}, {book.year}
        </p>
        <p>{book.author.name}</p>
      </BookInfoWrapper>
      <Button padTop padRight clickAction={openModal}>
        Editar
      </Button>
      <Button color="red" padTop padRight>
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
              inputValue={title}
              placeholder="(12) 91234-5678"
              changeHandler={handleChangeBook}
            ></Field>
            <Field
              label="Ano"
              inputType="number"
              fieldName="year"
              inputValue={book.year}
              placeholder="(12) 91234-5678"
              changeHandler={handleChangeBook}
            ></Field>
          </ModalParts.Body>
          <ModalParts.Footer>
            <Button color="green">
              Salvar
            </Button>
          </ModalParts.Footer>
        </Modal>
      )}
    </BookCardWrapper>
  );
}

export default BookCard;
