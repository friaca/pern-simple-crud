import React, { useEffect, useState } from "react";
import UserCard from "../UserCard";
import { UsersContainerWrapper } from "./styles";
import api from "../../api";

function UsersContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const usersResponse = await api.get("/users");
      setUsers(usersResponse.data);
    }

    fetchUsers();
  }, []);

  function handleUserChange(id) {
    return function (newUser) {
      const ogUsers = [...users];
      const userIndex = users.findIndex((user) => user.id === id);

      ogUsers[userIndex] = { ...ogUsers[userIndex], ...newUser };
      setUsers(ogUsers);
    };
  }

  let usersDisplay = users.map((user) => (
    <UserCard
      key={user.id}
      name={user.name}
      age={user.age}
      phone={user.phone}
      email={user.email}
      changeHandler={handleUserChange(user.id)}
    ></UserCard>
  ));

  return (
    <UsersContainerWrapper className="container" id="users-container">
      <h3>Usuários</h3>
      <div className="users">{usersDisplay}</div>
    </UsersContainerWrapper>
  );
}

export default UsersContainer;
