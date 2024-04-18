import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

const data = {
  datasets: [
    {
      data: [100,40],
      backgroundColor: [
        "#34CF45",
        "#CF5334"
      ],
      display: true,
      borderColor: "#D1D6DC"
    }
  ]
};

Chart.register(ArcElement);

const Graph = () => {
  return (
    <div className='donut'>
      <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        rotation: -90,
        circumference: 180,
        cutout: "60%",
        maintainAspectRatio: true,
        responsive: true
      }}
    />
  </div>
  )
}

export default Graph