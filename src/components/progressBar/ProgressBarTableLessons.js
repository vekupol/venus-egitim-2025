import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BsArrowRightShort } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import ProgressBar from "./ProgressBar";

const authInstance = getAuth();

const progressAnimation = keyframes`
  0% {
    width: 0%;
    background-color: var(--second-color);
  }
  100% {
    width: ${(props) => props.progressValue}%;
    background-color: var(--main-color);
  }
`;

const ContainerUp = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  width: 30px;
  text-align: center;
`;

const Progress2 = styled.div`
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
`;

const ProgressBar2 = styled.div`
  height: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  transition: 0.4s linear;
  transition-property: width;
  width: ${(props) => props.progressValue}%;
  background-color: ${(props) => props.mainColor};
  animation: ${progressAnimation} 2s forwards;
`;

const ProgressBarSquare = ({ totalPeople, donePeople }) => {
  const progressValue = ((donePeople / totalPeople) * 100 || 0).toFixed(0);
  const mainColor = "var(--main-color)"; // Ana renk tanımını buraya ekledim
  const secondColor = "var(--second-color)"; // İkincil renk tanımını buraya ekledim

  return (
    <ContainerUp>
      <Container>
        <Progress2 className="progress2">
          <ProgressBar2
            className="progress-bar2"
            progressValue={progressValue}
            mainColor={mainColor}
            secondColor={secondColor}
          />
        </Progress2>
      </Container>
    </ContainerUp>
  );
};

function ProgressBarTable({ progressArray }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <ProgressTable>
        <Description>
          Bu bölüm ünitedeki ilerlemeni göstermektedir. Bölümleri tamamlayıp,
          soru çözdükçe ilerlemen artacaktır.
        </Description>
        {!isLoggedIn && (
          <Description>
            
            <span>
              Eğer ilerlemenin takip edilmesini istiyorsan giriş yapmalısın.
            </span>
          </Description>
        )}
        <Progress>
          {progressArray?.map((part) => (
            <UnitProgress key={part.partId}>
              <ProgressIcon>
                <ProgressBarSquare
                  donePeople={isLoggedIn ? part.done : 0} // Kullanıcı giriş yapmışsa part.done, yapmamışsa 0 olarak ayarla
                  totalPeople={part.total}
                />
              </ProgressIcon>
            </UnitProgress>
          ))}
        </Progress>

        <TotalProgress>
          <div>Toplam İlerleme</div>
          <BsArrowRightShort style={{ color: "var(--main-color)" }} />
          {progressArray?.length > 0 && (
            <ProgressBar
              donePeople={progressArray.reduce(
                (acc, unit) => acc + (isLoggedIn ? unit.done : 0), // Kullanıcı giriş yapmışsa unit.done, yapmamışsa 0 olarak ekle
                0
              )}
              totalPeople={progressArray.reduce(
                (acc, unit) => acc + unit.total,
                0
              )}
            />
          )}
        </TotalProgress>
      </ProgressTable>
    </div>
  );
}

export const ProgressTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 1rem;
  max-width: 1000px;
`;

export const Description = styled.div`
  font-size: 14px;
  span {
    font-size: 16px;
    color: var(--delete-color);
    font-weight: bold;
  }
`;
export const Progress = styled.div`
  width: 100%;
  display: flex;
  gap: 6px;
  margin: 1rem 0 2rem;
  font-size: 12px;
`;

export const UnitProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UnitName = styled.div`
  min-width: min-content;
`;

export const ProgressIcon = styled.div``;

export const TotalProgress = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export default ProgressBarTable;
