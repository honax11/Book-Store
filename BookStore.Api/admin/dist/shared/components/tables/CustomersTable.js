"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersTable = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const fa_1 = require("react-icons/fa");
const react_table_1 = require("react-table");
const useColumns_1 = require("shared/hook/useColumns");
const CustomerType_1 = require("shared/models/enums/CustomerType");
const customersColumns_1 = require("./columns/customersColumns");
const CustomersTable = (props) => {
    const { refresh, data, type, setType } = props;
    const columns = (0, useColumns_1.useColumns)(customersColumns_1.CUSTOMERS_TABLE_COLUMNS);
    const table = (0, react_table_1.useTable)({ columns, data }, react_table_1.useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("h2", { className: "adminPageTitle" }, "Customers"),
        react_1.default.createElement("div", null, "\u0412\u0438\u0434"),
        react_1.default.createElement(react_bootstrap_1.InputGroup, { className: "mb-3" },
            react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: type, onChange: (e) => setType(+e.target.value) },
                react_1.default.createElement("option", { key: CustomerType_1.CustomerType.None, value: CustomerType_1.CustomerType.None }, "\u0411\u0435\u0437 \u0444\u0456\u043B\u044C\u0442\u0440\u0443"),
                react_1.default.createElement("option", { key: CustomerType_1.CustomerType.Real, value: CustomerType_1.CustomerType.Real }, "\u0420\u0435\u0430\u043B\u044C\u043D\u0456"),
                react_1.default.createElement("option", { key: CustomerType_1.CustomerType.Test, value: CustomerType_1.CustomerType.Test }, "\u0422\u0435\u0441\u0442")),
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: () => refresh() }, "Filter")),
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
exports.CustomersTable = CustomersTable;
