import React from "react";
import styled from "styled-components";
import ellipse1 from "../images/ellipse1.svg";
import parent2 from "../images/airesim30.png";
import parent3 from "../images/airesim31.png";
import parent4 from "../images/airesim32.png";
import { Btn } from "./buttons/ButtonStudent";
import { Link } from "react-router-dom";
import {
  Container,
  Menu,
  Description,
  StudentImage,
  Image,
  Title,
  Subtitle,
  ImageContainer,
  TextContainer,
} from "./OgrenciMenu";

function VeliMenu() {
  return (
    <Container>
      <Menu>
        <ImageContainer>
          <Image src={ellipse1} alt="ellipse1" className="img-1" />
          <StudentImage1 src={parent2} alt="parent2" />
          <StudentImage2 src={parent3} alt="parent3" />
          <StudentImage3 src={parent4} alt="parent4" />
        </ImageContainer>
        <TextContainer>
          <Title>Veli</Title>
          <Subtitle>UZAKTAN KONTROL SİZDE</Subtitle>
          <Description>
            Çocuğunuzun velisi olmaktan daha çok annesi/babası olmanız için
            gereken raporlar elinizin altında.
          </Description>
          <Link
            to="/veli-tanitim"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Btn
              style={{
                borderRadius: "15px",
                fontSize: "25px",
              }}
            >
              Veli
            </Btn>{" "}
          </Link>
        </TextContainer>
      </Menu>
    </Container>
  );
}

const StudentImage1 = styled(StudentImage)`
  top: 1%;
  left: 8%;
  transform: rotate(-5deg);
  border-radius: 70px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: rotate(0deg);
  }
`;

const StudentImage2 = styled(StudentImage)`
  left: 8%;
  bottom: 60px;
  transform: rotate(4deg);
  border-radius: 70px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: rotate(0deg);
  }
`;

const StudentImage3 = styled(StudentImage)`
  left: 50%;
  bottom: 25%;
  transform: rotate(-3deg);
  border-radius: 70px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: rotate(0deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  }
`;

export default VeliMenu;
