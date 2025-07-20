import React from 'react';
import styled, { keyframes } from 'styled-components';

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
  width: 150px;
  text-align: center;
`;

const Progress2 = styled.div`
  padding: 3px 3px;
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
`;

const ProgressBar2 = styled.div`
  height: 18px;
  border-radius: 6px;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 0.4s linear;
  transition-property: width;
  width: ${(props) => props.progressValue}%;
  background-color: ${(props) => props.mainColor};
  animation: ${progressAnimation} 2s forwards;
`;

const ProgressBar = ({ totalPeople, donePeople }) => {
  const progressValue = ((donePeople / totalPeople) * 100 || 0).toFixed(0);
  const mainColor = 'var(--main-color)'; // Ana renk tanımını buraya ekledim
  const secondColor = 'var(--second-color)'; // İkincil renk tanımını buraya ekledim

  const yuzde = ((donePeople / totalPeople) * 100).toFixed(0); // yuzde hesaplamasını düzelttim

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
     <div style={{ whiteSpace: "nowrap", minWidth: "min-content"}}>% {yuzde} </div> 
    </ContainerUp>
  );
};

export default ProgressBar;
