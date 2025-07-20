import React from 'react';
import styled from 'styled-components';
import {BsArrowRightShort} from 'react-icons/bs';
import {IoHomeSharp} from 'react-icons/io5';
import ProgressBar from "../../../components/progressBar/ProgressBar";
import {Container,Icons,Title,UnitContainer,Unit,Parts,Part} from './intro'
import { MdOutlineSlowMotionVideo,MdOutlineArticle,MdOutlineBallot,MdOutlineCheck} from "react-icons/md";
import "../../../style/global/index.css";


function UnitsArea() {
  return (
    <Container>
        <Icons><IoHomeSharp className='icons'/><BsArrowRightShort className='icons'/><p>Mantık</p><BsArrowRightShort style={{color: "var(--main-color)"}}/><p>Önerme</p></Icons>
        <Title><h1>Ünite 1 :</h1><h1>Önerme</h1></Title>
        <Progress><ProgressBar/></Progress>
        <Title><h2>Ünite İçeriği</h2></Title>
        
            <UnitContainer>
            <Units >
                    <Unit>Bölüm 1: Önerme nedir?</Unit>
                    <Parts>
                        <Part><MdOutlineSlowMotionVideo className='icons'/> Önerme </Part>
                        <Part><MdOutlineArticle className='icons' />Doğruluk değeri</Part>
                        <Part><MdOutlineBallot className='icons-check'/>Önerme </Part>
                        <Part><MdOutlineCheck className='icons'/>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                <Units>
                    <Unit>Bölüm 2: Önerme nedir?</Unit>
                    <Parts>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                <Units>
                    <Unit>Bölüm 3: Önerme nedir?</Unit>
                    <Parts>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                <Units>
                    <Unit>Bölüm 4: Önerme nedir?</Unit>
                    <Parts>
                        <Part>Önerme </Part>
                        <Part>Doğruluk değeri</Part>
                    </Parts>
                </Units>
                
            </UnitContainer>
    </Container>
    
  )
}

const Progress = styled.div``

const Units = styled.div`
padding: 1rem;
margin-top: 1rem;

border-radius: 9px;
box-shadow:  5px 5px 14px #666666,
             -5px -5px 14px #ffffff;
width: 90%;`

export default UnitsArea;
