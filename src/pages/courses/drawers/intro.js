import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import ProgressBar from "../../../components/progressBar/ProgressBar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const authInstance = getAuth();
const db = getFirestore();
const ref = collection(db, "kurslar");

function Intro() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Loading animasyonu
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
  const [data, isLoading] = useCollectionData(ref);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const idToFind = "001"; // Aranan belgenin ID'si
  const foundDocument = data.find((doc) => doc.id === idToFind);
  if (foundDocument) {
    console.log(foundDocument.name);
  } else {
    console.log("Belge bulunamadı.");
  }
  // Loading animasyonu

  return (
    <Container>
      <Icons>
        <IoHomeSharp style={{ color: "var(--main-color)" }} />
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <p></p>
      </Icons>
      {/* <Title><h1> {aItem.name} </h1></Title> */}
      {isLoggedIn && (
        <ProgressTable>
          <Description style={{ marginLeft: "1.5rem" }}>
            Ünitedeki ilerlemeni göstermektedir. Bölümleri tamamlayıp,soru
            çözdükçe ilerlemen artacaktır.{" "}
          </Description>
          <Progress>
            <UnitProgress>
              <UnitName>Konu 1 </UnitName>
              <ProgressIcon>
                <ProgressBar />
              </ProgressIcon>
            </UnitProgress>
            <UnitProgress>
              <UnitName>Konu 2</UnitName>
              <ProgressIcon>
                <ProgressBar />
              </ProgressIcon>
            </UnitProgress>
            <UnitProgress>
              <UnitName>Konu 3</UnitName>
              <ProgressIcon>
                <ProgressBar />
              </ProgressIcon>
            </UnitProgress>
            <UnitProgress>
              <UnitName>Konu 4</UnitName>
              <ProgressIcon>
                <ProgressBar />
              </ProgressIcon>
            </UnitProgress>
            <UnitProgress>
              <UnitName>Konu 5</UnitName>
              <ProgressIcon>
                <ProgressBar />
              </ProgressIcon>
            </UnitProgress>
          </Progress>
          <TotalProgress>
            <p style={{ marginLeft: "1.5rem" }}>Toplam İlerleme</p>{" "}
            <BsArrowRightShort style={{ color: "var(--main-color)" }} />{" "}
            <ProgressBar />
          </TotalProgress>
        </ProgressTable>
      )}
      <Title>
        <h2>Ünite İçeriği</h2>
      </Title>

      <UnitContainer>
        <Units>
          <Unit>Konu 1: :</Unit>
          <Parts>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
          </Parts>
        </Units>
        <Units>
          <Unit>Konu 1: Önerme nedir?</Unit>
          <Parts>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
          </Parts>
        </Units>
        <Units>
          <Unit>Konu 1: Önerme nedir?</Unit>
          <Parts>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
          </Parts>
        </Units>
        <Units>
          <Unit>Konu 1: Önerme nedir?</Unit>
          <Parts>
            <Part>Önerme </Part>
            <Part>Doğruluk değeri</Part>
          </Parts>
        </Units>
      </UnitContainer>
    </Container>
  );
}

export const Container = styled.div``;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  h2 {
    margin-top: 1rem;
  }
`;

export const ProgressTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  height: 200px;
  padding: 1rem;
  max-width: 1000px;
`;

export const Units = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  width: 43%;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;

export const Description = styled.div`
  font-size: 14px;
`;

export const UnitContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem;
  max-width: 1000px;
`;

export const Unit = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  min-width: min-content;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

export const Parts = styled.div`
`;

export const Part = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
  }
`;

export const Progress = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 3 eşit genişlikte sütun */
  gap: 10px;
  margin: 1rem 0 2rem;
  font-size: 12px;
`;

export const UnitProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UnitName = styled.div``;

export const ProgressIcon = styled.div``;

export const TotalProgress = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const UnitsShadow = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  width: 46%;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;

export default Intro;
