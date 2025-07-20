import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  CourseTitle,
  MainBar,
  SideBar,
  CourseName,
  CourseContent,
  CourseUnits,
  Units,
  UnitName,
  UnitDescription,
} from "../../courses/course";
import Intro from "./Intro";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import SayiKumeleri from "./konular/sayi kumeleri/SayiKumeleri";
import TekVeCiftSayilar from "./konular/tek ve cift sayilar/TekVeCiftSayilar";

function Taslak() {
  const [activeDiv, setActiveDiv] = useState(() => {
    const storedActiveDiv = localStorage.getItem("studentActiveDiv");
    return storedActiveDiv ? parseInt(storedActiveDiv, 10) : 1;
  });
  const handleButtonClick = (divNumber) => {
    setActiveDiv(divNumber);
    localStorage.setItem("studentActiveDiv", divNumber);
  };

  const [unitsData, setUnitsData] = useState([]);

  const unitNumber = "1";
  useEffect(() => {
    const fetchUnitsData = async () => {
      try {
        const q = query(
          collection(db, "units"),
          where("unitNo", "==", unitNumber)
        );
        const querySnapshot = await getDocs(q);
        const fetchedUnitsData = querySnapshot.docs.map((doc) => doc.data());
        setUnitsData(fetchedUnitsData);
        console.log(fetchedUnitsData);
      } catch (error) {
        console.error("Error fetching units data:", error);
      }
    };

    fetchUnitsData();
  }, [unitNumber]);

  let totalLessons = 0;

  // unitsData dizisinin her bir elemanını kontrol et
  unitsData.forEach((unit) => {
    // Her bir part öğesinin lessons dizisinin uzunluğunu toplam değerine ekle
    unit.parts.forEach((part) => {
      if (part.lessons) {
        totalLessons += part.lessons.length;
      }
    });
  });

  return (
    <div>
      <Container>
        <SideBar>
          <CourseTitle onClick={() => handleButtonClick(1)}>
            <CourseName>{unitsData[0]?.name} </CourseName>
            <CourseContent>
              {" "}
              {unitsData[0]?.parts.length} Konu - {totalLessons} Bölüm{" "}
            </CourseContent>
          </CourseTitle>
          <CourseUnits>
            {unitsData[0]?.parts.map((part, index) => (
              <StyledUnits
                key={index}
                onClick={() => handleButtonClick(index + 2)}
              >
                <div>
                  <p className="topic-number">Konu {index + 1}</p>
                  <UnitName>{part.name}</UnitName>
                  <UnitDescription>{part.description}</UnitDescription>
                </div>
              </StyledUnits>
            ))}
          </CourseUnits>
        </SideBar>
        <MainBar>
          {activeDiv === 1 && (
            <Intro
              unitsData={unitsData}
              activeDiv={activeDiv}
              setActiveDiv={setActiveDiv}
            />
          )}
          {activeDiv === 2 && (
            <SayiKumeleri
              unitsData={unitsData}
              activeDiv={activeDiv}
              setActiveDiv={setActiveDiv}
            />
          )}
          {activeDiv === 3 && (
            <TekVeCiftSayilar
              unitsData={unitsData}
              activeDiv={activeDiv}
              setActiveDiv={setActiveDiv}
            />
          )}
        </MainBar>
      </Container>
    </div>
  );
}

const StyledUnits = styled(Units)`
  .topic-number {
    color: #999;
  }
`;

export const Image = styled.div`
  border: 1px solid red;
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

export default Taslak;
