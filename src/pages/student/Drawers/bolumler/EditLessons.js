import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonSil } from "../../../teacher/ClassEdit";
import konularJson from "../../../../components/dropdown/matematikUniteler/All.json";
import { db, auth } from "../../../../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import ProgressBar from "../../../../components/progressBar/ProgressBar";
import {
  Button,
  CustomLink,
  DeleteButton,
} from "../../../../components/buttons/Button.styled";

function EditLessons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessons, setLessons] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchLessons = async () => {
      const currentUser = auth.currentUser;
      const currentUserUid = currentUser ? currentUser.uid : null;

      if (currentUserUid) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUserUid));
          if (userDoc.exists()) {
            const lessons = userDoc.data().lessons || [];
            setLessons(lessons);
          } else {
            console.error("Kullanıcı belgesi bulunamadı.");
          }
        } catch (error) {
          console.error("Öğrenci bilgilerini alma hatası:", error);
        }
      }
    };
    fetchLessons();
  }, []);

  const handleKonuEkle = async (item) => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        const userDocRef = doc(db, "users", currentUserUid);
        await updateDoc(userDocRef, {
          lessons: arrayUnion({
            id: item.id,
            name: item.title,
            url: item.url,
          }),
        });
        const updatedDoc = await getDoc(userDocRef);
        if (updatedDoc.exists()) {
          const updatedLessons = updatedDoc.data().lessons || [];
          setLessons(updatedLessons);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  const handleKonuSil = async (item) => {
    const currentUser = auth.currentUser;
    const currentUserUid = currentUser ? currentUser.uid : null;

    if (currentUserUid) {
      try {
        const userDocRef = doc(db, "users", currentUserUid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const updatedLessons = userDoc
            .data()
            .lessons.filter((lesson) => lesson.id !== item.id);
          await updateDoc(userDocRef, { lessons: updatedLessons });
          setLessons(updatedLessons);
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  };

  return (
    <Container>
      <Container2>
        <h1>Konularım</h1>
        <ButtonDiv>
          <Button width={"100%"} onClick={openModal}>
            Konu Ekle
          </Button>
        </ButtonDiv>
        <Konular>
          {lessons.map((item) => (
            <KonuDiv key={item.id}>
              <Metin>
                <KonuAdi>{item.name}</KonuAdi>
              </Metin>
              <ProgressDiv>
                <ProgressBar totalPeople={100} donePeople={50} />
              </ProgressDiv>
              <Buttons>
                <CustomLink to={`${item.url}`}>
                  <Button width={"100%"}>Konuya Git </Button>
                </CustomLink>
                <CustomLink>
                  <DeleteButton
                    onClick={() => handleKonuSil(item)}
                    width={"100%"}
                  >
                    Konu Sil
                  </DeleteButton>
                </CustomLink>
              </Buttons>
            </KonuDiv>
          ))}
        </Konular>
      </Container2>
      {isModalOpen && (
        <KonuEkleModal onClose={closeModal} handleKonuEkle={handleKonuEkle} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: var(--main-width);
`;

const Container2 = styled.div`
  min-height: 90vh;
  padding: 2rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 20px;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Konular = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const KonuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7rem;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: left;
  }
`;

const KonuAdi = styled.div`
  font-weight: bold;
  font-size: 24px;
  min-width: min-content;
  padding-right: 20px;
`;

const KonuAciklama = styled.p`
  min-width: min-content;
`;

const Metin = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  width: 20%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProgressDiv = styled.div`
  width: 20%;

  @media (max-width: 768px) {
    width: 100%;
    margin: 1rem 0rem;
  }
`;

const KonuEkleModal = ({ onClose, handleKonuEkle }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Konu Ekle</h2>
        <DeleteButton width={"100%"} onClick={onClose}>
          Kapat
        </DeleteButton>

        <AllKonular>
          {konularJson.map((item) => (
            <KonuDiv key={item.id} >
              <KonuAciklama style={{fontSize:"1.2rem"}}>{item.title}</KonuAciklama>
              <Button onClick={() => handleKonuEkle(item)}>Ekle</Button>
            </KonuDiv>
          ))}
        </AllKonular>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: start;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 100px;
  height: 50%;

  h2 {
    padding-left: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const AllKonular = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 30px;

  @media (max-width:768px){
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 10px;
  }
`;

export default EditLessons;
