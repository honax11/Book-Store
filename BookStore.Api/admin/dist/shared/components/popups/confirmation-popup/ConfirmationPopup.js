"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationPopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ConfirmationPopup = (props) => {
    const { modalIsOpen, closeModal, product, onDelete } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal, className: "popup__message" },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, { className: "popup__text" },
                    "\u0422\u043E\u0447\u043D\u043E \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 ",
                    product,
                    "?")),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "btn btn-secondary me-5", onClick: closeModal }, "NO"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "btn btn-danger", onClick: onDelete }, "YES")))));
};
exports.ConfirmationPopup = ConfirmationPopup;
