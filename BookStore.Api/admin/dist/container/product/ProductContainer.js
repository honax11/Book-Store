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
exports.ProductContainer = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const UploadImageContainer_1 = require("../../shared/components/popups/product/UploadImageContainer");
const react_responsive_carousel_1 = require("react-responsive-carousel");
const ProductSizeTable_1 = require("../../shared/components/tables/ProductSizeTable");
const react_bootstrap_1 = require("react-bootstrap");
const notification_1 = require("shared/toast/notification");
const Service_1 = require("shared/services/Service");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
require("./productContainer.scss");
const ProductContainer = () => {
    var _a, _b, _c, _d, _e;
    const [product, setProduct] = (0, react_1.useState)();
    const [sizes, setSizes] = (0, react_1.useState)();
    const [productSizes, setProductSizes] = (0, react_1.useState)();
    const [load, setLoad] = react_1.default.useState(false);
    const [images, setImages] = react_1.default.useState([]);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        getProduct();
    }, []);
    const uploadImages = () => {
        let pictureToCreate = {
            formFile: images[0],
            productId: product.id
        };
        setLoad(true);
        (0, HTTPUserService_1.upload)(`Product/UploadImage`, pictureToCreate)
            .then(() => {
            (0, notification_1.showSuccess)("Image was uploaded");
            setLoad(false);
            getProduct();
        });
    };
    const getAllSize = (type) => {
        (0, HTTPUserService_1.get)(`Size/GetAllForCategory?type=${type}`)
            .then((response) => {
            setSizes(response);
        });
    };
    const getAllProductSizes = (productId) => {
        (0, HTTPUserService_1.get)(`Size/GetAllProductSizes?productId=${productId}`)
            .then((response) => {
            setProductSizes(response);
        });
    };
    const onActivateProduct = (id) => {
        (0, Service_1.getWithoutBody)(`Product/Activate?id=${id}`).then(() => {
            (0, notification_1.showSuccess)(`Product ${!(product === null || product === void 0 ? void 0 : product.isActive) ? 'Activated!' : 'Deactivated!'}`);
            getProduct();
        });
    };
    const ondDeleteImage = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Product/DeleteProductPicture?id=${id}`)
            .then(() => {
            getProduct();
        });
    };
    const getProduct = () => {
        (0, HTTPUserService_1.get)(`Product/Get?id=${id}`)
            .then((item) => {
            setProduct(item);
            getAllSize(item.type);
            getAllProductSizes(item.id);
        });
    };
    return (react_1.default.createElement("div", { className: "product__main" },
        react_1.default.createElement("div", { className: "product__left" }, product && product.pictures && react_1.default.createElement(react_responsive_carousel_1.Carousel, { showStatus: false, className: "main" }, product.pictures.map(item => (react_1.default.createElement("div", { className: "container", key: item.id },
            react_1.default.createElement("img", { className: "main__logo", src: item.imageUrl }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger", onClick: () => ondDeleteImage(item.id) }, "Delete"))))))),
        react_1.default.createElement("div", { className: "product__right" },
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, ((_a = product === null || product === void 0 ? void 0 : product.designer) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = product === null || product === void 0 ? void 0 : product.designer) === null || _b === void 0 ? void 0 : _b.lastName))),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, product === null || product === void 0 ? void 0 : product.name)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, product === null || product === void 0 ? void 0 : product.price)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, product === null || product === void 0 ? void 0 : product.name)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, product === null || product === void 0 ? void 0 : product.description)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, product === null || product === void 0 ? void 0 : product.color)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, product === null || product === void 0 ? void 0 : product.article)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, (_c = product === null || product === void 0 ? void 0 : product.category) === null || _c === void 0 ? void 0 : _c.name)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, ((_d = product === null || product === void 0 ? void 0 : product.designer) === null || _d === void 0 ? void 0 : _d.firstName) + ' ' + ((_e = product === null || product === void 0 ? void 0 : product.designer) === null || _e === void 0 ? void 0 : _e.lastName))),
            react_1.default.createElement("div", null,
                react_1.default.createElement(UploadImageContainer_1.UploadImageContainer, { load: load, upload: () => uploadImages(), images: images, setImages: setImages })),
            product && sizes && productSizes &&
                react_1.default.createElement(ProductSizeTable_1.ProductSizeTable, { data: productSizes, sizes: sizes, productId: product === null || product === void 0 ? void 0 : product.id, refresh: () => getAllProductSizes(product === null || product === void 0 ? void 0 : product.id), setProductSizes: setProductSizes }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", null,
                    "Is Active: ",
                    (product === null || product === void 0 ? void 0 : product.isActive) ? 'Yes' : 'No'),
                react_1.default.createElement(react_bootstrap_1.Button, { disabled: product === null || product === void 0 ? void 0 : product.isActive, className: "btn btn-warning", onClick: () => onActivateProduct(product.url) }, "Activate"),
                react_1.default.createElement(react_bootstrap_1.Button, { disabled: !(product === null || product === void 0 ? void 0 : product.isActive), className: "btn btn-warning", onClick: () => onActivateProduct(product.url) }, "Deactivate")))));
};
exports.ProductContainer = ProductContainer;
