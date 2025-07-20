import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

function FooterlessLayout() {
  return (
    <div>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FooterlessLayout;
