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
exports.OrderContainer = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const PaymentType_1 = require("shared/models/check-out/PaymentType");
const notification_1 = require("shared/toast/notification");
require("./orderContainer.scss");
const Service_1 = require("shared/services/Service");
const react_bootstrap_1 = require("react-bootstrap");
const OrderStatus_1 = require("shared/models/enums/OrderStatus");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const OrderContainer = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const [order, setOrder] = (0, react_1.useState)();
    const { id } = (0, react_router_dom_1.useParams)();
    const [adminComment, setAdminComment] = (0, react_1.useState)('');
    const [status, setStatus] = (0, react_1.useState)(OrderStatus_1.OrderStatus.Created);
    (0, react_1.useEffect)(() => {
        getOrder();
    }, []);
    const getOrder = () => {
        (0, Service_1.get)(`Order/Get?id=${id}`)
            .then((item) => {
            setOrder(item.data);
            setStatus(item.data.status);
            setAdminComment(item.data.adminComment);
        });
    };
    const onUpdateStatus = () => {
        const requestView = {
            id: order === null || order === void 0 ? void 0 : order.id,
            adminComment: adminComment,
            status: status
        };
        (0, Service_1.post)(`Order/Update`, requestView)
            .then(() => {
            (0, notification_1.showSuccess)('Status Updated');
            getOrder();
        });
    };
    const onDeleteOrderProduct = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Order/DeleteOrderProduct?id=${id}`).then(() => {
            getOrder();
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { className: "admin-header-centre" }, "Order"),
        react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: onUpdateStatus }, "Update"),
        order &&
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: "order-main" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h3", null, "General Information"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Order Number: "), order === null || order === void 0 ? void 0 :
                            order.orderNumber),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Date: "), order === null || order === void 0 ? void 0 :
                            order.creationDate.substring(0, 10)),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Payment Type: "),
                            PaymentType_1.PaymentType[order === null || order === void 0 ? void 0 : order.payType]),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Order Status: "),
                            OrderStatus_1.OrderStatus[order.status]),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Total Price: "), order === null || order === void 0 ? void 0 :
                            order.totalPrice),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Call Back: "),
                            order.callBack ? 'No' : 'Yes')),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h3", null, "Location"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Country: "), (_a = order === null || order === void 0 ? void 0 : order.orderLocation) === null || _a === void 0 ? void 0 :
                            _a.country),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "City: "), (_b = order === null || order === void 0 ? void 0 : order.orderLocation) === null || _b === void 0 ? void 0 :
                            _b.city),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Street: "), (_c = order === null || order === void 0 ? void 0 : order.orderLocation) === null || _c === void 0 ? void 0 :
                            _c.street),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "House: "), (_d = order === null || order === void 0 ? void 0 : order.orderLocation) === null || _d === void 0 ? void 0 :
                            _d.house),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Appartement: "), (_e = order === null || order === void 0 ? void 0 : order.orderLocation) === null || _e === void 0 ? void 0 :
                            _e.appartement)),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h3", null, "Customer"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "First Name: "), (_f = order.customerUser) === null || _f === void 0 ? void 0 :
                            _f.firstName),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Last Name: "), (_g = order.customerUser) === null || _g === void 0 ? void 0 :
                            _g.lastName),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Email: "), (_h = order.customerUser) === null || _h === void 0 ? void 0 :
                            _h.email),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("b", null, "Phone: "), (_j = order.customerUser) === null || _j === void 0 ? void 0 :
                            _j.phone))),
                ((_k = order.orderLocation) === null || _k === void 0 ? void 0 : _k.novaPoshta) && react_1.default.createElement("div", null,
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("b", null, "Nova Poshta "), (_l = order.orderLocation) === null || _l === void 0 ? void 0 :
                        _l.novaPoshta)),
                order.comment && react_1.default.createElement("div", null,
                    react_1.default.createElement("p", null,
                        react_1.default.createElement("b", null, "Comment: "), order === null || order === void 0 ? void 0 :
                        order.comment)),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("b", null, "Admin Comment: "),
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", onChange: (e) => setAdminComment(e.target.value), value: adminComment, placeholder: "Admin Comment" })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", null, "Status"),
                    react_1.default.createElement("div", { className: "admin-order-products" },
                        react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: status, onChange: (e) => setStatus(+e.target.value) },
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Created, value: OrderStatus_1.OrderStatus.Created }, "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.VerifiedByTheBrand, value: OrderStatus_1.OrderStatus.VerifiedByTheBrand }, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043E \u0431\u0440\u0435\u043D\u0434\u043E\u043C"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.AwaitingPayment, value: OrderStatus_1.OrderStatus.AwaitingPayment }, "\u041E\u0447\u0456\u043A\u0443\u0454 \u043E\u043F\u043B\u0430\u0442\u0438"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.ReadyToShip, value: OrderStatus_1.OrderStatus.ReadyToShip }, "\u0413\u043E\u0442\u043E\u0432\u0438\u0439 \u0434\u043E \u0432\u0456\u0434\u043F\u0440\u0430\u0432\u043A\u0438"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Sent, value: OrderStatus_1.OrderStatus.Sent }, "\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Received, value: OrderStatus_1.OrderStatus.Received }, "\u041E\u0442\u0440\u0438\u043C\u0430\u043D\u043E"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.AReturnIsExpected, value: OrderStatus_1.OrderStatus.AReturnIsExpected }, "\u041E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Return, value: OrderStatus_1.OrderStatus.Return }, "\u041F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Cancel, value: OrderStatus_1.OrderStatus.Cancel }, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430"),
                            react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Test, value: OrderStatus_1.OrderStatus.Test }, "\u0422\u0435\u0441\u0442")))),
                react_1.default.createElement("div", { className: "order-main-low" },
                    react_1.default.createElement("div", { style: { marginRight: "100px" } },
                        react_1.default.createElement("h3", { className: "admin-header-centre" }, "Products"),
                        react_1.default.createElement("div", { className: "admin-order-products" }, order.products.map(item => (react_1.default.createElement("div", { className: "admin-order-productInProducts" },
                            react_1.default.createElement("h5", { className: "admin-order-product" }, "Product"),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("b", null, "Name: "),
                                react_1.default.createElement("a", { target: "_blank", className: "adminLinkProduct", href: "https://www.hubukrbrands.com/product/" + item.product.url }, item.product.name)),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("b", null, "Price: "),
                                item.product.price),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("b", null, "Article: "),
                                item.product.article),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("b", null, "Quantity: "),
                                item.quantity),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("b", null, "Size: "),
                                item.productSize.size.name),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("b", null, "Deleted: "),
                                `${item.isDeleted}`),
                            react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger btn-btnCategories", onClick: () => onDeleteOrderProduct(item.id) }, "Delete"))))))))));
};
exports.OrderContainer = OrderContainer;
