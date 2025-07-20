import React from 'react'
import {ChartContainer} from './PieChart';
import { Chart } from "react-google-charts";


function BarChart({ BarData, BarOptions }) {
  return (
    <ChartContainer>
      <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={BarData}
      options={BarOptions}
    />
    </ChartContainer>
  )
}

export default BarChart
