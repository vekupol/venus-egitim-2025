// src/pages/student/ClassRanking.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../../firebase";
import { doc, getDoc } from "firebase/firestore";

const RankingContainer = styled.div`
  margin-top: 20px;
`;

const RankingList = styled.ol`
  padding-left: 20px;
`;

const RankingItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: ${(props) => (props.isCurrentUser ? "bold" : "normal")};
  color: ${(props) => (props.isCurrentUser ? "var(--main-color)" : "#333")};
`;

function ClassRanking({ classUid, currentUserUid }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        // Sınıf belgesini çek
        const classRef = doc(db, "classes", classUid);
        const classSnap = await getDoc(classRef);

        if (classSnap.exists()) {
          const classData = classSnap.data();
          const students = classData.students || [];

          // Öğrencilerin users belgelerini çek
          const rankingData = await Promise.all(
            students.map(async (student) => {
              const userRef = doc(db, "users", student.uid);
              const userSnap = await getDoc(userRef);

              if (userSnap.exists()) {
                const userData = userSnap.data();
                return {
                  uid: student.uid,
                  name: userData.userData?.displayName || "İsimsiz",
                  totalPoint: userData.totalPoint || 0,
                };
              }
              return null;
            })
          );

          // Null olmayanları filtrele ve puana göre sırala
          const sortedRanking = rankingData
            .filter((r) => r !== null)
            .sort((a, b) => b.totalPoint - a.totalPoint);

          setRanking(sortedRanking);
        }
      } catch (error) {
        console.error("Sınıf sıralaması alınırken hata:", error);
      }
    };

    fetchRanking();
  }, [classUid]);

  return (
    <RankingContainer>
      <h4>Sınıf Sıralaması</h4>
      <RankingList>
        {ranking.map((student, index) => (
          <RankingItem
            key={student.uid}
            isCurrentUser={student.uid === currentUserUid}
          >
            <span>
              {index + 1}. {student.name}
            </span>
            <span>{student.totalPoint} Puan</span>
          </RankingItem>
        ))}
      </RankingList>
    </RankingContainer>
  );
}

export default ClassRanking;
