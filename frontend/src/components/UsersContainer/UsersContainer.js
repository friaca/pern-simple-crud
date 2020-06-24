import React, { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./UsersContainer.css";
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

  let usersDisplay = users.map((user) => (
    <UserCard
      key={user.id}
      name={user.name}
      age={user.age}
      tel={user.phone}
      email={user.email}
    ></UserCard>
  ));

  return (
    <div className="container" id="users-container">
      <h3>Usuários</h3>
      <div class="users">{usersDisplay}</div>
    </div>
  );
}

export default UsersContainer;
