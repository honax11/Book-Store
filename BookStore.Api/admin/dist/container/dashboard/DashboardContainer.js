"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardContainer = void 0;
const react_1 = __importStar(require("react"));
const Service_1 = require("shared/services/Service");
const Dashboard_1 = require("./Dashboard");
const DashboardContainer = () => {
    const [statistic, setStatistic] = (0, react_1.useState)();
    const [mainCharts, setMainCharts] = (0, react_1.useState)();
    const [clickStatistic, setClickStatistic] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        getAlLStatistics();
        getAllCharts();
        getClickStatistic();
    }, []);
    const getAllCharts = () => {
        (0, Service_1.get)(`Dashboard/GetAllCharts`)
            .then((response) => {
            setMainCharts(response.data);
        });
    };
    const getClickStatistic = () => {
        (0, Service_1.get)(`Dashboard/GetClickStatistic`)
            .then((response) => {
            setClickStatistic(response.data);
        });
    };
    const getAlLStatistics = () => {
        (0, Service_1.get)(`Dashboard/GetAllStatistics`)
            .then((response) => {
            setStatistic(response.data);
        });
    };
    return (react_1.default.createElement("div", null, statistic && mainCharts && clickStatistic &&
        react_1.default.createElement(Dashboard_1.Dasboard, { clicksStatistick: clickStatistic, statistic: statistic, mainCharts: mainCharts })));
};
exports.DashboardContainer = DashboardContainer;
