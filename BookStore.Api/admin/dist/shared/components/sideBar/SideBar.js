"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBar = void 0;
const react_1 = __importStar(require("react"));
const react_pro_sidebar_1 = require("react-pro-sidebar");
const fa_1 = require("react-icons/fa");
const md_1 = require("react-icons/md");
const gi_1 = require("react-icons/gi");
const si_1 = require("react-icons/si");
const bg1_png_1 = __importDefault(require("./bg1.png"));
require("./sideBar.scss");
const react_router_dom_1 = require("react-router-dom");
const SideBar = () => {
    const [width, setWidth] = (0, react_1.useState)(270);
    const changeWidthSidibar = () => {
        if (width == 80) {
            setWidth(270);
        }
        else {
            setWidth(80);
        }
    };
    return (react_1.default.createElement(react_pro_sidebar_1.ProSidebar, { image: bg1_png_1.default, collapsed: false, toggled: false, width: width },
        react_1.default.createElement(react_pro_sidebar_1.SidebarHeader, null,
            react_1.default.createElement("div", { style: {
                    padding: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                } }, "SidebarTitle")),
        react_1.default.createElement(react_pro_sidebar_1.SidebarContent, null,
            react_1.default.createElement(react_pro_sidebar_1.Menu, { iconShape: "circle" },
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(fa_1.FaTachometerAlt, null) },
                    "Dashboard",
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/admin" })),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(fa_1.FaGem, null) },
                    "Banners",
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/banner" })),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(gi_1.GiClothes, null) },
                    "Products",
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/products" })),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(fa_1.FaRegLaughWink, null) },
                    "\u0416\u0410\u041D\u0420",
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/genre" })),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(si_1.SiHandshake, null) },
                    "\u041F\u0418\u0421\u042C\u041C\u0415\u041D\u041D\u0418\u041A",
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/author" })),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(md_1.MdProductionQuantityLimits, null) },
                    "Orders",
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/orders" })),
                react_1.default.createElement(react_pro_sidebar_1.MenuItem, { icon: react_1.default.createElement(fa_1.FaExchangeAlt, null), onClick: () => changeWidthSidibar() }, "Change Size"))),
        react_1.default.createElement(react_pro_sidebar_1.SidebarFooter, { style: { textAlign: 'center' } },
            react_1.default.createElement("div", { className: "sidebar-btn-wrapper", style: {
                    padding: '20px 24px',
                } }))));
};
exports.SideBar = SideBar;
