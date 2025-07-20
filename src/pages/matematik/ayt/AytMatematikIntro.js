import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import {
  Title,
  UnitContainer,
  Parts,
  Unit,
  Part,
  UnitsShadow,
  Icons,
} from "../style/DerslerIntroStyle";
import ProgressBarTable from "../../../components/progressBar/ProgressBarTable";
import { CustomLink, CustomLinkLeft } from "../../../components/buttons/Button.styled";
import jsonData from "./MatematikAyt.json";

function AytMatematikIntro() {
  const [onMatematik, setOnMatematikData] = useState(null);

  useEffect(() => {
    setOnMatematikData(jsonData)
  }, []);

  return (
    <div>
      <Icons>
        <CustomLink to="/">
          <IoHomeSharp style={{ color: "var(--main-color)" }} />
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <div> AYT Matematik </div>
      </Icons>
      <Title>
        <h1> AYT Matematik </h1>
      </Title>
      <ProgressBarTable progressArray={onMatematik?.units} />
      <Title>
        <h2>Üniteler</h2>
      </Title>
      <UnitContainer>
        {onMatematik &&
          onMatematik.units &&
          onMatematik.units.map((unit, index) => (
            <UnitsShadow key={index}>
              <CustomLinkLeft to={`/matematik/10-sinif/${unit.link}/intro`}>
                <Unit>{unit.name}</Unit>
              </CustomLinkLeft>
              <Parts>
                {unit.konular &&
                  unit.konular.map((konu) => (
                    <CustomLinkLeft to={`/matematik/10-sinif/${unit.link}/${konu.link}/intro`} >
                      <Part
                        key={konu.konuId}
                      > <BsArrowRightShort/>
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

export default AytMatematikIntro;
