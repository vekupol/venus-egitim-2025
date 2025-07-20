import React from "react";
import styled from "styled-components";
import ChangingText from "./ChangingText";
import mainPicture from "../images/anaresim11.svg"; 
import ButtonStudent from "./buttons/ButtonStudent";

function MainMenu() {
  return (
    <Container>
      <Menu>
        <Text>
          <div>Türkiye'nin </div>
          <div>
            <ChangingText/>
          </div>
          <div>Ücretsiz Eğitim</div>
          <div style={{marginTop:"8px"}}>Platformu</div>
          <Text2>
            Her öğrencinin eğitime ulaşma hakkı olduğu fikri ile çıktığımız bu
            yolda bize katıl.
          </Text2>
          <div style={{ marginTop: "3rem" }}>
            <ButtonStudent />
          </div>
        </Text>
        <Picture>
          <img src={mainPicture} alt="resim"></img>
        </Picture>
      </Menu>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
`;

const Menu = styled.div`
  display: flex;
  width: 1200px;
  background-color: #fff;
  margin: 6rem 4rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin: 0.5rem 2rem;
    flex-direction: column-reverse;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  color: #292929;
  font-size: 45px;

  text-shadow: 0px 4px 2px rgba(0, 0, 0, 0.25);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background-color: white;

  div {
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 35px;
    text-align: center;
  }
`;
const Text2 = styled.div`
  color: #000;
  text-align: left;

  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-bottom: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: 25px;
    text-align: center;
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

export default MainMenu;
