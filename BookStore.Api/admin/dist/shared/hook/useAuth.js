"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const react_1 = require("react");
const AuthProvider_1 = require("../services/AuthProvider");
function useAuth() {
    return (0, react_1.useContext)(AuthProvider_1.AuthContext);
}
exports.useAuth = useAuth;
