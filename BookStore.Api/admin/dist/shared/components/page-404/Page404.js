"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const _404_svg_1 = __importDefault(require("assets/icons/404.svg"));
require("./page404.scss");
const Page404 = () => (react_1.default.createElement("div", { className: "page-404" },
    react_1.default.createElement("img", { className: "page-404__img", src: _404_svg_1.default, alt: "404" })));
exports.default = Page404;
