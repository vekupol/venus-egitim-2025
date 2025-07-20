import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form } from "./DrawerSiniflarim";
import { db, auth } from "../../../firebase";
import {
  getDocs,
  doc,
  query,
  collection,
  where,
  getDoc,
  updateDoc,
  arrayUnion,
  query as firestoreQuery,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Button, CustomLink, CustomLink2, DeleteButton } from "../../../components/buttons/Button.styled";
import {
  Unit,
  UnitName,
  Text,
  Title,
  Main,
  Container,
  UnitDescription,
} from "../../student/Drawers/studentDrawerKonularim";
import {
  InputSave,
  InputText,
  LabelSubtitle,
} from "../../student/studentAyarlar";

function DrawerPrivateStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      const currentUser = auth.currentUser;
      const currentUserUid = currentUser ? currentUser.uid : null;

      if (currentUserUid) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUserUid));
          if (userDoc.exists()) {
            const privateStudents = userDoc.data().privateStudents || [];
            const studentUids = privateStudents.map((student) => student.uid);

            const studentPromises = studentUids.map(async (uid) => {
              const studentDoc = await getDoc(doc(db, "users", uid));
              return studentDoc.data();
            });

            const studentData = await Promise.all(studentPromises);
            setStudents(studentData);
          } else {
            console.error("Kullanıcı belgesi bulunamadı.");
          }
        } catch (error) {
          console.error("Öğrenci bilgilerini alma hatası:", error);
        }
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const emailAddress = formData.get("emailAddress");
    const activationCode = formData.get("activationCode");

    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        const userDocRef = doc(db, "users", currentUserUid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();
          const activationCodes = userDocData.activationCodes || [];
          const addedActivationCodes = userDocData.addedActivationCodes || [];

          if (addedActivationCodes.includes(activationCode)) {
            setErrorMessage("Bu aktivasyon kodu zaten kullanılmış.");
          } else if (activationCodes.includes(activationCode)) {
            const q = query(
              collection(db, "users"),
              where("userData.email", "==", emailAddress)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const studentUid = querySnapshot.docs[0].data().uid;

              await updateDoc(userDocRef, {
                privateStudents: arrayUnion({
                  uid: studentUid,
                  messages: [],
                  homeworks: [],
                }),
                addedActivationCodes: arrayUnion(activationCode),
              });

              const teacherDocRef = doc(db, "users", studentUid);
              await updateDoc(teacherDocRef, {
                teachers: arrayUnion({
                  uid: currentUserUid,
                  messages: [],
                  homeworks: [],
                }),
              });

              window.location.reload();
            } else {
              setErrorMessage("Kullanıcı bulunamadı.");
            }
          } else {
            setErrorMessage("Geçersiz aktivasyon kodu. Lütfen doğru kodu giriniz.");
          }
        } else {
          console.error("Kullanıcı belgesi bulunamadı.");
        }
      } catch (error) {
        console.error("Öğrenci ekleme hatası:", error);
      }
    }
  };

  const handleDeleteStudent = async (studentUid) => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;
    const confirmDelete = window.confirm(
      "Öğrenciyi silmek istediğinizden emin misiniz?"
    );

    if (confirmDelete) {
      try {
        const studentQuery = firestoreQuery(
          collection(db, "users"),
          where("uid", "==", currentUserUid)
        );
        const studentQuerySnapshot = await getDocs(studentQuery);

        if (!studentQuerySnapshot.empty) {
          const studentDoc = studentQuerySnapshot.docs[0];
          const studentsArray = studentDoc.data().privateStudents || [];
          const updatedStudents = studentsArray.filter(
            (student) => student.uid !== studentUid
          );

          await updateDoc(studentDoc.ref, { privateStudents: updatedStudents });

          const studentDocRef = doc(db, "users", studentUid);
          const studentData = (await getDoc(studentDocRef)).data();
          const teacherUidToRemove = currentUserUid;
          const updatedTeachers = (studentData.teachers || []).filter(
            (teacher) => teacher.uid !== teacherUidToRemove
          );
          await updateDoc(studentDocRef, { teachers: updatedTeachers });
          setStudents(updatedStudents);
          window.location.reload();
        }
      } catch (error) {
        console.error("Öğrenci silme hatası:", error);
      }
    }
  };

  return (
    <Container>
      <Title>
        <Text>Özel Ders Öğrencilerim</Text>
      </Title>
      <Main>
        <Unit>
          <UnitName style={{ color: "#674188", fontSize: "1.5rem" }}>
            Öğrenci Adı
          </UnitName>
          <UnitDescription
            style={{ color: "#674188", fontSize: "1.2rem", fontWeight: "bold" }}
          ></UnitDescription>
          <CustomLink2></CustomLink2>
        </Unit>
        {students.map((student) => (
          <Unit key={student.uid}>
            <UnitName>
              {student.userData && student.userData.displayName}
            </UnitName>
            <ButtonBlock>
              <CustomLink to={`/ogretmen-ekrani/ogrenci-duzenle/${student.uid}`}>
                <Button>Öğrenci Seç</Button>
              </CustomLink>
              <CustomLink to={`/mesaj-gonder/${student.uid}`}>
                <Button>Mesaj At</Button>
              </CustomLink>
              <CustomLink>
                <DeleteButton onClick={() => handleDeleteStudent(student.uid)}>
                  Öğrenci Sil
                </DeleteButton>
              </CustomLink>
            </ButtonBlock>
          </Unit>
        ))}
        <Form onSubmit={handleAddStudent}>
          <LabelSubtitle>
            Sayın öğretmenimiz öğrencinizi eklemek için aktivasyon kodu alınız.
            Aktivasyon kodunu <Link to="/odeme-planlari">buraya</Link> tıklayarak temin edebilirsiniz. Herhangi bir hata durumunda{" "}
            <strong>0530 682 68 49</strong> numaralı iletişim hattını
            kullanabilirsiniz.
          </LabelSubtitle>
          <InputText
            type="text"
            name="emailAddress"
            placeholder="Öğrencinizin mail adresini giriniz"
          />
          <InputText
            type="text"
            name="activationCode"
            placeholder="Aktivasyon Kodu"
          />
          <InputSave type="submit" value="Öğrenci Ekle" />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Form>
      </Main>
    </Container>
  );
}

const ButtonBlock = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 70%;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export default DrawerPrivateStudents;
