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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProductList = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const holder_svg_1 = __importDefault(require("../../assets/icons/holder.svg"));
require("./productList.scss");
const react_router_dom_1 = require("react-router-dom");
const ConfirmationPopup_1 = require("shared/components/popups/confirmation-popup/ConfirmationPopup");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const Service_1 = require("shared/services/Service");
const bi_1 = require("react-icons/bi");
const AdminProductList = (props) => {
    const { products, openUpdateModal, onDelete, refresh, setProducts } = props;
    const [confirmation, setConfirmatin] = (0, react_1.useState)(false);
    const [productToDelete, setProductToDelete] = (0, react_1.useState)();
    const onDeleteProduct = (product) => {
        setProductToDelete(product);
        setConfirmatin(true);
    };
    const deleteProduct = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Product/Delete?id=${id}`)
            .then(() => {
            setConfirmatin(false);
            refresh();
        });
    };
    const nameTypeProduct = (x) => {
        if (x == 1) {
            return "ОДЯГ";
        }
        else if (x == 2) {
            return "ВЗУТТЯ";
        }
        else {
            return "АКСЕСУАРИ";
        }
    };
    const setPrice = (price, item, id) => {
        const newState = products.map(obj => {
            if (obj.id == id) {
                return Object.assign(Object.assign({}, obj), { price: price });
            }
            return obj;
        });
        setProducts(newState);
    };
    const setSalePrice = (salePrice, item, id) => {
        const newState = products.map(obj => {
            if (obj.id == id) {
                return Object.assign(Object.assign({}, obj), { salePrice: salePrice });
            }
            return obj;
        });
        setProducts(newState);
    };
    const onSubmitForm = (product) => {
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
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", { className: "admin__header" },
                react_1.default.createElement("tr", { className: "admin__tableColor" },
                    react_1.default.createElement("th", null, "\u0411\u0420\u0415\u041D\u0414"),
                    react_1.default.createElement("th", null, "\u0424\u041E\u0422\u041E"),
                    react_1.default.createElement("th", null, "\u041D\u0410\u0417\u0412\u0410"),
                    react_1.default.createElement("th", null, "\u0426\u0406\u041D\u0410"),
                    react_1.default.createElement("th", null, "\u0426\u0406\u041D\u0410 \u0417\u0406 \u0417\u041D\u0418\u0416\u041A\u041E\u042E"),
                    react_1.default.createElement("th", null, "\u041A\u0410\u0422\u0415\u0413\u041E\u0420\u0406\u042F"),
                    react_1.default.createElement("th", null, "\u0422\u0418\u041F \u0422\u041E\u0412\u0410\u0420\u0423"))),
            react_1.default.createElement("tbody", null, products.map((item, key) => {
                var _a, _b, _c, _d;
                return (react_1.default.createElement("tr", { key: key, className: "admin__tableColor" },
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/product/" + item.url, className: "admin__text" }, ((_a = item.designer) === null || _a === void 0 ? void 0 : _a.firstName) + " " + ((_b = item.designer) === null || _b === void 0 ? void 0 : _b.lastName))),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/product/" + item.url, className: "admin__text" },
                            react_1.default.createElement("img", { src: ((_c = item.pictures) === null || _c === void 0 ? void 0 : _c.length) ? item.pictures[0].imageUrl : holder_svg_1.default, className: "admin__img" }))),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/product/" + item.url, className: "admin__text" }, item.name),
                        react_1.default.createElement("div", { className: "product-list__category" },
                            react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: () => openUpdateModal(item) }, "Update"),
                            react_1.default.createElement(react_bootstrap_1.Button, { variant: "danger", onClick: () => onDeleteProduct(item) }, "Delete"))),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "price", placeholder: "Price", value: item.price, onChange: (e) => setPrice(+e.target.value, item, item.id) }),
                        react_1.default.createElement("button", { onClick: () => onSubmitForm(item) },
                            react_1.default.createElement(bi_1.BiSave, null))),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "price", placeholder: "Price", value: (item === null || item === void 0 ? void 0 : item.salePrice) !== null ? item === null || item === void 0 ? void 0 : item.salePrice : "-", onChange: (e) => setSalePrice(+e.target.value, item, item.id) }),
                        react_1.default.createElement("button", { onClick: () => onSubmitForm(item) },
                            react_1.default.createElement(bi_1.BiSave, null))),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/product/" + item.url, className: "admin__text" }, (_d = item.category) === null || _d === void 0 ? void 0 : _d.name)),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/product/" + item.url, className: "admin__text" }, nameTypeProduct(item.type)))));
            }))),
        productToDelete && react_1.default.createElement(ConfirmationPopup_1.ConfirmationPopup, { onDelete: () => deleteProduct(productToDelete.url), closeModal: () => setConfirmatin(false), modalIsOpen: confirmation, product: productToDelete.name })));
};
exports.AdminProductList = AdminProductList;
