import React, { useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "styled-components";
import {
  Container,
  EmailForm,
  Input,
  LeftContainer,
  MainBox,
  RightContainer,
} from "./Login";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return;
      }

      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Mailine şifre sıfırlama linki gönderildi");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [email]
  );
  return (
      <Container>
        <LeftContainer>
          <MainBox style={{ color: "white" }}>
            <h1>Parola Sıfırlama</h1>
            <h3 style={{ fontSize: "1.5rem" }}>
              Parolanızı mı unuttunuz? Yan Taraftaki formda şifrenizi sıfırlamak
              için mail adresinizi yazın ve Parolamı Sıfırla butonuna tıklayın.
            </h3>
          </MainBox>
        </LeftContainer>
        <RightContainer>
          <MainBox>
            <EmailForm>
              <Input
                type="email"
                placeholder="Mail Adresinizi Giriniz"
                onChange={(e) => setEmail(e.currentTarget.value)}
              ></Input>
              <button
                type="submit"
                onClick={handleSubmit}
              >Parolamı Sıfırla</button>
            </EmailForm>
          </MainBox>
        </RightContainer>
      </Container>
  );
}




export default ForgotPassword;
