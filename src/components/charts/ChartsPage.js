import React, { useState } from "react";
import styled from "styled-components";
import { RechartsComponent } from "./RechartsComponent";
import { ChartJSComponent } from "./ChartJSComponent";
import { NivoComponent } from "./NivoComponent";
import { VictoryComponent } from "./VictoryComponent";
import { ApexChartsComponent } from "./ApexChartsComponent";

export default function ChartsPage() {
  const [activeTab, setActiveTab] = useState("recharts");

  const renderContent = () => {
    switch (activeTab) {
      case "recharts":
        return <RechartsComponent />;
      case "chartjs":
        return <ChartJSComponent />;
      case "nivo":
        return <NivoComponent />;
      case "victory":
        return <VictoryComponent />;
      case "apex":
        return <ApexChartsComponent />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <h1>React Chart Kütüphaneleri Karşılaştırması</h1>
      <Tabs>
        <Tab
          active={activeTab === "recharts"}
          onClick={() => setActiveTab("recharts")}
        >
          Recharts
        </Tab>
        <Tab
          active={activeTab === "chartjs"}
          onClick={() => setActiveTab("chartjs")}
        >
          Chart.js
        </Tab>
        <Tab active={activeTab === "nivo"} onClick={() => setActiveTab("nivo")}>
          Nivo
        </Tab>
        <Tab
          active={activeTab === "victory"}
          onClick={() => setActiveTab("victory")}
        >
          Victory
        </Tab>
        <Tab active={activeTab === "apex"} onClick={() => setActiveTab("apex")}>
          ApexCharts
        </Tab>
      </Tabs>
      <ChartWrapper>{renderContent()}</ChartWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  background: ${({ active }) => (active ? "#4CAF50" : "#e0e0e0")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ active }) => (active ? "#45a049" : "#ccc")};
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
`;
