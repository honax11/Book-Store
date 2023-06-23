"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDelete = exports.get = exports.getWithoutBody = exports.put = exports.post = void 0;
const axios = require("axios").default;
const post = async (url, data) => {
    const json = JSON.stringify(data);
    // const token = getLocalAccessToken();
    return await axios.post(process.env.REACT_APP_API_URL + url, json, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};
exports.post = post;
const put = async (url, data) => {
    const json = JSON.stringify(data);
    // const token = getLocalAccessToken();
    return await axios.put(process.env.REACT_APP_API_URL + url, json, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};
exports.put = put;
const getWithoutBody = async (url) => {
    // const token = getLocalAccessToken();
    return await axios.get(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};
exports.getWithoutBody = getWithoutBody;
const get = async (url) => {
    // const token = getLocalAccessToken();
    return await axios.get(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};
exports.get = get;
const onDelete = async (url) => {
    // const token = getLocalAccessToken();
    return await axios.delete(process.env.REACT_APP_API_URL + url, {
        headers: {
            "Content-Type": `application/json`,
            // "Authorization": `Bearer ${token}`
        }
    });
};
exports.onDelete = onDelete;
