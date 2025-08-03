import React from "react";
import styled from "styled-components";
import ellipse1 from "../images/ellipse1.svg";
import teacher2 from "../images/airesim21.png";
import teacher3 from "../images/airesim22.png";
import teacher4 from "../images/airesim23.png";
import { Btn } from "./buttons/ButtonStudent";
import { Link } from "react-router-dom";
import {
  TextContainer,
  Container,
  ImageContainer,
  Title,
  Subtitle,
  Description,
  Menu,
  StudentImage,
} from "./OgrenciMenu";

function OgretmenMenu() {
  return (
    <Container>
      <MenuReverse>
        <TextContainerLeft>
          <Title>Öğretmen</Title>
          <Subtitle>EMEĞİNİZİN DEĞERİNİ ALIN</Subtitle>
          <Description>
            Öğrencinize çok kolay bir şekilde rehberlik edecek ve onların
            ödevlerini kolaylıkla takip edebileceksiniz. Zamanınız size kalacak.
          </Description>
          <Link
            to="/ogretmen-tanitim"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Btn
              style={{
                borderRadius: "15px",
                fontSize: "25px",
              }}
            >
              Öğretmen
            </Btn>
          </Link>
        </TextContainerLeft>

        <ImageContainer>
          <Image src={ellipse1} alt="ellipse1" className="img-1" />
          <StudentImage1 src={teacher2} alt="teacher2" />
          <StudentImage2 src={teacher3} alt="teacher3" />
          <StudentImage3 src={teacher4} alt="teacher4" />
        </ImageContainer>
      </MenuReverse>
    </Container>
  );
}

const MenuReverse = styled(Menu)`
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Image = styled.img`
  max-width: 100%;
  transform: scaleX(-1);
`;

const StudentImage1 = styled(StudentImage)`
  top: 3%;
  left: 6%;
  border-radius: 70px;
  transform: rotate(-6deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
`;

const StudentImage2 = styled(StudentImage)`
  left: 18%;
  bottom: 15%;
  border-radius: 70px;
  transform: rotate(8deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
`;

const StudentImage3 = styled(StudentImage)`
  left: 55%;
  bottom: 35%;
  border-radius: 70px;
  transform: rotate(-4deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.02);
  }
`;

const TextContainerLeft = styled(TextContainer)`
  text-align: left;
`;

export default OgretmenMenu;
