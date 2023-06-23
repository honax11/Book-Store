"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showWarn = exports.showSuccess = exports.showError = exports.showInfo = void 0;
const react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
const showInfo = (message) => {
    react_toastify_1.toast.info(message, {
        position: "top-right",
        theme: "colored",
        icon: "🚀",
    });
};
exports.showInfo = showInfo;
const showError = (message) => {
    react_toastify_1.toast.error(message, {
        position: "top-right",
        theme: "colored",
    });
};
exports.showError = showError;
const showSuccess = (message) => {
    react_toastify_1.toast.success(message, {
        position: "top-right",
        theme: "colored",
    });
};
exports.showSuccess = showSuccess;
const showWarn = (message) => {
    react_toastify_1.toast.warn(message, {
        position: "top-right",
        theme: "colored",
    });
};
exports.showWarn = showWarn;
