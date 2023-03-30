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
            display: false
        },
        title: {
            display: true,
            text: 'Sold Orders',
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
    sold: string[];
}

export const SoldOrdersChart = (props: Props) => {
    const { months, sold } = props;

    return (
        <>
            {months && sold &&
                <Bar
                    options={options}
                    width={100}
                    height={300}
                    data={{
                        labels: months,
                        datasets: [
                            { label: 'Sold', data: sold, backgroundColor: 'rgba(255, 99, 132, 0.5)' }]
                    }} />
            }
        </>
    )
}