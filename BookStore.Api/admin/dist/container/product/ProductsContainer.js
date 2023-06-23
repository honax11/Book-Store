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
exports.ProductsContainer = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ProductType_1 = require("shared/models/category/ProductType");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const Service_1 = require("shared/services/Service");
const CreateProductPopup_1 = require("../../shared/components/popups/product/CreateProductPopup");
const UpdateProductPopup_1 = require("../../shared/components/popups/product/UpdateProductPopup");
const ProductList_1 = require("./ProductList");
const ProductsContainer = () => {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [productToUpdate, setProductToUpdate] = (0, react_1.useState)();
    const [nameFilter, setNameFilter] = (0, react_1.useState)();
    const [typeSelect, setTypeSelect] = react_1.default.useState(ProductType_1.ProductType.None);
    const [categorySelect, setCategorySelect] = react_1.default.useState('');
    const [designerSelect, setDesignerSelect] = react_1.default.useState('');
    const getAllUrl = `Product/GetAllFiltered`;
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [designers, setDesigners] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        getAllProducts(getAllUrl);
        getAllCategories();
        getAllDesigners();
    }, []);
    const [createModalIsOpen, setCreateModalIsOpen] = react_1.default.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = react_1.default.useState(false);
    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };
    const openUpdateModal = (product) => {
        setProductToUpdate(product);
        setUpdateModalIsOpen(true);
    };
    const onHandleTypeSelect = (e) => {
        setTypeSelect(e.target.value);
    };
    const onUpdateFilters = () => {
        let urlParam = "?";
        if (nameFilter) {
            urlParam += `name=${nameFilter}&`;
        }
        else {
            urlParam += `name=&`;
        }
        if (typeSelect && !nameFilter) {
            urlParam += `type=${typeSelect}&`;
        }
        else {
            urlParam += `type=&`;
        }
        if (categorySelect && !nameFilter) {
            urlParam += `category=${categorySelect}&`;
        }
        else {
            urlParam += `category=&`;
        }
        if (designerSelect && !nameFilter) {
            urlParam += `designer=${designerSelect}`;
        }
        else {
            urlParam += `designer=`;
        }
        getAllProducts(getAllUrl + urlParam);
    };
    const getAllDesigners = () => {
        (0, HTTPUserService_1.get)(`Designer/GetAll`)
            .then((response) => {
            setDesigners(response);
        });
    };
    const onDeleteProduct = (id) => {
        (0, Service_1.onDelete)(`Product/Delete?id=${id}`)
            .then(() => {
        });
    };
    const getAllCategories = () => {
        (0, HTTPUserService_1.get)(`Category/GetAll`)
            .then((response) => {
            setCategories(response);
        });
    };
    const getAllProducts = (url) => {
        (0, HTTPUserService_1.get)(url)
            .then((response) => {
            const products = response.map((item) => {
                return {
                    id: item.id,
                    creationDate: item.creationDate,
                    isActive: item.isActive,
                    isDeleted: item.isDeleted,
                    name: item.name,
                    type: item.type,
                    price: item.price,
                    salePrice: item.salePrice,
                    style: item.style,
                    status: item.status,
                    color: item.color,
                    description: item.description,
                    article: item.article,
                    url: item.url,
                    designer: item.designer,
                    category: item.category,
                    pictures: item.pictures,
                    measurements: item.measurements,
                    delivery: item.delivery,
                    composition: item.composition,
                    modelParameters: item.modelParameters,
                    productParameters: item.productParameters,
                    saleDate: Date.parse((item === null || item === void 0 ? void 0 : item.saleDate) ? item.saleDate.toString() : ''),
                    code: item.code,
                };
            });
            setProducts(products);
        });
    };
    return (react_1.default.createElement("div", { className: "create-product" },
        react_1.default.createElement("h1", { className: "adminPageTitle" }, "Products"),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-success", onClick: openCreateModal }, "Create Product")),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_bootstrap_1.InputGroup, { className: "mb-3 filtresAdminPage__products d-flex align-items-end" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_bootstrap_1.FormControl, { value: nameFilter, placeholder: "Name", onChange: (e) => setNameFilter(e.target.value), className: "filtresAdminPage__filtres" })),
                react_1.default.createElement("div", { className: "d-flex" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null, "\u0422\u0438\u043F"),
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: typeSelect, onChange: (e) => onHandleTypeSelect(e), className: "filtresAdminPage__filtres" },
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.None, value: ProductType_1.ProductType.None }, "\u0411\u0435\u0437 \u0444\u0456\u043B\u044C\u0442\u0440\u0443"),
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Clothes, value: ProductType_1.ProductType.Clothes }, "Clothes"),
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Shose, value: ProductType_1.ProductType.Shose }, "Shose"),
                            react_1.default.createElement("option", { key: ProductType_1.ProductType.Accessories, value: ProductType_1.ProductType.Accessories }, "Accessories"))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F"),
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: categorySelect, onChange: (e) => setCategorySelect(e.target.value), className: "filtresAdminPage__filtres" },
                            react_1.default.createElement("option", { key: "", value: "" }, "\u0411\u0435\u0437 \u0444\u0456\u043B\u044C\u0442\u0440\u0443"),
                            categories.map(item => {
                                return react_1.default.createElement("option", { key: item.id, value: item.id }, item.name);
                            }))),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("span", null, "\u0411\u0440\u0435\u043D\u0434"),
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: designerSelect, onChange: (e) => setDesignerSelect(e.target.value), className: "filtresAdminPage__filtres" },
                            react_1.default.createElement("option", { key: "", value: "" }, "\u0411\u0435\u0437 \u0444\u0456\u043B\u044C\u0442\u0440\u0443"),
                            designers.map(item => {
                                return react_1.default.createElement("option", { key: item.id, value: item.id }, `${item.firstName} ${item.lastName}`);
                            })))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: () => onUpdateFilters() }, "Filter")))),
        products &&
            react_1.default.createElement(ProductList_1.AdminProductList, { openUpdateModal: openUpdateModal, products: products, onDelete: onDeleteProduct, refresh: onUpdateFilters, setProducts: setProducts }),
        categories &&
            react_1.default.createElement(CreateProductPopup_1.CreateProductPopup, { modalIsOpen: createModalIsOpen, closeModal: () => setCreateModalIsOpen(false), categories: categories, designers: designers, refresh: onUpdateFilters }),
        productToUpdate &&
            react_1.default.createElement(UpdateProductPopup_1.UpdateProductPopup, { modalIsOpen: updateModalIsOpen, closeModal: () => setUpdateModalIsOpen(false), categories: categories, product: productToUpdate, setProduct: setProductToUpdate, designers: designers, refresh: onUpdateFilters })));
};
exports.ProductsContainer = ProductsContainer;
