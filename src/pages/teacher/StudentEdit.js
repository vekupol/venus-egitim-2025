import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ClassContainer,
  Homeworks,
  Name,
  Students,
  MyStudents,
  Aciklama,
  StyledTable,
  TableRow,
  TableHeader,
  TableCell,
  ButtonSil,
  ButtonO,
} from "./ClassEdit";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
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
import { auth } from "../../firebase";
import PieChart from "../../components/graphs/PieChart";
import BarChart from "../../components/graphs/BarChart";
import {
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import ReactTable from "../../components/tables/ReactTable";

function StudentEdit() {
  const [teacherUser] = useAuthState(auth);
  const belirliKullaniciUID = teacherUser ? teacherUser.uid : null;
  const { studentUid } = useParams();
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState("");
  const [homework, setHomeworks] = useState([]);
  const [myHomework, setMyHomeworks] = useState([]);
  const [fileMap, setFileMap] = useState({});
  const [availableHomeworkFiles, setAvailableHomeworkFiles] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const data = myHomework.map((item, index) => ({
    id: item.id,
    no: index + 1,
    className: item.className,
    unit: item.unit,
    kazanims: Array.isArray(item.kazanims)
      ? item.kazanims.join(", ")
      : item.kazanims,
    startDate: item.startDate,
    endDate: item.endDate,
    durum: item.bittiMi === 1 ? "Tamamlandı" : "Tamamlanmadı",
  }));

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const classRef = collection(db, "users");
        const query = firestoreQuery(classRef, where("uid", "==", studentUid));
        const classQuerySnapshot = await getDocs(query);

        if (!classQuerySnapshot.empty) {
          const classDoc = classQuerySnapshot.docs[0];
          const userDocData = classDoc.data();
          const userData = userDocData.userData || [];
          const userHomework = userDocData.homeworks || [];
          const myFilteredHomework = userHomework.filter(
            (item) => item.teacherUid === belirliKullaniciUID
          );

          setUser(userDocData);
          setUserData(userData);
          setHomeworks(userHomework);
          setMyHomeworks(myFilteredHomework);
        }
      } catch (error) {
        console.error("Öğrenci getirme hatası:", error);
      }
    };

    fetchStudents();
  }, [studentUid, belirliKullaniciUID]);

  const [platformValues, setPlatformValues] = useState({
    className: "",
    unit: "",
    kazanims: [],
    note: "",
    soruSayisi: "",
    startDate: "",
    endDate: "",
    bittiMi: 0,
  });

  const [kitapValues, setKitapValues] = useState({
    className: "",
    yayinevi: "",
    kitapAdi: "",
    unit: "",
    baslangic: "",
    bitis: "",
    startDate: "",
    endDate: "",
    note: "",
    bittiMi: 0,
  });

  const [fileValues, setFileValues] = useState({
    note: "",
    startDate: "",
    endDate: "",
  });

  const fetchStudentHomeworkFiles = async () => {
    const map = {};
    for (const item of myHomework) {
      const uidPath = item.studentUid || studentUid;
      const path = `homework-files/${uidPath}/${item.id}/`;
      try {
        const result = await listAll(ref(storage, path));
        const files = await Promise.all(
          result.items.map(async (fileRef) => ({
            name: fileRef.name,
            url: await getDownloadURL(fileRef),
            ref: fileRef,
          }))
        );
        map[item.id] = files;
      } catch {
        map[item.id] = [];
      }
    }
    setFileMap(map);
  };

  useEffect(() => {
    if (myHomework.length > 0) {
      fetchStudentHomeworkFiles();
    }
  }, [myHomework]);

  const checkHomeworkFiles = async () => {
    const available = {};
    for (const item of myHomework) {
      const folderPath = `homework-files/${item.studentUid}/${item.id}/`;
      const folderRef = ref(storage, folderPath);
      try {
        const res = await listAll(folderRef);
        available[item.id] = res.items.length > 0;
      } catch {
        available[item.id] = false;
      }
    }
    setAvailableHomeworkFiles({ ...available });
  };

  useEffect(() => {
    if (myHomework.length > 0) {
      checkHomeworkFiles();
    }
  }, [myHomework]);

  const handleDeleteStudentFile = async (fileRef, homeworkId) => {
    try {
      await deleteObject(fileRef);
      fetchStudentHomeworkFiles();
    } catch (err) {
      console.error("Dosya silinemedi:", err);
      alert("Dosya silinemedi.");
    }
  };

  const handleViewHomework = async (item) => {
    const fileRefPath = `homework-files/${item.studentUid}/${item.id}/`;
    const folderRef = ref(storage, fileRefPath);
    try {
      const result = await listAll(folderRef);
      if (result.items.length > 0) {
        const downloadURL = await getDownloadURL(result.items[0]);
        window.open(downloadURL, "_blank");
      } else {
        setAvailableHomeworkFiles((prev) => ({ ...prev, [item.id]: false }));
        alert("Dosya bulunamadı. Silinmiş olabilir.");
      }
    } catch (error) {
      console.error("Dosya alınamadı:", error);
    }
  };

  const saveHomework = async (homeworkData) => {
    const newHomeworkRef = await addDoc(
      collection(db, "homeworks"),
      homeworkData
    );
    const homeworkId = newHomeworkRef.id;

    const studentDocRef = doc(db, "users", user.uid);
    const studentDocSnap = await getDoc(studentDocRef);
    if (studentDocSnap.exists()) {
      const studentData = studentDocSnap.data();
      const currentHomeworks = studentData.homeworks || [];
      const updatedHomeworks = [
        ...currentHomeworks,
        { ...homeworkData, id: homeworkId },
      ];
      await updateDoc(studentDocRef, { homeworks: updatedHomeworks });
    }
  };

  const handlePlatformSubmit = async (e) => {
    e.preventDefault();
    const homeworkData = {
      className: platformValues.className,
      unit: platformValues.unit,
      kazanims: platformValues.kazanims,
      note: platformValues.note,
      soruSayisi: platformValues.soruSayisi,
      startDate: platformValues.startDate.split("-").reverse().join("-"),
      endDate: platformValues.endDate.split("-").reverse().join("-"),
      bittiMi: 0,
      studentUid: user.uid,
      teacherUid: belirliKullaniciUID,
    };
    await saveHomework(homeworkData);
    window.location.reload();
  };

  const handleKitapSubmit = async (e) => {
    e.preventDefault();
    const homeworkData = {
      className: kitapValues.className,
      yayinevi: kitapValues.yayinevi,
      kitapAdi: kitapValues.kitapAdi,
      unit: kitapValues.unit,
      baslangic: kitapValues.baslangic,
      bitis: kitapValues.bitis,
      startDate: kitapValues.startDate.split("-").reverse().join("-"),
      endDate: kitapValues.endDate.split("-").reverse().join("-"),
      note: kitapValues.note,
      bittiMi: 0,
      studentUid: user.uid,
      teacherUid: belirliKullaniciUID,
    };
    await saveHomework(homeworkData);
    window.location.reload();
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Lütfen bir dosya seçin.");
      return;
    }

    const homeworkData = {
      note: fileValues.note,
      startDate: fileValues.startDate.split("-").reverse().join("-"),
      endDate: fileValues.endDate.split("-").reverse().join("-"),
      studentUid: user.uid,
      teacherUid: belirliKullaniciUID,
      bittiMi: 0,
    };

    const newHomeworkRef = await addDoc(
      collection(db, "homeworks"),
      homeworkData
    );
    const homeworkId = newHomeworkRef.id;

    const fileRef = ref(
      storage,
      `homework-files/${user.uid}/${homeworkId}/${selectedFile.name}`
    );
    await uploadBytes(fileRef, selectedFile);

    const fileURL = await getDownloadURL(fileRef);
    homeworkData.fileURL = fileURL;

    const studentDocRef = doc(db, "users", user.uid);
    const studentDocSnap = await getDoc(studentDocRef);
    if (studentDocSnap.exists()) {
      const studentData = studentDocSnap.data();
      const currentHomeworks = studentData.homeworks || [];
      await updateDoc(studentDocRef, {
        homeworks: [...currentHomeworks, { ...homeworkData, id: homeworkId }],
      });
    }

    window.location.reload();
  };

  const handleHomeworkDelete = async (event, itemId) => {
    event.preventDefault();
    const studentDocRef = doc(db, "users", user.uid);
    const studentDocSnap = await getDoc(studentDocRef);
    if (studentDocSnap.exists()) {
      const studentData = studentDocSnap.data();
      const currentHomeworks = studentData.homeworks || [];
      const deletedItem = currentHomeworks.find((h) => h.id === itemId);
      const updatedHomeworks = currentHomeworks.filter((h) => h.id !== itemId);
      await updateDoc(studentDocRef, { homeworks: updatedHomeworks });

      if (deletedItem) {
        const folderRef = ref(
          storage,
          `homework-files/${deletedItem.studentUid}/${deletedItem.id}/`
        );
        const files = await listAll(folderRef);
        for (const fileRef of files.items) {
          await deleteObject(fileRef);
        }
      }
      setMyHomeworks(updatedHomeworks);
      await checkHomeworkFiles();
    }
  };

  const tamamlandi = homework.filter((item) => item.bittiMi === 1).length;
  const tamamlanmadi = homework.filter((item) => item.bittiMi === 0).length;

  const PieData = [
    ["TamamlandıMı", "Adet"],
    ["Tamamlanan Ödev Sayısı", tamamlandi],
    ["Tamamlanmayan Ödev Sayısı", tamamlanmadi],
  ];

  const PieOptions = {
    title: "Ödevlerin Tamamlanma Durumu",
    is3D: true,
    colors: ["#674188", "#c4302b", "#0000ff", "#ffff00", "#ff00ff"],
    chartArea: { width: "80%", height: "80%" },
    pieSliceBorderColor: "transparent",
  };

  const BarData = [
    ["Sorular", "Çözülen Soru Sayısı", "Doğru Sayısı", "Yanlış Sayısı"],
    ["Pazartesi", 80, 70, 10],
    ["Salı", 37, 36, 1],
    ["Çarşamba", 26, 21, 5],
    ["Perşembe", 20, 19, 1],
    ["Cuma", 15, 15, 0],
    ["Cumartesi", 15, 15, 0],
    ["Pazar", 15, 15, 0],
  ];

  const BarOptions = {
    chart: {
      title: "Haftalık Performans",
      subtitle: "Bu hafta çözülen sorularda gösterdiği performansı",
    },
  };

  return (
    <ClassContainer>
      <Name>{userData.displayName}</Name>
      <Container>
        <ContainerFlex>
          {/* Platform Ödevi */}
          <ContainerBorder>
            <Form onSubmit={handlePlatformSubmit}>
              <h3>Venüs Eğitim'den Ödev Ver</h3>
              <FormGroup>
                <Label>Sınıf:</Label>
                <Select
                  name="className"
                  value={platformValues.className}
                  onChange={(e) =>
                    setPlatformValues({
                      ...platformValues,
                      className: e.target.value,
                    })
                  }
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
                  value={platformValues.unit}
                  onChange={(e) =>
                    setPlatformValues({
                      ...platformValues,
                      unit: e.target.value,
                    })
                  }
                >
                  <Option>Mantık</Option>
                  <Option>Kümeler</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Kazanımlar:</Label>
                <Select
                  multiple
                  name="kazanims"
                  value={platformValues.kazanims}
                  onChange={(e) =>
                    setPlatformValues({
                      ...platformValues,
                      kazanims: Array.from(
                        e.target.selectedOptions,
                        (opt) => opt.value
                      ),
                    })
                  }
                >
                  <Option>1.1.1. Doğru önerme nedir?</Option>
                  <Option>1.1.2. Yanlış önerme nedir?</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Soru Sayısı:</Label>
                <Select
                  name="soruSayisi"
                  value={platformValues.soruSayisi}
                  onChange={(e) =>
                    setPlatformValues({
                      ...platformValues,
                      soruSayisi: e.target.value,
                    })
                  }
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
                  value={platformValues.startDate}
                  onChange={(e) =>
                    setPlatformValues({
                      ...platformValues,
                      startDate: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Bitiş Tarihi:</Label>
                <InputDate
                  type="date"
                  name="endDate"
                  value={platformValues.endDate}
                  onChange={(e) =>
                    setPlatformValues({
                      ...platformValues,
                      endDate: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Not:</Label>
                <InputDate
                  type="text"
                  name="note"
                  value={platformValues.note}
                  onChange={(e) =>
                    setPlatformValues({
                      ...platformValues,
                      note: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <ButtonO type="submit">Ödev Gönder</ButtonO>
            </Form>
          </ContainerBorder>

          {/* Kitap Ödevi */}
          <ContainerBorder>
            <Form onSubmit={handleKitapSubmit}>
              <h3>Soru Bankalarından Ödev Ver</h3>
              <FormGroup>
                <Label>Sınıf:</Label>
                <Select
                  name="className"
                  value={kitapValues.className}
                  onChange={(e) =>
                    setKitapValues({
                      ...kitapValues,
                      className: e.target.value,
                    })
                  }
                >
                  <Option>9.Sınıf</Option>
                  <Option>10.Sınıf</Option>
                  <Option>11.Sınıf</Option>
                  <Option>12.Sınıf</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Yayınevi:</Label>
                <Select
                  name="yayinevi"
                  value={kitapValues.yayinevi}
                  onChange={(e) =>
                    setKitapValues({ ...kitapValues, yayinevi: e.target.value })
                  }
                >
                  <Option>A Yayınları</Option>
                  <Option>B Yayınları</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Kitap Adı:</Label>
                <Select
                  name="kitapAdi"
                  value={kitapValues.kitapAdi}
                  onChange={(e) =>
                    setKitapValues({ ...kitapValues, kitapAdi: e.target.value })
                  }
                >
                  <Option>Matematik Soru Bankası</Option>
                  <Option>Fizik Test Kitabı</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Ünite:</Label>
                <Select
                  name="unit"
                  value={kitapValues.unit}
                  onChange={(e) =>
                    setKitapValues({ ...kitapValues, unit: e.target.value })
                  }
                >
                  <Option>Mantık</Option>
                  <Option>Kümeler</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Sayfa Başlangıç:</Label>
                <InputDate
                  type="number"
                  value={kitapValues.baslangic}
                  onChange={(e) =>
                    setKitapValues({
                      ...kitapValues,
                      baslangic: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Sayfa Bitiş:</Label>
                <InputDate
                  type="number"
                  value={kitapValues.bitis}
                  onChange={(e) =>
                    setKitapValues({ ...kitapValues, bitis: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Başlangıç Tarihi:</Label>
                <InputDate
                  type="date"
                  value={kitapValues.startDate}
                  onChange={(e) =>
                    setKitapValues({
                      ...kitapValues,
                      startDate: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Bitiş Tarihi:</Label>
                <InputDate
                  type="date"
                  value={kitapValues.endDate}
                  onChange={(e) =>
                    setKitapValues({ ...kitapValues, endDate: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Not:</Label>
                <InputDate
                  type="text"
                  value={kitapValues.note}
                  onChange={(e) =>
                    setKitapValues({ ...kitapValues, note: e.target.value })
                  }
                />
              </FormGroup>
              <ButtonO type="submit">Ödev Gönder</ButtonO>
            </Form>
          </ContainerBorder>

          {/* Dosya Ödevi */}
          <ContainerBorder>
            <Form onSubmit={handleFileSubmit}>
              <h3>Dosya Formatında Ödev Ver</h3>
              <FormGroup>
                <Label>Dosya Yükle:</Label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </FormGroup>
              <FormGroup>
                <Label>Başlangıç Tarihi:</Label>
                <InputDate
                  type="date"
                  value={fileValues.startDate}
                  onChange={(e) =>
                    setFileValues({ ...fileValues, startDate: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Bitiş Tarihi:</Label>
                <InputDate
                  type="date"
                  value={fileValues.endDate}
                  onChange={(e) =>
                    setFileValues({ ...fileValues, endDate: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label>Not:</Label>
                <InputDate
                  type="text"
                  value={fileValues.note}
                  onChange={(e) =>
                    setFileValues({ ...fileValues, note: e.target.value })
                  }
                />
              </FormGroup>
              <ButtonO type="submit">Ödev Gönder</ButtonO>
            </Form>
          </ContainerBorder>
        </ContainerFlex>

        <ContainerBorder>
          <ReactTable
            data={data}
            fileMap={fileMap}
            handleHomeworkDelete={handleHomeworkDelete}
            handleDeleteStudentFile={handleDeleteStudentFile}
          />
        </ContainerBorder>
      </Container>
      <PieChart PieData={PieData} PieOptions={PieOptions} />
      <BarChart BarData={BarData} BarOptions={BarOptions} />
    </ClassContainer>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 0.1em 0.5em 0.5em;
  h3 {
    margin-bottom: 10px;
    text-decoration: underline;
  }
`;
export const FormGroup = styled.div`
  display: flex;
  margin-bottom: 10px;
  span {
    font-weight: bold;
    color: var(--main-color);
    text-decoration: underline;
  }
  input {
    width: 70%;
  }
`;
export const Label = styled.div`
  width: 30%;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
`;
export const Select = styled.select`
  width: 70%;
`;
export const Option = styled.option``;
export const InputDate = styled.input`
  width: 70%;
`;
export const ButtonGor = styled.button`
  background-color: #1d4ed8;
  color: white;
  font-size: 0.8rem;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  margin-left: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #2563eb;
  }
  &:disabled {
    background-color: #a1a1aa;
    color: #e4e4e7;
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--main-width);
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 0rem;
  }
`;
export const ContainerFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  max-width: var(--main-width);
  gap: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ContainerBorder = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid #e4e4e7;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  @media screen and (max-width: 768px) {
    padding: 0rem;
  }
`;

export default StudentEdit;
