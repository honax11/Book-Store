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
import React from "react";


const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Sold and All Orders',
        },
    },
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    months: string[];
    all: number[];
    sold: number[];
}

export const AllAndSoldOrdersChart = (props: Props) => {
    const { months, all, sold } = props;

    return (
        <>
            {months && all && sold &&
                <Bar
                    width={100}
                    height={300}
                    options={options}
                    data={{
                        labels: months,
                        datasets: [
                            { label: 'Sold', data: sold, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                            { label: 'All', data: all, backgroundColor: 'rgba(53, 162, 235, 0.5)' }]
                    }} />
            }
        </>
    )
}