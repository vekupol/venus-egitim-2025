// Alıştırmalar için bu kullanılacak

import React, { useState } from 'react'
import styled from 'styled-components'
import {QuestionContainer, Question, Explanation, SingleAnswer, OptionBar,  Text, Check, Result} from './QuestionSingleAnswer'
import sorular from "./sorular.json"


function Exercises2() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [selectedOption, setSelectedOption] = useState(""); // Kullanıcının seçtiği şık
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isNextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [score, setScore] = useState(0);
  const [dogru,setDogru] = useState(0);
  const [sayac,setSayac] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowResult(false)
  };

  const toggleDivs = () => {
    setShowFirstDiv(!showFirstDiv);
  };


  const checkAnswer = () => {
    const correctAnswer = sorular[currentQuestionIndex].dogruCevap;
    
    if (selectedOption === correctAnswer) {
      setIsAnswerCorrect(true);
      setNextButtonDisabled(false);
      if (sayac === 0) {
        const currentScore = sorular[currentQuestionIndex].puan;
        setScore(score + currentScore);
        setSayac(1);
        setDogru(dogru + 1);
      }
      
      
    } else {
      setIsAnswerCorrect(false);
      setSayac(1);
    }
    
    setShowResult(true);
    
  };

  const resetAnswerStatus = () => {
    setSelectedOption(""); // Seçilen şıkkı sıfırla
    setIsAnswerCorrect(false);
    setShowResult(false);
    setNextButtonDisabled(true);
    setSayac(0);
    
  };
    
  return (
    <ExerciseContainer>
    {showFirstDiv ? (
      <HelloDiv>
        <Title>
      Konu ile ilgili bilgilerini pekiştirmeye hazır mısın? <br /> <span> {sorular.length} Soru</span>
        </Title>
        <Button onClick={toggleDivs}>Başla</Button>
      </HelloDiv>
    ) : (
      <div>
        {currentQuestionIndex < sorular.length ? (
          <ExercisesDiv>
                <QuestionContainer>
                  <Question>{sorular[currentQuestionIndex].soru}</Question>
                    <Explanation> {sorular[currentQuestionIndex].aciklama} </Explanation>
                    <SingleAnswer>
                        <OptionBar>
                            <Option onClick={() => handleOptionSelect("A")}
                            isSelected={selectedOption === "A"}>
                            A
                            </Option>
                        <Text> {sorular[currentQuestionIndex].A}</Text>
                        </OptionBar>
                        <OptionBar>
                            <Option onClick={() => handleOptionSelect("B")}
                            isSelected={selectedOption === "B"}>
                            B
                            </Option>
                            <Text> {sorular[currentQuestionIndex].B} </Text>
                        </OptionBar>
                        <OptionBar>
                            <Option onClick={() => handleOptionSelect("C")}
                            isSelected={selectedOption === "C"}>
                            C
                            </Option>
                        <Text> {sorular[currentQuestionIndex].C} </Text>
                        </OptionBar>
                        <OptionBar>
                            <Option onClick={() => handleOptionSelect("D")}
                            isSelected={selectedOption === "D"}>
                            D
                            </Option>
                        <Text> {sorular[currentQuestionIndex].D} </Text>
                        </OptionBar>
                        <Check onClick={checkAnswer}>Kontrol Et</Check>
                        {showResult && (
                          <ResultAnimation isCorrect={isAnswerCorrect}>
                          {isAnswerCorrect ? 'Doğru!' : (
                            <div dangerouslySetInnerHTML={{ __html: `Tekrar Deneyin! <br/> ${sorular[currentQuestionIndex][`${selectedOption}yanlis`]}` }} />
                          )}
                        </ResultAnimation>
                        
                        )}
                    </SingleAnswer>
                </QuestionContainer>
              <Button1
                onClick={() => {
                  if (currentQuestionIndex === sorular.length - 1) {
                    resetAnswerStatus();
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  } else {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    resetAnswerStatus(); 
                  }
                }}
                disabled={isNextButtonDisabled} // Butonu pasif hale getirir
              >
                {currentQuestionIndex === sorular.length - 1 ? 'Sınavı Bitir' : 'Sıradaki Soru'}
              </Button1>
              </ExercisesDiv>
        ) : (
      <ByeDiv> <span>Alıştırma bitti !!!</span> <br/> {dogru} / {sorular.length} Doğru Cevap ---   {score} Venüs Puanı </ByeDiv>
        )}
      </div>
    )}
  </ExerciseContainer>
);
}

const ExerciseContainer = styled.div`
`

const Option = styled.div`
  margin: 0px 20px 5px;
  cursor: pointer;
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 4px;
  background-color: ${({ isSelected }) => (isSelected ? '#674188' : '#eee')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
  width: 30px;
  text-align: center;
  font-size: 1.2rem;
  :hover {
    border: 2px solid #674188;
  }
`;
const HelloDiv = styled.div`
background-color: var(--main-color);
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 800px;
font-size: 35px;
span{
  font-size: 20px;
}

`

const Title = styled.div`
text-align: center;`

const Button = styled.button`
padding: 8px 28px;
font-size: 20px;
cursor: pointer;
color: var(--main-color);
background-color: var(--second-color);
border-radius: 15px;
border: 1px solid var(--second-color);
margin-top: 22px;
:hover{
  padding: 10px 30px;
  font-size: 22px;
  transition: 0.6 ease-out;
  margin-top: 15px;
} 
`
const ExercisesDiv = styled.div`
height: 800px;
border: 1px solid var(--main-color);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Button1 = styled.button`
align-self: flex-end;
margin-right: 40px;
padding: 12px 20px;
font-size: 20px;
background-color: var(--main-color);
color: white;
cursor: pointer;
margin-top: 20px;
border-radius: 15px;
border: none;
background-color: ${({ disabled }) => (disabled ? 'gray' : 'var(--main-color)')}; /* Pasifken farklı bir arka plan rengi */
opacity: ${({ disabled }) => (disabled ? '0.6' : '1')}; /* Pasifken farklı bir opaklık */
`

const ByeDiv = styled.div`
background-color: var(--main-color);
color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 800px;
font-size: 20px;
text-align: center;
span{
  font-size: 35px;
}`

const ResultAnimation = styled.div`
  color: ${({ isCorrect }) => (isCorrect ? 'green' : 'red')}; /* Doğruysa yeşil, yanlışsa kırmızı renk */
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
  animation: fadeInOut 2s ease-in-out; /* Animasyon */
  
  @keyframes fadeInOut {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;


export default Exercises2
