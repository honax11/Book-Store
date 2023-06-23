"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerProductsTable = void 0;
const react_1 = __importDefault(require("react"));
const CustomerProductsTable = (props) => {
    const { products } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "col" },
            react_1.default.createElement("h2", { className: "adminPageTitle" }, "Product"),
            react_1.default.createElement("table", null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Name"),
                        react_1.default.createElement("th", null, "Price"),
                        react_1.default.createElement("th", null, "Article"))),
                react_1.default.createElement("tbody", null, products.map((product, key) => {
                    return (react_1.default.createElement("tr", { key: key },
                        react_1.default.createElement("th", null,
                            react_1.default.createElement("a", { target: "_blank", className: "adminLinkProduct", href: "https://www.hubukrbrands.com/product/" + product.url }, product.name)),
                        react_1.default.createElement("th", null, product.price),
                        react_1.default.createElement("th", null, product.article)));
                }))))));
};
exports.CustomerProductsTable = CustomerProductsTable;
