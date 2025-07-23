import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import SliderOn from "../../SliderOn";
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
import jsonData from "../../MatematikLiseOn.json";
import { Icons } from "../../../style/DerslerIntroStyle";
import lessonUrls from "./urlDersler.json";

//Dersler
import Lesson101 from "./bolum1/Lesson101";
import Test101 from "./bolum1/Test101";
import Lesson201 from "./bolum2/Lesson201";
import Test201 from "./bolum2/Test201";
import Klasik101 from "./bolum1/Klasik101";

function SiralamaVeSecme({ startTopicProps, activeLessonProp }) {
  const [unit, setUnit] = useState([]);

  // üniteNumarasi ve konuNumarasi değerlerini doğrudan yaz 1 ,2 gibi. Bu sayfada başka bir şey değiştirme.

  const uniteNumarasi = 1;
  const konuNumarasi = 1;

  const konuNo = konuNumarasi - 1;
  const uniteNo = uniteNumarasi - 1;

  const baslangicProps = startTopicProps;

  useEffect(() => {
    setUnit(jsonData.units[0]);
  }, []);

  // Önceki ders URL'sini bulma
  const getPrevLessonUrl = () => {
    const currentId = activeLessonProp;
    const prevLesson = lessonUrls.find((lesson) => lesson.id === currentId - 1);
    return prevLesson ? prevLesson.url : null;
  };

  // Sonraki ders URL'sini bulma
  const getNextLessonUrl = () => {
    const currentId = activeLessonProp;
    const nextLesson = lessonUrls.find((lesson) => lesson.id === currentId + 1);
    return nextLesson ? nextLesson.url : null;
  };

  return (
    <Container>
      <Sidebar>
        <SliderOn
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
          <CustomLink to="/matematik/10-sinif">
            <div> 10. Sınıf Matematik </div>
          </CustomLink>
          <BsArrowRightShort />
          <CustomLink to="/matematik/10-sinif/sayma-ve-olasilik">
            <div> {unit?.name} </div>
          </CustomLink>
        </Icons>
        <ChangeLessonDiv>
          {/* Önceki ders butonu */}
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
          >
            Sıradaki Ders
          </Button>
        </ChangeLessonDiv>
        {/* activeLesson state'ine göre hangi bileşenin görüntüleneceğini kontrol ediyoruz */}
        {activeLessonProp === 1 && <Lesson101 />}
        {activeLessonProp === 2 && <Test101 />}
        {activeLessonProp === 3 && <Klasik101 />}
        {activeLessonProp === 4 && <Lesson201 />}
        {activeLessonProp === 5 && <Test201 />}
      </Main>
    </Container>
  );
}

export default SiralamaVeSecme;
