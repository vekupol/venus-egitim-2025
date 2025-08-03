import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import {
  Title,
  UnitContainer,
  Parts,
  Unit,
  UnitsShadow,
  Icons,
  Part,
} from "../../courses/drawers/intro";

import {
  CustomLink,
  CustomLinkLeft,
} from "../../../components/buttons/Button.styled";
import jsonData from "./MatematikLiseDokuz.json";

function DokuzMatematikIntro() {
  const [dokuzMatematik, setDokuzMatematikData] = useState(null);

  useEffect(() => {
    setDokuzMatematikData(jsonData);
  }, []);

  return (
    <div>
      <Icons>
        <CustomLink to="/">
          <IoHomeSharp style={{ color: "var(--main-color)" }} />
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <div> 9. Sınıf Matematik </div>
      </Icons>
      <Title>
        <h1> 9. Sınıf Matematik </h1>
      </Title>
      <Title style={{ color: "var(--main-color)" }}>
        <h2>Temalar</h2>
      </Title>
      <UnitContainer>
        {dokuzMatematik &&
          dokuzMatematik.temalar &&
          dokuzMatematik.temalar.map((unit, index) => (
            <UnitsShadow key={index}>
              <CustomLinkLeft to={`/matematik/9-sinif/${unit.link}/intro`}>
                <Unit>{unit.name}</Unit>
              </CustomLinkLeft>
              <Parts>
                {unit.konular &&
                  unit.konular.map((konu) => (
                    <CustomLinkLeft
                      to={`/matematik/9-sinif/${unit.link}/${konu.link}/intro`}
                    >
                      <Part key={konu.konuId}>
                        {" "}
                        <BsArrowRightShort />
                        {konu.name}
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

export default DokuzMatematikIntro;
