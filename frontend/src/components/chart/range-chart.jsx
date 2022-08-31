import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
          display: false
        }
      },
   scales:{ x: {
        display: false,
        position: 'top',
    },
    y:{
        display: false,
        beginAtZero: true
    }}
};

const labels = ['1', '2', '3', '4', '5', '6', '7','8'];

export const data = {
    labels,
    datasets: [
        { 
            data: labels.map(() => faker.datatype.number({ min: -20000, max: 0 })),
            backgroundColor: '#3498DB',
        },
        // {
        //     label: 'Dataset 2',
        //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
    ],
};

const RangeBar = (data) => {
    return <Bar options={options} data={data} />;
}
export default RangeBar