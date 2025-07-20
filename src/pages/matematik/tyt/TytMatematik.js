import React, { useState, useEffect } from "react";
import { CustomLinkLeft} from "../../../components/buttons/Button.styled";
import { Container, CourseContent, CourseName, CourseTitle, CourseUnits, Main, Sidebar, UnitName, Units } from "../style/DerslerStyle";
import jsonData from "./MatematikTyt.json";
import TytMatematikIntro from "./TytMatematikIntro";

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
          <CourseName>TYT Matematik</CourseName>
          <CourseContent> 14 Ünite </CourseContent>
        </CourseTitle>
      </CustomLinkLeft>

      <CourseUnits>
        {onMatematik &&
          onMatematik.units &&
          onMatematik.units.map((unit, index) => (
            <CustomLinkLeft
              to={`/matematik/tyt/${unit.link}/intro`}
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

function TytMatematik({activeDivProps}) {
  return (
      <Container>
        <SidebarComponent />
        <Main>
          {activeDivProps === 1 && <TytMatematikIntro/>}
        </Main>
      </Container>
  );
}

export default TytMatematik;
