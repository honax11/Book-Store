"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZES_TABLE_COLUMNS = void 0;
const ProductType_1 = require("shared/models/category/ProductType");
exports.SIZES_TABLE_COLUMNS = [
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Type",
        accessor: (row) => {
            return ProductType_1.ProductType[row.type];
        }
    },
    {
        Header: "Order",
        accessor: "order"
    }
];
