import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { FooterContainer } from "../components/footer/containers/footer";
import styled from "styled-components";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <FooterContainer />
    </div>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MainLayout;
