import React from "react";
import styled from "styled-components";
import { Container } from "../student/studentAyarlar";
import { Title } from "../student/Drawers/studentDrawerKonularim";

function Notifications() {
  return (
    <Container>
      <NotificationContainer>
        <Title>
          <p
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Bildirimlerim
          </p>
        </Title>
        <Messages>
          <h2>Mesajlarım</h2>
          <h3>Henüz mesajınız yok</h3>
        </Messages>
        <Messages>
          <h2>Ödevlerim</h2>
          <h3>Henüz ödeviniz yok</h3>
        </Messages>
      </NotificationContainer>
    </Container>
  );
}

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  margin-top: 1.5rem;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 15px;

  h2 {
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 22px;
  }
  h3 {
    text-align: left;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 16px;
    }
    h3 {
      font-size: 14px;
    }
  }
`;

export default Notifications;
