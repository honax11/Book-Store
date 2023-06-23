"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_toastify_1 = require("react-toastify");
const SideBar_1 = require("../sideBar/SideBar");
require("./pageLayout.scss");
const PageLayout = (props) => {
    const { children } = props;
    return (react_1.default.createElement("div", { className: "app toggled" },
        react_1.default.createElement(react_toastify_1.ToastContainer, null),
        react_1.default.createElement(SideBar_1.SideBar, null),
        react_1.default.createElement("main", null, children)));
};
exports.default = PageLayout;
