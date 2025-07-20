import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ButtonStudent() {
  return (
    <BtnGroup>
      <StyledLink to="/kayit-ol">
        <Btn>Öğrenciler &nbsp;</Btn>
      </StyledLink>

      <StyledLink to="/kayit-ol">
        <Btn>Öğretmenler </Btn>
      </StyledLink>

      <StyledLink to="/kayit-ol">
        <Btn> &nbsp;&nbsp;Veliler&nbsp;&nbsp; </Btn>
      </StyledLink>
    </BtnGroup>
  );
}

const BtnGroup = styled.div`
  border-radius: 15px;
  display: flex;
  justify-content: center;
  text-align: center;
  border: 1px solid var(--main-color);
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
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'MyCustomFont', sans-serif;

  &:hover {
    background-color: #efecf3;
    color: var(--main-color);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  width: 34%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--main-color);
  }
`;

export { Btn };

export default ButtonStudent;
