import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Text, Title } from "../student/Drawers/studentDrawerKonularim";
import { NotificationContainer } from "../mainPages/Notifications";
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

const StyledButton = styled.button`
  padding: 6px 10px;
  background-color: ${(props) =>
    props.disabled ? "#ccc" : "var(--main-color)"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 0.8rem;
  margin: 2px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const InputPoint = styled.input`
  width: 50px;
  padding: 5px;
  margin-right: 6px;
  text-align: center;
`;

function HomeworkDetail() {
  const { itemId } = useParams();
  const [homework, setHomework] = useState(null);
  const [studentsInfo, setStudentsInfo] = useState([]);
  const [points, setPoints] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({}); // ✅ Öğrencilerin yüklediği dosyalar

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const docRef = doc(db, "homeworks", itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const hwData = docSnap.data();
          setHomework(hwData);

          const doneStudents = hwData.doneStudents || [];
          const studentsPromises = doneStudents.map(async (uid) => {
            const userDoc = await getDoc(doc(db, "users", uid));
            return { uid, ...userDoc.data() };
          });
          const students = await Promise.all(studentsPromises);
          setStudentsInfo(students);

          // ✅ Öğrencilerin yüklediği dosyaları storage'dan çek
          fetchUploadedFiles(students);
        }
      } catch (error) {
        console.error("Ödev verileri alınırken hata:", error);
      }
    };

    fetchHomework();
  }, [itemId]);

  // ✅ Storage'dan dosyaları çek
  const fetchUploadedFiles = async (students) => {
    const fileMap = {};
    for (const student of students) {
      const folderRef = ref(
        storage,
        `homework-files/${student.uid}/${itemId}/`
      );
      try {
        const res = await listAll(folderRef);
        const files = await Promise.all(
          res.items.map(async (fileRef) => ({
            name: fileRef.name,
            url: await getDownloadURL(fileRef),
          }))
        );
        fileMap[student.uid] = files;
      } catch {
        fileMap[student.uid] = [];
      }
    }
    setUploadedFiles(fileMap);
  };

  // ✅ Puan input değişimi
  const handlePointChange = (uid, value) => {
    setPoints((prev) => ({ ...prev, [uid]: value }));
  };

  // ✅ Puan gönderme
  const handleSendPoint = async (uid) => {
    console.log(
      "🎯 Puan Gönderme Başladı. UID:",
      uid,
      "Girilen Puan:",
      points[uid]
    );

    try {
      const userRef = doc(db, "users", uid);
      console.log("📄 Firestore userRef oluşturuldu:", userRef);

      const userSnap = await getDoc(userRef);
      console.log(
        "📥 Kullanıcı belgesi çekildi:",
        userSnap.exists() ? "Var" : "Yok"
      );

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentTotal = userData.totalPoint || 0;
        const addedPoint = Number(points[uid] || 0);
        const newTotal = currentTotal + addedPoint;

        console.log("💾 Mevcut totalPoint:", currentTotal);
        console.log("➕ Eklenecek puan:", addedPoint);
        console.log("🆕 Yeni totalPoint:", newTotal);

        // Firestore güncellemesi
        await updateDoc(userRef, { totalPoint: newTotal });

        console.log("🔥 totalPoint güncellendi:", newTotal);
        alert("Puan başarıyla eklendi!");
        setPoints((prev) => ({ ...prev, [uid]: "" }));
      } else {
        console.warn("⚠️ Kullanıcı bulunamadı!");
      }
    } catch (error) {
      console.error("❌ Puan ekleme hatası:", error);
    }
  };

  // ✅ Ödevi Kabul Et (Teslim kabul butonu)
  const handleAcceptHomework = async (uid) => {
    try {
      const hwRef = doc(db, "homeworks", itemId);
      const hwSnap = await getDoc(hwRef);

      if (hwSnap.exists()) {
        const hwData = hwSnap.data();
        const currentDone = hwData.doneStudent || 0;
        const total = hwData.totalStudent || 0;
        const doneList = hwData.doneStudents || [];

        // Eğer öğrenci zaten doneStudents'te yoksa ekle
        if (!doneList.includes(uid)) {
          doneList.push(uid);

          await updateDoc(hwRef, {
            doneStudent: currentDone + 1 <= total ? currentDone + 1 : total, // limit aşmasın
            doneStudents: doneList,
          });

          alert("Ödev teslimi kabul edildi!");
          setHomework((prev) => ({
            ...prev,
            doneStudent: currentDone + 1 <= total ? currentDone + 1 : total,
            doneStudents: doneList,
          }));
        } else {
          alert("Bu öğrencinin ödevi zaten kabul edilmiş!");
        }
      }
    } catch (error) {
      console.error("❌ Ödevi kabul etme hatası:", error);
    }
  };

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
                </CTr>
              </CThead>
              <CTbody>
                <CTr>
                  <CTd>{homework.homeworkType}</CTd>
                  <CTd>{homework.startDate}</CTd>
                  <CTd>{homework.endDate}</CTd>
                </CTr>
              </CTbody>
            </CTable>
          </Homeworks>

          <h3 style={{ marginBottom: "10px" }}>Ödev Tamamlama Durumu</h3>
          <Homeworks style={{ padding: "0px" }}>
            <CTable>
              <CThead>
                <CTr>
                  <CTh>Öğrenci</CTh>
                  <CTh>Durumu</CTh>
                  <CTh>Gönderilen Dosya</CTh>
                  <CTh>Puan</CTh>
                </CTr>
              </CThead>
              <CTbody>
                {studentsInfo.map((student, idx) => {
                  const hasFile = uploadedFiles[student.uid]?.length > 0;
                  return (
                    <CTr key={idx}>
                      <CTd>{student.userData.displayName}</CTd>
                      <CTd>{hasFile ? "Tamamladı" : "Yüklemedi"}</CTd>
                      <CTd>
                        <StyledButton
                          disabled={!hasFile}
                          onClick={() =>
                            hasFile &&
                            window.open(
                              uploadedFiles[student.uid][0].url,
                              "_blank"
                            )
                          }
                        >
                          Dosyayı Gör
                        </StyledButton>

                        <StyledButton
                          onClick={() => handleAcceptHomework(student.uid)}
                        >
                          Ödevi Kabul Et
                        </StyledButton>
                      </CTd>
                      <CTd>
                        <InputPoint
                          type="number"
                          value={points[student.uid] || ""}
                          onChange={(e) =>
                            handlePointChange(student.uid, e.target.value)
                          }
                        />
                        <StyledButton
                          onClick={() => handleSendPoint(student.uid)}
                        >
                          Gönder
                        </StyledButton>
                      </CTd>
                    </CTr>
                  );
                })}
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
