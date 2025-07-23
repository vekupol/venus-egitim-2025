import React from "react";
import styled from "styled-components";
import ChangingText from "./ChangingText";
import mainPicture from "../images/anaresim11.svg";
import { Container } from "./OgrenciMenu";

function MainMenu({ scrollToOgrenci, scrollToOgretmen, scrollToVeli }) {
  return (
    <Container>
      <Menu>
        <Text>
          <TurkiyeDiv>Türkiye'nin </TurkiyeDiv>
          <div>
            <ChangingText />
          </div>
          <div>Ücretsiz Eğitim</div>
          <div>Platformu</div>
          <Text2>
            Her öğrencinin eğitime ulaşma hakkı olduğu fikri ile çıktığımız bu
            yolda bize katıl.
          </Text2>
          <BtnGroup>
            <Btn onClick={scrollToOgrenci}>Öğrenciler</Btn>
            <Btn onClick={scrollToOgretmen}>Öğretmenler</Btn>
            <Btn onClick={scrollToVeli}>Veliler</Btn>
          </BtnGroup>
        </Text>

        <Picture>
          <img src={mainPicture} alt="resim" />
        </Picture>
      </Menu>
    </Container>
  );
}

export default MainMenu;

const TurkiyeDiv = styled.div`
  margin-bottom: -0.3rem;

  @media (max-width: 768px) {
    margin-bottom: -0.7rem;
  }
`;

const BtnGroup = styled.div`
  border-radius: 15px;
  display: flex;
  justify-content: center;
  text-align: center;
  border: 1px solid var(--main-color);
  background-color: var(--main-color);

  &:hover {
    background-color: #efecf3;
  }
`;

const Btn = styled.button`
  background-color: var(--main-color);
  border: none;
  color: white;
  padding: 18px 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: clamp(15px, 1vw, 2.5rem);
  cursor: pointer;
  width: 34%;
  white-space: nowrap;
  overflow: hidden;
  font-family: "MyCustomFont", sans-serif;

  &:hover {
    background-color: #efecf3;
    color: var(--main-color);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Menu = styled.div`
  display: flex;
  background-color: #fff;
  margin: 6rem 4rem;

  @media (max-width: 768px) {
    margin: 0.5rem 2rem;
    flex-direction: column-reverse;
  }
`;

const Text = styled.div`
  color: #292929;
  font-size: 45px;
  font-style: normal;
  line-height: normal;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 35px;
  }
`;

const Text2 = styled.div`
  color: #000;
  font-family: "Roboto Condensed";
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
`;

const Picture = styled.div`
  width: 400px;
  min-width: 370px;
  display: flex;
  justify-content: end;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    justify-content: center;

    img {
      width: 100%;
    }
  }
`;
