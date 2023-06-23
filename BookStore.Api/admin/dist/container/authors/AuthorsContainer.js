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
exports.AuthorsContainer = void 0;
const react_1 = __importStar(require("react"));
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const AuthorTable_1 = require("../../shared/components/tables/AuthorTable");
const AuthorsContainer = () => {
    const [authors, setAuthors] = (0, react_1.useState)([]);
    const getAllDesigners = () => {
        (0, HTTPUserService_1.get)(`Author/GetAll`)
            .then((response) => {
            setAuthors(response);
        });
    };
    (0, react_1.useEffect)(() => {
        getAllDesigners();
    }, []);
    return (react_1.default.createElement(AuthorTable_1.AuthorTable, { data: authors, refresh: getAllDesigners }));
};
exports.AuthorsContainer = AuthorsContainer;
