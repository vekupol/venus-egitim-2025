import React from "react";
import styled from "styled-components";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import {
  MdOutlineSlowMotionVideo,
  MdOutlineArticle,
  MdOutlineBallot,
} from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";

function DerslerStyle() {
  return <div>Derslerde kullanılan style lar burada olacak</div>;
}

export const Container = styled.div`
  width: 100%;
  max-width: var(--main-width);
  min-height: 100vh;
  display: flex;
  padding: 0rem 2rem;

  @media screen and (max-width: 768px) {
    padding: 0rem;
  }
`;

export const Sidebar = styled.div`
  width: 280px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0px 8px 8px 8px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const CourseTitle = styled.div`
  background-color: var(--main-color);
  padding: 1rem 0rem 1rem 0rem;
  color: white;
`;

export const CourseName = styled.div`
  font-size: 1.2rem;
  padding-left: 20px;
  display: flex;
  align-items: end;
`;

export const CourseContent = styled.div`
  padding-left: 20px;
  font-size: 0.8rem;
`;

export const CourseUnits = styled.div``;

export const Units = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  border-bottom: 0.1px solid var(--main-color);
  :hover {
    cursor: pointer;
  }
`;

export const UnitName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  flex: 1;
  span {
    color: var(--main-color);
    font-weight: bold;
  }
`;

export const Main = styled.div`
  flex: 1;
  padding: 1rem 2rem;
  height: auto;
`;
export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 10px;
`;

export const PartDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  width: 80%;
`;

export const IconDiv = styled.div`
  font-size: 1.5rem;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LeftArrow = styled(FaArrowCircleLeft)`
  color: var(--main-color);
  font-size: 2rem;
  height: 100%;
  padding-left: 1rem;
  :hover {
    cursor: pointer;
  }
`;
export const RightArrow = styled(FaArrowCircleRight)`
  color: var(--main-color);
  font-size: 2rem;
  height: 100%;
  padding-right: 1rem;
  :hover {
    cursor: pointer;
  }
`;
export const VideoIcon = styled(MdOutlineSlowMotionVideo)`
  color: var(--main-color);
`;

export const ArticleIcon = styled(MdOutlineArticle)`
  color: var(--main-color);
`;

export const ExamIcon = styled(MdOutlineBallot)`
  color: var(--main-color);
`;

export const PartTitle = styled.div`
  text-align: center;

  h3 {
    font-size: 12px;
    color: var(--main-color);
    padding-top: 5px;
  }

  h2 {
    font-size: 15px;
    color: var(--main-color);
    margin-bottom: 10px;
    text-align: center;
  }
`;

export const SliderContainer = styled.div``;

export const Arrow = styled.span`
  cursor: pointer;
  font-size: 24px;
  color: var(--main-color);
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Part = styled.div`
  padding: 1rem 1rem 0.5rem 0rem;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  border-bottom: 0.1px solid var(--main-color);
  :hover {
    cursor: pointer;
  }
`;

export const CourseSubTitle = styled.div`
  display: flex;
  align-items: center;
  min-height: 90px;
  justify-content: space-between;
  height: fit-content;
  overflow-y: hidden;

  border-bottom: 0.1px solid var(--main-color);
`;
export const VideoImage = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  height: 56%;
  border: 2px solid var(--main-color);

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    color: var(--main-color);
    word-wrap: break-word;
    margin: 0.5rem;
    padding: 0.5rem;
    font-size: 2rem;
    overflow-y: hidden;

    @media (max-width: 1000px) {
      font-size: 1.4rem;
    }
    @media (max-width: 800px) {
      font-size: 1.1rem;
    }
  }
`;

export const PlayIcon = styled(FaRegCirclePlay)`
  color: var(--main-color);
  cursor: pointer;
  overflow-y: hidden;
  font-size: 3.5rem;
  overflow-y: hidden;
  margin: 0rem 1rem;

  @media (max-width: 1000px) {
    font-size: 2rem;
  }
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

export const ChangeLessonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 2rem;

  @media screen and (max-width: 768px) {
    margin: 0px;
  }

  
`;

export default DerslerStyle;
