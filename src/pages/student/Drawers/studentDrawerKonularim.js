import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CustomLink,CustomLink2, Button } from "../../../components/buttons/Button.styled";

function DrawerKonularim() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const currentUser = auth.currentUser;
      const currentUserUid = currentUser ? currentUser.uid : null;

      if (currentUserUid) {
        try {
          // currentUser'ın privateStudents dizisinden öğrenci UID'lerini al
          const userDoc = await getDoc(doc(db, "users", currentUserUid));
          if (userDoc.exists()) {
            const lessons = userDoc.data().lessons || [];
            setLessons(lessons);
          } else {
            console.error("Kullanıcı belgesi bulunamadı.");
          }
        } catch (error) {
          console.error("Öğrenci bilgilerini alma hatası:", error);
        }
      }
    };
    fetchLessons();
  }, []);

  return (
    <Container>
      <Title>
        <Text>Konularım</Text>
      </Title>
      <Main>
        <CustomLink to="/ogrenci-ekrani/derslerimi-duzenle">
          <Button width={"100%"}>Derslerimi Düzenle </Button>
        </CustomLink>
        <Unit>
          <UnitName style={{color:"#674188", fontSize:"1.5rem"}}>Ünite Adı</UnitName>
          <UnitDescription style={{color:"#674188", fontSize:"1.2rem",fontWeight:"bold"}}>Ünite Açıklaması</UnitDescription>
          <CustomLink2 ></CustomLink2>
        </Unit>
        {lessons &&
          lessons.map((lesson) => (
            <Unit key={lesson.id}>
              <UnitName>{lesson.name}</UnitName>
              <UnitDescription>{lesson.aciklama}</UnitDescription>
              <CustomLink2 to={`${lesson.url}`}>
                <Button width={"100%"}>Devam Et</Button>
              </CustomLink2>
            </Unit>
          ))}
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
  font-size: 0.7rem;
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
