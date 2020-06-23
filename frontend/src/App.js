import React, { Component } from "react";
import "./App.css";
import UserCard from "./UserCard/UserCard";
import BookCard from "./BookCard/BookCard";

class App extends Component {
  state = {
    users: [],
    books: [],
  };

  componentDidMount() {
    fetch("http://localhost:1957/users")
      .then((response) => response.json())
      .then((users) => {
        this.setState({ users });
      });

    fetch("http://localhost:1957/books")
      .then((response) => response.json())
      .then((books) => {
        this.setState({ books });
      });
  }

  render() {
    let usersDisplay = this.state.users.map((user) => (
      <UserCard
        key={user.id}
        name={user.name}
        age={user.age}
        tel={user.phone}
        email={user.email}
      ></UserCard>
    ));

    let booksDisplay = this.state.books.map((book) => (
      <BookCard
        key={book.id}
        title={book.title}
        year={book.year}
        author={book.author}
      ></BookCard>
    ));

    return (
      <div className="App">
        <header>
          <h3>Meu CRUD Simples</h3>
        </header>
        <div id="main-container">
          <div className="container" id="users-container">
            {usersDisplay}
          </div>
          <div className="container" id="books-container">
            {booksDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
