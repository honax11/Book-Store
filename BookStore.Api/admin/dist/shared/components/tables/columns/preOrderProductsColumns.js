"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PREORDERS_TABLE_COLUMNS = void 0;
const react_1 = __importDefault(require("react"));
const PreOrderedProductStatus_1 = require("shared/models/enums/PreOrderedProductStatus");
exports.PREORDERS_TABLE_COLUMNS = [
    {
        Header: "Name",
        accessor: (row) => {
            return row.product.name;
        },
        Cell: (e) => react_1.default.createElement("a", { href: process.env.REACT_APP_WEB_MAIN_URL + "product/" + e.row.original.product.url, target: "_blank" }, e.value)
    },
    {
        Header: "Category",
        accessor: (row) => {
            var _a;
            return (_a = row.product.category) === null || _a === void 0 ? void 0 : _a.name;
        }
    },
    {
        Header: "Country",
        accessor: "country"
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "Ip",
        accessor: "ip"
    },
    {
        Header: "Status",
        accessor: (row) => {
            return PreOrderedProductStatus_1.PreOrderedProductStatus[row.status];
        },
    },
    {
        Header: "Date",
        accessor: (row) => {
            return row.creationDate.substring(0, 10);
        },
    }
];
