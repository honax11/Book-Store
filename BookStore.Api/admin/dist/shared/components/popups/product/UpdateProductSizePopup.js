"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductSizePopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Service_1 = require("shared/services/Service");
const UpdateProductSizePopup = (props) => {
    const { modalIsOpen, closeModal, productSize, refresh, setProductSize } = props;
    const setQuantity = (quantity) => {
        setProductSize(Object.assign(Object.assign({}, productSize), { quantity }));
    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        (0, Service_1.post)(`Size/UpdateProductSize`, { id: productSize.id, quantity: productSize.quantity })
            .then(() => {
            refresh();
        });
        closeModal();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Add Product Size")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Size Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: "Name", autoFocus: true, value: productSize.size.name })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Quantity"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "quantity", placeholder: "Quantity", autoFocus: true, value: productSize.quantity, onChange: (e) => setQuantity(+e.target.value) })))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.UpdateProductSizePopup = UpdateProductSizePopup;
