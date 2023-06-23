"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLICKS_TABLE_COLUMNS = void 0;
const react_1 = __importDefault(require("react"));
const ProductType_1 = require("shared/models/category/ProductType");
const ClickType_1 = require("shared/models/enums/ClickType");
exports.CLICKS_TABLE_COLUMNS = [
    {
        Header: "Country",
        accessor: "country"
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "IP",
        accessor: "ip"
    },
    {
        Header: "Name",
        accessor: "name",
        Cell: (e) => react_1.default.createElement("a", { href: process.env.REACT_APP_WEB_MAIN_URL + getUrl(e.row.original), target: "_blank" }, e.value)
    },
    {
        Header: "ProductType",
        accessor: (row) => {
            return ProductType_1.ProductType[row.type];
        }
    },
    {
        Header: "ClickType",
        accessor: (row) => {
            return ClickType_1.ClickType[row.type];
        },
    },
    {
        Header: "Date",
        accessor: (row) => {
            return row.creationDate.substring(0, 10);
        },
    }
];
const getUrl = (click) => {
    if (click.type == ClickType_1.ClickType.OpenProduct) {
        return "product/" + click.name;
    }
    else if (click.type == ClickType_1.ClickType.GetBrand) {
        return "brand/" + click.name;
    }
    else if (click.type == ClickType_1.ClickType.GetMagazine) {
        return "magazine/" + click.name;
    }
    else {
        return "/";
    }
};
