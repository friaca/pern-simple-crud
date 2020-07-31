import React, { useEffect, useState } from "react";
import UserCard from "../UserCard";
import Button from '../Button';
import Modal from "react-modal";
import modalStyles from "../../modalStyles";
import ModalParts from "../ModalParts";
import Field from "../Field";
import { emptyUser, isValidUser } from '../../utils/user';
import { UsersContainerWrapper } from "./styles";
import api from "../../api";

function UsersContainer() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({...emptyUser});

  const [isModalOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    async function fetchUsers() {
      const usersResponse = await api.get("/users");
      setUsers(usersResponse.data);
    }

    fetchUsers();
  }, []);

  function handleChangeUser(field, event) {
    const { value } = event.target;
    
    setNewUser(previous => ({
        ...previous,
        [field]: value
    }))
  }

  async function deleteUser(id) {
    try {
      const userBooks = await api.get(`/users/${id}/books`);

      if (userBooks.data.length) {
        alert('O usuário possui livros associados e por isso não pode ser excluído');
        return;
      }

      await api.delete(`/users/${id}`);

      const ogUsers = [...users];
      const userIndex = users.findIndex((user) => user.id === id);

      ogUsers.splice(userIndex, 1);
      setUsers(ogUsers);
    } catch (e) {
      alert('Algo deu errado');
    }
  }

  function updateUser(id) {
    return async function (newUser) {
      try {
        await api.put(`/users/${id}`, newUser);
        
        const ogUsers = [...users];
        const userIndex = users.findIndex((user) => user.id === id);
  
        ogUsers[userIndex] = { ...ogUsers[userIndex], ...newUser };
        setUsers(ogUsers);
      } catch (e) {
        alert('Algo deu errado');
      }
    };
  }

  async function createUser() {
    try {
      if (isValidUser(newUser)) {
        const userResponse = await api.post('/users', newUser);
        users.push(userResponse.data);

        setNewUser({...emptyUser})
        closeModal();
      } else {
        alert('Informações inválidas!');
      }
    } catch (e) {

    }
  }

  let usersDisplay = users.map((user) => (
    <UserCard
      key={user.id}
      name={user.name}
      age={user.age}
      phone={user.phone}
      email={user.email}
      id={user.id}
      changeHandler={updateUser(user.id)}
      deleteUser={deleteUser}
    ></UserCard>
  ));

  return (
    <UsersContainerWrapper className="container" id="users-container">
      <div className="flex space-between items-center">
        <h3>Usuários</h3>
        <Button color="green" onClick={openModal}>Criar</Button>
      </div>
      <div className="users main-container-scroll">{usersDisplay}</div>
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
              inputValue={newUser.name}
              placeholder="João da Silva"
              changeHandler={handleChangeUser}
            ></Field>
            <Field
              label="Idade"
              inputType="number"
              fieldName="age"
              inputValue={newUser.age}
              placeholder="15"
              changeHandler={handleChangeUser}
            ></Field>
            <Field
              label="E-mail"
              inputType="email"
              fieldName="email"
              inputValue={newUser.email}
              placeholder="joao@email.com"
              changeHandler={handleChangeUser}
            ></Field>
            <Field
              label="Telefone"
              inputType="tel"
              fieldName="phone"
              inputValue={newUser.phone}
              placeholder="(12) 91234-5678"
              changeHandler={handleChangeUser}
            ></Field>
          </ModalParts.Body>
          <ModalParts.Footer>
            <Button color="green" onClick={createUser}>
              Salvar
            </Button>
          </ModalParts.Footer>
        </Modal>
      )}
    </UsersContainerWrapper>
  );
}

export default UsersContainer;
