"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMERS_TABLE_COLUMNS = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
exports.CUSTOMERS_TABLE_COLUMNS = [
    {
        Header: "First Name",
        accessor: "firstName",
        Cell: (e) => react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/customer/" + e.row.original.id }, e.value)
    },
    {
        Header: "Last Name",
        accessor: "lastName"
    },
    {
        Header: "Phone",
        accessor: "phone"
    },
    {
        Header: "Email",
        accessor: "email"
    }
];
