"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rout = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Rout = () => {
    // const isAdmin = getUser();
    return react_1.default.createElement(react_router_dom_1.Outlet, null); //isAdmin.accessToken && isAdmin.refreshToken ? <Outlet /> : <Navigate to={"/login"} />
};
exports.Rout = Rout;
