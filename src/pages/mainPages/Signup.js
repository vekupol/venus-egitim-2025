import React, { useState, useCallback } from "react";
import styled from "styled-components";
import {
  Container,
  EmailForm,
  Input,
  LeftContainer,
  MainBox,
  RightContainer,
  SocialButtons,
  Socials,
} from "./Login";
import { BiLogoGoogle } from "react-icons/bi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, doc, setDoc,getDoc } from "firebase/firestore";

const db = getFirestore();

function SignupCom() {
  const [showForm, setShowForm] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setShowForm(true);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };

  // email ile giriş yapma
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email || !password) {
        return;
      }

      let newUser = null;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          newUser = userCredential.user;
          return updateProfile(newUser, { displayName: name });
        })
        .then(() => {
          const userDocRef = doc(collection(db, "users"), auth.currentUser.uid);

          const userData = {
            uid: auth.currentUser.uid,
            totalPoint: 0,
            userData: {
              displayName: name,
              email: email,
              selfIntroduction:
                "Burası senin alanın arkadaşlarının ve öğretmenlerinin görmesini istediğin her şeyi yazabilirsin...",
              class: "",
              city: "",
              district: "",
              school: "",
              birthDate: "",
              accountType: accountType,
              defaultAccountType: accountType,
              createdAt: "",
              avatar: "1",
            },
          };

          return setDoc(userDocRef, userData);
        })
        .then(() => {
          if (accountType === "öğretmen") {
            const teacherDocRef = doc(collection(db, "teachers"), newUser.uid);
            const teacherData = {
              displayName: name,
              school: "belirtilmedi",
              uid: newUser.uid,
            };
            return setDoc(teacherDocRef, teacherData);
          }
          return null;
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            alert("Bu e-posta adresi zaten kullanımda!");
          } else {
            console.error("Kullanıcı oluşturma hatası: ", error);
          }
        });
    },
    [email, password, name, accountType]
  );

  // google ile giriş yapma
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, uid } = result.user;

      // Kullanıcının Firestore'da zaten var olup olmadığını kontrol et
      const userDocRef = doc(collection(db, "users"), uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Kullanıcı Firestore'da yoksa oluştur
        await setDoc(userDocRef, {
          uid: uid,
          totalPoint: 0,
          userData: {
            displayName: displayName,
            email: email,
            selfIntroduction:
              "Burası senin alanın arkadaşlarının ve öğretmenlerinin görmesini istediğin her şeyi yazabilirsin...",
            class: "",
            city: "",
            district: "",
            school: "",
            birthDate: "",
            accountType: accountType,
            defaultAccountType: accountType,
            createdAt: new Date().toISOString(), 
            avatar: "1",
          },
        });
      }
    } catch (error) {
      console.error("Google ile kayıt olma başarısız:", error);
    }
  };

  return (
    <Container>
      <RightContainer>
        <MainBox>
          <h2>Kayıt Ol</h2>
          <Wrapper>
            <OptionInput
              type="radio"
              name="select"
              id="option-1"
              checked={selectedOption === "option-1"}
              onChange={(e) => {
                handleAccountTypeChange("öğrenci");
                handleOptionChange(e);
              }}
            />
            <Option htmlFor="option-1">
              <OptionSpan checked={selectedOption === "option-1"}>
                Öğrenci
              </OptionSpan>
            </Option>
            <OptionInput
              type="radio"
              name="select"
              id="option-2"
              checked={selectedOption === "option-2"}
              onChange={(e) => {
                handleAccountTypeChange("öğretmen");
                handleOptionChange(e);
              }}
            />
            <Option htmlFor="option-2">
              <OptionSpan checked={selectedOption === "option-2"}>
                Öğretmen
              </OptionSpan>
            </Option>
            <OptionInput
              type="radio"
              name="select"
              id="option-3"
              checked={selectedOption === "option-3"}
              onChange={(e) => {
                handleAccountTypeChange("veli");
                handleOptionChange(e);
              }}
            />
            <Option htmlFor="option-3">
              <OptionSpan checked={selectedOption === "option-3"}>
                Veli
              </OptionSpan>
            </Option>
          </Wrapper>
          {showForm && (
            <EmailForm onSubmit={handleSubmit}>
              <SocialButtons>
                <Socials onClick={handleGoogleSignup}>
                  <BiLogoGoogle
                    className="socialButtons"
                    style={{ color: "#DB4437" }}
                  />
                  <div>Google İle Kayıt Ol</div>
                </Socials>
              </SocialButtons>
              <label>Email İle Kayıt Ol</label>
              <Input
                type="text"
                placeholder="Kullanıcı Adı Giriniz"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <Input
                type="password"
                placeholder="Parola"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <button type="submit">Kayıt Ol</button>
            </EmailForm>
          )}
        </MainBox>
      </RightContainer>
      <LeftContainer>
        <MainBox style={{ color: "#fff" }}>
          <h1>Kayıt Ol</h1>
          <h3>Seni aramızda görmek güzel!</h3>
          <h4>Kayıt olmak için dilediğiniz seçeneği seçebilirsiniz.</h4>
        </MainBox>
      </LeftContainer>
    </Container>
  );
}

const Wrapper = styled.div`
  display: inline-flex;
  background: transparent;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
`;

const Option = styled.label`
  background: transparent;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 0px;
  border: 2px solid var(--main-color);
  transition: all 0.3s ease;
  color: var(--main-color);
  height: 70px;

  @media (max-width: 768px) {
    background: white;
  }
`;

const OptionInput = styled.input`
  display: none;
`;

const OptionSpan = styled.span`
  font-size: 20px;
  color: var(--main-color);

  ${(props) =>
    props.checked &&
    `
    color: var(--main-color);
    font-size: 18px;
    font-weight: bold;
  `}
`;

export default SignupCom;
