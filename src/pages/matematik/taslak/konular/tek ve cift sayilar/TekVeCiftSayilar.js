import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import ProgressBar from "../../../../../componets/progressBar/ProgressBar";
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
} from "../../../../courses/drawers/intro";
import { Button } from "../../../../student/Drawers/studentDrawerOgretmenlerim";


const authInstance = getAuth();

function TekVeCiftSayilar({ unitsData, activeDiv, setActiveDiv }) {

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

  return (
    <Container>
      <Icons>
        <IoHomeSharp style={{ color: "var(--main-color)" }} />
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <p> Temel Yeterlilik Testi (TYT) </p>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <p> {unitsData[0]?.name} </p>
      </Icons>
      <Title>
        <h1> {unitsData[0]?.parts[activeDiv - 2]?.name} </h1>
        <Button style={{ fontSize: ".8rem", fontWeight: "bold" }}>Konuya Başla <BsArrowRightShort style={{ marginLeft: "1rem", fontSize: "2rem" }} /> </Button>
      </Title>
      {isLoggedIn && (
        <ProgressTable>
          <Description>
            Bu bölüm ünitedeki ilerlemeni göstermektedir. Bölümleri tamamlayıp,
            soru çözdükçe ilerlemen artacaktır.
          </Description>
          <Progress>
            {unitsData[0]?.parts[activeDiv - 2]?.lessons.map((part, index) => (
              <UnitProgress key={index}>
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
                    unit.parts[1]?.lessons.reduce((partAcc, part) => partAcc + part.done, 0)
                  );
                }, 0)}
                totalPeople={unitsData.reduce((acc, unit) => {
                  return (
                    acc +
                    unit.parts[1]?.lessons.reduce(
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
        <h2>Bölümler</h2>
      </Title>

      <UnitContainer>
        {unitsData[0]?.parts[activeDiv - 2]?.lessons.map((lesson, index) => (
          <Units key={index}>
            <Unit>{lesson.name}</Unit>
            <Parts>
              {lesson.dersler &&
                lesson.dersler.map((ders, innerIndex) => (
                  <Part
                    style={{ cursor: "default", textDecoration: "none" }}
                    key={innerIndex}
                  >
                    <p>{ders.name}</p>
                    
                  </Part>
                ))}
            </Parts>
          </Units>
        ))}
      </UnitContainer>

    </Container>
  );
}

export default TekVeCiftSayilar;
