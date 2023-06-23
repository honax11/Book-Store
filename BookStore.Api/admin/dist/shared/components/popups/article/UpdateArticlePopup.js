"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticlePopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Service_1 = require("shared/services/Service");
const UpdateArticlePopup = (props) => {
    var _a;
    const { magazine, modalIsOpen, categories, setMagazine, closeModal, refresh } = props;
    const setName = (name) => {
        setMagazine(Object.assign(Object.assign({}, magazine), { name }));
    };
    const setUrl = (url) => {
        setMagazine(Object.assign(Object.assign({}, magazine), { url }));
    };
    const setDescription = (mainDescription) => {
        setMagazine(Object.assign(Object.assign({}, magazine), { mainDescription }));
    };
    const setCategory = (categoryId) => {
        setMagazine(Object.assign(Object.assign({}, magazine), { categoryId }));
        const newCategory = categories.filter(item => {
            return item.id == categoryId;
        });
        let newProd = Object.assign({}, magazine);
        newProd.category = newCategory[0];
        setMagazine(newProd);
    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        (0, Service_1.post)(`Ganre/Update`, magazine)
            .then(() => {
            refresh();
            setName("");
        });
        closeModal();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Update Category")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: "Category Name", autoFocus: true, value: magazine === null || magazine === void 0 ? void 0 : magazine.name, onChange: (e) => setName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Url"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Url", autoFocus: true, value: magazine === null || magazine === void 0 ? void 0 : magazine.url, onChange: (e) => setUrl(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Description"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Description", autoFocus: true, value: magazine === null || magazine === void 0 ? void 0 : magazine.mainDescription, onChange: (e) => setDescription(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Category"),
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: (_a = magazine === null || magazine === void 0 ? void 0 : magazine.category) === null || _a === void 0 ? void 0 : _a.id, onChange: (e) => setCategory(e.target.value) }, categories.map(item => {
                            return react_1.default.createElement("option", { key: item.id, value: item.id }, item.name);
                        }))))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.UpdateArticlePopup = UpdateArticlePopup;
