import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import QuestionSingleAnswer from "../../../../../components/lessons/QuestionSingleAnswer";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function Lesson2() {
  const [completed, setCompleted] = useState(false);

  const unitLink = "sayilar"; // Ünite linki
  const dersIndex = 6; // Ders sırası (1 tabanlı index)

  useEffect(() => {
    const handleScroll = async () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 10 && !completed) {
        setCompleted(true);
        await markLessonCompleted();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [completed]);

  const markLessonCompleted = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        const dersler = [...data.derslerim[unitLink].dersler];
        if (dersler[dersIndex - 1] !== 1) {
          dersler[dersIndex - 1] = 1;
          await updateDoc(userRef, {
            [`derslerim.${unitLink}.dersler`]: dersler,
          });
          console.log("✅ Makale dersi tamamlandı olarak işaretlendi.");
        }
      }
    } catch (err) {
      console.error("❌ Ders tamamlama hatası:", err.message);
    }
  };

  return (
    <FormulasContainer className="formulas">
      <ArticleContainer>
        <Title>Önerme Nedir?</Title>
        <SubTitle>Alt Başlık</SubTitle>
        <Paragraph>
          Doğruluğu veya yanlışlığı kesin hüküm bildiren ifadelere önerme
          denir...
        </Paragraph>
        <List>
          <ListItem>Örnek 1</ListItem>
          <ListItem>Örnek 2</ListItem>
          <ListItem>Örnek 3</ListItem>
        </List>
        <QuestionSingleAnswer />
      </ArticleContainer>
    </FormulasContainer>
  );
}

export const FormulasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ArticleContainer = styled.div`
  display: block;
  margin: 10px 0px;
  width: 595px;
  min-height: min-content;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 10px;
`;

export const SubTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 18px;
  text-indent: 2em;
`;

export const Paragraph = styled.div`
  font-size: 14px;
  margin-bottom: 18px;
  text-indent: 2em;
  text-align: justify;
`;

export const List = styled.ol`
  font-size: 14px;
  margin-bottom: 18px;
  text-indent: 5em;
  text-align: justify;
`;

export const ListItem = styled.li`
  font-size: 14px;
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
  ::before {
    content: "•";
    position: absolute;
    left: 0;
  }
`;

export const BlockFormula = styled(BlockMath)``;
export const InlineFormula = styled(InlineMath)``;

export default Lesson2;
