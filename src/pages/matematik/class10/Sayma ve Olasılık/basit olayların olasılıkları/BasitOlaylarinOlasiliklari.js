import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import SliderOn from "../../SliderOn";
import Lesson1 from "./bolum 1/Lesson101";
import { Container, Main, Sidebar } from "../../../style/DerslerStyle";
import { CustomLink } from "../../../../../components/buttons/Button.styled";
import jsonData from "../../MatematikLiseOn.json";
import { Icons } from "../../../style/DerslerIntroStyle";
import Test1 from "./bolum 1/Test101";
import Lesson101 from "./bolum 1/Lesson101";
import Test101 from "./bolum 1/Test101";
import Lesson201 from "./bolum 2/Lesson201";
import Test201 from "./bolum 2/Test201";

function BasitOlaylarinOlasiliklari({ startTopicProps, activeLessonProp }) {
  const [unit, setUnit] = useState([]);

  // üniteNumarasi ve konuNumarasi değerlerini doğrudan yaz 1 ,2 gibi. Bu sayfada başka bir şey değiştirme.

  const uniteNumarasi = 1;
  const konuNumarasi = 2;

  const konuNo = konuNumarasi - 1;
  const uniteNo = uniteNumarasi - 1;

  const baslangicProps = startTopicProps;

  useEffect(() => {
    setUnit(jsonData.units[0]);
  }, []);

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
        {/* activeLesson state'ine göre hangi bileşenin görüntüleneceğini kontrol ediyoruz */}
        {activeLessonProp === 1 && <Lesson101 />}
        {activeLessonProp === 2 && <Test101 />}
        {activeLessonProp === 3 && <Lesson201 />}
        {activeLessonProp === 4 && <Test201 />}
      </Main>
    </Container>
  );
}

export default BasitOlaylarinOlasiliklari;
