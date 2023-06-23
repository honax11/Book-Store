"use strict";
//TODO: Rewrite with axios instance
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRequest = exports.get = exports.uploadBanner = exports.upload = void 0;
const notification_1 = require("shared/toast/notification");
const axios = require("axios").default;
const upload = async (url, file) => {
    // const token = getLocalAccessToken();
    let formData = new FormData();
    formData.append("formFile", file.formFile.file);
    formData.append("fileName", file.formFile.file.name);
    formData.append("productId", file.productId);
    if ((file === null || file === void 0 ? void 0 : file.order) != undefined) {
        formData.append("order", file.order);
    }
    return await axios.post(process.env.REACT_APP_API_URL + url, formData, {
        headers: {
            "Content-Type": `multipart/form-data;`,
            // Authorization: `Bearer ${token}`,
        },
    });
};
exports.upload = upload;
const uploadBanner = async (url, file) => {
    // const token = getLocalAccessToken();
    let formData = new FormData();
    formData.append("file", file.file);
    return await axios.post(process.env.REACT_APP_API_URL + url, formData, {
        headers: {
            "Content-Type": `multipart/form-data;`,
            // Authorization: `Bearer ${token}`,
        },
    });
};
exports.uploadBanner = uploadBanner;
const get = async (url) => {
    const result = await fetch(process.env.REACT_APP_API_URL + url);
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
};
exports.get = get;
const deleteRequest = async (url) => {
    // const token = getLocalAccessToken();
    await axios
        .delete(process.env.REACT_APP_API_URL + url, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    })
        .then(() => {
        (0, notification_1.showWarn)("Item was deleted.");
    })
        .catch(() => {
        (0, notification_1.showError)("Something went wrong!");
    });
};
exports.deleteRequest = deleteRequest;
