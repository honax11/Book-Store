"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContext = void 0;
const react_1 = __importDefault(require("react"));
exports.AuthContext = react_1.default.createContext(null);
const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = react_1.default.useState({ login: '', password: '' });
    const signin = (newAdmin, cb) => {
        setAdmin(newAdmin);
        cb();
    };
    const signout = (cb) => {
        setAdmin({ login: '', password: '' });
        cb();
    };
    const value = { admin, signin, signout };
    return react_1.default.createElement(exports.AuthContext.Provider, { value: value }, children);
};
exports.default = AuthProvider;
