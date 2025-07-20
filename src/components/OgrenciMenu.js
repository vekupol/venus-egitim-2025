import React from "react";
import styled from "styled-components";
import ellipse1 from "../images/ellipse1.svg";
import student2 from "../images/student-2.svg";
import student3 from "../images/student-3.svg";
import student4 from "../images/student-4.svg";
import { Btn } from "./buttons/ButtonStudent";
import { Link } from "react-router-dom";

function OgrenciMenu() {
  return (
    <Container>
      <Menu>
        <ImageContainer>
          <Image src={ellipse1} alt="ellipse1" className="img-1" />
          <StudentImage1 src={student2} alt="student2" />
          <StudentImage2 src={student3} alt="student3" />
          <StudentImage3 src={student4} alt="student4" />
        </ImageContainer>
        <TextContainer>
          <Title>Öğrenci</Title>
          <Subtitle>SONSUZA KADAR ÜCRETSİZ</Subtitle>
          <Description>
            Üniversite yolunda bir öğrencinin aradığı her şey burada. Sizin için
            burası sonsuza kadar ücretsiz.
          </Description>
          <Link to="/kayit-ol" style={{ textDecoration: "none", color: "white" }}>
            <Btn
              style={{
                borderRadius: "15px",
                fontSize: "25px",
                
              }}
            >
              Öğrenci
            </Btn>
          </Link>
        </TextContainer>
      </Menu>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: 100vw;
`;

export const Menu = styled.div`
  display: flex;
  width: 1200px;
  height: auto;
  background-color: #fff;
  margin: 6rem 4rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    margin: 3rem 2rem;
    flex-direction: column;
    height: auto;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const Image = styled.img`
  max-width: 100%;
`;

export const StudentImage = styled.img`
  max-width: 50%;
  position: absolute;
`;

const StudentImage1 = styled(StudentImage)`
  top: 1%;
  left: 8%;
`;

const StudentImage2 = styled(StudentImage)`
  left: 8%;
  bottom: 60px;
`;

const StudentImage3 = styled(StudentImage)`
  left: 50%;
  bottom: 25%;
`;

export const TextContainer = styled.div`
  text-align: right;
  font-family: Roboto;
  font-style: normal;
  line-height: normal;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.p`
  color: #989898;
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;
export const Subtitle = styled.p`
  color: #000;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;
export const Description = styled.p`
  color: #000;
  font-family: "Roboto Condensed";
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export default OgrenciMenu;
