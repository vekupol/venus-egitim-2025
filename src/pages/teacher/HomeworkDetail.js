import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Text, Title } from "../student/Drawers/studentDrawerKonularim";
import { NotificationContainer, Messages } from "../mainPages/Notifications";
import { Container } from "../student/studentAyarlar";
import {
  CTable,
  CTbody,
  CTd,
  CThead,
  CTr,
  CTh,
} from "./Drawers/DrawerDokumanAra";
import { Homeworks } from "./ClassEdit";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  th {
    background-color: #f2f2f2;
  }
`;

function HomeworkDetail() {
  const { itemId } = useParams();
  const [homework, setHomework] = useState(null);
  const [studentsInfo, setStudentsInfo] = useState([]);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        // Ödev bilgisini al
        const docRef = doc(db, "homeworks", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHomework(docSnap.data());
          // Ödev tamamlayan öğrencilerin bilgilerini al
          const doneStudents = docSnap.data().doneStudents;
          const studentsInfoPromises = doneStudents.map(async (uid) => {
            const userDocRef = doc(db, "users", uid);
            const userDocSnap = await getDoc(userDocRef);
            return userDocSnap.data();
          });
          const studentsInfo = await Promise.all(studentsInfoPromises);
          setStudentsInfo(studentsInfo);
        } else {
          console.log("Ödev bulunamadı!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchHomework();
  }, [itemId]);

  return (
    <Container>
      {homework ? (
        <NotificationContainer>
          <Text>
            <Title>Ödev Detayları</Title>
          </Text>
          <Homeworks style={{ padding: "0px" }}>
            <CTable>
              <CThead>
                <CTr>
                  <CTh>Ödev Türü</CTh>
                  <CTh>Başlangıç Tarihi</CTh>
                  <CTh>Bitiş Tarihi</CTh>
                  <CTh>Teslim Durumu</CTh>
                  <CTh> Notunuz</CTh>
                </CTr>
              </CThead>
              <CTbody>
                <CTr>
                  <CTd>{homework.homeworkType}</CTd>
                  <CTd>{homework.startDate}</CTd>
                  <CTd>{homework.endDate}</CTd>
                  <CTd>
                    {homework.doneStudent} / {homework.totalStudent}
                  </CTd>
                  <CTd>{homework.note}</CTd>
                </CTr>
              </CTbody>
            </CTable>
          </Homeworks>
          <h3 style={{marginBottom:"10px"}}>Ödev Tamamlama Durumu</h3>
          <Homeworks style={{ padding: "0px" }}>
            <CTable>
              <CThead>
                <CTr>
                  <CTh>Öğrenci Adı</CTh>
                  <CTh>Durumu</CTh>
                </CTr>
              </CThead>
              <CTbody>
                {studentsInfo.map((student, index) => (
                  <CTr key={index}>
                    <CTd>{student.userData.displayName}</CTd>
                    <CTd>
                      {student.homeworks.filter((h) => h.refId === itemId)[0]
                        .doneStudent === 1
                        ? "Tamamladı"
                        : "Tamamlamadı"}
                    </CTd>
                  </CTr>
                ))}
              </CTbody>
            </CTable>
          </Homeworks>
        </NotificationContainer>
      ) : (
        <p>Ödev yükleniyor...</p>
      )}
    </Container>
  );
}

export default HomeworkDetail;
