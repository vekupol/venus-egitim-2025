//Çoktan Seçmeli

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  QuestionContainer,
  Question,
  Explanation,
  SingleAnswer,
  OptionBar,
  Text,
} from "./QuestionSingleAnswer";
import { Button } from "../buttons/Button.styled";
import PieChart from "../graphs/PieChart";
import "katex/dist/katex.min.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import {
  collection,
  query,
  where,
  getFirestore,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const db = getFirestore();

function Exercises({ sorular }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [dogru, setDogru] = useState(0);
  const [sayac, setSayac] = useState(0);
  const [sonuclar, setSonuclar] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const cevaplarArray = sorular.map((soru) => soru.dogruCevap);

  const [userData, setUserData] = useState({});
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      };
      fetchData();
    }
  }, [user]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
    console.log(updatedOptions);
  };

  const toggleDivs = () => {
    setShowFirstDiv(!showFirstDiv);
  };

  const resetAnswerStatus = () => {
    setSelectedOption("");
    setSayac(0);
  };

  const calculateFinalResult = () => {
    let correctCount = 0;
    let emptyCount = 0;
    selectedOptions.forEach((option, index) => {
      if (option === sorular[index].dogruCevap) {
        correctCount++;
      } else if (option === "Boş") {
        emptyCount++;
      }
    });
    const wrongCount = sorular.length - correctCount - emptyCount;
    return [correctCount, wrongCount, emptyCount];
  };

  const saveScore = async (score) => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const newTotalPoints = (userData.totalPoint || 0) + score;
      await updateDoc(userDoc, { totalPoint: newTotalPoints });
      setUserData({ ...userData, totalPoint: newTotalPoints });
    }
  };

  const [correctCount, wrongCount, emptyCount] = calculateFinalResult();
  const score = correctCount * 10;

  useEffect(() => {
    if (currentQuestionIndex === sorular.length) {
      saveScore(score);
    }
  }, [currentQuestionIndex]);

  const data = [
    ["", ""],
    ["Doğru", correctCount],
    ["Yanlış", wrongCount],
    ["Boş", emptyCount],
  ];

  const options = {
    legend: "none",
    pieSliceText: "label",
    pieStartAngle: 0,
  };


  return (
    <ExerciseContainer>
      {showFirstDiv ? (
        <HelloDiv>
          <Title style={{ fontFamily: "MyCustomFont" }}>
            Konu ile ilgili bilgilerini pekiştirmeye hazır mısın? <br />{" "}
            <span> {sorular.length} Soru</span>
          </Title>
          <Button
            width="200px"
            style={{ border: "1px solid white" }}
            onClick={toggleDivs}
          >
            Başla
          </Button>
        </HelloDiv>
      ) : (
        <div style={{ height: "100%" }}>
          {currentQuestionIndex < sorular.length ? (
            <ExercisesDiv className="formulas">
              <ButtonsDiv>
                <Button1
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                    }
                  }}
                  disabled={currentQuestionIndex === 0}
                >
                  Önceki Soru
                </Button1>
                <Button1
                  onClick={() => {
                    resetAnswerStatus();
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  }}
                  disabled={currentQuestionIndex === selectedOptions.length}
                >
                  {currentQuestionIndex === sorular.length - 1
                    ? "Sınavı Bitir"
                    : "Sıradaki Soru"}
                </Button1>
              </ButtonsDiv>
              <QuestionDiv>
                <QuestionContainer>
                  <Question>{sorular[currentQuestionIndex].soru}</Question>
                  <Explanation>
                    {sorular[currentQuestionIndex].aciklama}
                  </Explanation>
                  <SingleAnswer>
                    <OptionBar>
                      <Option
                        onClick={() => handleOptionSelect("A")}
                        isSelected={
                          selectedOptions[currentQuestionIndex] === "A"
                        }
                      >
                        A
                      </Option>
                      <Text> {sorular[currentQuestionIndex].A}</Text>
                    </OptionBar>
                    <OptionBar>
                      <Option
                        onClick={() => handleOptionSelect("B")}
                        isSelected={
                          selectedOptions[currentQuestionIndex] === "B"
                        }
                      >
                        B
                      </Option>
                      <Text> {sorular[currentQuestionIndex].B} </Text>
                    </OptionBar>
                    <OptionBar>
                      <Option
                        onClick={() => handleOptionSelect("C")}
                        isSelected={
                          selectedOptions[currentQuestionIndex] === "C"
                        }
                      >
                        C
                      </Option>
                      <Text> {sorular[currentQuestionIndex].C} </Text>
                    </OptionBar>
                    <OptionBar>
                      <Option
                        onClick={() => handleOptionSelect("D")}
                        isSelected={
                          selectedOptions[currentQuestionIndex] === "D"
                        }
                      >
                        D
                      </Option>
                      <Text> {sorular[currentQuestionIndex].D} </Text>
                    </OptionBar>
                    <OptionBar>
                      <Option
                        onClick={() => handleOptionSelect("E")}
                        isSelected={
                          selectedOptions[currentQuestionIndex] === "E"
                        }
                      >
                        E
                      </Option>
                      <Text> {sorular[currentQuestionIndex].E} </Text>
                    </OptionBar>
                    <OptionBar>
                      <Option
                        style={{ width: "110px" }}
                        onClick={() => handleOptionSelect("Boş")}
                        isSelected={
                          selectedOptions[currentQuestionIndex] === "Boş"
                        }
                      >
                        Boş Bırak
                      </Option>
                    </OptionBar>
                  </SingleAnswer>
                </QuestionContainer>
              </QuestionDiv>
            </ExercisesDiv>
          ) : (
            <ExercisesDiv style={{ padding: "0px", height: "550px" }}>
              <ByeDiv>
                <CheckList>
                  <Finish>
                    <span>{score} Venüs Puanı Kazandınız.</span>
                  </Finish>
                  <ResultsTable>
                    <TableRow>
                      <TableHeader>Cevap Anahtarı</TableHeader>
                      {cevaplarArray.map((dogruCevap, index) => (
                        <TableCell key={index}>{dogruCevap}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableHeader>Yanıtlarınız</TableHeader>
                      {selectedOptions.map((dogruCevap, index) => (
                        <TableCell key={index}>{dogruCevap}</TableCell>
                      ))}
                    </TableRow>
                  </ResultsTable>
                  <PieChart
                    PieData={data}
                    PieOptions={options}
                    style={{ height: "60%", width: "100%" }}
                  />
                </CheckList>
              </ByeDiv>
            </ExercisesDiv>
          )}
        </div>
      )}
    </ExerciseContainer>
  );
}

