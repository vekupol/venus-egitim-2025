import React, { useState, useEffect } from "react";
import { CustomLinkLeft} from "../../../components/buttons/Button.styled";
import { Container, CourseContent, CourseName, CourseTitle, CourseUnits, Main, Sidebar, UnitName, Units } from "../style/DerslerStyle";
import jsonData from "./MatematikLiseOnBir.json";
import OnBirMatematikIntro from "./OnBirMatematikIntro";

function SidebarComponent() {
  // setActiveDiv'i props olarak al
  const [onMatematik, setOnMatematikData] = useState(null);

  useEffect(() => {
    setOnMatematikData(jsonData)
  }, []);

  return (
    <Sidebar>
      <CustomLinkLeft to="/matematik/ayt">
        <CourseTitle>
          <CourseName>11. Sınıf Matematik</CourseName>
          <CourseContent> 6 Ünite </CourseContent>
        </CourseTitle>
      </CustomLinkLeft>

      <CourseUnits>
        {onMatematik &&
          onMatematik.units &&
          onMatematik.units.map((unit, index) => (
            <CustomLinkLeft
              to={`/matematik/11-sinif/${unit.link}/intro`}
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

function OnBirMatematik({activeDivProps}) {
  return (
      <Container>
        <SidebarComponent />
        <Main>
          {activeDivProps === 1 && <OnBirMatematikIntro />}
        </Main>
      </Container>
  );
}

export default OnBirMatematik;
