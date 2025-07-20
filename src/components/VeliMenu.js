import React from "react";
import styled from "styled-components";
import ellipse1 from "../images/ellipse1.svg";
import parent2 from "../images/parent2.svg";
import parent3 from "../images/parent3.svg";
import parent4 from "../images/parent4.svg";
import { Btn } from "./buttons/ButtonStudent";
import { Link } from "react-router-dom";
import { Container,Menu,Description,StudentImage,Image,Title,Subtitle,ImageContainer,TextContainer } from "./OgrenciMenu";

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
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
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
`;

const StudentImage2 = styled(StudentImage)`
  left: 8%;
  bottom: 60px;
`;

const StudentImage3 = styled(StudentImage)`
  left: 50%;
  bottom: 25%;
`;

export default VeliMenu;
