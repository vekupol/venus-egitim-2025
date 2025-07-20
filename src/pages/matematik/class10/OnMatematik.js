import React, { useState, useEffect } from "react";
// import edilecek bölümer  1. olarak sınıf ya da ünite introsu sonra da bölümerlin introları
import OnMatematikIntro from "./OnMatematikIntro";
import SaymaVeOlasilikIntro from "./Sayma ve Olasılık/SaymaVeOlasilikIntro";
import FonksiyonlarIntro from "./Fonksiyonlar/FonksiyonlarIntro";
import { CustomLinkLeft} from "../../../components/buttons/Button.styled";
import { Container, CourseContent, CourseName, CourseTitle, CourseUnits, Main, Sidebar, UnitName, Units } from "../style/DerslerStyle";
import jsonData from "./MatematikLiseOn.json";

function SidebarComponent() {
  // setActiveDiv'i props olarak al
  const [onMatematik, setOnMatematikData] = useState(null);

  useEffect(() => {
    setOnMatematikData(jsonData)
  }, []);

  return (
    <Sidebar>
      <CustomLinkLeft to="/matematik/10-sinif">
        <CourseTitle>
          <CourseName>10. Sınıf Matematik</CourseName>
          <CourseContent> 6 Ünite </CourseContent>
        </CourseTitle>
      </CustomLinkLeft>

      <CourseUnits>
        {onMatematik &&
          onMatematik.units &&
          onMatematik.units.map((unit, index) => (
            <CustomLinkLeft
              to={`/matematik/10-sinif/${unit.link}/intro`}
              key={index}
            >
              <Units>
                <UnitName>
                  <span>Ünite {index + 1} :</span> {unit.name}
                </UnitName>
              </Units>
            </CustomLinkLeft>
          ))}
      </CourseUnits>
    </Sidebar>
  );
}

function OnMatematik({activeDivProps}) {
  return (
      <Container>
        <SidebarComponent />
        <Main>
          {activeDivProps === 1 && <OnMatematikIntro />}
          {activeDivProps === 2 && <SaymaVeOlasilikIntro />}
          {activeDivProps === 3 && <FonksiyonlarIntro />}
        </Main>
      </Container>
  );
}

export default OnMatematik;
