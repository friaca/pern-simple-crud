import React, { useState } from "react";
import Modal from "react-modal";
import modalStyles from "../../modalStyles";
import Button from "../Button";
import ModalParts from "../ModalParts";
import Field from "../Field";
import { UserCardWrapper, UserImgWrapper, UserInfoWrapper } from "./styles";

function UserCard({name, age, email, phone, changeHandler}) {
  const [isModalOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [user, setUser] = useState({ name, age, email, phone });

  function isValidUser(user) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const phoneRegex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;

    if (!user.name.length || user.name.length > 99)
      return false
    if (user.age < 0 || user.age > 100)
      return false;
    if (!user.email.match(emailRegex))
      return false;
    if (!user.phone.match(phoneRegex))
      return false;

    return true;
  }

  function handleChangeUser(field, event) {
    const { value } = event.target;
    
    setUser(previous => ({
        ...previous,
        [field]: value
    }))
  }

  function saveUser() {
    if (isValidUser(user)) {
      changeHandler(user);
      closeModal();
    } else {
      alert('Informações inválidas!');
    }
  }

  return (
    <UserCardWrapper>
      <UserImgWrapper>
        <img src="https://via.placeholder.com/75" alt="Imagem do usuário"></img>
      </UserImgWrapper>
      <UserInfoWrapper>
        <p>
          {name}, {age} anos
        </p>
        <p>{phone}</p>
        <p>{email}</p>
      </UserInfoWrapper>
      <Button padTop padRight clickAction={openModal}>
        Editar
      </Button>
      
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <ModalParts.Header
            title="Um título"
            onCloseClick={closeModal}
          ></ModalParts.Header>
          <ModalParts.Body>
            <Field
              label="Nome"
              inputType="text"
              fieldName="name"
              inputValue={user.name}
              placeholder="João da Silva"
              changeHandler={handleChangeUser}
            ></Field>
            <Field
              label="Idade"
              inputType="number"
              fieldName="age"
              inputValue={user.age}
              placeholder="15"
              changeHandler={handleChangeUser}
            ></Field>
            <Field
              label="E-mail"
              inputType="email"
              fieldName="email"
              inputValue={user.email}
              placeholder="joao@email.com"
              changeHandler={handleChangeUser}
            ></Field>
            <Field
              label="Telefone"
              inputType="tel"
              fieldName="phone"
              inputValue={user.phone}
              placeholder="(12) 91234-5678"
              changeHandler={handleChangeUser}
            ></Field>
          </ModalParts.Body>
          <ModalParts.Footer>
            <Button color="green" onClick={saveUser}>
              Salvar
            </Button>
          </ModalParts.Footer>
        </Modal>
      )}
    </UserCardWrapper>
  );
}

export default UserCard;
