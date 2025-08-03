import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CustomLink2, Button } from "../../../components/buttons/Button.styled";

function DrawerKonularim() {
  const [derslerim, setDerslerim] = useState({});

  useEffect(() => {
    const fetchDerslerim = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setDerslerim(data.derslerim || {}); // Firestore'daki "derslerim" map'i çekiliyor
        } else {
          console.error("Kullanıcı belgesi bulunamadı.");
        }
      } catch (error) {
        console.error("Derslerim bilgilerini alma hatası:", error);
      }
    };
    fetchDerslerim();
  }, []);

  return (
    <Container>
      <Title>
        <Text>Konularım</Text>
      </Title>
      <Main>
        {Object.entries(derslerim).length === 0 ? (
          <Unit>
            <UnitName style={{ color: "#674188", fontSize: "1.5rem" }}>
              Henüz eklenmiş ders bulunmuyor.
            </UnitName>
          </Unit>
        ) : (
          Object.entries(derslerim).map(([key, lesson]) => (
            <Unit key={key}>
              <UnitName>{lesson.name}</UnitName>
              <UnitDescription>
                {lesson.dersSayisi} Ders - Çözülen:{" "}
                {lesson.dersler?.reduce((a, b) => a + b, 0) || 0}
              </UnitDescription>
              <CustomLink2 to={`/matematik/9-sinif/${key}`}>
                <Button width={"100%"}>Devam Et</Button>
              </CustomLink2>
            </Unit>
          ))
        )}
      </Main>
    </Container>
  );
}

export const Container = styled.div`
  height: 100%;
  overflow-y: hidden;
`;
export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  font-size: 1.7rem;
`;

export const Main = styled.div``;

export const Unit = styled.div`
  margin-top: 1rem;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 0.5rem;
  }
`;

export const UnitName = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const UnitDescription = styled.div`
  font-size: 0.9rem;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 6px;
  }
`;

export default DrawerKonularim;
