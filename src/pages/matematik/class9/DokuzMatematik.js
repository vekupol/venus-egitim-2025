import React, { useState, useEffect } from "react";
import { CustomLinkLeft} from "../../../components/buttons/Button.styled";
import { Container, CourseContent, CourseName, CourseTitle, CourseUnits, Main, Sidebar, UnitName, Units } from "../style/DerslerStyle";
import jsonData from "./MatematikLiseDokuz.json";
import DokuzMatematikIntro from "./DokuzMatematikIntro";

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
          <CourseName>9. Sınıf Matematik</CourseName>
          <CourseContent> 6 Ünite </CourseContent>
        </CourseTitle>
      </CustomLinkLeft>

      <CourseUnits>
        {onMatematik &&
          onMatematik.units &&
          onMatematik.units.map((unit, index) => (
            <CustomLinkLeft
              to={`/matematik/ayt/${unit.link}/intro`}
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

function DokuzMatematik({activeDivProps}) {
  return (
      <Container>
        <SidebarComponent />
        <Main>
          {activeDivProps === 1 && <DokuzMatematikIntro />}
        </Main>
      </Container>
  );
}

export default DokuzMatematik;
