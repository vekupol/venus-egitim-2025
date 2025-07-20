import React from "react";
import {
  Container,
  LeftContainer,
  MainBox,
  RightContainer,
} from "../../../pages/mainPages/Login";
import styled from "styled-components";
import image from "./destek.png"
import image2 from "./destek2.png"

function Supporters() {
  return (
    <Container>
      <LeftContainer>
        <MainBox style={{ color: "#fff" }}>
          <h1>Destekçilerimiz</h1>
          <h3 style={{ fontSize: "1.5rem" }}>
            Çıktığımız bu yolda bizim hep yanımızda olan ,maddi ve manevi
            desteklerde bulunan tüm kurumlarımıza teşekkür ederiz.
          </h3>
        </MainBox>
      </LeftContainer>
      <RightContainer>
        <MainBox>
          <Image src={image} alt={image} />
          <Image2 src={image2} alt={image2} />
        </MainBox>
      </RightContainer>
    </Container>
  );
}

const Image = styled.img`
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Image2 = styled.img`
  width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;



export default Supporters;
