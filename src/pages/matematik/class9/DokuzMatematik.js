import React, { useState, useEffect } from "react";
import { CustomLinkLeft } from "../../../components/buttons/Button.styled";
import {
  Container,
  CourseContent,
  CourseName,
  CourseTitle,
  CourseUnits,
  Main,
  Sidebar,
  UnitName,
  Units,
} from "../style/DerslerStyle";
import jsonData from "./MatematikLiseDokuz.json";
import DokuzMatematikIntro from "./DokuzMatematikIntro";
import SayilarIntro from "./tema1/SayilarIntro";

function SidebarComponent() {
  // setActiveDiv'i props olarak al
  const [dokuzMatematik, setDokuzMatematikData] = useState(null);

  useEffect(() => {
    setDokuzMatematikData(jsonData);
  }, []);

  return (
    <Sidebar>
      <CustomLinkLeft to="/matematik/9-sinif">
        <CourseTitle>
          <CourseName>9. Sınıf Matematik</CourseName>
          <CourseContent> 7 Tema </CourseContent>
        </CourseTitle>
      </CustomLinkLeft>

      <CourseUnits>
        {dokuzMatematik &&
          dokuzMatematik.temalar &&
          dokuzMatematik.temalar.map((unit, index) => (
            <CustomLinkLeft
              to={`/matematik/9-sinif/${unit.link}/intro`}
              key={index}
            >
              <Units>
                <UnitName>
                  <span>Tema {index + 1} :</span> {unit.name}
                </UnitName>
              </Units>
            </CustomLinkLeft>
          ))}
      </CourseUnits>
    </Sidebar>
  );
}

function DokuzMatematik({ activeDivProps }) {
  return (
    <Container>
      <SidebarComponent />
      <Main>
        {activeDivProps === 1 && <DokuzMatematikIntro />}
        {activeDivProps === 2 && <SayilarIntro />}
      </Main>
    </Container>
  );
}

export default DokuzMatematik;
