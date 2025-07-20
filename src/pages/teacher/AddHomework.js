import React, { useState, useEffect } from "react";
import {
  ClassContainer,
  Container,
  Homeworks,
  Name,
  ClassContainer2,
  ClassName,
} from "./ClassEdit";
import styled from "styled-components";
import {
  Option,
  Select,
  FormGroup,
  Label,
  InputDate,
  Form,
} from "./StudentEdit";
import { useParams } from "react-router-dom";
import {
  getDocs,
  addDoc,
  collection,
  doc,
  where,
  getDoc,
  updateDoc,
  query as firestoreQuery,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import HomeworkList from "./HomeworkList";
import { Button } from "../../components/buttons/Button.styled";

const storage = getStorage();

function AddHomework() {
  const [teacherUser] = useAuthState(auth);
  const belirliKullaniciUID = teacherUser ? teacherUser.uid : null;
  const [classData, setClassData] = useState([]);
  const { classAddedClassUid } = useParams();
  const [allStudents, setAllStudents] = useState([]);
  const uidList = allStudents.map((user) => user.uid);

  const [file, setFile] = useState(null);
  const [fileNote, setFileNote] = useState("");
  const [fileFormValues, setFileFormValues] = useState({
    soruSayisi: "",
    startDate: "",
    endDate: "",
    bittiMi: 0,
    homeworkType: "Dosya Ödevi", // Eklenen alan
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

          setClassData(userDocData);
          setAllStudents(allStudents);

          console.log(allStudents);
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }
      } catch (error) {
        console.error("Veri getirme hatası:", error);
      }
    };

    fetchData();
  }, [classAddedClassUid]);

  const [formValues, setFormValues] = useState({
    className: "",
    unit: "",
    kazanim: "",
    konuTekrari: "",
    note: "",
    soruSayisi: "",
    startDate: "",
    endDate: "",
    bittiMi: 0,
    homeworkType: "Platform Ödevi",
  });

  const [formValues2, setFormValues2] = useState({
    className: "",
    unit: "",
    kazanim: "",
    note2: "",
    konuTekrari: "",
    soruSayisi: "",
    startDate: "",
    endDate: "",
    bittiMi: 0,
    homeworkType: "Kitap Ödevi",
    // Diğer form alanları buraya eklenebilir
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
      teacherUid: belirliKullaniciUID,
      classUid: classAddedClassUid,
    });
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormValues2({
      ...formValues2,
      [name]: value,
      teacherUid: belirliKullaniciUID,
      classUid: classAddedClassUid,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const {
      className,
      unit,
      kazanim,
      note,
      konuTekrari,
      soruSayisi,
      startDate,
      endDate,
    } = formValues;

    if (
      !className ||
      !unit ||
      !kazanim ||
      !konuTekrari ||
      !soruSayisi ||
      !startDate ||
      !endDate
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const reversedStartDate = startDate.split("-").reverse().join("-");
      const reversedEndDate = endDate.split("-").reverse().join("-");

      const homeworkData = {
        className,
        unit,
        kazanim,
        konuTekrari,
        note,
        soruSayisi,
        startDate: reversedStartDate,
        endDate: reversedEndDate,
        classUid: classAddedClassUid,
        teacherUid: belirliKullaniciUID,
        totalStudent: uidList.length,
        doneStudent: 0,
        homeworkType: formValues.homeworkType,
        doneStudents: uidList,
      };

      // Öncelikle ödevi "homeworks" koleksiyonuna ekleyelim
      const newHomeworkRef = await addDoc(
        collection(db, "homeworks"),
        homeworkData
      );
      const homeworkId = newHomeworkRef.id;

      const classDocRef = doc(db, "classes", classAddedClassUid);
      const classDocSnap = await getDoc(classDocRef);

      if (classDocSnap.exists()) {
        const classData = classDocSnap.data();
        const currentHomeworks = classData.homeworks || [];
        const updatedHomeworksForClass = [
          ...currentHomeworks,
          { ...homeworkData, refId: homeworkId },
        ];

        await updateDoc(classDocRef, { homeworks: updatedHomeworksForClass });

        for (const uid of uidList) {
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userHomeworks = userData.homeworks || [];
            const updatedUserHomeworks = [
              ...userHomeworks,
              { ...homeworkData, refId: homeworkId },
            ];

            await updateDoc(userDocRef, { homeworks: updatedUserHomeworks });
          } else {
            console.log("Öğrenci belgesi bulunamadı!");
          }
        }

        window.location.reload();

        setFormValues({
          className: "",
          unit: "",
          kazanim: "",
          note: "",
          konuTekrari: "",
          soruSayisi: "",
          startDate: "",
          endDate: "",
          bittiMi: 0,
        });
      } else {
        console.log("Sınıf belgesi bulunamadı!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleFormSubmit2 = async (event) => {
    event.preventDefault();

    const {
      className2,
      yayinevi,
      kitapAdi,
      unit2,
      baslangic,
      bitis,
      startDate2,
      endDate2,
      note2,
    } = formValues2;

    if (
      !className2 ||
      !yayinevi ||
      !kitapAdi ||
      !unit2 ||
      !baslangic ||
      !bitis ||
      !startDate2 ||
      !endDate2
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const reversedStartDate = startDate2.split("-").reverse().join("-");
      const reversedEndDate = endDate2.split("-").reverse().join("-");

      const homeworkData = {
        className: className2,
        yayinevi,
        kitapAdi,
        unit: unit2,
        baslangic,
        bitis,
        startDate: reversedStartDate,
        endDate: reversedEndDate,
        note: note2,
        teacherUid: belirliKullaniciUID,
        classUid: classAddedClassUid,
        totalStudent: uidList.length,
        doneStudent: 0,
        homeworkType: formValues2.homeworkType,
        refId: "",
        doneStudents: uidList,
      };

      const newHomeworkRef = await addDoc(
        collection(db, "homeworks"),
        homeworkData
      );
      const homeworkId = newHomeworkRef.id;

      const classDocRef = doc(db, "classes", classAddedClassUid);
      const classDocSnap = await getDoc(classDocRef);

      if (classDocSnap.exists()) {
        const classData = classDocSnap.data();
        const currentHomeworks = classData.homeworks || [];
        const updatedHomeworksForClass = [
          ...currentHomeworks,
          { ...homeworkData, refId: homeworkId },
        ];

        await updateDoc(classDocRef, { homeworks: updatedHomeworksForClass });

        for (const uid of uidList) {
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userHomeworks = userData.homeworks || [];
            const updatedUserHomeworks = [
              ...userHomeworks,
              { ...homeworkData, refId: homeworkId },
            ];

            await updateDoc(userDocRef, { homeworks: updatedUserHomeworks });
          } else {
            console.log("Öğrenci belgesi bulunamadı!");
          }
        }

        window.location.reload();

        setFormValues2({
          className2: "",
          yayinevi: "",
          kitapAdi: "",
          unit2: "",
          baslangic: "",
          bitis: "",
          startDate2: "",
          endDate2: "",
          note2: "",
          bittiMi: 0,
        });
      } else {
        console.log("Sınıf belgesi bulunamadı!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const reversedStartDate = formValues.startDate
        .split("-")
        .reverse()
        .join("-");
      const reversedEndDate = formValues.endDate.split("-").reverse().join("-");

      const homeworkData = {
        // Diğer alanlar...
        note: fileNote,
        classUid: classAddedClassUid, // Sınıf UID'si
        doneStudent: 0, // Başlangıçta teslim eden öğrenci sayısı sıfır olabilir
        endDate: reversedEndDate, // Bitiş tarihi
        startDate: reversedStartDate, // Başlangıç tarihi
        totalStudent: uidList.length, // Toplam öğrenci sayısı
        teacherUid: belirliKullaniciUID, // Öğretmen UID'si
        puan: formValues.soruSayisi, //puan
        homeworkType: fileFormValues.homeworkType,
        fileName: file.name,
        doneStudents: uidList,
        // Diğer alanlar...
      };

      // Eğer dosya seçilmişse, Firebase Storage'a yükle
      if (file) {
        const storageRef = ref(
          storage,
          `homework-files/${classAddedClassUid}/${file.name}`
        );
        await uploadBytes(storageRef, file);

        // Dosyanın indirme URL'sini al ve veritabanına ekle
        const downloadURL = await getDownloadURL(storageRef);
        homeworkData.fileURL = downloadURL;
      }

      // Firestore'a ödevi ekleme
      const newHomeworkRef = await addDoc(
        collection(db, "homeworks"),
        homeworkData
      );
      const newHomeworkId = newHomeworkRef.id;

      // Sınıf belgesini güncelleme
      const classDocRef = doc(db, "classes", classAddedClassUid);
      const classDocSnap = await getDoc(classDocRef);

      if (classDocSnap.exists()) {
        const classData = classDocSnap.data();
        const currentHomeworks = classData.homeworks || [];
        const updatedHomeworksForClass = [
          ...currentHomeworks,
          { ...homeworkData, refId: newHomeworkId },
        ];

        await updateDoc(classDocRef, { homeworks: updatedHomeworksForClass });

        for (const uid of uidList) {
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userHomeworks = userData.homeworks || [];
            const updatedUserHomeworks = [
              ...userHomeworks,
              { ...homeworkData, refId: newHomeworkId },
            ];

            await updateDoc(userDocRef, { homeworks: updatedUserHomeworks });
          } else {
            console.log("Öğrenci belgesi bulunamadı!");
          }
        }

        alert("Ödeviniz gönderildi...");
        window.location.reload();

        setFormValues({
          className: "",
          unit: "",
          kazanim: "",
          note: "",
          konuTekrari: "",
          soruSayisi: "",
          startDate: "",
          endDate: "",
          bittiMi: 0,
        });

        setFile(null);
        setFileNote("");
      } else {
        console.log("Sınıf belgesi bulunamadı!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <ClassContainer>
      <ClassContainer2>
        <Name>
          <ClassName>{classData.className} Sınıfına Ödev Gönder</ClassName>{" "}
        </Name>
        <Container>
          <Homeworks>
            <Form onSubmit={handleFormSubmit}>
              <h3>Platform Ödevi Verme Bölümü</h3>
              <FormGroup>
                <Label>Sınıf:</Label>
                <Select
                  name="className"
                  value={formValues.className}
                  onChange={handleInputChange}
                >
                  <Option>Bir sınıf seçiniz...</Option>
                  <Option>9.Sınıf</Option>
                  <Option>10.Sınıf</Option>
                  <Option>11.Sınıf</Option>
                  <Option>12.Sınıf</Option>
                  <Option>TYT Konuları</Option>
                  <Option>AYT Konuları</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Ünite:</Label>
                <Select
                  name="unit"
                  value={formValues.unit}
                  onChange={handleInputChange}
                >
                  <Option value="">Lütfen bir ünite seçiniz...</Option>
                  <Option>Mantık </Option>
                  <Option>Kümeler </Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Kazanım:</Label>
                <Select
                  name="kazanim"
                  value={formValues.kazanim}
                  onChange={handleInputChange}
                >
                  <Option value="">Lütfen bir kazanım seçiniz...</Option>
                  <Option>1.1.1. Doğru önerme nedir? </Option>
                  <Option>1.1.2. Yanlış önerme nedir? </Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Konu Tekrarı:</Label>
                <Select
                  name="konuTekrari"
                  value={formValues.konutekrari}
                  onChange={handleInputChange}
                >
                  <Option>Konu tekrar edilsin mi?</Option>
                  <Option>Evet</Option>
                  <Option>Hayır</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Soru Sayısı:</Label>
                <Select
                  name="soruSayisi"
                  value={formValues.soruSayisi}
                  onChange={handleInputChange}
                >
                  <Option>Soru Sayısı giriniz.</Option>
                  {[...Array(101).keys()].map((number) => (
                    <Option key={number}>{number + 1}</Option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Başlangıç Tarihi:</Label>
                <InputDate
                  type="date"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bitiş Tarihi:</Label>
                <InputDate
                  type="date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Not Ekle:</Label>
                <InputDate
                  type="text"
                  name="note"
                  value={formValues.note}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ödev Ağırlığı:</Label>
                <p>
                  Bu ödev yaklaşık <span>3 saat</span> sürmektedir.
                </p>
              </FormGroup>
              <FormGroup>
                <Label>Ödev Ağırlığı:</Label>
                <p>
                  Bu ödevin puanı <span>116 puandır</span>.
                </p>
              </FormGroup>
              <Button width="100%" type="submit">
                Ödev Gönder
              </Button>
            </Form>
          </Homeworks>
          <Homeworks>
            <Form onSubmit={handleFormSubmit2}>
              <h3>Kitap Ödevi Verme Bölümü</h3>
              <FormGroup>
                <Label>Sınıf:</Label>
                <Select
                  name="className2"
                  value={formValues2.className2}
                  onChange={handleInputChange2}
                >
                  <Option>Bir sınıf seçiniz...</Option>
                  <Option>9.Sınıf</Option>
                  <Option>10.Sınıf</Option>
                  <Option>11.Sınıf</Option>
                  <Option>12.Sınıf</Option>
                  <Option>TYT Konuları</Option>
                  <Option>AYT Konuları</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Yayınevi:</Label>
                <Select
                  name="yayinevi"
                  value={formValues2.yayinevi}
                  onChange={handleInputChange2}
                >
                  <Option>Bir yayınevi seçiniz...</Option>
                  <Option>A Yayınları</Option>
                  <Option>B Yayınları</Option>
                  <Option>C Yayınları</Option>
                  <Option>D Yayınları</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Kitap Adı:</Label>
                <Select
                  name="kitapAdi"
                  value={formValues2.kitapAdi}
                  onChange={handleInputChange2}
                >
                  <Option>Konu tekrar edilsin mi?</Option>
                  <Option>Evet</Option>
                  <Option>Hayır</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Ünite:</Label>
                <Select
                  name="unit2"
                  value={formValues2.unit2}
                  onChange={handleInputChange2}
                >
                  <Option value="">Lütfen bir ünite seçiniz...</Option>
                  <Option>Mantık </Option>
                  <Option>Kümeler </Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Sayfa Başlangıç:</Label>
                <input
                  type="number"
                  name="baslangic"
                  value={formValues2.baslangic}
                  onChange={handleInputChange2}
                />
              </FormGroup>

              <FormGroup>
                <Label>Sayfa Bitiş:</Label>
                <input
                  type="number"
                  name="bitis"
                  value={formValues2.bitis}
                  onChange={handleInputChange2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Başlangıç Tarihi:</Label>
                <InputDate
                  type="date"
                  name="startDate2"
                  value={formValues2.startDate2}
                  onChange={handleInputChange2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bitiş Tarihi:</Label>
                <InputDate
                  type="date"
                  name="endDate2"
                  value={formValues2.endDate2}
                  onChange={handleInputChange2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Not Ekle:</Label>
                <InputDate
                  type="text"
                  name="note2"
                  value={formValues2.note2}
                  onChange={handleInputChange2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ödev Ağırlığı:</Label>
                <p>
                  Bu ödev yaklaşık <span>3 saat</span> sürmektedir.
                </p>
              </FormGroup>
              <FormGroup>
                <Label>Ödev Ağırlığı:</Label>
                <p>
                  Bu ödevin puanı <span>100 puandır</span>.
                </p>
              </FormGroup>
              <Button width="100%" type="submit">
                Ödev Gönder
              </Button>
            </Form>
          </Homeworks>
          <Homeworks>
            <Form onSubmit={handleFileFormSubmit}>
              <h3>Dosya Yükleme Bölümü</h3>
              <FormGroup>
                <Label>Ödev Dosyası Yükle:</Label>
                <input
                  type="file"
                  accept=".pdf, .doc, .docx, .xls, .xlsx"
                  onChange={handleFileInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ödev Notu:</Label>
                <InputDate
                  name="fileNote"
                  value={fileNote}
                  onChange={(e) => setFileNote(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ödev Puan:</Label>
                <InputDate
                  name="soruSayisi"
                  value={formValues.soruSayisi}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Başlangıç Tarihi:</Label>
                <InputDate
                  type="date"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bitiş Tarihi:</Label>
                <InputDate
                  type="date"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button width="100%" type="submit">
                Dosyayı Gönder
              </Button>
            </Form>
          </Homeworks>
        </Container>
        <Container2>
          <HomeworkList paramsUid={classAddedClassUid} />
        </Container2>
      </ClassContainer2>
    </ClassContainer>
  );
}

const Container2 = styled.div`
  padding: 20px 10px;
  width: 95%;
  margin: 0px 40px 100px;
  border: 1px solid var(--main-color);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export default AddHomework;
