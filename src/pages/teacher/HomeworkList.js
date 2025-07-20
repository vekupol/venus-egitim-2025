import {
  TableRow,
  TableHeader,
  TableCell,
  ButtonSil,
  ButtonO,
} from "./ClassEdit";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import {
  getDocs,
  deleteDoc,
  collection,
  doc,
  where,
  getDoc,
  updateDoc,
  query as firestoreQuery,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  CTable,
  CTbody,
  CTd,
  CTh,
  CThead,
  CTr,
} from "./Drawers/DrawerDokumanAra";
import { InputCheckBox, InputSelect } from "../student/studentAyarlar";
import { Button, DeleteButton } from "../../components/buttons/Button.styled";

const storage = getStorage();

function HomeworkList({ paramsUid }) {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("Tüm Ödevler");
  const [sortBy, setSortBy] = useState("Bitiş Tarihi");
  const [showCompleted, setShowCompleted] = useState(false);

  const classAddedClassUid = paramsUid;
  const [classHomework, setClassHomework] = useState([]);

  const filteredHomeworks = classHomework.filter((item) => {
    const isCompleted = item.doneStudent === item.totalStudent;

    if (filterType === "Tüm Ödevler") {
      return showCompleted ? !isCompleted : true;
    } else {
      const isTypeMatch = item.homeworkType === filterType;
      return isTypeMatch && (showCompleted ? !isCompleted : true);
    }
  });

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const sortedHomeworks = [...filteredHomeworks];
  sortedHomeworks.sort((a, b) => {
    const dateA = formatDate(a.endDate);
    const dateB = formatDate(b.endDate);

    if (sortBy === "Bitiş Tarihi") {
      return dateA - dateB;
    } else if (sortBy === "Puan") {
      return b.puan - a.puan;
    }
    return 0;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Öğrencileri getir
        const classRef = collection(db, "classes");
        const query = firestoreQuery(
          classRef,
          where("classUid", "==", classAddedClassUid)
        );
        const classQuerySnapshot = await getDocs(query);

        if (!classQuerySnapshot.empty) {
          const classDoc = classQuerySnapshot.docs[0];
          const userDocData = classDoc.data();
          const allStudents = userDocData.students || [];

          console.log(allStudents);
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }

        // Homeworks koleksiyonundan classAddedClassUid'e sahip belgeleri getir
        const homeworksRef = collection(db, "homeworks");
        const homeworksQuery = firestoreQuery(
          homeworksRef,
          where("classUid", "==", classAddedClassUid)
        );
        const homeworksQuerySnapshot = await getDocs(homeworksQuery);

        if (!homeworksQuerySnapshot.empty) {
          const homeworksData = homeworksQuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setClassHomework(homeworksData);

          // İlgili ödevleri kullanmak için burada bir işlem yapabilirsiniz
        } else {
          console.log("Ödev belgeleri bulunamadı!");
        }
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, [classAddedClassUid]);

  const handleHomeworkDelete = async (
    itemId,
    itemFileName,
    itemHomeworkType
  ) => {
    const confirmDelete = window.confirm(
      "Bu ödevi silmek istediğinizden emin misiniz?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      // Dosya ödevi kontrolü
      if (itemHomeworkType === "Dosya Ödevi") {
        // Dosya ödevi ise storage'dan dosyayı sil
        const storageRef = ref(
          storage,
          `homework-files/${classAddedClassUid}/${itemFileName}`
        );
        await deleteObject(storageRef);
      }

      // Ödevi sadece belirtilen itemId ile sil
      const homeworkRef = doc(db, "homeworks", itemId);
      await deleteDoc(homeworkRef);

      // Sınıf içerisindeki ödevleri güncelleme
      const classDocRef = doc(db, "classes", classAddedClassUid);
      const classDocSnap = await getDoc(classDocRef);

      if (classDocSnap.exists()) {
        const classData = classDocSnap.data();
        const currentHomeworks = classData.homeworks || [];
        const updatedHomeworksForClass = currentHomeworks.filter(
          (homework) => homework.refId !== itemId
        );

        await updateDoc(classDocRef, { homeworks: updatedHomeworksForClass });

        console.log("Ödev ve sınıf ödevleri güncellendi.");
        window.location.reload();
      } else {
        console.log("Sınıf belgesi bulunamadı!");
      }

      // Öğrenci belgelerini güncelleme
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      snapshot.forEach(async (doc) => {
        const userData = doc.data();
        const userHomeworks = userData.homeworks || [];

        const updatedHomeworks = userHomeworks.filter(
          (homework) => homework.refId !== itemId
        );
        await updateDoc(doc.ref, { homeworks: updatedHomeworks });
      });

      console.log("Ödev ve ilişkili öğrenci ödevleri silindi.");
    } catch (error) {
      console.error("Ödev silme hatası:", error);
    }
  };

  const handleHomeworkDetail = (itemId) => {
    navigate(`/ogretmen-ekrani/odev-detay/${itemId}`);
  };

  return (
    <div>
      <CTable>
        <CThead>
          <CTr>
            <CTh>
              <FaFilter /> Ödevleri Filtrele
            </CTh>
            <CTh>Biten Ödevleri Gösterme </CTh>
            <CTh>Sırala:</CTh>
          </CTr>
        </CThead>
        <CTbody>
          <CTr>
            <CTd>
              <CustomInputSelect
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="Tüm Ödevler">Tüm Ödevler</option>
                <option value="Platform Ödevi">Platform Ödevi</option>
                <option value="Kitap Ödevi">Kitap Ödevi</option>
                <option value="Dosya Ödevi">Dosya Ödevi</option>
              </CustomInputSelect>
            </CTd>
            <CTd>
              <InputCheckBox
                type="checkbox"
                checked={showCompleted}
                onChange={() => setShowCompleted(!showCompleted)}
              />
            </CTd>
            <CTd>
              <CustomInputSelect
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Bitiş Tarihi">Bitiş Tarihi</option>
                <option value="Puan">Puan</option>
              </CustomInputSelect>
            </CTd>
          </CTr>
        </CTbody>
      </CTable>

      <CTable>
        <CThead>
          <CTr>
            <CTh>No</CTh>
            <CTh>Ödev Türü </CTh>
            <CTh>Puanı </CTh>
            <CTh>
              Veriliş Tarihi <FaSort />
            </CTh>
            <CTh>
              Bitiş Tarihi <FaSort />
            </CTh>
            <CTh>Teslim Durumu</CTh>
            <CTh></CTh>
            <CTh></CTh>
          </CTr>
        </CThead>
        <CTbody>
          {sortedHomeworks.map((item, index) => (
            <CTr key={index}>
              <CTd>{index + 1}</CTd>
              <CTd>{item.homeworkType}</CTd>
              <CTd>{item.puan}</CTd>
              <CTd>{item.startDate}</CTd>
              <CTd>{item.endDate}</CTd>
              <CTd>
                {item.doneStudent === item.totalStudent
                  ? "Tamamlandı"
                  : `Öğrenci: ${item.doneStudent} / ${item.totalStudent}`}
              </CTd>
              <CTd>
                <DeleteButton
                  width={"90%"}
                  onClick={() =>
                    handleHomeworkDelete(
                      item.id,
                      item.fileName,
                      item.homeworkType
                    )
                  }
                >
                  Ödevi Sil
                </DeleteButton>
              </CTd>
              <CTd>
                <Button
                  width={"90%"}
                  onClick={() => handleHomeworkDetail(item.id)}
                >
                  Detaylar
                </Button>
              </CTd>
            </CTr>
          ))}
        </CTbody>
      </CTable>
    </div>
  );
}

const CustomInputSelect = styled(InputSelect)`
padding: 8px;
margin-bottom: 0rem;
width: 90%;
font-size: .8rem;
`;



export default HomeworkList;
