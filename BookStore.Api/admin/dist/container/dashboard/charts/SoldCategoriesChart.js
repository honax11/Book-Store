"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldCategoriesChart = void 0;
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
const react_1 = __importDefault(require("react"));
chart_js_1.Chart.register(chart_js_1.ArcElement, chart_js_1.Tooltip, chart_js_1.Legend);
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'All Sold Categories',
        },
    },
};
const SoldCategoriesChart = ({ allSoldTypesCount }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null, allSoldTypesCount &&
        react_1.default.createElement(react_chartjs_2_1.Pie, { options: options, data: {
                labels: allSoldTypesCount.map(item => item.categoryName),
                datasets: [
                    {
                        data: allSoldTypesCount.map(item => {
                            return item.quantity;
                        }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            } })));
};
exports.SoldCategoriesChart = SoldCategoriesChart;
