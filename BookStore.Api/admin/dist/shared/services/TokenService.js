"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.setUser = exports.getUser = exports.getLocalAccessToken = void 0;
const getLocalAccessToken = () => {
    const json = localStorage.getItem("user");
    if (json) {
        const user = JSON.parse(json);
        return user === null || user === void 0 ? void 0 : user.accessToken;
    }
};
exports.getLocalAccessToken = getLocalAccessToken;
const getUser = () => {
    const json = localStorage.getItem("user");
    if (json) {
        return JSON.parse(json);
    }
};
exports.getUser = getUser;
const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};
exports.setUser = setUser;
const removeUser = () => {
    localStorage.removeItem("user");
};
exports.removeUser = removeUser;
