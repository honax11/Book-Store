"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSizePopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Service_1 = require("shared/services/Service");
const CreateProductSizePopup = (props) => {
    const { modalIsOpen, closeModal, sizes, productId, refresh } = props;
    const [sizeSelect, setSizeSelect] = react_1.default.useState('');
    const [quantity, setQuantity] = react_1.default.useState(Number);
    const onSubmitForm = (event) => {
        event.preventDefault();
        let productSizes = {
            productId: productId,
            sizes: []
        };
        productSizes.sizes.push({
            id: sizeSelect ? sizeSelect : sizes[0].id,
            quantity: quantity
        });
        (0, Service_1.post)(`Size/CreateProductSize`, productSizes)
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
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: sizeSelect, onChange: (e) => setSizeSelect(e.target.value) }, sizes.map(item => {
                            return react_1.default.createElement("option", { key: item.id, value: item.id }, item.name);
                        }))),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Quantity"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "price", placeholder: "Quantity", autoFocus: true, value: quantity, onChange: (e) => setQuantity(+e.target.value) })))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.CreateProductSizePopup = CreateProductSizePopup;
