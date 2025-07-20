import React from "react";
import Navbar from "../../../../../../componets/Navbar";
import { Container, MainBar, SideBar } from "../../../../../courses/course";
import { FooterContainer } from "../../../../../../componets/footer/containers/footer";
import Slider from "../../../../../../componets/Slider";
import SKno1a from "./SKno1a";
function SKno1() {
  return (
    <div>
      <Navbar />
      <Container>
        <SideBar>
          <Slider unitNumber="1" konuNumber="1" />
        </SideBar>
        <MainBar>
          <SKno1a />
        </MainBar>
      </Container>
      <FooterContainer />
    </div>
  );
}

export default SKno1;
