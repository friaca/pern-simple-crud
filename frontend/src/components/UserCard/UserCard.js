import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import { UserCardWrapper, UserImgWrapper, UserInfoWrapper } from "./styles";
import ModalParts from "../ModalParts";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0px",
    marginRight: "-50%",
    width: "50%",
    height: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
  },
};

function UserCard(props) {
  const [isModalOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <UserCardWrapper>
      <UserImgWrapper>
        <img src="https://via.placeholder.com/75" alt="Imagem do usuário"></img>
      </UserImgWrapper>
      <UserInfoWrapper>
        <p>
          {props.name}, {props.age} anos
        </p>
        <p>{props.tel}</p>
        <p>{props.email}</p>
      </UserInfoWrapper>
      <Button padTop padRight action={openModal}>
        Editar
      </Button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <ModalParts.Header
            title="Um título"
            onCloseClick={closeModal}
          ></ModalParts.Header>
          <ModalParts.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            feugiat volutpat justo vitae tincidunt. Vivamus quam nisl, laoreet
            nec ligula at, placerat interdum nibh. Nulla vulputate vestibulum
            eros tincidunt placerat. Donec nunc dolor, pulvinar at laoreet eget,
            rutrum ut tellus. Duis ac augue sit amet libero dignissim gravida
            vel ut velit. Praesent iaculis iaculis mi in commodo. Donec eu lacus
            eget neque tempus sollicitudin. In hac habitasse platea dictumst.
            Morbi vestibulum leo non egestas dapibus. Nam condimentum, leo in
            posuere hendrerit, arcu diam condimentum orci, convallis
            pellentesque ex arcu quis mi. Vivamus nec dui at diam vulputate
            efficitur cursus eget risus. Praesent lacus augue, hendrerit ac erat
            a, condimentum lobortis diam. Etiam malesuada, nisl id fermentum
            dictum, lectus velit luctus neque, sed tempor elit turpis in lectus.
            Curabitur non elementum libero, in mattis lacus. Phasellus egestas
            id nulla ut gravida. Integer volutpat mattis metus a pellentesque.
            Sed semper ipsum quis tortor euismod blandit. Aliquam auctor felis
            nisi. Duis lacinia sapien at sagittis pharetra. Sed tempus nibh a
            nisi dapibus, eu euismod dui pulvinar. Aenean vestibulum posuere
            diam quis condimentum. Ut et tincidunt dolor. Nam venenatis vel urna
            a maximus. Nam nec ligula suscipit, finibus tortor non, hendrerit
            felis. Aliquam sed leo rhoncus, tincidunt eros eu, molestie risus.
            Nunc consequat interdum aliquet. Vivamus et ligula imperdiet,
            tincidunt tellus vitae, scelerisque erat. Curabitur ac eros non dui
            viverra efficitur. Suspendisse ut magna in turpis congue posuere.
            Cras velit felis, consectetur at ante sit amet, pharetra ornare
            urna. Etiam efficitur malesuada interdum. Sed accumsan malesuada
            interdum. Vestibulum lorem leo, dictum et lectus et, volutpat
            condimentum tortor. Sed dictum ut eros mollis dapibus. Aenean sed
            tincidunt turpis, non viverra lectus. Duis sagittis interdum
            fringilla. Duis consectetur enim metus, sit amet aliquam elit tempor
            viverra. Aliquam mattis ultrices nisi non porttitor. Nam at ex quis
            eros porttitor euismod. Praesent nibh dui, vehicula sit amet diam
            ac, rutrum mollis orci. Phasellus dictum ante blandit semper luctus.
            Integer porttitor, leo in volutpat pulvinar, nisi sem hendrerit
            nulla, ac sagittis lacus enim in nibh. Morbi rutrum est odio, at
            feugiat justo porta sit amet. Sed laoreet pharetra risus in
            ullamcorper. Quisque nunc odio, bibendum sed suscipit at, placerat
            ac tellus. Nam lacus nisi, dictum nec auctor id, vehicula id nisi.
            Fusce eu est ultrices, tempor diam non, faucibus ex. Praesent
            consectetur eros vitae eros tempus condimentum.
          </ModalParts.Body>
          <ModalParts.Footer>
            <Button>Salvar</Button>
          </ModalParts.Footer>
        </Modal>
      )}
    </UserCardWrapper>
  );
}

export default UserCard;