const ExerciseContainer = styled.div`
  width: 100%;
`;

const Option = styled.div`
  margin: 0px 20px 5px;
  font-family: "MyCustomFont", sans-serif;
  cursor: pointer;
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 4px;
  background-color: ${({ isSelected }) => (isSelected ? "#674188" : "#eee")};
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  width: 30px;
  text-align: center;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  :hover {
    border: 2px solid #674188;
  }
`;
const HelloDiv = styled.div`
  background-color: var(--main-color);
  height: 550px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  border-radius: 5px;
  span {
    font-size: 20px;
    font-family: "MyCustomFont", sans-serif;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    height: 250px;
    span {
      font-size: 15px;
      font-family: "MyCustomFont", sans-serif;
    }
  }
`;

const Title = styled.div`
  text-align: center;
`;

const QuestionDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;

const ButtonsDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ExercisesDiv = styled.div`
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid var(--main-color);
  box-sizing: border-box;
`;

const Button1 = styled.button`
  align-self: flex-end;
  padding: 8px 12px;
  font-size: 18px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  font-family: "MyCustomFont", sans-serif;
  width: 180px;
  background-color: ${({ disabled }) =>
    disabled
      ? "gray"
      : "var(--main-color)"}; /* Pasifken farklı bir arka plan rengi */
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 8px;
    width: 120px;
  }
`;

const ByeDiv = styled.div`
  height: 450px;
  width: 100%;
  color: var(--main-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 5px;
  text-align: center;

  font-family: "MyCustomFont", sans-serif;
  span {
    font-size: 20px;
    font-family: "MyCustomFont", sans-serif;
  }
`;

const Finish = styled.div`
  height: 20%;
  text-align: center;
  span {
    font-family: "MyCustomFont", sans-serif;
    font-size: 40px;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

const CheckList = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 18px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`;

const ResultsTable = styled.table`
  width: 100%;
  height: 70px;
`;

const TableHeader = styled.th`
  border: 1px solid black;
  padding: 6px;
  text-align: left;
  font-family: "MyCustomFont", sans-serif;
  text-align: center;

  @media (max-width: 950px) {
    font-size: 12px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
    font-family: "MyCustomFont", sans-serif;
  }
`;

const TableCell = styled.td`
  border: 1px solid black;
  padding: 6px;
  font-family: "MyCustomFont", sans-serif;
  text-align: center;
  @media (max-width: 950px) {
    font-size: 10px !important;
  }
`;

export default Exercises;
