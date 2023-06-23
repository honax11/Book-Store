"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreorderdProductsContainer = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const PreOrderedProductStatus_1 = require("shared/models/enums/PreOrderedProductStatus");
const Service_1 = require("shared/services/Service");
const PreOrderTable_1 = require("shared/components/tables/PreOrderTable");
const PreorderdProductsContainer = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [status, setStatus] = (0, react_1.useState)(PreOrderedProductStatus_1.PreOrderedProductStatus.None);
    (0, react_1.useEffect)(() => {
        getAllProducts();
    }, []);
    const getAllProducts = () => {
        (0, Service_1.get)(`PreOrder/GetAll?status=${status}`)
            .then((response) => {
            setProducts(response.data);
            console.log(response.data);
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement("h2", { className: "adminPageTitle" }, "Pre-ordered Products"),
            react_1.default.createElement("div", null, "\u0412\u0438\u0434"),
            react_1.default.createElement(react_bootstrap_1.InputGroup, { className: "mb-3" },
                react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: status, onChange: (e) => setStatus(+e.target.value) },
                    react_1.default.createElement("option", { key: PreOrderedProductStatus_1.PreOrderedProductStatus.None, value: PreOrderedProductStatus_1.PreOrderedProductStatus.None }, "\u0411\u0435\u0437 \u0444\u0456\u043B\u044C\u0442\u0440\u0443"),
                    react_1.default.createElement("option", { key: PreOrderedProductStatus_1.PreOrderedProductStatus.AddedToCart, value: PreOrderedProductStatus_1.PreOrderedProductStatus.AddedToCart }, "Added To Cart"),
                    react_1.default.createElement("option", { key: PreOrderedProductStatus_1.PreOrderedProductStatus.PressCheckOut, value: PreOrderedProductStatus_1.PreOrderedProductStatus.PressCheckOut }, "Press CheckOut"),
                    react_1.default.createElement("option", { key: PreOrderedProductStatus_1.PreOrderedProductStatus.PressedNext, value: PreOrderedProductStatus_1.PreOrderedProductStatus.PressedNext }, "Pressed Next")),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: () => getAllProducts() }, "Filter")),
            react_1.default.createElement(PreOrderTable_1.PreOrderTable, { products: products }))));
};
exports.PreorderdProductsContainer = PreorderdProductsContainer;
