import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { BiLogoFacebook, BiLogoGoogle, BiLogoApple } from "react-icons/bi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { Helmet } from "react-helmet";
import { CustomLink } from "../../components/buttons/Button.styled";
import { useNavigate } from "react-router-dom";

const db = getFirestore();

function LoginCom() {
  const [showApple, setShowApple] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [showFacebook, setShowFacebook] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || !password) return;

      try {
        await signInWithEmailAndPassword(auth, email, password);

        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        const role = userData?.userData?.accountType;

        if (role === "öğrenci") navigate("/ogrenci-ekrani");
        else if (role === "öğretmen") navigate("/ogretmen-ekrani");
        else if (role === "veli") navigate("/veli-ekrani");
        else navigate("/");
      } catch (err) {
        alert("Kullanıcı Bulunamadı.");
      }
    },
    [email, password, navigate]
  );

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, uid } = result.user;
      const userDocRef = doc(collection(db, "users"), uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid,
          totalPoint: 0,
          userData: {
            displayName,
            email,
            selfIntroduction: "Burası senin alanın...",
            class: "",
            city: "",
            district: "",
            school: "",
            birthDate: "",
            accountType: "öğrenci", // varsayılan rol atanabilir
            defaultAccountType: "öğrenci",
            createdAt: new Date().toISOString(),
            avatar: "1",
          },
        });

        // yeni kayıtsa default olarak öğrenci yönlendirmesi
        navigate("/ogrenci-ekrani");
      } else {
        const role = userDoc.data()?.userData?.accountType;
        if (role === "öğrenci") navigate("/ogrenci-ekrani");
        else if (role === "öğretmen") navigate("/ogretmen-ekrani");
        else if (role === "veli") navigate("/veli-ekrani");
        else navigate("/");
      }
    } catch (error) {
      console.error("Google ile kayıt olma başarısız:", error);
    }
  };

  const handleMouseOver = (button) => {
    if (button === "apple") {
      setShowApple(true);
      setShowGoogle(false);
      setShowFacebook(false);
    } else if (button === "google") {
      setShowApple(false);
      setShowGoogle(true);
      setShowFacebook(false);
    } else if (button === "facebook") {
      setShowApple(false);
      setShowGoogle(false);
      setShowFacebook(true);
    }
  };

  const handleMouseOut = () => {
    setShowApple(false);
    setShowGoogle(false);
    setShowFacebook(false);
  };

  return (
    <Container>
      <Helmet>
        <title>Giriş Sayfası</title>
      </Helmet>
      <LeftContainer>
        <MainBox style={{ color: "#fff" }}>
          <h1>Giriş Yap</h1>
          <h3>Seni yeniden görmek güzel!</h3>
          <h4>Giriş yapmak için dilediğiniz seçeneği seçebilirsiniz.</h4>
        </MainBox>
      </LeftContainer>
      <RightContainer>
        <MainBox>
          <h2>Giriş Yap</h2>
          <SocialButtons>
            {/* <Socials
              onMouseOver={() => handleMouseOver("apple")}
              onMouseOut={handleMouseOut}
            >
              <BiLogoApple
                className="socialButtons"
                style={{ color: "#000000" }}
              />
              <div style={{ display: showApple ? "flex" : "none" }}>
                Apple İle Giriş Yap
              </div>
            </Socials> */}
            <Socials
              onMouseOver={() => handleMouseOver("google")}
              onMouseOut={handleMouseOut}
              onClick={handleGoogleSignup}
            >
              <BiLogoGoogle
                className="socialButtons"
                style={{ color: "#DB4437" }}
              />
              <div style={{ display: showGoogle ? "flex" : "flex" }}>
                Google İle Giriş Yap
              </div>
            </Socials>
            {/* <Socials
              onMouseOver={() => handleMouseOver("facebook")}
              onMouseOut={handleMouseOut}
            >
              <BiLogoFacebook
                className="socialButtons"
                style={{ color: "#4267B2" }}
              />
              <div style={{ display: showFacebook ? "flex" : "none" }}>
                Facebook İle Giriş Yap
              </div>
            </Socials> */}
          </SocialButtons>
          <EmailForm onSubmit={handleSubmit}>
            <label>Email İle Giriş Yap</label>
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
            <button type="submit">Giriş Yap</button>
            <CustomLink to="/parolami-unuttum">
              Parolanızı mı unuttunuz?
            </CustomLink>
          </EmailForm>
        </MainBox>
      </RightContainer>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  min-height: 500px;
  max-width: var(--main-width);
`;

export const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1rem;

  @media (max-width: 768px) {
    width: 100%;
    background-color: var(--main-color);
    padding: 0rem 2rem;
  }
`;

export const MainBox = styled.div`
  width: 450px;
  h1,
  h3 {
    font-family: "Poetsen One", sans-serif;
    font-style: normal;
    margin-bottom: 2rem;
  }
  h4 {
    padding-top: 2rem;
  }
  h2 {
    font-family: "Poetsen One", sans-serif;
    font-style: normal;
    text-align: center;
    color: #fff;

    @media (min-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    border: 1px solid var(--main-color);
    padding: 0.5em;
    border-radius: 15px;
  }
`;

export const SocialButtons = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Socials = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  cursor: pointer;
  padding: 3px 10px;
  width: 100%;

  @media (max-width: 768px) {
    color: #fff;
  }
`;

export const EmailForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  label {
    @media (max-width: 768px) {
      color: #fff;
    }
  }

  button {
    width: 100%;
    height: 40px;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--main-color);
    color: #fff;

    &:hover {
      background-color: #fff;
      color: var(--main-color);
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 0 10px;
  box-sizing: border-box;
`;

export default LoginCom;
