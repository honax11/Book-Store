"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticlePopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Service_1 = require("shared/services/Service");
const CreateArticlePopup = (props) => {
    const { modalIsOpen, categories, closeModal, refresh } = props;
    const [name, setName] = react_1.default.useState('');
    const [url, setUrl] = react_1.default.useState('');
    const [mainDescription, setMainDescription] = react_1.default.useState('');
    const [category, setCategory] = react_1.default.useState('');
    const onSubmitForm = (event) => {
        event.preventDefault();
        let articleToCreate = {
            name: name,
            mainDescription: mainDescription,
            url: url,
            categoryId: category ? category : categories[0].id
        };
        (0, Service_1.post)(`Magazine/Create`, articleToCreate)
            .then(() => {
            refresh();
            setName("");
        });
        closeModal();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Create Article")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: "Name", autoFocus: true, value: name, onChange: (e) => setName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Url"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Url", autoFocus: true, value: url, onChange: (e) => setUrl(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Description"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Description", autoFocus: true, value: mainDescription, onChange: (e) => setMainDescription(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Category"),
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: category, onChange: (e) => setCategory(e.target.value) }, categories.map(item => {
                            return react_1.default.createElement("option", { key: item.id, value: item.id }, item.name);
                        }))))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.CreateArticlePopup = CreateArticlePopup;
