import { GetAllSoldTypesCountViewItem } from "shared/models/dashboard/GetAllSoldTypesCountViewItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React from 'react';
import { ProductType } from "shared/models/category/ProductType";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'All Sold Types',
        },
    },
};

interface Props {
    allSoldTypesCount: GetAllSoldTypesCountViewItem[]
}
export const AllSoldTypesCountChart = ({ allSoldTypesCount }: Props) => {
    return (
        <>
            {allSoldTypesCount &&
                <Pie
                    options={options}
                    data={{
                        labels: allSoldTypesCount.map(item => {
                            return ProductType[item.type]
                        }),
                        datasets: [
                            {
                                data: allSoldTypesCount.map(item => {
                                    return item.quantity
                                }),
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }} />}
        </>
    )
}