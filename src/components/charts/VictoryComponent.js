import React from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
} from "victory";

const data = [
  { x: "Ocak", y: 400 },
  { x: "Şubat", y: 300 },
  { x: "Mart", y: 500 },
  { x: "Nisan", y: 200 },
];

export function VictoryComponent() {
  return (
    <div>
      <VictoryPie
        data={data}
        colorScale={["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"]}
      />
      <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar data={data} />
      </VictoryChart>
    </div>
  );
}
