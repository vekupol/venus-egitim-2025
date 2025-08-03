import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import {
  Container,
  Main,
  Sidebar,
  ChangeLessonDiv,
} from "../../../style/DerslerStyle";
import {
  Button,
  CustomLink,
  CustomLinkInButton,
} from "../../../../../components/buttons/Button.styled";
import jsonData from "../../MatematikLiseDokuz.json";
import { Icons } from "../../../style/DerslerIntroStyle";
import lessonUrls from "../urlDersler.json";
import SliderDokuz from "../../SliderDokuz";

// Ders bileşenleri
import Lesson1 from "./Lesson1";
import Lesson2 from "./Lesson2";

import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function GercelSayilarinUsluVeKokluGosterimleri({
  startTopicProps,
  activeLessonProp,
}) {
  const [unit, setUnit] = useState([]);

  const uniteNumarasi = 1;
  const konuNumarasi = 1;
  const uniteNo = uniteNumarasi - 1;
  const konuNo = konuNumarasi - 1;
  const baslangicProps = startTopicProps;

  useEffect(() => {
    if (jsonData?.temalar?.[uniteNo]) {
      setUnit(jsonData.temalar[uniteNo]);
    } else {
      console.error("Temalar verisi bulunamadı:", jsonData);
    }
  }, []);

  // Önceki ders URL'sini bulma
  const getPrevLessonUrl = () => {
    const prevLesson = lessonUrls.find(
      (lesson) => lesson.id === activeLessonProp - 1
    );
    return prevLesson ? prevLesson.url : null;
  };

  // Sonraki ders URL'sini bulma
  const getNextLessonUrl = () => {
    const nextLesson = lessonUrls.find(
      (lesson) => lesson.id === activeLessonProp + 1
    );
    return nextLesson ? nextLesson.url : null;
  };

  // 🔥 "Sıradaki Ders" butonuna tıklanınca Firestore'da tamamlama işareti
  const handleMarkCompletedAndNavigate = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        const dersler = [...data.derslerim["sayilar"].dersler];
        if (dersler[activeLessonProp - 1] !== 1) {
          dersler[activeLessonProp - 1] = 1;
          await updateDoc(userRef, {
            [`derslerim.sayilar.dersler`]: dersler,
          });
          console.log("✅ Ders tamamlandı olarak işaretlendi.");
        }
      }
    } catch (err) {
      console.error("❌ Ders tamamlama hatası:", err.message);
    }
  };

  // Tek şablon: ders içerik bileşenini dinamik render et
  const renderLesson = () => {
    switch (activeLessonProp) {
      case 1:
        return <Lesson1 />;
      case 2:
        return <Lesson2 />;
      default:
        return <p>Ders bulunamadı.</p>;
    }
  };

  return (
    <Container>
      <Sidebar>
        <SliderDokuz
          unitNumber={uniteNo}
          konuNumber={konuNo}
          baslangicNumber={baslangicProps}
        />
      </Sidebar>
      <Main>
        <Icons>
          <CustomLink to="/">
            <IoHomeSharp />
          </CustomLink>
          <BsArrowRightShort />
          <CustomLink to="/matematik/9-sinif">
            <div> 9. Sınıf Matematik </div>
          </CustomLink>
          <BsArrowRightShort />
          <CustomLink to="/matematik/9-sinif/sayilar">
            <div>{unit?.name}</div>
          </CustomLink>
        </Icons>

        {/* 🔥 Dinamik ders içerikleri */}
        {renderLesson()}

        {/* 🔥 Ortalanmış Önceki ve Sıradaki Ders butonları */}
        <ChangeLessonDiv
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Button
            as={CustomLinkInButton}
            to={getPrevLessonUrl()}
            disabled={!getPrevLessonUrl()}
          >
            Önceki Ders
          </Button>
          <Button
            as={CustomLinkInButton}
            to={getNextLessonUrl()}
            disabled={!getNextLessonUrl()}
            onClick={handleMarkCompletedAndNavigate}
          >
            Sıradaki Ders
          </Button>
        </ChangeLessonDiv>
      </Main>
    </Container>
  );
}

export default GercelSayilarinUsluVeKokluGosterimleri;
