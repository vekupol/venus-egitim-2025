import React from "react";
import Navbar from "../../../../../../componets/Navbar";
import { Container, MainBar, SideBar } from "../../../../../courses/course";
import { FooterContainer } from "../../../../../../componets/footer/containers/footer";
import Slider from "../../../../../../componets/Slider";

function SKno2() {
  return (
    <div>
      <Navbar />
      <Container>
        <SideBar>
          <Slider unitNumber="1" konuNumber="2" />
        </SideBar>
        <MainBar>asdşmkkasjvdhbkaksd</MainBar>
      </Container>
      <FooterContainer />
    </div>
  );
}

export default SKno2;
