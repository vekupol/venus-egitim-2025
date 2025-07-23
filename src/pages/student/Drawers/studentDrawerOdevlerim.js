import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Container, Main, Text, Title } from "./studentDrawerKonularim"; // kendi stilleriniz

const StudentDrawerOdevlerim = () => {
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const fetchHomeworks = async () => {
      const currentUser = auth.currentUser;
      const currentUserUid = currentUser ? currentUser.uid : null;

      if (!currentUserUid) return;

      try {
        const userRef = doc(db, "users", currentUserUid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const hw = data.homeworks || [];
          setHomeworks(hw);
        }
      } catch (error) {
        console.error("Ödevler alınırken hata oluştu:", error);
      }
    };

    fetchHomeworks();
  }, []);

  const formatDate = (dateString) => {
    return dateString?.split("-").join(".");
  };

  return (
    <Container>
      <Title>
        <Text>Ödevlerim</Text>
      </Title>
      <Main>
        <HomeworkTable>
          <thead>
            <tr>
              <th>No</th>
              <th>Kazanım</th>
              <th>Sınıf</th>
              <th>Ünite</th>
              <th>Soru Sayısı</th>
              <th>Başlangıç</th>
              <th>Bitiş</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {homeworks.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.kazanim || "-"}</td>
                <td>{item.className || "-"}</td>
                <td>{item.unit || "-"}</td>
                <td>{item.soruSayisi || "-"}</td>
                <td>{formatDate(item.startDate)}</td>
                <td>{formatDate(item.endDate)}</td>
                <td>{item.bittiMi === 1 ? "Tamamlandı" : "Tamamlanmadı"}</td>
              </tr>
            ))}
          </tbody>
        </HomeworkTable>
      </Main>
    </Container>
  );
};

const HomeworkTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 1px solid white;
    padding: 8px;
    text-align: center;
    font-size: 0.9rem;
  }

  th {
    background-color: var(--main-color);
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export default StudentDrawerOdevlerim;
