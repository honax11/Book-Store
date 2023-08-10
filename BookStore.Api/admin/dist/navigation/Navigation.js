"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppNavigation = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const url_const_1 = require("shared/modules/url/url.const");
const Rout_1 = require("navigation/Rout");
const Page404_1 = __importDefault(require("shared/components/page-404/Page404"));
const ClicksContainer_1 = require("container/clicks/ClicksContainer");
const LocationsContainer_1 = require("container/location/LocationsContainer");
const CustomerContainer_1 = require("container/customer/CustomerContainer");
const WritersContainer_1 = require("container/writers/WritersContainer");
const PreorderdProductsContainer_1 = require("container/pre-ordered-products/PreorderdProductsContainer");
const DashboardContainer_1 = require("container/dashboard/DashboardContainer");
const DesignerContainer_1 = require("container/designer/DesignerContainer");
const BannerContainer_1 = require("container/banner/BannerContainer");
const ArticleContainer_1 = require("container/articles/ArticleContainer");
const OrderContainer_1 = require("container/order/OrderContainer");
const OrdersContainer_1 = require("container/orders/OrdersContainer");
const GenresContainer_1 = require("container/category/GenresContainer");
const AuthorsContainer_1 = require("container/authors/AuthorsContainer");
const ProductsContainer_1 = require("container/product/ProductsContainer");
const ProductContainer_1 = require("container/product/ProductContainer");
const ArticlesContainer_1 = require("container/articles/ArticlesContainer");
const SizesContainer_1 = require("container/sizes/SizesContainer");
const LoginContainer_1 = require("container/login/LoginContainer");
const AppNavigation = () => (react_1.default.createElement(react_router_dom_1.Routes, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.MAIN_URL, key: url_const_1.URL, element: react_1.default.createElement(LoginContainer_1.LoginContainer, null) }),
    ",",
    react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.URL, element: react_1.default.createElement(Rout_1.Rout, null) },
        "[",
        react_1.default.createElement(react_router_dom_1.Route, { index: true, key: url_const_1.DASHBOARD_URL, element: react_1.default.createElement(DashboardContainer_1.DashboardContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.SIZE_GENRE, key: url_const_1.SIZE_GENRE, element: react_1.default.createElement(GenresContainer_1.GenresContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.SIZE_URL, key: url_const_1.SIZE_URL, element: react_1.default.createElement(SizesContainer_1.SizesContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.AUTHORS_URL, key: url_const_1.AUTHORS_URL, element: react_1.default.createElement(AuthorsContainer_1.AuthorsContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.PRODUCTS_URL, key: url_const_1.PRODUCTS_URL, element: react_1.default.createElement(ProductsContainer_1.ProductsContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.PRODUCT_URL, key: url_const_1.PRODUCT_URL, element: react_1.default.createElement(ProductContainer_1.ProductContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.BANNER_URL, key: url_const_1.BANNER_URL, element: react_1.default.createElement(BannerContainer_1.BannerContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.ORDERS_URL, key: url_const_1.ORDERS_URL, element: react_1.default.createElement(OrdersContainer_1.OrdersContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.ORDER_URL, key: url_const_1.ORDER_URL, element: react_1.default.createElement(OrderContainer_1.OrderContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.DESIGNER_URL, key: url_const_1.DESIGNER_URL, element: react_1.default.createElement(DesignerContainer_1.DesignerContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.BLOG_URL, key: url_const_1.BLOG_URL, element: react_1.default.createElement(ArticlesContainer_1.ArticlesContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.ARTICLE_URL, key: url_const_1.ARTICLE_URL, element: react_1.default.createElement(ArticleContainer_1.ArticleContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.CUSTOMERS_URL, key: url_const_1.CUSTOMERS_URL, element: react_1.default.createElement(WritersContainer_1.WritersContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.CUSTOMER_URL, key: url_const_1.CUSTOMER_URL, element: react_1.default.createElement(CustomerContainer_1.CustomerContainer, null) }),
        ",",
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.PREORDERED_PRODUCT_URL, key: url_const_1.PREORDERED_PRODUCT_URL, element: react_1.default.createElement(PreorderdProductsContainer_1.PreorderdProductsContainer, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.LOCATIONS, key: url_const_1.LOCATIONS, element: react_1.default.createElement(LocationsContainer_1.LocationsContainer, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: url_const_1.AMIN_CLICKS, key: url_const_1.AMIN_CLICKS, element: react_1.default.createElement(ClicksContainer_1.ClicksContainer, null) }),
        "]"),
    react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement(Page404_1.default, null) })));
exports.AppNavigation = AppNavigation;
