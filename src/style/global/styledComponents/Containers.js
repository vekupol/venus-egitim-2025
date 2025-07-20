import React from "react";
import styled from "styled-components";

function Containers() {
  return <div>Container türlerini burada bulabilirsiniz.</div>;
}


// studentPanel,teacherPanel,searhResults

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;



export default Containers;
