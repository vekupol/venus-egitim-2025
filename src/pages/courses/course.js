import React,{useState} from 'react';
import styled from 'styled-components';
import { darken } from '@mui/material';
import Intro from './drawers/intro';
import UnitsArea from './drawers/units';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { MdOutlineSlowMotionVideo,MdOutlineArticle,MdOutlineBallot} from "react-icons/md";


function Course() {

    const [activeDiv, setActiveDiv] = useState(1);
    const handleButtonClick = (divNumber) => {
      setActiveDiv(divNumber);
    };


  return (
    <div>
        <Container>
            <SideBar>
                <CourseTitle onClick={() => handleButtonClick(1)}>
                    <CourseName>Mantık</CourseName>
                    <CourseContent> 5 Konuda - 14 Bölüm</CourseContent>
                </CourseTitle>
                <CourseUnits>
                    <Units onClick={() => handleButtonClick(2)}>
                        <Image>
                        </Image>
                        <div>
                            <UnitName>Konu 1</UnitName>
                            <UnitDescription>Bu ünitede birden fazla sayının EBOB'unu EKOK'unu bulmayı,  </UnitDescription> 
                        </div> 
                                                   
                    </Units>
                    
                </CourseUnits>

            </SideBar>
            <MainBar>
                {activeDiv === 1 && ( <Intro/> )}
                {activeDiv === 2 && ( <UnitsArea/> )}
            </MainBar>
        </Container>
    </div>
  )
}


export const Container = styled.div`
    width: 100%;
    display: flex;
    border: 1px solid var(--main-color);
    padding-bottom: 12rem;
    
    `

export const SideBar = styled.div`
    width: 250px;

    @media screen and (max-width: 800px) {
        display: none;
    }
`

export const CourseTitle = styled.div`
background-color: var(--main-color);
padding: .2rem 0rem 1rem 0rem;
color: white;
`

export const CourseName = styled.div`
border-bottom: 1px solid var(--main-color);
border-color: white;
font-size: 1.2rem;
padding-left: 20px;
display: flex;
align-items: end;`

export const CourseContent = styled.div`
padding-left: 20px;
font-size: 0.8rem;`

export const CourseUnits = styled.div`
height: 700px;
border: 1px solid var(--main-color);`

export const Units = styled.div`
display: flex;
padding: 1rem;
align-items: center;
border-bottom: .1px solid var(--main-color); 
:hover{
    cursor: pointer;
    background-color:  ${darken('#fff', 0.1)};
        
}
`
export const Image = styled.div`
`

export const UnitName = styled.div`
font-size: 1rem;
font-weight: bold;
flex: 1;
span{
  color: var(--main-color);
  font-weight: bold;
}`

export const UnitDescription = styled.div`
font-size: .7rem;`

export const MainBar = styled.div`
    flex: 1;
    padding: 2rem 2rem 0rem 3rem;
    
    `

export const CourseSubTitle = styled.div`
background-color:var(--second-color);
display: flex;
align-items: center;
min-height: 90px;
justify-content: space-between;
height: fit-content;
overflow-y: hidden;
`

export const CourseSubName = styled.p`
padding: 0 1.5rem;
font-size: 1.1rem;
color: var(--main-color);
font-weight: bold;
height: 100%;
display: flex;
align-items: center;
overflow-y: hidden;
`

export const Part = styled.div`
padding: 1rem 1rem .5rem 0rem;
display: flex;
justify-content: start;
align-items: center;
:hover{
    cursor: pointer;
    background-color:  ${darken('#fff', 0.1)};
        
}`


export const PartDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  width: 80%;`

export const IconDiv = styled.div`
font-size: 1.5rem;
width: 20%;
display: flex;
align-items: center;
justify-content: center;
`

export const LeftArrow = styled(FaArrowCircleLeft)`
color : var(--main-color);
font-size: 2rem;
height: 100%;
padding-left : 1rem;
:hover{
  cursor: pointer;         
}
`
export const RightArrow = styled(FaArrowCircleRight)`
color : var(--main-color);
font-size: 2rem;
height: 100%;
padding-right : 1rem;
:hover{
  cursor: pointer;       
}
`
export const VideoIcon = styled(MdOutlineSlowMotionVideo)`
color: var(--main-color);`

export const ArticleIcon = styled(MdOutlineArticle)`
color: var(--main-color);`

export const ExamIcon = styled(MdOutlineBallot)`
color: var(--main-color);`

export const PartTitle = styled.div`
text-align: center;

h3{
  font-size: 12px;
  color: var(--main-color);
  padding-top: 5px;
}

h2{
  font-size: 15px;
  color: var(--main-color);
  margin-bottom: 10px;
  text-align: center;
}
`



export const SliderContainer = styled.div`
background-color: #f7f7f7;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;



export const Arrow = styled.span`
cursor: pointer;
font-size: 24px;
color: var(--main-color);  
padding: 10px;
opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;




export default Course;

