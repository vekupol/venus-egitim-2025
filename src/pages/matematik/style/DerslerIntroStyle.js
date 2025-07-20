import React from 'react';
import styled from 'styled-components';

function DerslerIntroStyle() {
  return (
    <div>
      Intro style ları burada
    </div>
  )
}


export const Container = styled.div``;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Title = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  h2 {
    margin-top: 1rem;
  }
`;

export const ProgressTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  height: 200px;
  padding: 1rem;
  max-width: 1000px;
`;

export const Units = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  width: 43%;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;
`;

export const Description = styled.div`
  font-size: 14px;
`;

export const UnitContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 10px;
  padding: 0rem 1rem 1rem 1rem;

  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

`;

export const Unit = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.6rem;
  min-width: min-content;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

export const Parts = styled.div`
`;

export const Part = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 0.3rem;
  }
`;

export const Progress = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 3 eşit genişlikte sütun */
  gap: 10px;
  margin: 1rem 0 2rem;
  font-size: 12px;
`;

export const UnitProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UnitName = styled.div``;

export const ProgressIcon = styled.div``;

export const TotalProgress = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const UnitsShadow = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 9px;
  box-shadow: 5px 5px 14px #666666, -5px -5px 14px #ffffff;

  @media screen and (max-width: 768px) {
  }
`;



export default DerslerIntroStyle
