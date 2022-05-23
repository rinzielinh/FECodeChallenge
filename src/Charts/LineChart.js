import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)
const LineChart = () => {

  const [dataGDP, setDataGDP] = useState([]);

  useEffect(() => {
    loadData();
    
}, []);

const loadData = async() => {
    await fetch("https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=demo")
        .then(res => res.json())
        .then(data => {
            
            setDataGDP(data.data.reverse());
                           
        })
        .catch((error) => {
            console.log('Error :>> ', error);
        });
        
}

var GDPRenderData = {
  labels: dataGDP.map((x) => x.date.split('-').reverse().join('/')),
  datasets: [{
      label: 'US Real Gross Domestic Product',
      data: dataGDP.map((y) => y.value),
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
  }]
}

var options = {
  maintainAspectRatio: false,
  scales: {
      y: {
          beginAtZero: true
      }
  },
  legend: {
      labels: {
          fontSize: 26,
      }
  }
};
  return (
    <div>
      <Line
      data = { GDPRenderData }
      height = { 400 }
      options = { options }
      />
    </div>
  )
};

export default LineChart;
