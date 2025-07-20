import React from "react";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import styled from "styled-components";

function CarouselMedals({ medals }) {
  return (
    <ScrollingCarousel>
      {medals.map((medal, index) => (
        <Medal key={index}>
            <Img src={medal} alt="medal" />
        </Medal>
      ))}
    </ScrollingCarousel>
  );
}

const Medal = styled.div`
border: 1px solid var(--main-color);
margin-right: 5px;
`;

const Img = styled.img`
max-width: 100%;
height: auto;`

export default CarouselMedals;