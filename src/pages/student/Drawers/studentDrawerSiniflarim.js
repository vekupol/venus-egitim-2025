import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  query as firestoreQuery,
} from "firebase/firestore";
import {
  Container,
  Main,
  Text,
  Title,
  Unit,
  UnitDescription,
  UnitName,
} from "./studentDrawerKonularim";
import { BsEnvelope, BsEnvelopeExclamation } from "react-icons/bs";
import { Button,CustomLink2 } from "../../../components/buttons/Button.styled";

function DrawerSiniflarim() {
  const [user] = useAuthState(auth);
  const belirliKullaniciUID = user ? user.uid : null;
  const [userClasses, setUserClasses] = useState([]);
  const [homeworks, setHomeworks] = useState([]);

  const hasUncompletedHomework = async (classUid) => {
    try {
      const userDocRef = doc(db, "users", belirliKullaniciUID);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userHomeworks = userDoc.data().homeworks || [];
        const matchingHomework = userHomeworks.find(
          (homework) =>
            homework.classUid === classUid && homework.doneStudent === 0
        );

        return !!matchingHomework; // true if there is an uncompleted homework, false otherwise
      } else {
        console.error("Kullanıcı belirtilen UID ile bulunamadı");
        return false;
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error.message);
      return false;
    }
  };

  const fetchNotifications = async (userClass) => {
    try {
      const userDocRef = doc(db, "users", belirliKullaniciUID);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userHomeworks = userDoc.data().homeworks || [];
        const classHomeworks = userHomeworks.filter(
          (homework) => homework.classUid === userClass.id
        );
        setHomeworks(classHomeworks);
      } else {
        console.error("Kullanıcı belirtilen UID ile bulunamadı");
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRef = collection(db, "classes");
        const classSnapshot = await getDocs(classRef);

        const userClassesData = [];

        for (const classDoc of classSnapshot.docs) {
          const students = classDoc.data().students;
          const matchingStudent = students.find(
            (student) => student.uid === belirliKullaniciUID
          );

          if (matchingStudent) {
            const classData = {
              id: classDoc.id,
              className: classDoc.data().className || "Bilgi Yok",
              teacherUid: classDoc.data().teacherUid || "Bilgi Yok",
            };

            const teacherRef = doc(db, "users", classData.teacherUid);
            const teacherDoc = await getDoc(teacherRef);

            if (teacherDoc.exists()) {
              classData.teacherName =
                teacherDoc.data().userData.displayName || "Bilgi Yok";
            } else {
              classData.teacherName = "Bilgi Yok";
            }

            classData.hasUncompletedHomework = await hasUncompletedHomework(
              classData.id
            ); // Yeni satır

            userClassesData.push(classData);
          }
        }

        setUserClasses(userClassesData);
      } catch (error) {
        console.error("Veri çekme hatası:", error.message);
      }
    };

    fetchData();
  }, [belirliKullaniciUID]);

  return (
    <Container>
      <Title>
        <Text>Sınıflarım</Text>
      </Title>
      <Main>
        {userClasses &&
          userClasses.map((userClass) => (
            <Unit key={userClass.classUid}>
              <UnitName>{userClass.className}</UnitName>
              <UnitDescription style={{ fontSize: "1rem" }}>
                {userClass.teacherName}
                {userClass.hasUncompletedHomework ? (
                  <EnvelopeNotification />
                ) : (
                  <Envelope />
                )}
              </UnitDescription>
              <CustomLink2 to={`/ogrenci-ekrani/sinifim/${userClass.id}`}>
                <Button width={"100%"}> Sınıfa Git</Button>
              </CustomLink2>
            </Unit>
          ))}
      </Main>
    </Container>
  );
}

const Envelope = styled(BsEnvelope)`
  color: var(--main-color);
  font-size: 30px;
`;
const EnvelopeNotification = styled(BsEnvelopeExclamation)`
  color: var(--main-color);
  font-size: 30px;
`;

export default DrawerSiniflarim;
