import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Title, Container, Main } from "./studentDrawerKonularim";
import BasariSiralamasi from "./bolumler/BasariSiralamasi";
import PlatformRankingTable from "./bolumler/PlatformRankingTable";
import { db, auth } from "../../../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import CarouselMedals from "../../../components/carousel/CarouselMedals";

function DrawerBasarilarim() {
  const [medals, setMedals] = useState([]);
  const [totalPoint, setTotalPoint] = useState(0);
  const [classes, setClasses] = useState([]);
  const [selectedClassStudents, setSelectedClassStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("platform"); // ✅ Tab kontrolü

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        // Kullanıcı bilgileri
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setMedals(data.medals || []);
          setTotalPoint(data.totalPoint || 0);
        }

        // Kullanıcının sınıflarını bul
        const classRef = collection(db, "classes");
        const classSnapshot = await getDocs(classRef);
        const userClasses = [];

        for (const classDoc of classSnapshot.docs) {
          const students = classDoc.data().students || [];
          const inClass = students.find((s) => s.uid === currentUser.uid);
          if (inClass) {
            userClasses.push({
              id: classDoc.id,
              className: classDoc.data().className,
              students,
            });
          }
        }
        setClasses(userClasses);

        // İlk sınıfın sıralamasını yükle
        if (userClasses.length > 0) {
          fetchClassRanking(userClasses[0].id);
        }
      } catch (error) {
        console.error("Veriler alınırken hata:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchClassRanking = async (classId) => {
    try {
      const classRef = doc(db, "classes", classId);
      const classDoc = await getDoc(classRef);

      if (classDoc.exists()) {
        const students = classDoc.data().students || [];
        const ranking = [];

        for (const student of students) {
          const studentDoc = await getDoc(doc(db, "users", student.uid));
          if (studentDoc.exists()) {
            ranking.push({
              uid: student.uid,
              name: studentDoc.data().userData.displayName || "Bilinmiyor",
              totalPoint: studentDoc.data().totalPoint || 0,
            });
          }
        }

        ranking.sort((a, b) => b.totalPoint - a.totalPoint);
        setSelectedClassStudents(ranking);
      }
    } catch (error) {
      console.error("Sınıf sıralaması alınırken hata:", error.message);
    }
  };

  return (
    <Container>
      <Title>
        <Text>Başarılarım</Text>
      </Title>
      <Main>
        <GridArea>
          {/* Madalyalarım */}
          <Medals>
            <SubTitle>Madalyalarım</SubTitle>
            <CarouselMedals medals={medals} />
          </Medals>

          {/* Toplam Puanım */}
          <MyPoints>
            <SubTitle>Toplam Puanım</SubTitle>
            <MyPointsList>{totalPoint}</MyPointsList>
          </MyPoints>

          {/* Sıralamalar */}
          <MyRank>
            <SubTitle>Sıralamalar</SubTitle>
            <TabButtons>
              <TabButton
                active={activeTab === "platform"}
                onClick={() => setActiveTab("platform")}
              >
                Platform
              </TabButton>
              <TabButton
                active={activeTab === "class"}
                onClick={() => setActiveTab("class")}
              >
                Sınıf
              </TabButton>
            </TabButtons>

            {activeTab === "platform" && <PlatformRankingTable />}

            {activeTab === "class" && (
              <>
                <ClassSelect>
                  <label>Sınıf Seç: </label>
                  <select
                    onChange={(e) => fetchClassRanking(e.target.value)}
                    defaultValue={classes[0]?.id || ""}
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                </ClassSelect>

                <RankingTable>
                  <thead>
                    <tr>
                      <th>Sıra</th>
                      <th>Öğrenci</th>
                      <th>Puan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClassStudents.map((student, index) => (
                      <tr
                        key={student.uid}
                        style={{
                          backgroundColor:
                            student.uid === auth.currentUser?.uid
                              ? "#e8f5e9"
                              : "transparent",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{student.name}</td>
                        <td>{student.totalPoint}</td>
                      </tr>
                    ))}
                  </tbody>
                </RankingTable>
              </>
            )}
          </MyRank>
        </GridArea>
      </Main>
    </Container>
  );
}

/* --- STYLES --- */
const GridArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-gap: 2rem;
  height: auto;

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
  }
`;

const Medals = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;

const MyPoints = styled.div`
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
  grid-column: span 2;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.div`
  margin: 0.5rem 0 1rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 0 1rem 1rem;
`;

const TabButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? "var(--main-color)" : "#f1f1f1"};
  color: ${({ active }) => (active ? "white" : "black")};
  border-radius: 6px;
`;

const ClassSelect = styled.div`
  margin: 0 0 1rem 1rem;
  display: flex;
  align-items: center;
  gap: 10px;

  select {
    padding: 6px 12px;
    font-size: 1rem;
  }
`;

const RankingTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  th {
    background: var(--main-color);
    color: white;
  }
`;

export default DrawerBasarilarim;
