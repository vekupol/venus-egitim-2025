import React from "react";
import Chart from "react-apexcharts";

function ApexChartsComponent({ tamamlandi, tamamlanmadi }) {
  const series = [tamamlandi, tamamlanmadi];
  const labels = ["Tamamlanan Ödev", "Tamamlanmayan Ödev"];

  const pieOptions = {
    labels,
    colors: ["#28a745", "#dc3545"],
    legend: { position: "bottom" },
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: true },
  };

  const barOptions = {
    xaxis: { categories: labels },
    colors: ["#28a745", "#dc3545"],
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: true },
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "auto" }}>
      <Chart type="pie" series={series} options={pieOptions} width="100%" />
      <Chart
        type="bar"
        series={[{ data: series }]}
        options={barOptions}
        width="100%"
      />
    </div>
  );
}

export default ApexChartsComponent;
