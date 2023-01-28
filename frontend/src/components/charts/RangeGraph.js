import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);




const defaultOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            display: false,
            position: 'top',
        },
        y: {

            reverse: true,
            display: false,
            beginAtZero: true
        }
    }
};

const defaultData = {

}

const RangeGraph = ({ isActive, options, data }) => {

    options = options ? options : defaultOptions;
    if (isActive)
        return (
            <Bar options={options} data={data} />
        )
    else return <></>
}

export default RangeGraph