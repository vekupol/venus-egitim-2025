import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  { id: "Ocak", value: 400 },
  { id: "Şubat", value: 300 },
  { id: "Mart", value: 500 },
  { id: "Nisan", value: 200 },
];

export function NivoComponent() {
  const barData = [
    { month: "Ocak", value: 400 },
    { month: "Şubat", value: 300 },
    { month: "Mart", value: 500 },
    { month: "Nisan", value: 200 },
  ];

  return (
    <div>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "category10" }}
      />
      <ResponsiveBar
        data={barData}
        keys={["value"]}
        indexBy="month"
        margin={{ top: 40, right: 50, bottom: 50, left: 50 }}
        colors={{ scheme: "category10" }}
      />
    </div>
  );
}
