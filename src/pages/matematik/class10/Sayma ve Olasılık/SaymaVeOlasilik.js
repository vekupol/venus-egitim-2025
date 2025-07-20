import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainBar } from "../../../courses/course";
import SiralamaVeSecmeIntro from "./sıralama ve seçme /SiralamaVeSecmeIntro";
import BasitOlaylarinOlasiliklariIntro from "./basit olayların olasılıkları/BasitOlaylarinOlasiliklariIntro";
import {
  CustomLink,
  CustomLinkLeft,
} from "../../../../components/buttons/Button.styled";
import {
  Title,
  UnitContainer,
  Parts,
  Unit,
  Part,
  Icons,
} from "../../../courses/drawers/intro";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import ProgressBarTable from "../../../../components/progressBar/ProgressBarTable";
import { VideoIcon, ArticleIcon, ExamIcon } from "../../../courses/course";
import {
  Container,
  Sidebar,
  CourseTitle,
  CourseName,
  CourseContent,
  CourseUnits,
  Units,
  UnitName,
} from "../../style/DerslerStyle";
import jsonData from "../MatematikLiseOn.json";

function SidebarComponent({ unit }) {
  return (
    <Sidebar>
      <CustomLinkLeft to="/matematik/10-sinif/sayma-ve-olasilik">
        <CourseTitle>
          <CourseName> {unit.name} </CourseName>
          <CourseContent>
            {unit.konular && unit.konular.length > 0 && (
              <>
                {unit.konular.length} Konuda Toplam {unit.dersSayisi} Ders
              </>
            )}
          </CourseContent>
        </CourseTitle>
      </CustomLinkLeft>
      <CourseUnits>
        {unit.konular &&
          unit.konular.map((konu, index) => (
            <CustomLinkLeft
              to={`/matematik/10-sinif/sayma-ve-olasilik/${konu.link}/intro`}
            >
              <StyledUnits key={index}>
                <p className="topic-number">Konu {index + 1}</p>
                <UnitName>{konu.name}</UnitName>
              </StyledUnits>
            </CustomLinkLeft>
          ))}
      </CourseUnits>
    </Sidebar>
  );
}

function SaymaVeOlasilik({ activeDivProps }) {
  const [unit, setUnit] = useState(null);

  // üniteNumarasi  doğrudan yaz 1 ,2 gibi. Bu sayfada başka bir şey değiştirme.

  const uniteNumarasi = 1;

  const uniteNo = uniteNumarasi - 1;

  useEffect(() => {
    setUnit(jsonData.units[uniteNo]);
  }, []);
  return (
    <Container>
      {unit && <SidebarComponent unit={unit} />}
      <MainBar>
        {activeDivProps === 1 && (
          <div>
            <Icons>
              <CustomLink to="/">
                <IoHomeSharp style={{ color: "var(--main-color)" }} />
              </CustomLink>
              <BsArrowRightShort style={{ color: "var(--main-color)" }} />
              <CustomLink to="/matematik/10-sinif">
                <div> 10. Sınıf Matematik </div>
              </CustomLink>
              <BsArrowRightShort style={{ color: "var(--main-color)" }} />
              <div> {unit?.name} </div>
            </Icons>
            <div>
              <h3>Ünite Hakkında</h3>
              <p
                style={{
                  borderBottom: "1px solid var(--main-color)",
                  paddingBottom: "10px",
                }}
              >
                {unit?.aboutUnit}
              </p>
            </div>
            <Title>
              <h1> {unit?.name} </h1>
            </Title>
            <ProgressBarTable progressArray={unit?.konular} />
            <Title>
              <h2>Konular</h2>
            </Title>
            <UnitContainer>
              {unit &&
                unit.konular &&
                unit.konular.map((konu, index) => (
                  <LessonsShadow key={index}>
                    <CustomLink
                      to={`/matematik/10-sinif/sayma-ve-olasilik/${konu.link}/intro`}
                    >
                      <Unit>{konu.name}</Unit>
                    </CustomLink>
                    <Parts>
                      {konu.bolumler &&
                        konu.bolumler.map((bolum, index) => (
                          <CustomLinkLeft
                            to={`/matematik/10-sinif/sayma-ve-olasilik/${konu.link}/${bolum.link}`}
                          >
                            <Part key={bolum.kazanimId}>
                              <li>{bolum.name}</li>
                            </Part>
                          </CustomLinkLeft>
                        ))}
                    </Parts>
                  </LessonsShadow>
                ))}
            </UnitContainer>
          </div>
        )}
        {activeDivProps === 2 && <SiralamaVeSecmeIntro />}
        {activeDivProps === 3 && <BasitOlaylarinOlasiliklariIntro />}
      </MainBar>
    </Container>
  );
}

const StyledUnits = styled(Units)`
  flex-direction: column;
  align-items: start;

  .topic-number {
    color: #999;
  }
`;

export const LessonsShadow = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;
export default SaymaVeOlasilik;
