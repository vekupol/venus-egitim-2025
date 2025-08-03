import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProgressBar from "./ProgressBar";
import styled from "styled-components";

const authInstance = getAuth();

function ProgressBarTable({ progressArray }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProgressWrapper>
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
              <UnitName title={part.name}>{part.name}</UnitName>
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
          <UnitName title="Toplam İlerleme">Toplam İlerleme</UnitName>
          <ProgressBarDiv>
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
          </ProgressBarDiv>
        </TotalProgress>
      </ProgressTable>
    </ProgressWrapper>
  );
}

export const ProgressWrapper = styled.div`
  width: 100%;
  max-width: 100%; /* ✅ Taşmayı tamamen engeller */
  overflow-x: hidden;
  overflow-y: hidden;
  flex-shrink: 0; /* ✅ Flex düzeninde sıkışmayı önler */
  box-sizing: border-box;
`;

export const ProgressTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  max-width: 100%; /* ✅ Ekran sınırında kalır */
  box-sizing: border-box;
`;

export const Description = styled.div`
  font-size: 14px;
  margin-bottom: 0.5rem;

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

  /* ✅ 768-1100px arası flex-column'a geçiş */
  @media (min-width: 768px) and (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

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
  justify-content: space-between;
  flex-direction: column; /* ✅ Başlık ve bar alt alta */
  align-items: flex-start;
  gap: 8px;
`;

export const UnitName = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%; /* ✅ Uzun isimlerin kaymasını engeller */
  cursor: default;
`;

export const ProgressIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  max-width: 40%; /* ✅ Barın taşmasını engeller */
`;

export const TotalProgress = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ProgressBarDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 60%; /* ✅ Taşmayı önler */
`;

export default ProgressBarTable;
