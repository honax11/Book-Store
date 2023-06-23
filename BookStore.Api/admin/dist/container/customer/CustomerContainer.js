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
exports.CustomerContainer = void 0;
const react_1 = __importStar(require("react"));
const Service_1 = require("shared/services/Service");
const react_router_dom_1 = require("react-router-dom");
const CustomerOrderTable_1 = require("../../shared/components/tables/CustomerOrderTable");
const CustomerProductsTable_1 = require("../../shared/components/tables/CustomerProductsTable");
const react_bootstrap_1 = require("react-bootstrap");
const notification_1 = require("shared/toast/notification");
const CustomerType_1 = require("shared/models/enums/CustomerType");
const OrderStatus_1 = require("shared/models/enums/OrderStatus");
const CustomerContainer = () => {
    const [infoCustomer, setInfoCustomer] = (0, react_1.useState)();
    const [orders, setOrders] = (0, react_1.useState)([]);
    const [products, setProducts] = (0, react_1.useState)([]);
    const [statusCustomer, setStatusCustomer] = (0, react_1.useState)(CustomerType_1.CustomerType.None);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        getInfoCustomer();
        getOrdersInfo();
        getAllProductsCustomer();
    }, []);
    const getInfoCustomer = () => {
        (0, Service_1.get)(`Customer/Get/?id=${id}`)
            .then((response) => {
            setInfoCustomer(response.data);
            setStatusCustomer(response.data.type);
        });
    };
    const getOrdersInfo = () => {
        (0, Service_1.get)(`Customer/GetAllOrders?id=${id}`)
            .then((response) => {
            setOrders(response.data);
        });
    };
    const getAllProductsCustomer = () => {
        (0, Service_1.get)(`Customer/GetAllProducts?id=${id}`)
            .then((responce) => {
            setProducts(responce.data);
        });
    };
    const onUpdateStatus = () => {
        (0, Service_1.get)(`Customer/Update?id=${id}&type=${statusCustomer}`)
            .then(() => {
            (0, notification_1.showSuccess)('Status Updated');
            getInfoCustomer();
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", { className: "adminPageTitle" }, "Customer"),
        react_1.default.createElement("div", null,
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: onUpdateStatus, className: "mb-2" }, "Update"),
            react_1.default.createElement("p", null,
                "First name: ", infoCustomer === null || infoCustomer === void 0 ? void 0 :
                infoCustomer.firstName),
            react_1.default.createElement("p", null,
                "LastName: ", infoCustomer === null || infoCustomer === void 0 ? void 0 :
                infoCustomer.lastName),
            react_1.default.createElement("p", null,
                "Phone: ", infoCustomer === null || infoCustomer === void 0 ? void 0 :
                infoCustomer.phone),
            react_1.default.createElement("p", null,
                "Email: ", infoCustomer === null || infoCustomer === void 0 ? void 0 :
                infoCustomer.email)),
        react_1.default.createElement("div", { className: "" },
            react_1.default.createElement("h3", null, "Type"),
            react_1.default.createElement("div", { className: "admin-order-products" },
                react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: statusCustomer, onChange: (e) => setStatusCustomer(+e.target.value) },
                    react_1.default.createElement("option", { key: CustomerType_1.CustomerType.None, value: CustomerType_1.CustomerType.None }, "\u0411\u0435\u0437 \u0444\u0438\u043B\u044C\u0442\u0440\u0456\u0432"),
                    react_1.default.createElement("option", { key: CustomerType_1.CustomerType.Real, value: CustomerType_1.CustomerType.Real }, "\u0420\u0435\u0430\u043B\u044C\u043D\u0438\u0439"),
                    react_1.default.createElement("option", { key: CustomerType_1.CustomerType.Test, value: OrderStatus_1.OrderStatus.Test }, "\u0422\u0435\u0441\u0442")))),
        react_1.default.createElement("div", { className: "d-flex" },
            react_1.default.createElement(CustomerOrderTable_1.CustomerOrderTable, { orders: orders }),
            react_1.default.createElement(CustomerProductsTable_1.CustomerProductsTable, { products: products }))));
};
exports.CustomerContainer = CustomerContainer;
