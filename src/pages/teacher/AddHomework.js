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
  const [fileStartDate, setFileStartDate] = useState("");
  const [fileEndDate, setFileEndDate] = useState("");

  const [formValues, setFormValues] = useState({
    className: "",
    unit: "",
    kazanims: [],
    note: "",
    soruSayisi: "",
    startDate: "",
    endDate: "",
    homeworkType: "Platform Ödevi",
  });

  const [formValues2, setFormValues2] = useState({
    className2: "",
    yayinevi: "",
    kitapAdi: "",
    unit2: "",
    baslangic: "",
    bitis: "",
    startDate2: "",
    endDate2: "",
    note2: "",
    homeworkType: "Kitap Ödevi",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRef = collection(db, "classes");
        const querySnapshot = await getDocs(
          firestoreQuery(classRef, where("classUid", "==", classAddedClassUid))
        );

        if (!querySnapshot.empty) {
          const classDoc = querySnapshot.docs[0];
          const classData = classDoc.data();
          setClassData(classData);
          setAllStudents(classData.students || []);
        }
      } catch (error) {
        console.error("Sınıf verileri alınırken hata:", error);
      }
    };

    fetchData();
  }, [classAddedClassUid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
      teacherUid: belirliKullaniciUID,
      classUid: classAddedClassUid,
    }));
  };

  const handleKazanimsChange = (event) => {
    const options = Array.from(
      event.target.selectedOptions,
      (opt) => opt.value
    );
    setFormValues((prev) => ({
      ...prev,
      kazanims: options,
    }));
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormValues2((prev) => ({
      ...prev,
      [name]: value,
      teacherUid: belirliKullaniciUID,
      classUid: classAddedClassUid,
    }));
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // 🔄 Ortak Kayıt Fonksiyonu
  const saveHomework = async (homeworkData) => {
    const newHomeworkRef = await addDoc(
      collection(db, "homeworks"),
      homeworkData
    );
    const homeworkId = newHomeworkRef.id;

    // Sınıf belgesini güncelle
    const classDocRef = doc(db, "classes", classAddedClassUid);
    const classSnap = await getDoc(classDocRef);
    if (classSnap.exists()) {
      const classInfo = classSnap.data();
      const updatedHomeworks = [
        ...(classInfo.homeworks || []),
        { ...homeworkData, id: homeworkId },
      ];
      await updateDoc(classDocRef, { homeworks: updatedHomeworks });
    }

    // Öğrenci belgelerini güncelle
    for (const uid of uidList) {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const updatedUserHomeworks = [
          ...(userData.homeworks || []),
          { ...homeworkData, id: homeworkId },
        ];
        await updateDoc(userRef, { homeworks: updatedUserHomeworks });
      }
    }
  };

  // ✅ Venüs Eğitim'den Ödev Ver
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { className, unit, kazanims, note, soruSayisi, startDate, endDate } =
      formValues;

    if (
      !className ||
      !unit ||
      kazanims.length === 0 ||
      !soruSayisi ||
      !startDate ||
      !endDate
    ) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const homeworkData = {
      className,
      unit,
      kazanims,
      note,
      soruSayisi,
      startDate: startDate.split("-").reverse().join("-"),
      endDate: endDate.split("-").reverse().join("-"),
      classUid: classAddedClassUid,
      teacherUid: belirliKullaniciUID,
      totalStudent: uidList.length,
      doneStudent: 0,
      homeworkType: "Platform Ödevi",
      doneStudents: uidList, // ✅ Düzeltildi: tüm öğrenciler eklendi
    };

    await saveHomework(homeworkData);
    alert("Venüs Eğitim'den ödev başarıyla gönderildi!");
    window.location.reload();
  };

  // ✅ Soru Bankalarından Ödev Ver
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

    const homeworkData = {
      className: className2,
      yayinevi,
      kitapAdi,
      unit: unit2,
      baslangic,
      bitis,
      startDate: startDate2.split("-").reverse().join("-"),
      endDate: endDate2.split("-").reverse().join("-"),
      note: note2,
      classUid: classAddedClassUid,
      teacherUid: belirliKullaniciUID,
      totalStudent: uidList.length,
      doneStudent: 0,
      homeworkType: "Kitap Ödevi",
      doneStudents: uidList, // ✅ Düzeltildi
    };

    await saveHomework(homeworkData);
    alert("Soru bankasından ödev başarıyla gönderildi!");
    window.location.reload();
  };

  // ✅ Dosya Formatında Ödev Ver
  const handleFileFormSubmit = async (event) => {
    event.preventDefault();
    if (!file || !fileStartDate || !fileEndDate) {
      alert("Lütfen dosya ve gerekli alanları doldurun.");
      return;
    }

    const homeworkData = {
      note: fileNote,
      classUid: classAddedClassUid,
      doneStudent: 0,
      endDate: fileEndDate.split("-").reverse().join("-"),
      startDate: fileStartDate.split("-").reverse().join("-"),
      totalStudent: uidList.length,
      teacherUid: belirliKullaniciUID,
      homeworkType: "Dosya Ödevi",
      fileName: file.name,
      fileURL: "",
      doneStudents: uidList, // ✅ Düzeltildi
    };

    const storageRef = ref(
      storage,
      `homework-files/${classAddedClassUid}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    homeworkData.fileURL = await getDownloadURL(storageRef);

    await saveHomework(homeworkData);
    alert("Dosya formatında ödev başarıyla gönderildi!");
    window.location.reload();
  };

  return (
    <ClassContainer>
      <ClassContainer2>
        <Name>
          <ClassName>{classData.className} Sınıfına Ödev Gönder</ClassName>
        </Name>
        <Container>
          {/* Venüs Eğitim'den Ödev Ver */}
          <Homeworks>
            <Form onSubmit={handleFormSubmit}>
              <h3>Venüs Eğitim'den Ödev Ver</h3>
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
                  <Option>Lütfen bir ünite seçiniz...</Option>
                  <Option>Mantık</Option>
                  <Option>Kümeler</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Kazanımlar:</Label>
                <Select
                  multiple
                  value={formValues.kazanims}
                  onChange={handleKazanimsChange}
                >
                  <Option>1.1.1. Doğru önerme nedir?</Option>
                  <Option>1.1.2. Yanlış önerme nedir?</Option>
                  <Option>1.2.1. Koşullu önerme nedir?</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Soru Sayısı:</Label>
                <Select
                  name="soruSayisi"
                  value={formValues.soruSayisi}
                  onChange={handleInputChange}
                >
                  <Option>Soru Sayısı giriniz</Option>
                  {[...Array(101).keys()].map((n) => (
                    <Option key={n}>{n + 1}</Option>
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
              <Button width="100%" type="submit">
                Ödev Gönder
              </Button>
            </Form>
          </Homeworks>

          {/* Soru Bankalarından Ödev Ver */}
          <Homeworks>
            <Form onSubmit={handleFormSubmit2}>
              <h3>Soru Bankalarından Ödev Ver</h3>
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
                  <Option>Bir kitap seçiniz...</Option>
                  <Option>Matematik Soru Bankası</Option>
                  <Option>Fizik Test Kitabı</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Ünite:</Label>
                <Select
                  name="unit2"
                  value={formValues2.unit2}
                  onChange={handleInputChange2}
                >
                  <Option>Lütfen bir ünite seçiniz...</Option>
                  <Option>Mantık</Option>
                  <Option>Kümeler</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Sayfa Başlangıç:</Label>
                <InputDate
                  type="number"
                  name="baslangic"
                  value={formValues2.baslangic}
                  onChange={handleInputChange2}
                />
              </FormGroup>
              <FormGroup>
                <Label>Sayfa Bitiş:</Label>
                <InputDate
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
              <Button width="100%" type="submit">
                Ödev Gönder
              </Button>
            </Form>
          </Homeworks>

          {/* Dosya Formatında Ödev Ver */}
          <Homeworks>
            <Form onSubmit={handleFileFormSubmit}>
              <h3>Dosya Formatında Ödev Ver</h3>
              <FormGroup>
                <Label>Ödev Dosyası Yükle:</Label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ödev Notu:</Label>
                <InputDate
                  value={fileNote}
                  onChange={(e) => setFileNote(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Başlangıç Tarihi:</Label>
                <InputDate
                  type="date"
                  value={fileStartDate}
                  onChange={(e) => setFileStartDate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Bitiş Tarihi:</Label>
                <InputDate
                  type="date"
                  value={fileEndDate}
                  onChange={(e) => setFileEndDate(e.target.value)}
                />
              </FormGroup>
              <Button width="100%" type="submit">
                Dosyayı Gönder
              </Button>
            </Form>
          </Homeworks>
        </Container>
        <HomeworkList paramsUid={classAddedClassUid} />
      </ClassContainer2>
    </ClassContainer>
  );
}

export default AddHomework;
