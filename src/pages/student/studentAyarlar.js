import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {  Title } from "./Drawers/studentDrawerKonularim";
import {
  collection,
  query,
  where,
  getFirestore,
  updateDoc,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ForgotPassword from "../mainPages/ForgotPassword";
import DeleteAccount from "../../components/DeleteAccount";

const db = getFirestore();

function Settings() {
  const [user, isLoadingUser] = useAuthState(auth);
  const belirliKullaniciUID = user ? user.uid : null;
  const [accountType, setAccountType] = useState("");
  const [userData, setUserData] = useState("");

  const filterQuery = query(
    collection(db, "users"),
    where("uid", "==", belirliKullaniciUID)
  );
  const [filteredData, isLoadingFilteredData] = useCollectionData(filterQuery);

  const [inputText, setInputText] = useState("");
  const [inputText2, setInputText2] = useState("");
  const [selectedClass, setSelectedClass] = useState("9");
  const [birthDate, setBirthDate] = useState("");
  const [accountType2, setAccountType2] = useState("");
  const [accountType3, setAccountType3] = useState("");
  const [accountType4, setAccountType4] = useState("");
  const [selectedDefaultAccount, setSelectedDefaultAccount] =
    useState("öğrenci");
  const [classCode, setClassCode] = useState("");

  useEffect(() => {
    // Mevcut kullanıcının uid'sini al
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      // Firestore sorgusu oluştur
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserUid)
      );

      // Belgeyi al
      const getUserData = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data().userData;
          if (userData && userData.accountType) {
            // userData içinde accountType varsa konsola yaz
            setAccountType(userData.accountType);
          }
          if (userData) {
            setUserData(userData);
          }
        });
      };

      getUserData();
    }
  }, []);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setInputText2(event.target.value);
  };
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const handleCheckboxChange1 = (event) => {
    setAccountType2(event.target.value);
  };
  const handleCheckboxChange2 = (event) => {
    setAccountType3(event.target.value);
  };
  const handleCheckboxChange3 = (event) => {
    setAccountType4(event.target.value);
  };
  const handleDefaultChange = (event) => {
    setSelectedDefaultAccount(event.target.value);
  };
  const handleClassCodeChange = (event) => {
    setClassCode(event.target.value);
  };

  const handleChangeUserName = async () => {
    if (inputText.trim() === "") {
      return; // Fonksiyonu burada sonlandır
    }
    const userDocRef = doc(db, "users", belirliKullaniciUID);

    try {
      await setDoc(
        userDocRef,
        {
          userData: {
            displayName: inputText,
          },
        },
        { merge: true }
      );

      console.log("Kullanıcı adı güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const handleChangeSelfIntroduction = async () => {
    if (inputText2.trim() === "") {
      return; // Fonksiyonu burada sonlandır
    }
    const userDocRef = doc(db, "users", belirliKullaniciUID);

    try {
      await setDoc(
        userDocRef,
        {
          userData: {
            selfIntroduction: inputText2,
          },
        },
        { merge: true }
      );

      console.log("Kullanıcı adı güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const handleChangeUserClass = async () => {
    const userDocRef = doc(db, "users", belirliKullaniciUID);

    try {
      await setDoc(
        userDocRef,
        {
          userData: {
            class: selectedClass,
          },
        },
        { merge: true }
      );

      console.log("Kullanıcı adı güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const handleChangeBirthDate = async () => {
    if (birthDate.trim() === "") {
      return; // Fonksiyonu burada sonlandır
    }
    const userDocRef = doc(db, "users", belirliKullaniciUID);

    try {
      await setDoc(
        userDocRef,
        {
          userData: {
            birthDate: birthDate,
          },
        },
        { merge: true }
      );

      console.log("Kullanıcı adı güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const handleAccountChanges = async () => {
    const userDocRef = doc(db, "users", belirliKullaniciUID);

    // Tüm hesap türleri boşsa kaydetmeyi engelle
    if (!accountType2 && !accountType3 && !accountType4) {
      alert("En az bir hesap türü seçmelisiniz.");
      return; // İşlemi durdur
    }

    try {
      await setDoc(
        userDocRef,
        {
          userData: {
            accountType: [accountType2, accountType3, accountType4].filter(
              Boolean
            ), // Boş olmayanları filtrele
          },
        },
        { merge: true }
      );

      console.log("Kullanıcı adı güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const handleDefaultAccountChanges = async () => {
    const userDocRef = doc(db, "users", belirliKullaniciUID);

    try {
      await setDoc(
        userDocRef,
        {
          userData: {
            defaultAccountType: selectedDefaultAccount,
          },
        },
        { merge: true }
      );

      console.log("Kullanıcı adı güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  const handleChangeClassCode = async () => {
    if (classCode.trim() === "") {
      return; // Fonksiyonu burada sonlandır
    }
    const userDocRef = doc(db, "users", belirliKullaniciUID);

    try {
      await setDoc(
        userDocRef,
        {
          userData: {
            classCode: classCode,
          },
        },
        { merge: true }
      );

      console.log("Kullanıcı adı güncellendi");
      window.location.reload();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <Container>
      <SettingsContainer>
        <Title>
          <p style={{fontSize:"2rem",marginBottom:"1rem",fontWeight:"bold"}}>Ayarlarım</p>
        </Title>
        <FormContainer>
          <FormGroup>
            <LabelTitle>Kullanıcı İsmi</LabelTitle>

            <LabelSubtitle>
              Buraya girmiş olduğunuz isim arkadaşlarınız ve öğretmenleriniz
              tarafından görüntülenecektir.{" "}
            </LabelSubtitle>
            <InputText
              type="text"
              placeholder={userData.displayName}
              onChange={handleInputChange}
            />
            <InputSave
              type="submit"
              value="Değişiklikleri Kaydet"
              onClick={handleChangeUserName}
            />
          </FormGroup>
          <FormGroup>
            <LabelTitle>Kendinizi Tanıtın</LabelTitle>
            <LabelSubtitle>
              Siz ve diğer kullanıcılar
              tarafından görüntülenecek açıklama alanıdır.
            </LabelSubtitle>
            <InputText
              type="text"
              placeholder={userData.selfIntroduction}
              onChange={handleInputChange2}
            />
            <InputSave
              type="submit"
              value="Değişiklikleri Kaydet"
              onClick={handleChangeSelfIntroduction}
            />
          </FormGroup>
          <FormGroup>
            <LabelTitle>Sınıfınız</LabelTitle>
            <LabelSubtitle>
              Seçili Sınıfınız : <span>{userData.class}. Sınıf</span>
            </LabelSubtitle>
            <InputSelect
              name="class"
              id="class"
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="9">9.Sınıf</option>
              <option value="10">10.Sınıf</option>
              <option value="11">11.Sınıf</option>
              <option value="12">12.Sınıf</option>
              <option value="diger">Diğer</option>
            </InputSelect>
            <InputSave
              type="submit"
              value="Değişiklikleri Kaydet"
              onClick={handleChangeUserClass}
            />
          </FormGroup>
          <FormGroup>
            <LabelTitle>Doğum Tarihiniz</LabelTitle>
            <LabelSubtitle>
              {userData.birthDate ? (
                <span>{`${userData.birthDate}`}</span>
              ) : (
                <span>Henüz Doğum Tarihi Girilmedi.</span>
              )}
            </LabelSubtitle>
            <InputDate
              type="date"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
            <InputSave
              type="submit"
              value="Değişiklikleri Kaydet"
              onClick={handleChangeBirthDate}
            />
          </FormGroup>
          {/* <FormGroup>
            <LabelTitle>Hesap Türü</LabelTitle>
            <LabelSubtitle>
              Dilediğiniz hesap türlerini seçebilirsiniz.
            </LabelSubtitle>
            <LabelSubtitle>
              Mevcut Güncel
              <br /> Durum Durum{" "}
            </LabelSubtitle>
            <DivFlex>
              <InputCheckBox
                type="checkbox"
                id="student"
                checked={accountType && accountType.includes("öğrenci")}
              />
              <InputCheckBox
                type="checkbox"
                id="student"
                value="öğrenci"
                onChange={handleCheckboxChange1}
              />
              <LabelCheckBox> Öğrenci </LabelCheckBox>
            </DivFlex>
            <DivFlex>
              <InputCheckBox
                type="checkbox"
                id="teacher"
                checked={accountType && accountType.includes("öğretmen")}
              />
              <InputCheckBox
                type="checkbox"
                id="teacher"
                value="öğretmen"
                onChange={handleCheckboxChange2}
              />
              <LabelCheckBox> Öğretmen</LabelCheckBox>
            </DivFlex>
            <DivFlex>
              <InputCheckBox
                type="checkbox"
                id="parent"
                checked={accountType && accountType.includes("veli")}
              />
              <InputCheckBox
                type="checkbox"
                id="parent"
                value="veli"
                onChange={handleCheckboxChange3}
              />
              <LabelCheckBox> Veli</LabelCheckBox>
            </DivFlex>
            <InputSave
              type="submit"
              value="Değişiklikleri Kaydet"
              onClick={handleAccountChanges}
            />
          </FormGroup> */}
          <FormGroup>
            <LabelSubtitle>
              Anasayfanızda görünmesini istediğiniz hesap türünü seçiniz.
            </LabelSubtitle>
            <LabelSubtitle>
              Seçili Anasayfanız : <span>{userData.defaultAccountType}</span>
            </LabelSubtitle>
            <InputSelect
              name="accounts"
              id="accounts"
              value={selectedDefaultAccount}
              onChange={handleDefaultChange}
            >
              <option value="öğrenci">öğrenci </option>
              <option value="öğretmen">öğretmen</option>
              <option value="veli">veli</option>
            </InputSelect>
            <InputSave
              type="submit"
              value="Değişiklikleri Kaydet"
              onClick={handleDefaultAccountChanges}
            />
          </FormGroup>
          <FormGroup>
            <LabelTitle>Sınıf Kodunuz</LabelTitle>
            <LabelSubtitle>
              Öğretmeninizin size vermiş olduğu sınıf kodunuz:{" "}
              <span>{userData.classCode}</span>{" "}
            </LabelSubtitle>
            <InputText
              type="text"
              placeholder={userData.classCode}
              onChange={handleClassCodeChange}
            />
            <InputSave
              type="submit"
              value="Değişiklikleri Kaydet"
              onClick={handleChangeClassCode}
            />
          </FormGroup>
          <DeleteAccount />
        </FormContainer>
      </SettingsContainer>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: space-between;
  width: var(--main-width);
  padding: 0px 20px;
`;

export const SettingsContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;
export const FormContainer = styled.div`
width: 100%;`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;

export const LabelTitle = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const LabelSubtitle = styled.label`
  margin: 0 0 0.5rem 0;
  span {
    font-weight: bold;
  }
`;
export const InputText = styled.input`
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 0.5rem;

  ::placeholder {
    padding: 5px;
  }
`;

export const InputSave = styled.input`
  padding: 10px;
  background-color: var(--main-color);
  color: white;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  font-family: "MyCustomFont", sans-serif;

  :hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color);
  }
`;

export const InputDelete = styled.input`
  padding: 10px;
  background-color: var(--delete-color);
  color: white;
  border: 2px solid var(--delete-color);
  border-radius: 5px;
  font-family: "MyCustomFont", sans-serif;

  :hover {
    cursor: pointer;
    background-color: white;
    color: var(--delete-color);
  }
`;

export const InputSelect = styled.select`
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;
export const InputCheckBox = styled.input`
  width: 20px;
  margin-left: 25px;
  :checked {
    accent-color: var(--main-color);
  }
`;

const LabelCheckBox = styled.label`
  width: 400px;
  margin-left: 30px;
`;

const DivFlex = styled.div`
  display: flex;
  width: 450px;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const InputDate = styled.input`
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export default Settings;
