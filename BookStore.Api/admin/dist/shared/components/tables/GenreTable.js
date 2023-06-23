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
exports.GenreTable = void 0;
const react_1 = __importStar(require("react"));
require("./tablet.scss");
const react_bootstrap_1 = require("react-bootstrap");
const CreateGenrePopup_1 = require("../popups/genre/CreateGenrePopup");
const UpdateGenrePopup_1 = require("../popups/genre/UpdateGenrePopup");
const ConfirmationPopup_1 = require("shared/components/popups/confirmation-popup/ConfirmationPopup");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const react_table_1 = require("react-table");
const useColumns_1 = require("shared/hook/useColumns");
const fa_1 = require("react-icons/fa");
const genreColumns_1 = require("./columns/genreColumns");
const GenreTable = (props) => {
    const { data, refresh } = props;
    const columns = (0, useColumns_1.useColumns)(genreColumns_1.GENRE_TABLE_COLUMNS);
    const table = (0, react_table_1.useTable)({ columns, data }, react_table_1.useSortBy);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = table;
    const [createModalIsOpen, setCreateModalIsOpen] = react_1.default.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = react_1.default.useState(false);
    const [confirmation, setConfirmatin] = (0, react_1.useState)(false);
    const [genreToDelete, setGenreToDelete] = (0, react_1.useState)();
    const [genre, setGenre] = (0, react_1.useState)();
    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };
    const onUpdateGenre = (cat) => {
        setGenre(cat);
        setUpdateModalIsOpen(true);
    };
    const onDeleteGenre = (data) => {
        setGenreToDelete(data);
        setConfirmatin(true);
    };
    const deleteGenre = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Ganre/Delete?id=${id}`)
            .then(() => {
            setConfirmatin(false);
            refresh();
        });
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", { className: "adminPageTitle" }, "Ganre"),
            react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-success", onClick: openCreateModal }, "Create Ganre")),
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
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-info btn-btnCategories", onClick: () => onUpdateGenre(row.original) }, "Edit"),
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger btn-btnCategories", onClick: () => onDeleteGenre(row.original) }, "Delete"))));
            }))),
        react_1.default.createElement(CreateGenrePopup_1.CreateCategoryPopup, { modalIsOpen: createModalIsOpen, closeModal: () => setCreateModalIsOpen(false), refresh: refresh }),
        genre && react_1.default.createElement(UpdateGenrePopup_1.UpdateGenrePopup, { modalIsOpen: updateModalIsOpen, closeModal: () => setUpdateModalIsOpen(false), refresh: refresh, genre: genre, setGenre: setGenre }),
        genreToDelete && react_1.default.createElement(ConfirmationPopup_1.ConfirmationPopup, { onDelete: () => deleteGenre(genreToDelete.id), closeModal: () => setConfirmatin(false), modalIsOpen: confirmation, product: genreToDelete.name })));
};
exports.GenreTable = GenreTable;
