import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import styled from "styled-components";

function ChangingText() {
  const [text] = useTypewriter({
    words: ["En Büyük", "En Kapsamlı", "En Kaliteli"],
    loop: {},
  });

  return (
    <H1>
      <span
        style={{
          fontWeight: "bold",
          color: "#674188",
          textShadow: "0px 4px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        {text}
      </span>
      <span style={{ color: "#674188", fontSize: "45px" }}>
        <Cursor />
      </span>
    </H1>
  );
}

const H1 = styled.h1`
  font-size: 45px;
  overflow-y: hidden;
  background-color: transparent;

  @media (max-width: 768px) {
    span {
      font-size: 35px;
    }
  }
`;

export default ChangingText;
