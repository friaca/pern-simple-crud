import React from "react";
import "./App.css";
import UsersContainer from "./components/UsersContainer";
import BooksContainer from "./components/BooksContainer";

function App() {
  return (
    <div className="App">
      <header>
        <h3>CRUD Simples</h3>
      </header>
      <div id="main-container">
        <UsersContainer></UsersContainer>
        <BooksContainer></BooksContainer>
      </div>
    </div>
  );
}

export default App;
