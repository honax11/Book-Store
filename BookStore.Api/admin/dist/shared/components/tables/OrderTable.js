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
exports.OrderTable = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const OrderStatus_1 = require("shared/models/enums/OrderStatus");
const react_bootstrap_1 = require("react-bootstrap");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const ConfirmationPopup_1 = require("../popups/confirmation-popup/ConfirmationPopup");
const OrderTable = (props) => {
    var _a, _b;
    const { data, refresh } = props;
    const [confirmation, setConfirmatin] = (0, react_1.useState)(false);
    const [orderToDelete, setoOrderToDelete] = (0, react_1.useState)();
    const onDeleteOrder = (order) => {
        setoOrderToDelete(order);
        setConfirmatin(true);
    };
    const onDelete = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Order/Delete?id=${id}`).then(() => {
            setConfirmatin(false);
            refresh();
        });
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", { className: "admin-panel-order-table admin-text-orders" }, "Number"),
                    react_1.default.createElement("th", { className: "admin-panel-order-table admin-text-orders" }, "Brand"),
                    react_1.default.createElement("th", { className: "admin-panel-order-table admin-text-orders" }, "Name"),
                    react_1.default.createElement("th", { className: "admin-panel-order-table admin-text-orders" }, "Price"),
                    react_1.default.createElement("th", { className: "admin-panel-order-table admin-text-orders" }, "Created Date"),
                    react_1.default.createElement("th", { className: "admin-panel-order-table admin-text-orders" }, "Status"),
                    react_1.default.createElement("th", { className: "admin-panel-order-table admin-text-orders" }, "Actions"))),
            react_1.default.createElement("tbody", null, data.map((val, key) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return (react_1.default.createElement("tr", { key: key },
                    react_1.default.createElement("td", { className: "admin-panel-order-table" }, val.orderNumber),
                    react_1.default.createElement("td", { className: "admin-panel-order-table" }, ((_c = (_b = (_a = val.products[0]) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.designer) === null || _c === void 0 ? void 0 : _c.firstName) + " " + ((_f = (_e = (_d = val.products[0]) === null || _d === void 0 ? void 0 : _d.product) === null || _e === void 0 ? void 0 : _e.designer) === null || _f === void 0 ? void 0 : _f.lastName)),
                    react_1.default.createElement("td", { className: "admin-panel-order-table" }, (_h = (_g = val.products[0]) === null || _g === void 0 ? void 0 : _g.product) === null || _h === void 0 ? void 0 : _h.name),
                    react_1.default.createElement("td", { className: "admin-panel-order-table" }, val.totalPrice),
                    react_1.default.createElement("td", { className: "admin-panel-order-table" }, val.creationDate.substring(0, 10)),
                    react_1.default.createElement("td", { className: "admin-panel-order-table" }, OrderStatus_1.OrderStatus[val.status]),
                    react_1.default.createElement("td", { className: "admin-panel-order-table" },
                        react_1.default.createElement(react_router_dom_1.Link, { className: "btn btn-info adminBtnMobile", to: `/admin/order/${val.id}` }, "Go to Order"),
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger btn-btnCategories", onClick: () => onDeleteOrder(val) }, "Delete"))));
            }))),
        orderToDelete && react_1.default.createElement(ConfirmationPopup_1.ConfirmationPopup, { onDelete: () => onDelete(orderToDelete.id), closeModal: () => setConfirmatin(false), modalIsOpen: confirmation, product: (_b = (_a = orderToDelete === null || orderToDelete === void 0 ? void 0 : orderToDelete.products[0]) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.name })));
};
exports.OrderTable = OrderTable;
