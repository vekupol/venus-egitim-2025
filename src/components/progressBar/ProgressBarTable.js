import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProgressBar from "./ProgressBar";
import { BsArrowRightShort } from "react-icons/bs";
import styled from "styled-components";

const authInstance = getAuth();

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
        {!isLoggedIn && (<Description> <span>Eğer ilerlemenin takip edilmesini istiyorsan giriş yapmalısın.</span></Description>)}
        <Progress>
          {progressArray?.map((part) => (
            <UnitProgress key={part.partId}>
              
              <UnitName>{part.name}</UnitName>
              <BsArrowRightShort
                style={{ color: "var(--main-color)", margin: "0.5rem" }}
              />
              <ProgressIcon>
                <ProgressBar
                  donePeople={isLoggedIn ? part.done : 0} 
                  totalPeople={part.total}
                />
              </ProgressIcon>
            </UnitProgress>
          ))}
        </Progress>

        <TotalProgress>
          <p>Toplam İlerleme</p>
          <BsArrowRightShort style={{ color: "var(--main-color)" }} />
          {progressArray?.length > 0 && (
            <ProgressBar
              donePeople={progressArray.reduce(
                (acc, unit) => acc + (isLoggedIn ? unit.done : 0), 
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
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 10px;
  margin: 1rem 0 2rem;
  font-size: 12px;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: start;

  }
`;

export const UnitProgress = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
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
