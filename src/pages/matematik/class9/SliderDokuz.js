import React, { useEffect, useState, useMemo } from "react";
import { Tooltip } from "react-tooltip";
import { CustomLink } from "../../../components/buttons/Button.styled";
import jsonData from "./MatematikLiseDokuz.json";
import {
  CourseTitle,
  CourseName,
  CourseContent,
  CourseUnits,
  IconDiv,
  CourseSubTitle,
  PartTitle,
  Part,
  SliderContainer,
  Arrow,
  PartDescription,
  VideoIcon,
  ArticleIcon,
  ExamIcon,
} from "../../matematik/style/DerslerStyle";

const SliderDokuz = ({ unitNumber, konuNumber, baslangicNumber }) => {
  const unitNo = unitNumber;
  const baslangicNo = konuNumber; // konular arasında gezinilecek

  const [currentKonuIndex, setCurrentKonuIndex] = useState(baslangicNo);
  const [unit, setUnit] = useState(null);

  useEffect(() => {
    const selectedUnit = jsonData.temalar[unitNo];
    if (selectedUnit) {
      setUnit(selectedUnit);
    }
  }, [unitNo]);

  const konular = unit?.konular || [];
  const currentKonu = konular[currentKonuIndex];

  const totalBolumSayisi = currentKonu?.bolumler?.length || 0;

  const totalDersSayisi = useMemo(() => {
    return (
      currentKonu?.bolumler?.reduce((acc, bolum) => {
        return acc + (bolum.dersler?.length || 0);
      }, 0) || 0
    );
  }, [currentKonu]);

  const allDersler = useMemo(() => {
    return (
      currentKonu?.bolumler?.flatMap((bolum) =>
        bolum.dersler.map((ders) => ({
          ...ders,
          bolumLink: bolum.link, // bolüm linki dersi oluştururken lazım
        }))
      ) || []
    );
  }, [currentKonu]);

  const handleNext = () => {
    if (currentKonuIndex < konular.length - 1) {
      setCurrentKonuIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentKonuIndex > 0) {
      setCurrentKonuIndex((prev) => prev - 1);
    }
  };

  return (
    <SliderContainer>
      <CourseTitle>
        <CourseName>{currentKonu?.name}</CourseName>
        <CourseContent>
          {totalBolumSayisi} Bölüm - {totalDersSayisi} Ders
        </CourseContent>
      </CourseTitle>

      <CourseSubTitle>
        <Arrow disabled={currentKonuIndex === 0} onClick={handlePrev}>
          {"<"}
        </Arrow>
        <PartTitle>
          <h3>{`Konu No: ${currentKonuIndex + 1}`}</h3>
          <h2>{currentKonu?.name}</h2>
        </PartTitle>
        <Arrow
          disabled={currentKonuIndex === konular.length - 1}
          onClick={handleNext}
        >
          {">"}
        </Arrow>
      </CourseSubTitle>

      <CourseUnits>
        {allDersler.map((part, index) => (
          <CustomLink
            to={`/matematik/9-sinif/${unit?.link}/${part.link}`}
            key={index}
          >
            <Part data-tooltip-id="baloncuk" data-tooltip-content={part.name}>
              <IconDiv>
                {part.type === "v" && <VideoIcon />}
                {part.type === "a" && <ArticleIcon />}
                {part.type === "e" && <ExamIcon />}
              </IconDiv>
              <PartDescription>{part.name}</PartDescription>
              <Tooltip id="baloncuk" />
            </Part>
          </CustomLink>
        ))}
      </CourseUnits>
    </SliderContainer>
  );
};

export default SliderDokuz;
