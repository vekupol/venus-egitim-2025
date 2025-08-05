import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const data = [
  { name: "Ocak", value: 400 },
  { name: "Şubat", value: 300 },
  { name: "Mart", value: 500 },
  { name: "Nisan", value: 200 },
];

const labels = data.map((d) => d.name);
const values = data.map((d) => d.value);

export function ChartJSComponent() {
  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"],
      },
    ],
  };
  const barData = {
    labels,
    datasets: [{ label: "Değerler", data: values, backgroundColor: "#8884d8" }],
  };

  return (
    <div>
      <Pie data={pieData} />
      <Bar data={barData} />
    </div>
  );
}
