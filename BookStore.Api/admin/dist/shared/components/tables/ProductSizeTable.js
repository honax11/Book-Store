"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSizeTable = void 0;
const react_1 = __importDefault(require("react"));
require("./tablet.scss");
const react_bootstrap_1 = require("react-bootstrap");
const CreateProductSizePopup_1 = require("../popups/product/CreateProductSizePopup");
const UpdateProductSizePopup_1 = require("../popups/product/UpdateProductSizePopup");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const Service_1 = require("shared/services/Service");
const bi_1 = require("react-icons/bi");
const ProductSizeTable = (props) => {
    const { data, refresh, sizes, productId, setProductSizes } = props;
    const [createModalIsOpen, setCreateModalIsOpen] = react_1.default.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = react_1.default.useState(false);
    const [productSizeToUpdate, setProductSizeToUpdate] = react_1.default.useState();
    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };
    const ondDeleteSize = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Size/DeleteProductSize?id=${id}`)
            .then(() => {
            refresh();
        });
    };
    const onUpdateHandle = (item) => {
        setProductSizeToUpdate(item);
        setUpdateModalIsOpen(true);
    };
    const onSubmitForm = (productSize) => {
        (0, Service_1.post)(`Size/UpdateProductSize`, { id: productSize.id, quantity: productSize.quantity })
            .then(() => {
            refresh();
        });
    };
    const setQuant = (quantity, val, id) => {
        const newState = data.map(obj => {
            if (obj.id == id) {
                return Object.assign(Object.assign({}, obj), { quantity: quantity });
            }
            return obj;
        });
        setProductSizes(newState);
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "Product Sizes"),
            react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-success", onClick: openCreateModal }, "Create  Size")),
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Size"),
                    react_1.default.createElement("th", null, "Quantity"),
                    react_1.default.createElement("th", null, "Actions"))),
            react_1.default.createElement("tbody", null, data.map((val, key) => {
                return (react_1.default.createElement("tr", { key: key, className: "" },
                    react_1.default.createElement("td", null, val.size.name),
                    react_1.default.createElement("td", { className: "productSizeTable" },
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "quantity", placeholder: "Quantity", value: val.quantity, onChange: (e) => setQuant(+e.target.value, val, val.id) }),
                        react_1.default.createElement("button", { className: "", onClick: () => onSubmitForm(val) },
                            react_1.default.createElement(bi_1.BiSave, null))),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-info", onClick: () => onUpdateHandle(val) }, "Edit"),
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger", onClick: () => ondDeleteSize(val.id) }, "Delete"))));
            }))),
        react_1.default.createElement(CreateProductSizePopup_1.CreateProductSizePopup, { productId: productId, sizes: sizes, modalIsOpen: createModalIsOpen, refresh: refresh, closeModal: () => setCreateModalIsOpen(false) }),
        productSizeToUpdate &&
            react_1.default.createElement(UpdateProductSizePopup_1.UpdateProductSizePopup, { modalIsOpen: updateModalIsOpen, closeModal: () => setUpdateModalIsOpen(false), refresh: refresh, productSize: productSizeToUpdate, setProductSize: setProductSizeToUpdate })));
};
exports.ProductSizeTable = ProductSizeTable;
