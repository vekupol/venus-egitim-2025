import React from "react";
import styled from "styled-components";
import { Chart } from "react-google-charts";

function PieChart({ PieData, PieOptions }) {
  return (
    <ChartContainer2>
      <Chart
        chartType="PieChart"
        data={PieData}
        options={PieOptions}
        width={"100%"}
        height={"100%"}
      />
    </ChartContainer2>
  );
}

export const ChartContainer2 = styled.div`
  * {
    overflow: hidden;
  }
  max-width: 1200px;
  width: 100%;
  height: 100%;
`;
export const ChartContainer = styled.div`
  * {
    overflow: hidden;
  }
  max-width: 1200px;
  width: 100%;
  margin: 20px 60px;
  padding: 20px 20px 100px;
  border: 1px solid var(--main-color);
  border-radius: 10px;
`;

export default PieChart;
