import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { CustomLink } from "../../../components/buttons/Button.styled";
import jsonData from "./MatematikLiseOn.json";
import {CourseTitle,
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
  ExamIcon,} from "../../matematik/style/DerslerStyle"

const SliderOn = ({unitNumber,konuNumber, baslangicNumber}) => {

  const unitNo = unitNumber;
  const konuNo = konuNumber;
  const baslangicNo = baslangicNumber - 1;


  const [currentTopic, setCurrentTopic] = useState(baslangicNo);
  const [unitsData, setUnitsData] = useState({ lessons: [] });
  const [unit, setUnit] = useState([]);


  useEffect(() => {
    setUnit(jsonData.units[unitNo]);
    setUnitsData(jsonData.units[unitNo].konular[konuNo]);

  }, []);

  const handleNextTopic = () => {
    if (
      unitsData &&
      unitsData.bolumler &&
      currentTopic < unitsData.bolumler.length - 1
    ) {
      setCurrentTopic((prevTopic) => prevTopic + 1);
    }
  };

  const handlePrevTopic = () => {
    if (unitsData && unitsData.bolumler && currentTopic > 0) {
      setCurrentTopic((prevTopic) => prevTopic - 1);
    }
  };

  const konu =
    unitsData && unitsData.bolumler && unitsData.bolumler.length > 0
      ? unitsData.bolumler[currentTopic]
      : "";
  const topicsCount =
    unitsData && unitsData.bolumler ? unitsData.bolumler.length : 0;

  let totalDerslerLength = 0;
  if (Array.isArray(unitsData.bolumler)) {
    unitsData.bolumler.forEach((lesson) => {
      if (lesson.dersler && lesson.dersler.length > 0) {
        totalDerslerLength += lesson.dersler.length;
      }
    });
  }

  return (
    <SliderContainer>
      <CourseTitle>
        <CourseName>{unitsData.name}</CourseName>
        <CourseContent>
          {topicsCount} Bölüm - {totalDerslerLength} Ders
        </CourseContent>
      </CourseTitle>
      <CourseSubTitle>
        <Arrow disabled={currentTopic === 0} onClick={handlePrevTopic}>
          {"<"}
        </Arrow>
        <PartTitle>
          <h3>{`Bölüm No: ${currentTopic + 1}`}</h3>
          <h2>{konu.name} </h2>
        </PartTitle>
        <Arrow
          disabled={currentTopic === topicsCount - 1}
          onClick={handleNextTopic}
        >
          {">"}
        </Arrow>
      </CourseSubTitle>
      <CourseUnits>
        {konu.dersler &&
          konu.dersler.map((part, index) => (
            <CustomLink
              to={`/matematik/10-sinif/${unit?.link}/${unit.konular[konuNumber]?.link}/${part.link}`}
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



export default SliderOn;
