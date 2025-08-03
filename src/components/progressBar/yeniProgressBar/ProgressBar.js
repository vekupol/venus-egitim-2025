import React from "react";
import styled from "styled-components";

const ProgressBar = ({ progress = 0, label = "" }) => {
  return (
    <ProgressContainer>
      {label && <Label>{label}</Label>}
      <Bar>
        <Fill style={{ width: `${progress}%` }}>
          <Percentage>{progress}%</Percentage>
        </Fill>
      </Bar>
    </ProgressContainer>
  );
};

export default ProgressBar;

// ---- Styled Components ----
const ProgressContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 768px) {
    max-width: 90%;
  }
`;

const Label = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--main-color);
  text-align: left;

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 25px;
  background: var(--third-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Fill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, var(--main-color), #7b2ff7);
  width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: width 0.6s ease-in-out;
  border-radius: 12px;
  padding-right: 8px;
`;

const Percentage = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 0.85rem;

  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
