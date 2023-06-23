"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductPopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ProductType_1 = require("shared/models/category/ProductType");
const Service_1 = require("shared/services/Service");
const notification_1 = require("shared/toast/notification");
const ProductStatus_1 = require("shared/models/enums/ProductStatus");
const CreateProductPopup = (props) => {
    const { modalIsOpen, closeModal, categories, designers, refresh } = props;
    const [typeSelect, setTypeSelect] = react_1.default.useState(ProductType_1.ProductType.Clothes);
    const [statusSelect, setStatusSelect] = react_1.default.useState(ProductStatus_1.ProductStatus.OutOfStock);
    const [designerSelect, setDesignerSelect] = react_1.default.useState('');
    const [categorySelect, setCategorySelect] = react_1.default.useState('');
    const [name, setName] = react_1.default.useState('');
    const [description, setDescription] = react_1.default.useState('');
    const [color, setColor] = react_1.default.useState('');
    const [article, setArticle] = react_1.default.useState('');
    const [url, setUrl] = react_1.default.useState('');
    const [price, setPrice] = react_1.default.useState(Number);
    const [composition, setComposition] = react_1.default.useState('');
    const [measurements, setMeasurements] = react_1.default.useState('');
    const [delivery, setDelivery] = react_1.default.useState('');
    const [modelParameters, setModelParameters] = react_1.default.useState('');
    const [productParameters, setProductParameters] = react_1.default.useState('');
    const [code, setCode] = react_1.default.useState(Number);
    const onHandleTypeSelect = (e) => {
        setTypeSelect(e.target.value);
    };
    const onHandleStatusSelect = (e) => {
        setStatusSelect(e.target.value);
    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        let categoryToCreate = {
            name: name,
            type: +typeSelect,
            color: color,
            article: article,
            url: url,
            description: description,
            price: price,
            status: +statusSelect,
            style: 2,
            categoryId: categorySelect ? categorySelect : categories[0].id,
            designerId: designerSelect ? designerSelect : designers[0].id,
            composition: composition,
            measurements: measurements,
            delivery: delivery,
            modelParameters: modelParameters,
            productParameters: productParameters,
            code: +code,
        };
        (0, Service_1.post)(`Product/Create`, categoryToCreate)
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
            react_1.default.createElement(react_bootstrap_1.Modal.Body, { className: "popupUpdate__body" },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, { className: "d-flex justify-content-center" }, "Create Product"),
                react_1.default.createElement("div", { className: "d-flex justify-content-between" },
                    react_1.default.createElement(react_bootstrap_1.Form, { className: "popupUpdate__miniBody" },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput1" },
                            react_1.default.createElement(react_bootstrap_1.Row, null,
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: typeSelect, onChange: (e) => onHandleTypeSelect(e) },
                                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Clothes, value: ProductType_1.ProductType.Clothes }, "Clothes"),
                                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Shose, value: ProductType_1.ProductType.Shose }, "Shose"),
                                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Accessories, value: ProductType_1.ProductType.Accessories }, "Accessories"))),
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: statusSelect, onChange: (e) => onHandleStatusSelect(e) },
                                        react_1.default.createElement("option", { key: ProductStatus_1.ProductStatus.OutOfStock, value: ProductStatus_1.ProductStatus.OutOfStock }, "OutOfStock"),
                                        react_1.default.createElement("option", { key: ProductStatus_1.ProductStatus.InStock, value: ProductStatus_1.ProductStatus.InStock }, "InStock"),
                                        react_1.default.createElement("option", { key: ProductStatus_1.ProductStatus.RunningLow, value: ProductStatus_1.ProductStatus.RunningLow }, "RunningLow"))))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput1" },
                            react_1.default.createElement(react_bootstrap_1.Row, null,
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: categorySelect, onChange: (e) => setCategorySelect(e.target.value) }, categories.map(item => {
                                        return react_1.default.createElement("option", { key: item.id, value: item.id }, item.name);
                                    }))),
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: designerSelect, onChange: (e) => setDesignerSelect(e.target.value) }, designers.map(item => {
                                        return react_1.default.createElement("option", { key: item.id, value: item.id }, item.firstName + ' ' + item.lastName);
                                    }))))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput4" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Name"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: "Name", autoFocus: true, value: name, onChange: (e) => setName(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput6" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Color"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { placeholder: "Color", autoFocus: true, value: color, onChange: (e) => setColor(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput7" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Article"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "article", placeholder: "Article", autoFocus: true, value: article, onChange: (e) => setArticle(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput7" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "\u041A\u043E\u0434"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "article", placeholder: "\u041A\u043E\u0434", autoFocus: true, value: code, onChange: (e) => setCode(+e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput7" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Product Url"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "productUrl", placeholder: "Product Url", autoFocus: true, value: url, onChange: (e) => setUrl(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput8" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Price"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "price", placeholder: "Price", autoFocus: true, value: price, onChange: (e) => setPrice(+e.target.value) }))),
                    react_1.default.createElement(react_bootstrap_1.Form, { className: "ps-3 popupUpdate__miniBody" },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput5" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Description"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "description", placeholder: "Description", autoFocus: true, value: description, onChange: (e) => setDescription(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput9" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Composition"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "composition", placeholder: "Composition", autoFocus: true, value: composition, onChange: (e) => setComposition(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput10" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Measurements"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "measurements", placeholder: "Measurements", autoFocus: true, value: measurements, onChange: (e) => setMeasurements(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput10" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Delivery"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 1, type: "delivery", placeholder: "Delivery", autoFocus: true, value: delivery, onChange: (e) => setDelivery(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput10" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Model Parameters"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "modelParameters", placeholder: "Model Parameters", autoFocus: true, value: modelParameters, onChange: (e) => setModelParameters(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput10" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Product Parameters"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 5, type: "productParameters", placeholder: "Product Parameters", autoFocus: true, value: productParameters, onChange: (e) => setProductParameters(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))))));
};
exports.CreateProductPopup = CreateProductPopup;
