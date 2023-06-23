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
exports.OrdersContainer = void 0;
const react_1 = __importStar(require("react"));
const Service_1 = require("shared/services/Service");
const ProductType_1 = require("shared/models/category/ProductType");
const OrderStatus_1 = require("shared/models/enums/OrderStatus");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const OrderTable_1 = require("shared/components/tables/OrderTable");
const OrderTableFilters_1 = require("shared/components/orderTable/OrderTableFilters");
const OrdersContainer = () => {
    const [orders, setOrders] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [designers, setDesigners] = (0, react_1.useState)([]);
    const [statusSelect, setStatusSelect] = react_1.default.useState(OrderStatus_1.OrderStatus.None);
    const [typeSelect, setTypeSelect] = react_1.default.useState(ProductType_1.ProductType.None);
    const [categorySelect, setCategorySelect] = react_1.default.useState('');
    const [designerSelect, setDesignerSelect] = react_1.default.useState('');
    const [to, setTo] = (0, react_1.useState)();
    const [from, setFrom] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        getAllOrders();
        getAllCategories();
        getAllDesigners();
    }, []);
    const getAllOrders = () => {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 200);
        let filter = {
            status: statusSelect,
            categoryId: categorySelect,
            designerId: designerSelect,
            type: typeSelect,
            from: from,
            to: to
        };
        (0, Service_1.post)(`Order/GetAll`, filter)
            .then((response) => {
            setOrders(response.data);
        });
    };
    const getAllCategories = () => {
        (0, HTTPUserService_1.get)(`Category/GetAll`)
            .then((response) => {
            setCategories(response);
        });
    };
    const getAllDesigners = () => {
        (0, HTTPUserService_1.get)(`Designer/GetAll`)
            .then((response) => {
            setDesigners(response);
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", { className: "adminPageTitle" }, "Orders"),
        react_1.default.createElement(OrderTableFilters_1.OrderTableFilters, { categories: categories, designers: designers, onUpdateFilters: getAllOrders, setStatusSelect: setStatusSelect, statusSelect: statusSelect, categorySelect: categorySelect, designerSelect: designerSelect, typeSelect: typeSelect, setCategorySelect: setCategorySelect, setDesignerSelect: setDesignerSelect, setTypeSelect: setTypeSelect, setTo: setTo, setFrom: setFrom }),
        orders &&
            react_1.default.createElement(OrderTable_1.OrderTable, { data: orders, refresh: getAllOrders })));
};
exports.OrdersContainer = OrdersContainer;
