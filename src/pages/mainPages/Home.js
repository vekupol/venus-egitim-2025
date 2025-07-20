import React from "react";
import MainMenu from "../../components/MainMenu";
import OgrenciMenu from "../../components/OgrenciMenu";
import OgretmenMenu from "../../components/OgretmenMenu";
import VeliMenu from "../../components/VeliMenu";

function Home() {
  return (
    <div>
      <MainMenu />
      <OgrenciMenu />
      <OgretmenMenu />
      <VeliMenu />
    </div>
  );
}

export default Home;
