"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDesignerPopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Service_1 = require("shared/services/Service");
const UpdateDesignerPopup = (props) => {
    const { author, modalIsOpen, setAuthor, closeModal, refresh } = props;
    const setId = (id) => {
        setAuthor(Object.assign(Object.assign({}, author), { id }));
    };
    const setName = (name) => {
        setAuthor(Object.assign(Object.assign({}, author), { name }));
    };
    const setDescription = (description) => {
        setAuthor(Object.assign(Object.assign({}, author), { description }));
    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        (0, Service_1.post)(`Author/Update`, author)
            .then(() => {
            refresh();
            setId("");
            setName("");
            setDescription("");
        });
        closeModal();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Update Designer")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput2" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "ID"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "ID", placeholder: "ID", autoFocus: true, value: author.id, onChange: (e) => setId(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "firstName", placeholder: "First Name", autoFocus: true, value: author.name, onChange: (e) => setName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput2" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Description"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 5, placeholder: "Description", autoFocus: true, value: author.description, onChange: (e) => setDescription(e.target.value) })))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.UpdateDesignerPopup = UpdateDesignerPopup;
