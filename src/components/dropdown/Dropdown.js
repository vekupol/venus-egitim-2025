import React from "react";
import styled from "styled-components";
import Dokuz from "./matematikUniteler/Uniteler9.json";
import On from "./matematikUniteler/Uniteler10.json";
import OnBir from "./matematikUniteler/Uniteler11.json";
import OnIki from "./matematikUniteler/Uniteler12.json";
import Ayt from "./matematikUniteler/Ayt.json";
import Tyt from "./matematikUniteler/Tyt.json";
import { CustomLinkLeft } from "../buttons/Button.styled";

function DropdownMenu() {
  return (
    <Dropdown>
      <Box1>
        <CustomLinkLeft to="/matematik/tyt">
          <ColumnTitle>TYT Matematik</ColumnTitle>{" "}
        </CustomLinkLeft>
        {Tyt.map((item) => (
          <Li key={item.id}>
            <CustomLinkLeft to="/matematik/10-sinif/sayma-ve-olasilik">{item.title}</CustomLinkLeft>
          </Li>
        ))}
      </Box1>
      <Box2>
        <CustomLinkLeft to="/matematik/ayt">
          <ColumnTitle to="/matematik/ayt">AYT Matematik</ColumnTitle>{" "}
        </CustomLinkLeft>
        {Ayt.map((item) => (
          <Li key={item.id}>
            <CustomLinkLeft to="/matematik/10-sinif/sayma-ve-olasilik">{item.title}</CustomLinkLeft>
          </Li>
        ))}
      </Box2>
      <Box3>
        <CustomLinkLeft to="/matematik/12-sinif">
          <ColumnTitle>12. Sınıf</ColumnTitle>
        </CustomLinkLeft>
        {OnIki.map((item) => (
          <Li key={item.id}>
            <CustomLinkLeft to="/matematik/10-sinif/sayma-ve-olasilik">{item.title}</CustomLinkLeft>
          </Li>
        ))}
      </Box3>
      <Box4>
        <CustomLinkLeft to="/matematik/11-sinif">
          <ColumnTitle>11. Sınıf</ColumnTitle>
        </CustomLinkLeft>
        {OnBir.map((item) => (
          <Li key={item.id}>
            <CustomLinkLeft to="/matematik/10-sinif/sayma-ve-olasilik">{item.title}</CustomLinkLeft>
          </Li>
        ))}
      </Box4>
      <Box5>
        <CustomLinkLeft to="/matematik/10-sinif">
          <ColumnTitle>10. Sınıf</ColumnTitle>
        </CustomLinkLeft>
        {On.map((item) => (
          <Li key={item.id}>
            <CustomLinkLeft to="/matematik/10-sinif/sayma-ve-olasilik">{item.title}</CustomLinkLeft>
          </Li>
        ))}
      </Box5>
      <Box6>
        <CustomLinkLeft to="/matematik/9-sinif">
          <ColumnTitle>9. Sınıf</ColumnTitle>
        </CustomLinkLeft>
        {Dokuz.map((item) => (
          <Li key={item.id}>
            <CustomLinkLeft to="/matematik/10-sinif/sayma-ve-olasilik">{item.title}</CustomLinkLeft>
          </Li>
        ))}
      </Box6>
    </Dropdown>
  );
}

const Dropdown = styled.div`
  background-color: #efecf3;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, auto);
  }
`;
const Box = styled.div`
  background-color: #d7d4da;
  padding: 5px 10px 20px 12px;
  border-radius: 5px;
`;

const Box1 = styled(Box)`
  grid-area: 1 / 1 / 3 / 2;
  @media (max-width: 768px) {
    grid-area: 1 / 1 / 2 / 2;
  }
`;
const Box2 = styled(Box)`
  grid-area: 1 / 2 / 3 / 3;
  @media (max-width: 768px) {
    grid-area: 1 / 2 / 2 / 3;
  }
`;
const Box3 = styled(Box)`
  grid-area: 1 / 3 / 2 / 4;
  @media (max-width: 768px) {
    grid-area: 2 / 1 / 3 / 2;
  }
`;
const Box4 = styled(Box)`
  grid-area: 1 / 4 / 2 / 5;
  @media (max-width: 768px) {
    grid-area: 2 / 2 / 3 / 3;
  }
`;
const Box5 = styled(Box)`
  grid-area: 2 / 3 / 3 / 4;
  @media (max-width: 768px) {
    grid-area: 3 / 1 / 4 / 2;
  }
`;
const Box6 = styled(Box)`
  grid-area: 2 / 4 / 3 / 5;
  @media (max-width: 768px) {
    grid-area: 3 / 2 / 4 / 3;
  }
`;

const ColumnTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: #d7d4da;
  width: 100%;
  padding: 10px 0px 16px 10px;
  color: var(--main-color);
  cursor: pointer;

  @media (max-width: 730px) {
    font-size: 16px;
  }
`;

const Li = styled.li`
  list-style-type: circle;
  padding-left: 10px;
  margin-bottom: 5px;
  font-size: 16px;
  :hover {
    font-weight: bold;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default DropdownMenu;
