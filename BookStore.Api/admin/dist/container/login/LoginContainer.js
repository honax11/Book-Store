"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginContainer = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Login_1 = require("shared/components/login/Login");
const useAuth_1 = require("shared/hook/useAuth");
const auth_service_1 = require("shared/services/auth.service");
const LoginContainer = () => {
    var _a, _b;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const { signin } = (0, useAuth_1.useAuth)();
    const fromPage = ((_b = (_a = location.state) === null || _a === void 0 ? void 0 : _a.from) === null || _b === void 0 ? void 0 : _b.pathname) || '/admin';
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const admin = {
            login: form.login.value,
            password: form.password.value
        };
        let tokens = await (0, auth_service_1.login)(form.login.value, form.password.value);
        if (tokens.accessToken != null && tokens.refreshToken != null) {
            signin(admin, () => navigate(fromPage, { replace: true }));
        }
    }
    return (react_1.default.createElement(Login_1.LoginComponent, { handleSubmit: handleSubmit }));
};
exports.LoginContainer = LoginContainer;
