import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = () => {

    const [chart, setChart] = useState([]);
    const [IBMDate, setIMBDate] = useState([]);
    const [chartData, setChartData] = useState([]);


    // var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
    // var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    // var apiKey = "coinrankinga658c08c8e98e995dcf1c4a10e65bf87647e4d686b76b54c";

    // useEffect(() => {
    //     const fetchCoins = async() => {
    //         await fetch(`${proxyUrl}${baseUrl}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-access-token' : `${apiKey}`,
    //                 'Access-Control-Allow-Origin': '*',

    //             }
    //         }).then((response) => {
    //             response.json()
    //         }).then((json) => {
    //             console.log(json);
    //         }).catch(error => {
    //             console.log('error :>> ', error);
    //         })
    //     }
    //     fetchCoins();
    // }, [baseUrl,proxyUrl,apiKey]);

    useEffect(() => {
        loadDataCoins();
    }, []);

    const loadDataCoins = async() => {
        await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=demo")
            .then(res => res.json())
            .then(dataCoins => {
                console.log(dataCoins);
                setChart(dataCoins);
                let keysFetch = Object.entries(dataCoins);
                let dataFetch = Object.entries(keysFetch[1][1]).slice(0, 6).map(entry => entry[1]);
                let date = Object.entries(keysFetch[1][1]).slice(0, 6).map(entry => entry[0]);

                // console.log(dataFetch[0]['1. open']);
                setChartData(dataFetch);
                setIMBDate(date);
            })
            .catch((error) => {
                console.log('Error :>> ', error);
            });
    }


    var dataFinal = {
        labels: IBMDate.map(x => x.split('-').reverse().join('/')),
        datasets: [{
            label: '# of Votes',
            data: chartData.map(y => y['1. open']),
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
        <Bar data = { dataFinal }
        height = { 400 }
        options = { options }
        /> 
    </div>
    )
};

export default BarChart;