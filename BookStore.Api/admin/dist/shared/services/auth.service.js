"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const TokenService_1 = require("./TokenService");
const axios = require("axios").default;
const login = async (username, password) => {
    let loginDto = {
        email: username,
        password: password,
        rememberMe: true,
    };
    return await axios
        .post(process.env.REACT_APP_API_URL + `Account/Login`, loginDto)
        .then((res) => {
        if (res.data.accessToken) {
            (0, TokenService_1.setUser)(res.data);
        }
        return res.data;
    });
};
exports.login = login;
