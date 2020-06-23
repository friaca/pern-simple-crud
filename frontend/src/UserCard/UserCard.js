import React, { useState } from "react";
import Modal from "react-modal";
import "./UserCard.css";

function UserCard(props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

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
          {props.name}, {props.age} anos
        </p>
        <p>{props.tel}</p>
        <p>{props.email}</p>
      </div>
      <div className="user-options">
        <button onClick={openModal}>Editar</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="User Information"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}

export default UserCard;
