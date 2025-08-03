import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainBar } from "../../../courses/course";
import {
  CustomLink,
  CustomLinkLeft,
} from "../../../../components/buttons/Button.styled";
import {
  Title,
  UnitContainer,
  Parts,
  Unit,
  Part,
  Icons,
  UnitsShadow,
} from "../../../courses/drawers/intro";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import {
  Container,
  Sidebar,
  CourseTitle,
  CourseName,
  CourseContent,
  CourseUnits,
  Units,
  UnitName,
} from "../../style/DerslerStyle";
import jsonData from "../MatematikLiseDokuz.json";
import GercelSayilarinUsluVeKokluGosterimleriIntro from "./bolum1/GercelSayilarinUsluVeKokluGosterimleriIntro";
import GercelSayiAraliklariKumeIslemleriIntro from "./bolum2/GercelSayiAraliklariKumeIslemleriIntro";
import SayiKumelerininOzellikleriIntro from "./bolum3/SayiKumelerininOzellikleriIntro";
import GercelSayilarinIslemOzellikleriIntro from "./bolum4/GercelSayilarinIslemOzellikleriIntro";
import ProgressBar from "../../../../components/progressBar/yeniProgressBar/ProgressBar";
import { Button } from "../../../../components/buttons/Button.styled";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SidebarComponent({ unit }) {
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
  return (
    <Sidebar>
      <CustomLinkLeft to="/matematik/9-sinif/sayilar">
        <CourseTitle>
          <CourseName>{unit.name}</CourseName>
          <CourseContent>
            {unit.konular.length} Konuda Toplam {unit.dersSayisi} Ders
          </CourseContent>
        </CourseTitle>
      </CustomLinkLeft>
      <CourseUnits>
        {unit.konular &&
          unit.konular.map((konu, index) => (
            <CustomLinkLeft
              to={`/matematik/9-sinif/sayilar/${konu.link}/intro`}
              key={index}
            >
              <StyledUnits>
                <p className="topic-number">Konu {index + 1}</p>
                <UnitName>{capitalizeTitleTR(konu.name)}</UnitName>
              </StyledUnits>
            </CustomLinkLeft>
          ))}
      </CourseUnits>
    </Sidebar>
  );
}

function Sayilar({ activeDivProps }) {
  const [unit, setUnit] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const uniteNumarasi = 1;
  const uniteNo = uniteNumarasi - 1;
  const navigate = useNavigate();

  useEffect(() => {
    if (jsonData.temalar && jsonData.temalar.length > 0) {
      setUnit(jsonData.temalar[uniteNo]);
      setLoading(false);
    }
  }, []);

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
      } catch (err) {
        console.error("Progress fetch error:", err.message);
      }
    };
    fetchProgress();
  }, [unit]);

  const handleStartFirstLesson = async () => {
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
        if (!derslerim[unit.link]) {
          await updateDoc(userRef, {
            [`derslerim.${unit.link}`]: {
              name: unit.name,
              dersSayisi: unit.dersSayisi,
              cozulenSoru: 0,
              dersler: Array(unit.dersSayisi).fill(0),
            },
          });
        }
      }

      const firstTopic = unit.konular[0];
      const firstLesson = firstTopic.bolumler[0].dersler[0];
      navigate(`/matematik/9-sinif/${unit.link}/${firstLesson.link}`);
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };

  if (loading || !unit) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <Container>
      {unit && <SidebarComponent unit={unit} />}
      <MainBar>
        {activeDivProps === 1 && (
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
              <Button onClick={handleStartFirstLesson}>İlk Derse Başla</Button>
            </Title>

            <ProgressBar progress={progress} label={unit?.name} />

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
                      <Unit>{konu.name}</Unit>
                    </CustomLink>
                    <Parts>
                      {konu.bolumler[0] &&
                        konu.bolumler[0].dersler.map((bolum, idx) => (
                          <CustomLinkLeft
                            to={`/matematik/9-sinif/${unit.link}/${bolum.link}`}
                            key={idx}
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
        )}
        {activeDivProps === 2 && (
          <GercelSayilarinUsluVeKokluGosterimleriIntro />
        )}
        {activeDivProps === 3 && <GercelSayiAraliklariKumeIslemleriIntro />}
        {activeDivProps === 4 && <SayiKumelerininOzellikleriIntro />}
        {activeDivProps === 5 && <GercelSayilarinIslemOzellikleriIntro />}
      </MainBar>
    </Container>
  );
}

const StyledUnits = styled(Units)`
  flex-direction: column;
  align-items: start;
  .topic-number {
    color: #999;
  }
`;

export const LessonsShadow = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;

export default Sayilar;
