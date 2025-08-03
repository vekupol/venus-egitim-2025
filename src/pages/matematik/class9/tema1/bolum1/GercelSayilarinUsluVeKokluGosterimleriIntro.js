// Temanın içindeki bölümlerin introsunu kalıbı
// üniteNumarasi ve konuNumarasi değerlerini doğrudan yaz 1 ,2 gibi. Bu sayfada başka bir şey değiştirme.
//import jsonData from "../../MatematikLiseDokuz.json";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Icons,
  Title,
  UnitContainer,
  Parts,
  Unit,
  Part,
} from "../../../../courses/drawers/intro";
import { IoHomeSharp } from "react-icons/io5";
import {
  CustomLink,
  Button,
  CustomLinkLeft,
} from "../../../../../components/buttons/Button.styled";
import { BsArrowRightShort } from "react-icons/bs";
import ProgressBarTableLessons from "../../../../../components/progressBar/ProgressBarTableLessons";
import jsonData from "../../MatematikLiseDokuz.json";
import { UnitsShadow } from "../../../style/DerslerIntroStyle";
import ProgressLessons from "../../../../../components/progressBar/yeniProgressBar/ProgressLessons";

function GercelSayilarinUsluVeKokluGosterimleriIntro() {
  const [unit, setUnit] = useState([]);

  // üniteNumarasi ve konuNumarasi değerlerini doğrudan yaz 1 ,2 gibi. Bu sayfada başka bir şey değiştirme.

  const uniteNumarasi = 1;
  const konuNumarasi = 1;

  const uniteNo = uniteNumarasi - 1;
  const konuNo = konuNumarasi - 1;

  useEffect(() => {
    if (jsonData.temalar && jsonData.temalar.length > 0) {
      setUnit(jsonData.temalar[uniteNo]);
    }
  }, []);

  return (
    <div>
      <Icons>
        <CustomLink to="/">
          <IoHomeSharp style={{ color: "var(--main-color)" }} />
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <CustomLink to="/matematik/9-sinif">
          <div> 9. Sınıf Matematik </div>
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <CustomLink to="/matematik/9-sinif/${unit.link}">
          <div> {unit?.name} </div>
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        {unit.konular && unit.konular.length > 0 && (
          <div>{unit.konular[konuNo].name}</div>
        )}
      </Icons>
      <Title>
        {unit.konular && unit.konular.length > 0 && (
          <h1>{unit.konular[konuNo].name}</h1>
        )}
      </Title>

      <Title>
        <h2>Dersler</h2>
        {unit.konular &&
          unit.konular.length > 0 &&
          unit.konular[konuNo]?.bolumler && (
            <>
              <ProgressLessons
                dersler={unit.konular[konuNo].bolumler[0].dersler}
                uniteKey="sayilar" // Firestore'daki key ile aynı olmalı
              />
              <CustomLink
                to={`/matematik/9-sinif/${unit.link}/${unit.konular[konuNo]?.bolumler[0].dersler[0].link}`}
              >
                <Button> İlk Derse Git</Button>
              </CustomLink>
            </>
          )}
      </Title>
      <UnitContainer>
        <UnitsShadow style={{ width: "100%" }}>
          <Parts>
            {unit.konular &&
              unit.konular.length > 0 &&
              unit.konular[konuNo]?.bolumler[0].dersler &&
              unit.konular[konuNo].bolumler[0].dersler.map((bolum) => (
                <CustomLinkLeft
                  to={`/matematik/9-sinif/${unit.link}/${bolum.link}`}
                >
                  <Part key={bolum.kazanimId}>
                    <li>{bolum.name}</li>
                  </Part>
                </CustomLinkLeft>
              ))}
          </Parts>
        </UnitsShadow>
      </UnitContainer>
    </div>
  );
}

export const LessonsShadow = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;

export default GercelSayilarinUsluVeKokluGosterimleriIntro;
