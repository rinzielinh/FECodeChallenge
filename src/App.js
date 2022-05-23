import './App.css';
// import BarChart from './Charts/BarChart'; 
import CustomizedTables from './Tables/ExampleTable';
import * as React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import LineChart from './Charts/LineChart';
import IBMTable from './Tables/IBMTable';
Chart.register(...registerables);


// const state = {
//   labels: ['January', 'February', 'March',
//            'April', 'May'],
//   datasets: [
//     {
//       label: 'Rainfall',
//       backgroundColor: 'rgba(75,192,192,1)',
//       borderColor: 'rgba(0,0,0,1)',
//       borderWidth: 2,
//       data: [65, 59, 80, 81, 56]
//     }
//   ]
// }

function App() {

  
  return (
    <div>
      <div className="container">
      <LineChart />
      </div>
      
      <div className="container">
      <IBMTable/>
      </div>
      
    {/* <Bar
      data={state}
      options={{
        title:{
          display:true,
          text:'Average Rainfall per month',
          fontSize:20
        },
        legend:{
          display:true,
          position:'right'
        }
      }}
    /> */}
    {/* <BarChart/> */}
    <div className="container">
    <CustomizedTables/>
    </div>
  </div>
  );
}

export default App;
