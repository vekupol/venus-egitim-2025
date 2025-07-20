import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Title } from "./studentDrawerKonularim";
import { db, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CustomLink, Button } from "../../../components/buttons/Button.styled";

function DrawerOgretmenlerim() {
  const [teachers, setTeachers] = useState([]);
  

  const fetchTeachers = async () => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        // currentUser'ın privateStudents dizisinden öğrenci UID'lerini al
        const userDoc = await getDoc(doc(db, "users", currentUserUid));
        if (userDoc.exists()) {
          const teachers = userDoc.data().teachers || [];
          setTeachers(teachers);
        } else {
          console.error("Kullanıcı belgesi bulunamadı.");
        }
      } catch (error) {
        console.error("Öğrenci bilgilerini alma hatası:", error);
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  
  return (
    <Container>
      <Title>
        <Text>Öğretmenlerim</Text>
      </Title>
      <Main>
        <Table>
          <thead>
            <tr>
              <th>Öğretmen İsmi</th>
              <th>İletişim</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TeacherRow key={teacher.uid} teacherUid={teacher.uid} />
              ))
            ) : (
              <tr>
                <td colSpan="2">Öğretmen bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Main>
    </Container>
  );
}

const TeacherRow = ({ teacherUid }) => {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const teacherDoc = await getDoc(doc(db, "users", teacherUid));
        if (teacherDoc.exists()) {
          const data = teacherDoc.data();
          setTeacherData(data);
        } else {
          console.error(`Öğretmen belgesi bulunamadı: ${teacherUid}`);
        }
      } catch (error) {
        console.error(`Öğretmen bilgilerini alma hatası: ${error}`);
      }
    };
    fetchTeacherData();
  }, [teacherUid]);

  return (
    <tr>
      <td>{teacherData ? teacherData.userData.displayName : ""}</td>
      <td>
        <CustomLink to={`/mesaj-gonder/${teacherUid}`}>
          <Button>Mesaj At</Button>
        </CustomLink>
      </td>
    </tr>
  );
};

const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;`;

const Main = styled.div`
width: 100%;`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    text-align: center;
    padding: 8px;
  }
  tr{
    border-bottom: 1px solid var(--main-color);
  }
`;


export default DrawerOgretmenlerim;
