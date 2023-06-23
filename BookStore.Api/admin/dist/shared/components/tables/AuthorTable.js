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
exports.AuthorTable = void 0;
const react_1 = __importStar(require("react"));
require("./tablet.scss");
const react_bootstrap_1 = require("react-bootstrap");
const CreateDesignerPopup_1 = require("../popups/designer/CreateDesignerPopup");
const UpdateDesignerPopup_1 = require("../popups/designer/UpdateDesignerPopup");
const react_router_dom_1 = require("react-router-dom");
const ConfirmationPopup_1 = require("shared/components/popups/confirmation-popup/ConfirmationPopup");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const useColumns_1 = require("shared/hook/useColumns");
const react_table_1 = require("react-table");
const fa_1 = require("react-icons/fa");
const authorsColumns_1 = require("./columns/authorsColumns");
const AuthorTable = (props) => {
    const { data, refresh } = props;
    const columns = (0, useColumns_1.useColumns)(authorsColumns_1.AUTHORS_TABLE_COLUMNS);
    const table = (0, react_table_1.useTable)({ columns, data }, react_table_1.useSortBy);
    (0, react_1.useEffect)(() => {
        getAllGenres();
    }, []);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;
    const [createModalIsOpen, setCreateModalIsOpen] = react_1.default.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = react_1.default.useState(false);
    const [confirmation, setConfirmatin] = (0, react_1.useState)(false);
    const [author, setAuthor] = (0, react_1.useState)();
    const [authorToDelete, setAuthorToDelete] = (0, react_1.useState)();
    const [authorToUpdate, setAuthorToUpdate] = (0, react_1.useState)();
    const [ganres, setGanres] = (0, react_1.useState)([]);
    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };
    const onDeleteAuthor = (author) => {
        setAuthorToDelete(author);
        setConfirmatin(true);
    };
    const deleteDesigner = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Author/Delete?id=${id}`)
            .then(() => {
            setConfirmatin(false);
            refresh();
        });
    };
    const onUpdateAuthor = (designer) => {
        setAuthor(author);
        setUpdateModalIsOpen(true);
    };
    const getAllGenres = () => {
        (0, HTTPUserService_1.get)(`Ganre/GetAll`)
            .then((response) => {
            setGanres(response);
        });
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", { className: "adminPageTitle" }, "Author"),
            react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-success", onClick: openCreateModal }, "Create Author")),
        react_1.default.createElement("table", Object.assign({}, getTableProps()),
            react_1.default.createElement("thead", null, headerGroups.map((headerGroup) => (react_1.default.createElement("tr", Object.assign({}, headerGroup.getHeaderGroupProps()),
                headerGroup.headers.map((column) => (react_1.default.createElement("th", Object.assign({}, column.getHeaderProps(column.getSortByToggleProps()), { className: column.isSorted
                        ? column.isSortedDesc
                            ? "desc"
                            : "asc"
                        : "" }),
                    column.render("Header"),
                    react_1.default.createElement("span", null, column.isSorted ? (column.isSortedDesc ? react_1.default.createElement(fa_1.FaArrowUp, { className: 'ms-2' }) : react_1.default.createElement(fa_1.FaArrowDown, { className: 'ms-2' })) : "")))),
                react_1.default.createElement("td", null, "Actions"))))),
            react_1.default.createElement("tbody", Object.assign({}, getTableBodyProps()), rows.map((row) => {
                prepareRow(row);
                return (react_1.default.createElement("tr", Object.assign({}, row.getRowProps()),
                    row.cells.map((cell) => {
                        return (react_1.default.createElement("td", Object.assign({}, cell.getCellProps()), cell.render("Cell")));
                    }),
                    react_1.default.createElement("td", { className: "admin-panel-order-table" },
                        react_1.default.createElement(react_router_dom_1.Link, { className: "btn btn-info", to: `/admin/designer/${row.original}` }, "Open"),
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-warning", onClick: () => onUpdateAuthor(row.original) }, "Edit"),
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger", onClick: () => onDeleteAuthor(row.original) }, "Delete"))));
            }))),
        ganres && react_1.default.createElement(CreateDesignerPopup_1.CreateDesignerPopup, { ganresAll: ganres, modalIsOpen: createModalIsOpen, closeModal: () => setCreateModalIsOpen(false), refresh: refresh }),
        authorToUpdate && react_1.default.createElement(UpdateDesignerPopup_1.UpdateDesignerPopup, { modalIsOpen: updateModalIsOpen, closeModal: () => setUpdateModalIsOpen(false), refresh: refresh, author: authorToUpdate, setAuthor: setAuthorToUpdate }),
        authorToDelete && react_1.default.createElement(ConfirmationPopup_1.ConfirmationPopup, { onDelete: () => deleteDesigner(authorToDelete.id), closeModal: () => setConfirmatin(false), modalIsOpen: confirmation, product: authorToDelete.firstName + " " + authorToDelete.secondName })));
};
exports.AuthorTable = AuthorTable;
