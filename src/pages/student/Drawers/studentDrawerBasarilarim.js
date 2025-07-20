import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Title, Container, Main } from "./studentDrawerKonularim";
import BasariSiralamasi from "./bolumler/BasariSiralamasi";
import PlatformRankingTable from "./bolumler/PlatformRankingTable";
import ClassListTable from "./bolumler/ClassListTable";
import { db, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import CarouselMedals from "../../../components/carousel/CarouselMedals";

function DrawerBasarilarim() {
  const [medals, setMedals] = useState([]);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    const fetchLessons = async () => {
      const currentUser = auth.currentUser;
      const currentUserUid = currentUser ? currentUser.uid : null;

      if (currentUserUid) {
        try {
          // currentUser'ın privateStudents dizisinden öğrenci UID'lerini al
          const userDoc = await getDoc(doc(db, "users", currentUserUid));
          if (userDoc.exists()) {
            const medals = userDoc.data().medals || [];
            setMedals(medals);
            const totalPoint = userDoc.data().totalPoint || 0;
            setTotalPoint(totalPoint)
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

  const tabs = [
    { title: "Platform ", content: <PlatformRankingTable /> },
    { title: "10 A", content: <ClassListTable /> },
  ];

  return (
    <Container>
      <Title>
        <Text>Başarılarım</Text>
      </Title>
      <Main>
        <GridArea>
          <Medals>
            <SubTitle>Madalyalarım</SubTitle>
            <CarouselMedals medals={medals} />
          </Medals>
          <MyPoints>
            <SubTitle>Toplam Puanım</SubTitle>
            <MyPointsList>{totalPoint}</MyPointsList>
          </MyPoints>
          <MyRank>
            <SubTitle>Sıralamam</SubTitle>
            <BasariSiralamasi tabs={tabs} />
          </MyRank>
        </GridArea>
      </Main>
    </Container>
  );
}

const GridArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  height: auto;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
  }
`;
const Medals = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const MyPoints = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const MyPointsList = styled.div`
  padding: 0.5rem 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: var(--main-color);
`;

const MyRank = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  @media (max-width: 1100px) {
    border-left: none;
  }
`;

const SubTitle = styled.div`
  margin: 0.5rem 0 1rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  text-align: start;
`;

export default DrawerBasarilarim;
