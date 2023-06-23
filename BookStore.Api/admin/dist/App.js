"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = __importDefault(require("react"));
const AuthProvider_1 = __importDefault(require("shared/services/AuthProvider"));
require("./styles/app.scss");
require("react-loader-spinner/dist/loader/css/react-spinner-loader.css");
const Navigation_1 = require("navigation/Navigation");
const scrollToTop_1 = __importDefault(require("layouts/scrollToTop"));
const PageLayout_1 = __importDefault(require("shared/components/page-layout/PageLayout"));
const App = () => (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(scrollToTop_1.default, null),
    react_1.default.createElement(AuthProvider_1.default, null,
        react_1.default.createElement(PageLayout_1.default, null,
            react_1.default.createElement(Navigation_1.AppNavigation, null)))));
exports.default = App;
