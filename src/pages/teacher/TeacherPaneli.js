import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import styled from "styled-components";
import DrawerSiniflarim from "./Drawers/DrawerSiniflarim";
import DrawerPrivateStudents from "./Drawers/DrawerPrivateStudents";
import { useState, useEffect } from "react";
import DrawerDokumanEkle from "./Drawers/DrawerDokumanEkle";
import DrawerDokumanAra from "./Drawers/DrawerDokumanAra";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import {
  NameBarUp,
  Name,
  Avatar,
  NameBarDown,
  NameBar,
  Description,
  Main,
  ObjectBar,
  Text,
  Button,
  ButtonBar,
  DivFlex,
  DivFlex1,
} from "../student/studentPanel";
import { Container } from "../../style/global/styledComponents/Containers";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function TeacherPaneli() {
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

      // Belgeyi al
      const getUserData = async () => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // İlgili belgeyi alın ve state'e kaydedin
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
  }, [user]); // user veya başka bir bağımlılık burada olabilir

  const [activeDiv, setActiveDiv] = useState(() => {
    const storedActiveDiv = localStorage.getItem("activeDiv");
    return storedActiveDiv ? parseInt(storedActiveDiv, 10) : 1;
  });

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  const handleButtonClick = (divNumber) => {
    setActiveDiv(divNumber);
    localStorage.setItem("activeDiv", divNumber);
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
          <DivFlex>
            <Button onClick={() => handleButtonClick(1)}>Sınıflarım</Button>
          </DivFlex>
          <DivFlex>
            <Button onClick={() => handleButtonClick(2)}>Öğrencilerim</Button>
          </DivFlex>
          <DivFlex>
            <Button onClick={() => handleButtonClick(3)}>Döküman Ekle</Button>
          </DivFlex>
          <DivFlex>
            <Button onClick={() => handleButtonClick(4)}>Döküman Ara</Button>
          </DivFlex>
          <DivFlex>
            <Button onClick={() => handleSignOut()}>Çıkış</Button>
          </DivFlex>
        </ButtonBar>
        <ObjectBar>
          {activeDiv === 1 && <DrawerSiniflarim />}
          {activeDiv === 2 && <DrawerPrivateStudents />}
          {activeDiv === 3 && <DrawerDokumanEkle />}
          {activeDiv === 4 && <DrawerDokumanAra />}
        </ObjectBar>
      </Main>
    </Container>
  );
}

export default TeacherPaneli;
