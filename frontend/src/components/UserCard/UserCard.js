import React, { useState } from "react";
import Modal from "react-modal";
import modalStyles from "../../modalStyles";
import ModalParts from "../ModalParts";
import Button from "../Button";
import Field from "../Field";
import { UserCardWrapper, UserImgWrapper, UserInfoWrapper } from "./styles";
import { isValidUser } from '../../utils/user';

function UserCard({id, name, age, email, phone, changeHandler, deleteUser}) {
  const [isModalOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [user, setUser] = useState({ name, age, email, phone });

  function handleChangeUser(field, event) {
    const { value } = event.target;
    
    setUser(previous => ({
        ...previous,
        [field]: value
    }))
  }

  async function saveUser() {
    if (isValidUser(user)) {
      try {
        await changeHandler(user);
        closeModal();
      } catch (e) {
        alert('Deu algo errado');
      }
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
      <Button color="red" padTop padRight clickAction={() => deleteUser(id)}>
        Deletar
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
