// Tema İntro Javascriptidir.
// Her temada olur SayilarIntro.js şeklinde temaismi + Intro olmalıdır
// Değiştirilecek yerler:
// 1. Dosya ve fonksiyon ismi: SayilarIntro
// 2. jsonData: MatematikLiseDokuz.json
// 3. uniteNumarasi: 1

import React, { useEffect, useState } from "react";
import jsonData from "../MatematikLiseDokuz.json";
import {
  Title,
  UnitContainer,
  Parts,
  Unit,
  UnitsShadow,
  Icons,
  Part,
} from "../../../courses/drawers/intro";
import {
  Button,
  CustomLink,
  CustomLinkLeft,
} from "../../../../components/buttons/Button.styled";
import { IoHomeSharp } from "react-icons/io5";
import { BsArrowRightShort } from "react-icons/bs";
import ProgressBar from "../../../../components/progressBar/yeniProgressBar/ProgressBar";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function SayilarIntro() {
  const [unit, setUnit] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const uniteNumarasi = 1;
  const uniteNo = uniteNumarasi - 1;

  useEffect(() => {
    if (jsonData.temalar && jsonData.temalar.length > 0) {
      setUnit(jsonData.temalar[uniteNo]);
      setLoading(false);
    }
  }, []);

  // Firestore’dan dersler üzerinden progress hesaplama
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user || !unit) return;

        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const dersData = data.derslerim?.[unit.link];
          if (dersData) {
            const { dersler = [], dersSayisi = 1 } = dersData;
            const tamamlanan = dersler.reduce((toplam, v) => toplam + v, 0);
            const calcProgress = Math.round((tamamlanan / dersSayisi) * 100);
            setProgress(calcProgress);
          }
        }
      } catch (error) {
        console.error("Progress fetch hatası:", error.message);
      }
    };

    fetchProgress();
  }, [unit]);

  const lowercaseWordsTR = [
    "ve",
    "ile",
    "veya",
    "ya da",
    "ama",
    "fakat",
    "için",
    "gibi",
    "de",
    "da",
    "ki",
  ];

  const capitalizeTitleTR = (text) =>
    text
      .toLocaleLowerCase("tr-TR")
      .split(" ")
      .map((word, index) =>
        index === 0 || !lowercaseWordsTR.includes(word)
          ? word.charAt(0).toLocaleUpperCase("tr-TR") + word.slice(1)
          : word
      )
      .join(" ");

  // Firestore’a ekleme (bitirilenDers olmadan)
  const handleAddToDerslerim = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const derslerim = userData.derslerim || {};
        if (derslerim[unit.link]) {
          console.log(`⚠️ '${unit.name}' zaten ekli.`);
          return;
        }
      }

      await updateDoc(userRef, {
        [`derslerim.${unit.link}`]: {
          name: unit.name,
          dersSayisi: unit.dersSayisi,
          cozulenSoru: 0,
          dersler: Array(unit.dersSayisi).fill(0), // 🔥 yalnızca dersler listesi
        },
      });

      console.log("✅ Ünite eklendi:", unit.name);
    } catch (error) {
      console.error("❌ Ekleme hatası:", error.message);
    }
  };

  if (loading || !unit) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div>
      <Icons>
        <CustomLink to="/">
          <IoHomeSharp style={{ color: "var(--main-color)" }} />
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <CustomLink to="/matematik/9-sinif">
          <div> 9. Sınıf Matematik </div>
        </CustomLink>
        <BsArrowRightShort style={{ color: "var(--main-color)" }} />
        <div>{unit?.name}</div>
      </Icons>

      <Title>
        <h1>{unit?.name}</h1>
        {unit && (
          <CustomLink
            to={`/matematik/9-sinif/${unit.link}`}
            onClick={handleAddToDerslerim}
          >
            <Button>Üniteye Git</Button>
          </CustomLink>
        )}
      </Title>

      <ProgressBar progress={progress} label="İlerleme Durumu" />

      <Title>
        <h2>Konular</h2>
      </Title>
      <UnitContainer>
        {unit.konular &&
          unit.konular.map((konu, index) => (
            <UnitsShadow key={index}>
              <CustomLink
                to={`/matematik/9-sinif/${unit.link}/${konu.link}/intro`}
              >
                <Unit>{capitalizeTitleTR(konu.name)}</Unit>
              </CustomLink>
              <Parts>
                {konu.bolumler[0] &&
                  konu.bolumler[0].dersler.map((bolum, bolumIndex) => (
                    <CustomLinkLeft
                      to={`/matematik/9-sinif/${unit.link}/${bolum.link}`}
                      key={bolumIndex}
                    >
                      <Part>
                        <li>{bolum.name}</li>
                      </Part>
                    </CustomLinkLeft>
                  ))}
              </Parts>
            </UnitsShadow>
          ))}
      </UnitContainer>
    </div>
  );
}

export default SayilarIntro;
