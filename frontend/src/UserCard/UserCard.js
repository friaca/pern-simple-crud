import React, { Component } from "react";
import "./UserCard.css";

class UserCard extends Component {
  render() {
    return (
      <div className="user-card">
        <div className="user-img">
          <img
            src="https://via.placeholder.com/100"
            alt="Imagem do usuário"
          ></img>
        </div>
        <div className="user-info">
          <p>
            {this.props.name}, {this.props.age} anos
          </p>
          <p>{this.props.tel}</p>
          <p>{this.props.email}</p>
        </div>
        <div className="user-options">
          <button>Editar</button>
        </div>
      </div>
    );
  }
}

export default UserCard;
