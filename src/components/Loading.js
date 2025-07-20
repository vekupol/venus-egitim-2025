import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animasyonunu tanımla
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Loader bileşenini oluştur
const Loading1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid var(--main-color);
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  
`;

const Loading = () => {
  return (
    <Loading1>
      <Loader />
    </Loading1>
  );
};

export default Loading;
