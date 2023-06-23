"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductPopup = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Service_1 = require("shared/services/Service");
require("react-datepicker/dist/react-datepicker.css");
const react_datepicker_1 = __importDefault(require("react-datepicker"));
const ProductType_1 = require("shared/models/category/ProductType");
require("./updateProductPopup.scss");
const ProductStatus_1 = require("shared/models/enums/ProductStatus");
const UpdateProductPopup = (props) => {
    var _a, _b;
    const { modalIsOpen, closeModal, categories, product, setProduct, designers, refresh } = props;
    const setName = (name) => {
        setProduct(Object.assign(Object.assign({}, product), { name }));
    };
    const setPrice = (price) => {
        setProduct(Object.assign(Object.assign({}, product), { price }));
    };
    const setSaleDate = (saleDate) => {
        setProduct(Object.assign(Object.assign({}, product), { saleDate }));
    };
    const setSalePrice = (salePrice) => {
        setProduct(Object.assign(Object.assign({}, product), { salePrice }));
    };
    const setComposition = (composition) => {
        setProduct(Object.assign(Object.assign({}, product), { composition }));
    };
    const setMeasurements = (measurements) => {
        setProduct(Object.assign(Object.assign({}, product), { measurements }));
    };
    const setDelivery = (delivery) => {
        setProduct(Object.assign(Object.assign({}, product), { delivery }));
    };
    const setArticle = (article) => {
        setProduct(Object.assign(Object.assign({}, product), { article }));
    };
    const setCode = (code) => {
        setProduct(Object.assign(Object.assign({}, product), { code }));
    };
    const setUrl = (url) => {
        setProduct(Object.assign(Object.assign({}, product), { url }));
    };
    const setModelParameters = (modelParameters) => {
        setProduct(Object.assign(Object.assign({}, product), { modelParameters }));
    };
    const setProductParameters = (productParameters) => {
        setProduct(Object.assign(Object.assign({}, product), { productParameters }));
    };
    const setColor = (color) => {
        setProduct(Object.assign(Object.assign({}, product), { color }));
    };
    const setDescription = (description) => {
        setProduct(Object.assign(Object.assign({}, product), { description }));
    };
    const setDesignerSelect = (designerId) => {
        const newDesigner = designers.filter(item => {
            return item.id == designerId;
        });
        let newProd = Object.assign({}, product);
        newProd.designer = newDesigner[0];
        setProduct(newProd);
    };
    const setCategorySelect = (categoryId) => {
        const newCategory = categories.filter(item => {
            return item.id == categoryId;
        });
        let newProd = Object.assign({}, product);
        newProd.category = newCategory[0];
        setProduct(newProd);
    };
    const onHandleStatusSelect = (status) => {
        setProduct(Object.assign(Object.assign({}, product), { status }));
    };
    const onHandleTypeSelect = (type) => {
        setProduct(Object.assign(Object.assign({}, product), { type }));
    };
    const onSubmitForm = (event) => {
        event.preventDefault();
        let productUpdate = {
            id: product.id,
            isActive: product.isActive,
            name: product.name,
            type: product.type,
            color: product.color,
            article: product.article,
            url: product.url,
            description: product.description,
            price: product.price,
            status: product.status,
            style: 2,
            categoryId: product.category.id,
            designerId: product.designer.id,
            isDeleted: product.isDeleted,
            composition: product.composition,
            measurements: product.measurements,
            delivery: product.delivery,
            modelParameters: product.modelParameters,
            productParameters: product.productParameters,
            saleDate: new Date(product.saleDate),
            code: product.code,
        };
        if (product.salePrice) {
            productUpdate.salePrice = product.salePrice;
        }
        if (product.salePrice == 0) {
            productUpdate.salePrice = undefined;
        }
        (0, Service_1.post)(`Product/Update`, productUpdate)
            .then(() => {
            refresh();
        });
        closeModal();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Body, { className: "popupUpdate__body" },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, { className: "d-flex justify-content-center" }, "Update Product"),
                react_1.default.createElement("div", { className: "d-flex justify-content-between" },
                    react_1.default.createElement(react_bootstrap_1.Form, { className: "popupUpdate__miniBody" },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput1" },
                            react_1.default.createElement(react_bootstrap_1.Row, null,
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: product === null || product === void 0 ? void 0 : product.type, onChange: (e) => onHandleTypeSelect(+e.target.value) },
                                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Clothes, value: ProductType_1.ProductType.Clothes }, "Clothes"),
                                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Shose, value: ProductType_1.ProductType.Shose }, "Shose"),
                                        react_1.default.createElement("option", { key: ProductType_1.ProductType.Accessories, value: ProductType_1.ProductType.Accessories }, "Accessories"))),
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: product.status, onChange: (e) => onHandleStatusSelect(+e.target.value) },
                                        react_1.default.createElement("option", { key: ProductStatus_1.ProductStatus.OutOfStock, value: ProductStatus_1.ProductStatus.OutOfStock }, "OutOfStock"),
                                        react_1.default.createElement("option", { key: ProductStatus_1.ProductStatus.InStock, value: ProductStatus_1.ProductStatus.InStock }, "InStock"),
                                        react_1.default.createElement("option", { key: ProductStatus_1.ProductStatus.RunningLow, value: ProductStatus_1.ProductStatus.RunningLow }, "RunningLow"))))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput1" },
                            react_1.default.createElement(react_bootstrap_1.Row, null,
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: (_a = product.category) === null || _a === void 0 ? void 0 : _a.id, onChange: (e) => setCategorySelect(e.target.value) }, categories.map(item => {
                                        return react_1.default.createElement("option", { key: item.id, value: item.id }, item.name);
                                    }))),
                                react_1.default.createElement(react_bootstrap_1.Col, { lg: 6, md: 6, sm: 12, xs: 12 },
                                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: (_b = product.designer) === null || _b === void 0 ? void 0 : _b.id, onChange: (e) => setDesignerSelect(e.target.value) }, designers.map(item => {
                                        return react_1.default.createElement("option", { key: item.id, value: item.id }, item.firstName + ' ' + item.lastName);
                                    }))))),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput4" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Name"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", type: "name", placeholder: "Name", autoFocus: true, value: product.name, onChange: (e) => setName(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput6" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Color"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { placeholder: "Color", value: product.color, onChange: (e) => setColor(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput7" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Article"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "article", placeholder: "Article", value: product.article, onChange: (e) => setArticle(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput7" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "\u041A\u043E\u0434"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "article", placeholder: "\u041A\u043E\u0434", value: product.code, onChange: (e) => setCode(+e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput7" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Product Url"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "ProductUrl", placeholder: "Product Url", value: product.url, onChange: (e) => setUrl(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput8" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Price"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "price", placeholder: "Price", value: product.price, onChange: (e) => setPrice(+e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput8" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Sale Price"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "salePrice", placeholder: "Sale Price", value: product.salePrice, onChange: (e) => setSalePrice(+e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput12" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Sale Date"),
                            react_1.default.createElement(react_datepicker_1.default, { selected: product.saleDate, onChange: (date) => setSaleDate(date) }))),
                    react_1.default.createElement(react_bootstrap_1.Form, { className: "ps-3 popupUpdate__miniBody" },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput5" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Description"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "description", placeholder: "Description", value: product.description, onChange: (e) => setDescription(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput9" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Composition"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "composition", placeholder: "Composition", value: product.composition, onChange: (e) => setComposition(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput10" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Measurements"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "measurements", placeholder: "Measurements", value: product.measurements, onChange: (e) => setMeasurements(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput10" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Delivery"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 1, type: "delivery", placeholder: "Delivery", value: product.delivery, onChange: (e) => setDelivery(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput10" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Model Parameters"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 2, type: "modelParameters", placeholder: "Model Parameters", value: product.modelParameters, onChange: (e) => setModelParameters(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-2", controlId: "exampleForm.ControlInput11" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "mb-0" }, "Product Parameters"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 5, type: "productParameters", placeholder: "Product Parameters", value: product.productParameters, onChange: (e) => setProductParameters(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))))));
};
exports.UpdateProductPopup = UpdateProductPopup;
