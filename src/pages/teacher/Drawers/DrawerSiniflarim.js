import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getDocs,
  doc,
  query,
  collection,
  where,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Unit,
  UnitName,
  UnitDescription,
  Text,
  Title,
  Container,
  Main,
} from "../../student/Drawers/studentDrawerKonularim";
import { CustomLink2, Button } from "../../../components/buttons/Button.styled";
import {
  FormContainer,
  InputSave,
  InputText,
  LabelSubtitle,
} from "../../student/studentAyarlar";

function DrawerSiniflarim() {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      const q = query(
        collection(db, "classes"),
        where("teacherUid", "==", currentUserUid)
      );

      const getUserData = async () => {
        const querySnapshot = await getDocs(q);
        const userData = [];

        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });

        setUsers(userData);

        // 👇 premium bilgisi çekiliyor
        const userDocRef = doc(db, "users", currentUserUid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();
          setIsPremium(userDocData.premium === true); // ✅ EKLENDİ
        }
      };

      getUserData();
    }
  }, []);

  const handleAddClass = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const className = formData.get("className");
    const activationCode = formData.get("activationCode");

    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        const userDocRef = doc(db, "users", currentUserUid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();
          const addedActivationCodes = userDocData.addedActivationCodes || [];

          // Premium değilse aktivasyon kodu istenir
          if (!userDocData.premium) {
            const kodDurumuRef = doc(db, "kodlar", "kodlarDurumu");
            const kodDurumuSnap = await getDoc(kodDurumuRef);

            if (!kodDurumuSnap.exists()) {
              setErrorMessage("Kod veritabanına erişilemedi.");
              return;
            }

            const kodlar = kodDurumuSnap.data();

            if (!kodlar[activationCode]) {
              setErrorMessage("Geçersiz aktivasyon kodu.");
              return;
            }

            if (addedActivationCodes.includes(activationCode)) {
              setErrorMessage("Bu aktivasyon kodu zaten kullanılmış.");
              return;
            }

            await updateDoc(kodDurumuRef, { [activationCode]: false });
            await updateDoc(userDocRef, {
              addedActivationCodes: arrayUnion(activationCode),
              premium: true,
            });
          }

          // Sınıfı oluştur
          const newClassRef = doc(collection(db, "classes"));
          const newClassUid = newClassRef.id;

          await setDoc(newClassRef, {
            className: className,
            teacherUid: currentUserUid,
            students: [],
            classUid: newClassUid,
          });

          setUsers((prev) => [
            ...prev,
            {
              className,
              teacherUid: currentUserUid,
              students: [],
              classUid: newClassUid,
            },
          ]);

          setErrorMessage("");
        } else {
          console.error("Kullanıcı belgesi bulunamadı.");
        }
      } catch (error) {
        console.error("Sınıf ekleme hatası:", error);
      }
    }
  };

  const handleGoToClass = (classUid) => {
    navigate(`/ogretmen-ekrani/sinif-duzenle/${classUid}`);
  };

  return (
    <Container>
      <Title>
        <Text>Sınıflarım</Text>
      </Title>
      <Main>
        <Unit>
          <UnitName style={{ color: "#674188", fontSize: "1.5rem" }}>
            Sınıf Adı
          </UnitName>
          <UnitDescription
            style={{ color: "#674188", fontSize: "1.2rem", fontWeight: "bold" }}
          ></UnitDescription>
          <CustomLink2></CustomLink2>
        </Unit>
        {users.map((user, index) => (
          <Unit key={index}>
            <UnitName>{user.className}</UnitName>
            <UnitDescription></UnitDescription>
            <Button
              width={"100%"}
              onClick={() => handleGoToClass(user.classUid)}
            >
              Sınıfa Git
            </Button>
          </Unit>
        ))}
        <FormContainer>
          <Form onSubmit={handleAddClass}>
            <LabelSubtitle>
              Sayın öğretmenimiz sınıf eklemek için aktivasyon kodu alınız.
              Aktivasyon kodunu <Link to="/odeme-planlari">buraya</Link>{" "}
              tıklayarak temin edebilirsiniz. Herhangi bir hata durumunda{" "}
              <strong>0530 682 68 49</strong> numaralı iletişim hattını
              kullanabilirsiniz.
            </LabelSubtitle>
            <InputText
              type="text"
              name="className"
              placeholder="Sınıfınızın adını giriniz"
            />
            {!isPremium && (
              <InputText
                type="text"
                name="activationCode"
                placeholder="Aktivasyon Kodu"
              />
            )}
            <InputSave type="submit" value="Sınıf Ekle" />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        </FormContainer>
      </Main>
    </Container>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export default DrawerSiniflarim;
