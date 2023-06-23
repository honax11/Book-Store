"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDesignerSizePopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ProductType_1 = require("shared/models/category/ProductType");
const Service_1 = require("shared/services/Service");
const notification_1 = require("shared/toast/notification");
const CreateDesignerSizePopup = (props) => {
    const { modalIsOpen, closeModal, designerId, refresh, categories } = props;
    const [typeSelect, setTypeSelect] = react_1.default.useState(0);
    const [name, setName] = react_1.default.useState('');
    const [breast, setBreast] = react_1.default.useState('');
    const [height, setHeight] = react_1.default.useState('');
    const [hips, setHips] = react_1.default.useState('');
    const [waist, setWaist] = react_1.default.useState('');
    const [slipsole, setSlipsole] = react_1.default.useState('');
    const [categorySelect, setCategorySelect] = react_1.default.useState('');
    const onSubmitForm = (event) => {
        event.preventDefault();
        let size = {
            name: name,
            type: typeSelect == 0 ? ProductType_1.ProductType.Clothes : typeSelect,
            designerId: designerId,
            breast: breast,
            height: height,
            hips: hips,
            waist: waist,
            slipsole: slipsole,
            categoryId: categorySelect
        };
        (0, Service_1.post)(`DesignerSize/Create`, size)
            .then((e) => {
            if (e.status == 500) {
                (0, notification_1.showError)('Article canont be the same. Or Some error eccured');
            }
            refresh();
            setName("");
            closeModal();
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Add Designer Size")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: typeSelect, onChange: (e) => setTypeSelect(+e.target.value) },
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Clothes, value: ProductType_1.ProductType.Clothes }, "Clothes"),
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Shose, value: ProductType_1.ProductType.Shose }, "Shose"),
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Accessories, value: ProductType_1.ProductType.Accessories }, "Accessories"))),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: categorySelect, onChange: (e) => setCategorySelect(e.target.value) },
                            react_1.default.createElement("option", { key: "empty cat" }),
                            categories.map(item => (react_1.default.createElement("option", { key: item.id, value: item.id }, item.name))))),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: "name", autoFocus: true, value: name, onChange: (e) => setName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Breast"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "breast", placeholder: "Breast", autoFocus: true, value: breast, onChange: (e) => setBreast(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Height"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "height", placeholder: "Height", autoFocus: true, value: height, onChange: (e) => setHeight(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Hips"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "hips", placeholder: "Hips", autoFocus: true, value: hips, onChange: (e) => setHips(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Waist"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "waist", placeholder: "Waist", autoFocus: true, value: waist, onChange: (e) => setWaist(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput8" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Slipsole"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "slipsole", placeholder: "Slipsole", autoFocus: true, value: slipsole, onChange: (e) => setSlipsole(e.target.value) })))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.CreateDesignerSizePopup = CreateDesignerSizePopup;
