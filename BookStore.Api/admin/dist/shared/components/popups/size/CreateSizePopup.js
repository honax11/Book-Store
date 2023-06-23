"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSizePopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ProductType_1 = require("shared/models/category/ProductType");
const Service_1 = require("shared/services/Service");
const CreateSizePopup = (props) => {
    const { modalIsOpen, closeModal, refresh } = props;
    const [typeSelect, setTypeSelect] = react_1.default.useState(ProductType_1.ProductType.Clothes);
    const [name, setName] = react_1.default.useState('');
    const [order, setOrder] = react_1.default.useState(0);
    const [categoryId, setCategoryId] = react_1.default.useState('');
    const onHandleTypeSelect = (e) => {
        setTypeSelect(e.target.value);
    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        let sizeToCreate = {
            name: name,
            type: +typeSelect,
            order: order
        };
        (0, Service_1.post)(`Size/Create`, sizeToCreate)
            .then(() => {
            refresh();
            setName("");
            setCategoryId('');
        });
        closeModal();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Create Size")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: typeSelect, onChange: (e) => onHandleTypeSelect(e) },
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Clothes, value: ProductType_1.ProductType.Clothes }, "Clothes"),
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Shose, value: ProductType_1.ProductType.Shose }, "Shose"),
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Accessories, value: ProductType_1.ProductType.Accessories }, "Accessories"))),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput3" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: "Name", autoFocus: true, value: name, onChange: (e) => setName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput3" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Order"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "Order", placeholder: "Order", autoFocus: true, value: order, onChange: (e) => setOrder(+e.target.value) })))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.CreateSizePopup = CreateSizePopup;
