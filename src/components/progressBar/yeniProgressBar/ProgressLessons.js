import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

function ProgressLessons({ dersler, uniteKey }) {
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          if (data.derslerim && data.derslerim[uniteKey]?.dersler) {
            setCompletedLessons(data.derslerim[uniteKey].dersler);
          }
        }
      }
    };
    fetchProgress();
  }, [uniteKey]);

  return (
    <ProgressWrapper>
      {dersler.map((ders, index) => {
        const isDone = completedLessons[index] > 0; // Firestore'daki değer 0'dan büyükse dolu
        return (
          <LessonBox key={index} done={isDone}>
            {index + 1}
          </LessonBox>
        );
      })}
    </ProgressWrapper>
  );
}

const ProgressWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

const LessonBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) => (props.done ? "var(--main-color)" : "#ccc")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

export default ProgressLessons;
