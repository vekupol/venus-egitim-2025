//Alıştırmalar 

import React, { useState } from 'react';
import styled, {keyframes} from 'styled-components';


function QuestionSingleAnswer() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const correctAnswerIndex = 2;

  const handleAnswerSelection = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setCheckResult(null);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === correctAnswerIndex) {
      setCheckResult('Doğru');
    } else {
      setCheckResult('Yanlış');
    }
  };

  return (
    <QuestionContainer>
      <Question>Aşağıdakilerden hangisi bir önermedir?</Question>
      <Explanation>Doğru olan şıkkı seçiniz.</Explanation>
      <SingleAnswer>
        <OptionBar>
          <Option onClick={() => handleAnswerSelection(0)} isSelected={selectedAnswer === 0}>
            A
          </Option>
          <Text>asdasdasd</Text>
        </OptionBar>
        <OptionBar>
          <Option onClick={() => handleAnswerSelection(1)} isSelected={selectedAnswer === 1}>
            B
          </Option>
          <Text>asdasdasd</Text>
        </OptionBar>
        <OptionBar>
          <Option onClick={() => handleAnswerSelection(2)} isSelected={selectedAnswer === 2}>
            C
          </Option>
          <Text>asdasdasd</Text>
        </OptionBar>
        <OptionBar>
          <Option onClick={() => handleAnswerSelection(3)} isSelected={selectedAnswer === 3}>
            D
          </Option>
          <Text>asdasdasd</Text>
        </OptionBar>
        <Check onClick={handleCheckAnswer}>Kontrol Et</Check>
        {checkResult && <Result correct={checkResult === 'Doğru'}>{checkResult}</Result>}
      </SingleAnswer>
    </QuestionContainer>
  );
}


export const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

export const Question = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Explanation = styled.div`
  font-style: italic;
  margin-bottom: 15px;
  font-size: 1rem;
  @media (max-width: 768px) {
    font-size: .8rem;
  }
`;

export const SingleAnswer = styled.div``;

export const OptionBar = styled.div`
  display: flex;
`;

export const Option = styled.div`
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

export const Text = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Check = styled.button`
  border: 3px solid #674188;
  border-radius: 4px;
  background-color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin: 15px 32px;
  font-size: 1.2rem;

  :hover {
    background-color: #674188;
    color: white;
  }
`;

export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

export const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25%, 75% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
`;

export const Result = styled.div`
  border: 3px solid #674188;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 4px;
  background-color: white;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
  margin: 15px 32px;
  width: 86px;
  animation: ${({ correct }) => (correct ? bounce : shake)} 0.5s;

  ${({ correct }) =>
    correct
      ? `
    color: #4CAF50; /* Doğru renk */
  `
      : `
    color: #f44336; /* Yanlış renk */
  `}

  :hover {
    animation: none; /* Animasyonu durdur */
  }
`;

export default QuestionSingleAnswer;
