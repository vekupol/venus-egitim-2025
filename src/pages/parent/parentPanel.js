import React, { useState, useEffect, useCallback } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { getDocs, query, collection, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase";
import { Container } from "../../style/global/styledComponents/Containers";
import styled from "styled-components";
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

// İlgili drawer bileşenlerini eklemeye hazır
// import DrawerTakip from "./Drawers/parentDrawerTakip";
// import DrawerRaporlar from "./Drawers/parentDrawerRaporlar";
// import DrawerDestek from "./Drawers/parentDrawerDestek";

function ParentPanel() {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [activeDiv, setActiveDiv] = useState(() => {
    const stored = localStorage.getItem("parentActiveDiv");
    return stored ? parseInt(stored, 10) : 1;
  });

  const handleButtonClick = (divNumber) => {
    setActiveDiv(divNumber);
    localStorage.setItem("parentActiveDiv", divNumber);
  };

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );

    const getUserData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    };

    const fetchAvatar = async () => {
      const avatar = user?.userData?.avatar;
      if (avatar) {
        const path = `avatars/avatar${avatar}.png`;
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, path));
        setAvatarUrl(url);
      }
    };

    fetchAvatar();
    getUserData();
  }, [user]);

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
            <Text>Sayın Veli</Text>
          </DivFlex1>
          <DivFlex onClick={() => handleButtonClick(1)}>
            <Button>Öğrenci Takibi</Button>
          </DivFlex>
          <DivFlex onClick={() => handleButtonClick(2)}>
            <Button>İlerleme Raporları</Button>
          </DivFlex>
          <DivFlex onClick={() => handleButtonClick(3)}>
            <Button>Destek Talepleri</Button>
          </DivFlex>
          <DivFlex onClick={() => handleSignOut()}>
            <Button>Çıkış</Button>
          </DivFlex>
        </ButtonBar>

        <ObjectBar>
          {activeDiv === 1 && <div>Takip Paneli (yakında)</div>}
          {activeDiv === 2 && <div>Raporlar (yakında)</div>}
          {activeDiv === 3 && <div>Destek Alanı (yakında)</div>}
        </ObjectBar>
      </Main>
    </Container>
  );
}

export default ParentPanel;
