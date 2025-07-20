import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import styled from "styled-components";
import DrawerKonularim from "./Drawers/studentDrawerKonularim";
import DrawerBasarilarim from "./Drawers/studentDrawerBasarilarim";
import { useState, useEffect } from "react";
import DrawerOgretmenlerim from "./Drawers/studentDrawerOgretmenlerim";
import DrawerSiniflarim from "./Drawers/studentDrawerSiniflarim";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Container } from "../../style/global/styledComponents/Containers";
import DrawerDokumanAra from "../teacher/Drawers/DrawerDokumanAra";

function StudentPanel() {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

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

      const getUserData = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      };

      const fetchAvatar = async () => {
        const userData = user?.userData;
        if (userData && userData.avatar) {
          const avatarPath = `avatars/avatar${userData.avatar}.png`;
          const storage = getStorage();
          const avatarRef = ref(storage, avatarPath);

          try {
            const url = await getDownloadURL(avatarRef);
            setAvatarUrl(url);
          } catch (error) {
            console.error("Avatar alınırken bir hata oluştu:", error.message);
          }
        }
      };

      fetchAvatar();
      getUserData();
    }
  }, [user]);

  const [activeDiv, setActiveDiv] = useState(() => {
    const storedActiveDiv = localStorage.getItem("studentActiveDiv");
    return storedActiveDiv ? parseInt(storedActiveDiv, 10) : 1;
  });

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  const handleButtonClick = (divNumber) => {
    setActiveDiv(divNumber);
    localStorage.setItem("studentActiveDiv", divNumber);
  };

  return (
    <Container>
      <NameBarUp>
        <NameBar>
          <Avatar>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Avatar>
          <NameBarDown>
            <Name>{user && <p>{user.userData.displayName}</p>}</Name>
            <Description>
              {user && <p>{user.userData.selfIntroduction}</p>}
            </Description>
          </NameBarDown>
        </NameBar>
      </NameBarUp>
      <Main>
        <ButtonBar>
          <DivFlex1 style={{ marginBottom: "1.5rem" }}>
            <Text>Hoş Geldiniz</Text>
          </DivFlex1>
          <DivFlex onClick={() => handleButtonClick(1)}>
            <Button>Konularım</Button>
          </DivFlex>
          <DivFlex onClick={() => handleButtonClick(2)}>
            <Button>Başarılarım</Button>
          </DivFlex>
          <DivFlex onClick={() => handleButtonClick(3)}>
            <Button>Öğretmenlerim</Button>
          </DivFlex>
          <DivFlex onClick={() => handleButtonClick(4)}>
            <Button>Sınıflarım</Button>
          </DivFlex>
          <DivFlex onClick={() => handleButtonClick(5)}>
            <Button>Döküman Ara</Button>
          </DivFlex>
          <DivFlex onClick={() => handleSignOut()}>
            <Button>Çıkış</Button>
          </DivFlex>
        </ButtonBar>
        <ObjectBar>
          {activeDiv === 1 && <DrawerKonularim />}
          {activeDiv === 2 && <DrawerBasarilarim />}
          {activeDiv === 3 && <DrawerOgretmenlerim />}
          {activeDiv === 4 && <DrawerSiniflarim />}
          {activeDiv === 5 && <DrawerDokumanAra />}
        </ObjectBar>
      </Main>
    </Container>
  );
}

export const NameBarUp = styled.div`
  background-color: #f8f8ff;
  width: 100%;
  padding-left: 10px;
  padding-top: 20px;
  border-top: 2px solid var(--main-color);
  display: flex;
  justify-content: center;
`;
export const NameBar = styled.div`
  width: 90%;
  display: flex;
  max-width: var(--main-width);
  
`;

export const Avatar = styled.div`
  flex: 0 0 100px;
  margin-right: 20px;
  height: auto;
  overflow-y: hidden;
`;

export const NameBarDown = styled.div`
  flex: 1;
  height: auto;
  padding: 10px;
`;

export const Name = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  font-weight: bold;
  font-size: 20px;
`;

export const Description = styled.div`
  flex: 1;
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  max-width: var(--main-width);
  align-items: start;
  justify-content: start;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;
export const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 90px;
    margin-bottom: 0.3rem;
  }
`;

export const DivFlex1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 0px;
  }
`;

export const ButtonBar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem ;


  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
    margin: 1rem 0rem;
  }
`;

export const Button = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: white;
  color: var(--main-color);
  cursor: pointer;
  padding: 5px;
  min-width: 150px;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  font-family: 'MyCustomFont', sans-serif;

  :hover {
    background-color: var(--main-color);
    color: white;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    margin-right: 5px;
    font-size: 0.6rem;
    width: 100%;
    min-width: min-content;
  }
`;

export const Text = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--main-color);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ObjectBar = styled.div`
  flex: 1;
  margin: 1rem;
  width: 94%;
`;

export default StudentPanel;
