import React, { useEffect, useState } from "react";
import jsonData from "../MatematikLiseOn.json";
import {
  Title,
  UnitContainer,
  Parts,
  Unit,
  UnitsShadow,
  Icons,
  Part,
} from "../../../courses/drawers/intro";
import ProgressBarTable from "../../../../components/progressBar/ProgressBarTable";
import {
  Button,
  CustomLink,
  CustomLinkLeft,
} from "../../../../components/buttons/Button.styled";
import { IoHomeSharp } from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";


function SaymaVeOlasilikIntro() {
  const [unit, setUnit] = useState(null);

  // üniteNumarasi  doğrudan yaz 1 ,2 gibi. Bu sayfada başka bir şey değiştirme.

  const uniteNumarasi = 1;

  const uniteNo = uniteNumarasi - 1;

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
        <div> {unit?.name} </div>
      </Icons>
      <Title>
        <h1> {unit?.name} </h1>
        {unit && (
          <CustomLink to={`/matematik/10-sinif/${unit.link}`}>
            <Button>Üniteye Git</Button>
          </CustomLink>
        )}
      </Title>
      <ProgressBarTable progressArray={unit?.konular} />
      <Title>
        <h2>Konular</h2>
      </Title>
      <UnitContainer>
        {unit &&
          unit.konular &&
          unit.konular.map((konu, index) => (
            <UnitsShadow key={index}>
              <Unit>{konu.name}</Unit>
              <Parts>
                {konu.bolumler &&
                  konu.bolumler.map((bolum, bolumIndex) => (
                    <CustomLinkLeft to={`/matematik/10-sinif/sayma-ve-olasilik/${konu.link}/${bolum.link}`}>
                      <Part
                        key={bolumIndex} 
                      >
                        <li>{bolum.name} </li>
                      </Part>
                    </CustomLinkLeft>
                  ))}
              </Parts>
            </UnitsShadow>
          ))}
      </UnitContainer>
    </div>
  );
}

export default SaymaVeOlasilikIntro;
