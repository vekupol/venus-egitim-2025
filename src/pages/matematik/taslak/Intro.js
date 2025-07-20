import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import ProgressBar from "../../../componets/progressBar/ProgressBar";
import {
  Container,
  Icons,
  Title,
  ProgressTable,
  Progress,
  UnitProgress,
  UnitName,
  ProgressIcon,
  TotalProgress,
  UnitContainer,
  Units,
  Unit,
  Part,
  Parts,
  Description,
} from "../../courses/drawers/intro";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from "../../student/Drawers/studentDrawerOgretmenlerim";

const authInstance = getAuth();

function Intro({ unitsData, activeDiv, setActiveDiv }) {
  // Login olmayan kullanıcı ilerleme çubuklarını göremez.

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Login ...

  const handleUnitClick = (partId) => {
    setActiveDiv(partId + 2);
  };

  return (
    <Container>
      <Icons>
        <IoHomeSharp style={{ color: "var(--main-color)" }} />
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <p> Temel Yeterlilik Testi (TYT) </p>
      </Icons>
      <Title>
        <h1> {unitsData[0]?.name} </h1>
        <Button
          onClick={() => handleUnitClick(0)}
          style={{ fontSize: ".8rem", fontWeight: "bold" }}
        >
          Üniteye Başla{" "}
          <BsArrowRightShort style={{ marginLeft: "1rem", fontSize: "2rem" }} />{" "}
        </Button>
      </Title>
      {isLoggedIn && (
        <ProgressTable>
          <Description>
            Bu bölüm ünitedeki ilerlemeni göstermektedir. Bölümleri tamamlayıp,
            soru çözdükçe ilerlemen artacaktır.
          </Description>
          <Progress>
            {unitsData[0]?.parts.map((part) => (
              <UnitProgress key={part.partId}>
                <UnitName>{part.name}</UnitName>
                <BsArrowRightShort
                  style={{ color: "var(--main-color)", margin: "0.5rem" }}
                />
                <ProgressIcon>
                  <ProgressBar
                    donePeople={part.done}
                    totalPeople={part.total}
                  />
                </ProgressIcon>
              </UnitProgress>
            ))}
          </Progress>

          <TotalProgress>
            <p>Toplam İlerleme</p>
            <BsArrowRightShort style={{ color: "var(--main-color)" }} />
            {unitsData.length > 0 && (
              <ProgressBar
                donePeople={unitsData.reduce((acc, unit) => {
                  return (
                    acc +
                    unit.parts.reduce((partAcc, part) => partAcc + part.done, 0)
                  );
                }, 0)}
                totalPeople={unitsData.reduce((acc, unit) => {
                  return (
                    acc +
                    unit.parts.reduce(
                      (partAcc, part) => partAcc + part.total,
                      0
                    )
                  );
                }, 0)}
              />
            )}
          </TotalProgress>
        </ProgressTable>
      )}

      <Title>
        <h2>Konular</h2>
      </Title>

      <UnitContainer>
        {unitsData[0]?.parts.map((part, index) => (
          <Units key={index}>
            <Unit onClick={() => handleUnitClick(index)}>{part.name}</Unit>
            <Parts>
              {part.lessons &&
                part.lessons.map((lesson) => (
                  <Part
                    style={{ cursor: "default", textDecoration: "none" }}
                    key={lesson.lessonId}
                  >
                    {lesson.name}
                  </Part>
                ))}
            </Parts>
          </Units>
        ))}
      </UnitContainer>
    </Container>
  );
}

export default Intro;
