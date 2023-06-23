"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dasboard = void 0;
const react_1 = __importDefault(require("react"));
const AllAndSoldOrdersChart_1 = require("./charts/AllAndSoldOrdersChart");
const AllSoldTypesCountChart_1 = require("./charts/AllSoldTypesCountChart");
const SoldCategoriesChart_1 = require("./charts/SoldCategoriesChart");
const SoldOrdersChart_1 = require("./charts/SoldOrdersChart");
require("./dasboard.scss");
const Dasboard = (props) => {
    var _a, _b, _c;
    const { statistic, mainCharts, clicksStatistick } = props;
    return (react_1.default.createElement("div", { className: "ps-3" },
        react_1.default.createElement("h1", { className: "adminPageTitle" }, "Dashboard"),
        react_1.default.createElement("div", null,
            react_1.default.createElement("span", { className: "p-2" },
                "All Time Users - ",
                clicksStatistick.allUsersCount),
            react_1.default.createElement("span", { className: "p-2" },
                "Active users last 24h - ",
                clicksStatistick.activeUsersCount),
            react_1.default.createElement("span", { className: "p-2" },
                "Clicks last 24h - ",
                clicksStatistick.clicksCount),
            react_1.default.createElement("span", { className: "p-2" },
                "Pre-Ordered products for 7 days - ",
                clicksStatistick.preOrderedProductsCount),
            react_1.default.createElement("span", { className: "p-2" },
                "Designers - ",
                statistic.designerCount),
            react_1.default.createElement("span", { className: "p-2" },
                "Products - ",
                statistic.productsCount),
            react_1.default.createElement("span", { className: "p-2" },
                "All Orders - ",
                statistic.ordersCount)),
        mainCharts.soldChart &&
            react_1.default.createElement("div", null,
                react_1.default.createElement(SoldOrdersChart_1.SoldOrdersChart, { months: mainCharts.soldChart.map(item => item.selectedMonth), sold: mainCharts.soldChart.map(item => item.quantity) })),
        mainCharts &&
            react_1.default.createElement("div", null,
                react_1.default.createElement(AllAndSoldOrdersChart_1.AllAndSoldOrdersChart, { all: (_a = mainCharts === null || mainCharts === void 0 ? void 0 : mainCharts.allAndSoldOrdersChart) === null || _a === void 0 ? void 0 : _a.all, sold: (_b = mainCharts === null || mainCharts === void 0 ? void 0 : mainCharts.allAndSoldOrdersChart) === null || _b === void 0 ? void 0 : _b.sold, months: (_c = mainCharts === null || mainCharts === void 0 ? void 0 : mainCharts.allAndSoldOrdersChart) === null || _c === void 0 ? void 0 : _c.months })),
        mainCharts &&
            react_1.default.createElement("div", { className: "second-charts" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(SoldCategoriesChart_1.SoldCategoriesChart, { allSoldTypesCount: mainCharts.allSoldCategories })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(AllSoldTypesCountChart_1.AllSoldTypesCountChart, { allSoldTypesCount: mainCharts.allSoldTypesCount })))));
};
exports.Dasboard = Dasboard;
