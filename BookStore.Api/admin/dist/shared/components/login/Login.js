"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
const react_1 = __importDefault(require("react"));
require("./login.scss");
const LoginComponent = (props) => {
    const { handleSubmit } = props;
    return (react_1.default.createElement("form", { className: "admin-login", onSubmit: handleSubmit },
        react_1.default.createElement("div", { className: "admin-login__block" },
            react_1.default.createElement("label", { className: "admin-login__label", htmlFor: "login" }, "Login"),
            react_1.default.createElement("input", { className: "admin-login__input", name: "login", id: "login", type: "text" })),
        react_1.default.createElement("div", { className: "admin-login__block" },
            react_1.default.createElement("label", { className: "admin-login__label", htmlFor: "password" }, "Password"),
            react_1.default.createElement("input", { className: "admin-login__input", name: "password", id: "password", type: "password" })),
        react_1.default.createElement("div", { className: "admin-login__submit" },
            react_1.default.createElement("input", { className: "admin-login__checkbox", name: "check", id: "check", type: "checkbox" }),
            react_1.default.createElement("label", { className: "admin-login__label", htmlFor: "check" }, "Check me out"),
            react_1.default.createElement("button", { className: "admin-login__button", type: 'submit' }, "Enter"))));
};
exports.LoginComponent = LoginComponent;
