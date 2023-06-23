"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDesignerSizePopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ProductType_1 = require("shared/models/category/ProductType");
const Service_1 = require("shared/services/Service");
const UpdateDesignerSizePopup = (props) => {
    const { modalIsOpen, closeModal, designerSize, refresh, setDesignerSize, categories } = props;
    const setName = (name) => {
        setDesignerSize(Object.assign(Object.assign({}, designerSize), { name }));
    };
    const onHandleTypeSelect = (type) => {
        setDesignerSize(Object.assign(Object.assign({}, designerSize), { type }));
    };
    const setBreast = (breast) => {
        setDesignerSize(Object.assign(Object.assign({}, designerSize), { breast }));
    };
    const setHeight = (height) => {
        setDesignerSize(Object.assign(Object.assign({}, designerSize), { height }));
    };
    const setHips = (hips) => {
        setDesignerSize(Object.assign(Object.assign({}, designerSize), { hips }));
    };
    const setWaist = (waist) => {
        setDesignerSize(Object.assign(Object.assign({}, designerSize), { waist }));
    };
    const setSlipsole = (slipsole) => {
        setDesignerSize(Object.assign(Object.assign({}, designerSize), { slipsole }));
    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        (0, Service_1.post)(`DesignerSize/Update`, designerSize)
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
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: "Name", autoFocus: true, value: designerSize.name, onChange: (e) => setName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: designerSize === null || designerSize === void 0 ? void 0 : designerSize.type, onChange: (e) => onHandleTypeSelect(+e.target.value) },
                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Clothes, value: ProductType_1.ProductType.Clothes }, "Clothes"),
                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Shose, value: ProductType_1.ProductType.Shose }, "Shose"),
                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Accessories, value: ProductType_1.ProductType.Accessories }, "Accessories")),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Breast"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "breast", placeholder: "Breast", autoFocus: true, value: designerSize.breast, onChange: (e) => setBreast(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Height"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "height", placeholder: "Height", autoFocus: true, value: designerSize.height, onChange: (e) => setHeight(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Hips"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "hips", placeholder: "Hips", autoFocus: true, value: designerSize.hips, onChange: (e) => setHips(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Waist"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "waist", placeholder: "Waist", autoFocus: true, value: designerSize.waist, onChange: (e) => setWaist(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Slipsole"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "slipsole", placeholder: "Slipsole", autoFocus: true, value: designerSize.slipsole, onChange: (e) => setSlipsole(e.target.value) })))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.UpdateDesignerSizePopup = UpdateDesignerSizePopup;
