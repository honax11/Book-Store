"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllAndSoldOrdersChart = void 0;
const chart_js_1 = require("chart.js");
const react_chartjs_2_1 = require("react-chartjs-2");
const react_1 = __importDefault(require("react"));
const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Sold and All Orders',
        },
    },
};
chart_js_1.Chart.register(chart_js_1.CategoryScale, chart_js_1.LinearScale, chart_js_1.BarElement, chart_js_1.Title, chart_js_1.Tooltip, chart_js_1.Legend);
const AllAndSoldOrdersChart = (props) => {
    const { months, all, sold } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null, months && all && sold &&
        react_1.default.createElement(react_chartjs_2_1.Bar, { width: 100, height: 300, options: options, data: {
                labels: months,
                datasets: [
                    { label: 'Sold', data: sold, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                    { label: 'All', data: all, backgroundColor: 'rgba(53, 162, 235, 0.5)' }
                ]
            } })));
};
exports.AllAndSoldOrdersChart = AllAndSoldOrdersChart;
