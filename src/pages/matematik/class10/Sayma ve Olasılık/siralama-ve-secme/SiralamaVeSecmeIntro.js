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
import jsonData from "../../MatematikLiseOn.json";

function SiralamaVeSecmeIntro() {
  const [unit, setUnit] = useState([]);


  // üniteNumarasi ve konuNumarasi değerlerini doğrudan yaz 1 ,2 gibi. Bu sayfada başka bir şey değiştirme.

  const uniteNumarasi = 1;
  const konuNumarasi = 1;

  const uniteNo = uniteNumarasi - 1;
  const konuNo = konuNumarasi - 1;


  useEffect(() => {
    if (jsonData.units && jsonData.units.length > 0) {
      setUnit(jsonData.units[uniteNo]);
    }
  }, []);

  return (
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
        <CustomLink to="/matematik/10-sinif/sayma-ve-olasilik">
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
      {unit.konular && unit.konular.length > 0 && unit.konular[konuNo]?.bolumler && (
        <ProgressBarTableLessons progressArray={unit.konular[konuNo]?.dersler} />
      )}

      <Title>
        <h2>Konular</h2>
        {unit.konular && unit.konular.length > 0 && unit.konular[konuNo]?.bolumler && (
          <CustomLink
            to={`/matematik/10-sinif/sayma-ve-olasilik/${unit.konular[konuNo].link}/${unit.konular[konuNo]?.bolumler[0].link}`}
          >
            <Button> Konuya Git</Button>
          </CustomLink>
        )}
      </Title>
      <UnitContainer>
        <LessonsShadow>
          {unit.konular && unit.konular.length > 0 && (
            <Unit>{unit.konular[konuNo].name}</Unit>
          )}
          <Parts>
            {unit.konular &&
              unit.konular.length > 0 &&
              unit.konular[konuNo]?.bolumler &&
              unit.konular[konuNo].bolumler.map((bolum) => (
                <CustomLinkLeft to={`/matematik/10-sinif/sayma-ve-olasilik/${unit.konular[konuNo].link}/${bolum.link}`}>
                  <Part key={bolum.kazanimId}>
                    <li>{bolum.name}</li>
                  </Part>
                </CustomLinkLeft>
              ))}
          </Parts>
        </LessonsShadow>
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

export default SiralamaVeSecmeIntro;

