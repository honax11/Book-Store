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
exports.OrderTableFilters = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ProductType_1 = require("shared/models/category/ProductType");
const OrderStatus_1 = require("shared/models/enums/OrderStatus");
const react_multi_date_picker_1 = __importStar(require("react-multi-date-picker"));
require("./orderTableFilters.scss");
const OrderTableFilters = (props) => {
    const { categories, designers, statusSelect, typeSelect, categorySelect, designerSelect, setTo, setFrom, setStatusSelect, setTypeSelect, setDesignerSelect, setCategorySelect, onUpdateFilters } = props;
    const [values, setValues] = (0, react_1.useState)([
        new react_multi_date_picker_1.DateObject().subtract(4, "days"),
        new react_multi_date_picker_1.DateObject().add(4, "days")
    ]);
    const setDate = (chosenDates) => {
        const dates = chosenDates;
        if (dates.length == 1) {
            setFrom(dates[0].toDate());
            setTo(dates[0].toDate());
        }
        else {
            setFrom(dates[0].toDate());
            setTo(dates[1].toDate());
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.InputGroup, { className: "mb-3 align-items-end" },
            react_1.default.createElement("div", { className: "d-flex filtresAdminPage__products" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", null, "\u0417\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F"),
                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: statusSelect, onChange: (e) => setStatusSelect(+e.target.value) },
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.None, value: OrderStatus_1.OrderStatus.None }, "\u0411\u0435\u0437 \u0444\u0456\u043B\u044C\u0442\u0440\u0443"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Created, value: OrderStatus_1.OrderStatus.Created }, "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.VerifiedByTheBrand, value: OrderStatus_1.OrderStatus.VerifiedByTheBrand }, "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043E \u0431\u0440\u0435\u043D\u0434\u043E\u043C"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.AwaitingPayment, value: OrderStatus_1.OrderStatus.AwaitingPayment }, "\u041E\u0447\u0456\u043A\u0443\u0454 \u043E\u043F\u043B\u0430\u0442\u0438"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.ReadyToShip, value: OrderStatus_1.OrderStatus.ReadyToShip }, "\u0413\u043E\u0442\u043E\u0432\u0438\u0439 \u0434\u043E \u0432\u0456\u0434\u043F\u0440\u0430\u0432\u043A\u0438"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Sent, value: OrderStatus_1.OrderStatus.Sent }, "\u0412\u0456\u0434\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Received, value: OrderStatus_1.OrderStatus.Received }, "\u041E\u0442\u0440\u0438\u043C\u0430\u043D\u043E"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.AReturnIsExpected, value: OrderStatus_1.OrderStatus.AReturnIsExpected }, "\u041E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Return, value: OrderStatus_1.OrderStatus.Return }, "\u041F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Cancel, value: OrderStatus_1.OrderStatus.Cancel }, "\u0412\u0456\u0434\u043C\u0456\u043D\u0430"),
                        react_1.default.createElement("option", { key: OrderStatus_1.OrderStatus.Test, value: OrderStatus_1.OrderStatus.Test }, "\u0422\u0435\u0441\u0442"))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement("span", null, "\u0422\u0438\u043F"),
                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: typeSelect, onChange: (e) => setTypeSelect(+e.target.value), className: "filtresAdminPage__filtres" },
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
                        }))),
                react_1.default.createElement("div", { className: "pt-4 calendar" },
                    react_1.default.createElement(react_multi_date_picker_1.default, { range: true, value: values, onChange: dateObject => {
                            setDate(dateObject);
                        } })),
                react_1.default.createElement("div", { className: "pt-4" },
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "outline-secondary", onClick: () => onUpdateFilters() }, "Filter"))))));
};
exports.OrderTableFilters = OrderTableFilters;
