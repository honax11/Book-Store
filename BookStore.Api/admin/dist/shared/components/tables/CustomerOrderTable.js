"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrderTable = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const OrderStatus_1 = require("shared/models/enums/OrderStatus");
const CustomerOrderTable = (props) => {
    const { orders } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "col  me-2" },
            react_1.default.createElement("h2", { className: "adminPageTitle" }, "Order"),
            react_1.default.createElement("table", null,
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", null, "Number"),
                        react_1.default.createElement("th", null, "Price"),
                        react_1.default.createElement("th", null, "Status"))),
                react_1.default.createElement("tbody", null, orders.map((order, key) => {
                    return (react_1.default.createElement("tr", { key: key },
                        react_1.default.createElement("th", null,
                            react_1.default.createElement(react_router_dom_1.Link, { to: `/admin/order/${order.id}`, className: "adminLinkProduct" }, order.orderNumber)),
                        react_1.default.createElement("th", null, order.totalPrice),
                        react_1.default.createElement("th", null, OrderStatus_1.OrderStatus[order.status])));
                }))))));
};
exports.CustomerOrderTable = CustomerOrderTable;
