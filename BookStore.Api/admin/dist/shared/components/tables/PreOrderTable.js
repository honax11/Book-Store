"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreOrderTable = void 0;
const react_1 = __importDefault(require("react"));
const useColumns_1 = require("shared/hook/useColumns");
const preOrderProductsColumns_1 = require("shared/components/tables/columns/preOrderProductsColumns");
const react_table_1 = require("react-table");
const fa_1 = require("react-icons/fa");
const PreOrderTable = (props) => {
    const { products } = props;
    const columns = (0, useColumns_1.useColumns)(preOrderProductsColumns_1.PREORDERS_TABLE_COLUMNS);
    const table = (0, react_table_1.useTable)({ columns, data: products }, react_table_1.useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("table", Object.assign({}, getTableProps()),
            react_1.default.createElement("thead", null, headerGroups.map((headerGroup) => (react_1.default.createElement("tr", Object.assign({}, headerGroup.getHeaderGroupProps()), headerGroup.headers.map((column) => (react_1.default.createElement("th", Object.assign({}, column.getHeaderProps(column.getSortByToggleProps()), { className: column.isSorted
                    ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                    : "" }),
                column.render("Header"),
                react_1.default.createElement("span", null, column.isSorted ? (column.isSortedDesc ? react_1.default.createElement(fa_1.FaArrowUp, { className: 'ms-2' }) : react_1.default.createElement(fa_1.FaArrowDown, { className: 'ms-2' })) : "")))))))),
            react_1.default.createElement("tbody", Object.assign({}, getTableBodyProps()), rows.map((row) => {
                prepareRow(row);
                return (react_1.default.createElement("tr", Object.assign({}, row.getRowProps()), row.cells.map((cell) => {
                    return (react_1.default.createElement("td", Object.assign({}, cell.getCellProps()), cell.render("Cell")));
                })));
            })))));
};
exports.PreOrderTable = PreOrderTable;
