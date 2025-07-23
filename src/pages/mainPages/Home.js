import React, { useRef } from "react";
import MainMenu from "../../components/MainMenu";
import OgrenciMenu from "../../components/OgrenciMenu";
import OgretmenMenu from "../../components/OgretmenMenu";
import VeliMenu from "../../components/VeliMenu";

function Home() {
  const ogrenciRef = useRef(null);
  const ogretmenRef = useRef(null);
  const veliRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <MainMenu
        scrollToOgrenci={() => scrollToSection(ogrenciRef)}
        scrollToOgretmen={() => scrollToSection(ogretmenRef)}
        scrollToVeli={() => scrollToSection(veliRef)}
      />

      <div ref={ogrenciRef}>
        <OgrenciMenu />
      </div>
      <div ref={ogretmenRef}>
        <OgretmenMenu />
      </div>
      <div ref={veliRef}>
        <VeliMenu />
      </div>
    </div>
  );
}

export default Home;
