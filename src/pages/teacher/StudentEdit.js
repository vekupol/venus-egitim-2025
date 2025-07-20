import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ClassContainer,
  Container,
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
import { db } from "../../firebase";
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

function StudentEdit() {
  const [teacherUser] = useAuthState(auth);
  const belirliKullaniciUID = teacherUser ? teacherUser.uid : null;

  const { studentUid } = useParams();
  const [user, setUser] = useState([]);
  const [userData, setUserData] = useState("");
  const [homework, setHomeworks] = useState([]);
  const [myHomework, setMyHomeworks] = useState([]);
  console.log(homework);

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
        } else {
          console.log("Sınıf belgesi bulunamadı!");
        }
      } catch (error) {
        console.error("Öğrenci getirme hatası:", error);
      }
    };

    fetchStudents();
  }, [studentUid, belirliKullaniciUID]);

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
    // Diğer form alanları buraya eklenebilir
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
    // Diğer form alanları buraya eklenebilir
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Form değerlerini al
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

    // Boş bir form kontrolü
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
      return; // Form boşsa işlemi durdur
    }

    try {
      // Form verilerini Firestore'a ekle
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
        bittiMi: 0,
        studentUid: user.uid,
        teacherUid: belirliKullaniciUID,
      };

      // Öğrenci belgesini al
      const studentDocRef = doc(db, "users", user.uid);
      const studentDocSnap = await getDoc(studentDocRef);

      if (studentDocSnap.exists()) {
        const studentData = studentDocSnap.data();

        // Eski ödevler dizisi var mı kontrol et
        const currentHomeworks = studentData.homeworks || [];

        // Yeni ödevi ekle
        const newHomeworkRef = await addDoc(collection(db, "homeworks"), {
          ...homeworkData,
          // Ödev verilerini eklerken aynı zamanda ID'sini al
        });

        const homeworkId = newHomeworkRef.id; // Yeni ödevin ID'si

        const updatedHomeworks = [
          ...currentHomeworks,
          { ...homeworkData, id: homeworkId },
        ];

        // Öğrenci belgesini güncelle
        await updateDoc(studentDocRef, { homeworks: updatedHomeworks });
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
          // Diğer form alanları sıfırlanabilir
        });
      } else {
        console.log("Öğrenci belgesi bulunamadı!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleFormSubmit2 = async (event) => {
    event.preventDefault();
    // Form değerlerini al
    const {
      className2,
      yayinevi,
      note2,
      kitapAdi,
      unit2,
      baslangic,
      bitis,
      startDate2,
      endDate2,
    } = formValues2;

    // Boş bir form kontrolü
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
      return; // Form boşsa işlemi durdur
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
        bittiMi: 0,
        studentUid: user.uid,
        teacherUid: belirliKullaniciUID,
      };

      // Öğrenci belgesini al
      const studentDocRef = doc(db, "users", user.uid);
      const studentDocSnap = await getDoc(studentDocRef);

      if (studentDocSnap.exists()) {
        const studentData = studentDocSnap.data();

        // Eski ödevler dizisi var mı kontrol et
        const currentHomeworks = studentData.homeworks || [];

        // Yeni ödevi ekle
        const newHomeworkRef = await addDoc(collection(db, "homeworks"), {
          ...homeworkData,
          // Ödev verilerini eklerken aynı zamanda ID'sini al
        });

        const homeworkId = newHomeworkRef.id; // Yeni ödevin ID'si

        const updatedHomeworks = [
          ...currentHomeworks,
          { ...homeworkData, id: homeworkId },
        ];

        // Öğrenci belgesini güncelle
        await updateDoc(studentDocRef, { homeworks: updatedHomeworks });
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
          // Diğer form alanları sıfırlanabilir
        });
      } else {
        console.log("Öğrenci belgesi bulunamadı!");
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
      studentUid: user.uid,
      teacherUid: belirliKullaniciUID,
    });
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormValues2({
      ...formValues2,
      [name]: value,
      studentUid: user.uid,
      teacherUid: belirliKullaniciUID,
    });
  };

  const handleHomeworkDelete = async (event, itemId) => {
    event.preventDefault();

    try {
      const studentDocRef = doc(db, "users", user.uid);
      const studentDocSnap = await getDoc(studentDocRef);

      if (studentDocSnap.exists()) {
        const studentData = studentDocSnap.data();
        const currentHomeworks = studentData.homeworks || [];

        // Ödev ID'sine göre belgeyi bul ve sil
        const updatedHomeworks = currentHomeworks.filter(
          (homework) => homework.id !== itemId
        );
        await updateDoc(studentDocRef, { homeworks: updatedHomeworks });
        setMyHomeworks(updatedHomeworks);
      } else {
        console.log("Öğrenci belgesi bulunamadı!");
      }
    } catch (error) {
      console.error("Ödev silme hatası:", error);
    }
  };

  // Verileri hazırla
  const tamamlandi = homework.filter((item) => item.bittiMi === 1).length;
  const tamamlanmadi = homework.filter((item) => item.bittiMi === 0).length;

  // PieChart için veriler
  const PieData = [
    ["TamamlandıMı", "Adet"],
    ["Tamamlanan Ödev Sayısı", tamamlandi],
    ["Tamamlanmayan Ödev Sayısı", tamamlanmadi],
  ];

  const PieOptions = {
    title: "Ödevlerin Tamamlanma Durumu",
    is3D: true,
    colors: ["#674188", "#c4302b", "#0000ff", "#ffff00", "#ff00ff"], // Özel renkler
    chartArea: { width: "80%", height: "80%" }, // Grafik alanı boyutu
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
      <Name>{userData.displayName} </Name>
      <Container>
        <Students>
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
                Bu ödevin puanı <span>100 puandır</span>.
              </p>
            </FormGroup>
            <ButtonO type="submit">Ödev Gönder</ButtonO>
          </Form>

          <StyledTable>
            <thead>
              <TableRow>
                <TableHeader>No</TableHeader>
                <TableHeader>Ödev Kazanımı</TableHeader>
                <TableHeader>Puanı</TableHeader>
                <TableHeader>Veriliş Tarihi</TableHeader>
                <TableHeader>Bitiş Tarihi</TableHeader>
                <TableHeader>İlerleme Durumu</TableHeader>
                <TableHeader></TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {myHomework &&
                myHomework.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.kazanim}</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.endDate}</TableCell>
                    <TableCell>Tamamlandı</TableCell>
                    <TableCell>
                      <ButtonSil
                        onClick={(event) =>
                          handleHomeworkDelete(event, item.id)
                        }
                      >
                        Ödevi Sil
                      </ButtonSil>
                    </TableCell>
                  </TableRow>
                ))}
            </tbody>
          </StyledTable>
        </Students>
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
            <ButtonO type="submit">Ödev Gönder</ButtonO>
          </Form>

          <Students>
            <MyStudents>Tüm Ödevleri</MyStudents>
            <Aciklama>
              Öğrencinize{" "}
              <span>sizin ve platforma kayıtlı öğretmenlerimizin</span> verdiği
              tüm ödevler bu alanda gözükür.
            </Aciklama>
            <StyledTable>
              <thead>
                <TableRow>
                  <TableHeader>No</TableHeader>
                  <TableHeader>Ödev Kazanımı</TableHeader>
                  <TableHeader>Puanı</TableHeader>
                  <TableHeader>Veriliş Tarihi</TableHeader>
                  <TableHeader>Bitiş Tarihi</TableHeader>
                  <TableHeader>İlerleme Durumu</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {homework &&
                  homework.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.kazanim}</TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>{item.startDate}</TableCell>
                      <TableCell>{item.endDate}</TableCell>
                      <TableCell>Tamamlanmadı</TableCell>
                    </TableRow>
                  ))}
              </tbody>
            </StyledTable>
          </Students>
        </Homeworks>
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

export default StudentEdit;
