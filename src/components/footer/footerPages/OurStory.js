import React from "react";
import {
  Container,
  LeftContainer,
  RightContainer,
  MainBox,
} from "../../../pages/mainPages/Login";

import image from "./Adsız tasarım.png";
import image2 from "./Elizabeth and Richard.png";
import styled from "styled-components";

function OurStory() {
  return (
    <Container>
      <LeftContainer>
        <MainBox style={{ color: "#fff" }}>
          <h1>Hikayemiz</h1>
          <h3 style={{ fontSize: "1.5rem" }}>
            Türkiye'nin her yerine kaliteli bir eğitimi götürmek için bir hikaye
            yazmaya 2023 yılında başladık. Hikayenin sonunda ise Türkiye'de
            yaşayan bir insanın ihtiyaç hissettiği her eğitimi barındıracak bir
            site ortaya çıkmış olacak.
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


export default OurStory;
