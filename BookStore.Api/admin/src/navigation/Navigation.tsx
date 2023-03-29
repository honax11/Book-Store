import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    MAIN_URL,
    ARTICLE_URL,
    BANNER_URL,
    BLOG_URL,
    DASHBOARD_URL,
    DESIGNERS_URL,
    DESIGNER_URL,
    ORDERS_URL,
    ORDER_URL,
    PRODUCTS_URL,
    PRODUCT_URL,
    SIZE_CATEGORY,
    SIZE_URL,
    URL,
    CUSTOMERS_URL,
    CUSTOMER_URL,
    PREORDERED_PRODUCT_URL,
    LOCATIONS,
    AMIN_CLICKS,

} from "shared/modules/url/url.const";
import { Rout } from "navigation/Rout";
import Page404 from "shared/components/page-404/Page404";
import { ClicksContainer } from "container/clicks/ClicksContainer";
import { LocationsContainer } from "container/location/LocationsContainer";
import { CustomerContainer } from "container/customer/CustomerContainer";
import { WritersContainer } from "container/writers/WritersContainer";
import { PreorderdProductsContainer } from "container/pre-ordered-products/PreorderdProductsContainer";
import { DashboardContainer } from "container/dashboard/DashboardContainer";
import { DesignerContainer } from "container/designer/DesignerContainer";
import { BannerContainer } from "container/banner/BannerContainer";
import { ArticleContainer } from "container/articles/ArticleContainer";
import { OrderContainer } from "container/order/OrderContainer";
import { OrdersContainer } from "container/orders/OrdersContainer";
import { GenresContainer } from "container/category/GenresContainer";
import { DesignersContainer } from "container/designers/DesignersContainer";
import { ProductsContainer } from "container/product/ProductsContainer";
import { ProductContainer } from "container/product/ProductContainer";
import { ArticlesContainer } from "container/articles/ArticlesContainer";
import { SizesContainer } from "container/sizes/SizesContainer";
import { LoginContainer } from "container/login/LoginContainer";

export const AppNavigation = () => (
    <Routes>

        <Route path={MAIN_URL} key={URL} element={<LoginContainer />} />,


        <Route path={URL} element={<Rout />}>
            [
            <Route index key={DASHBOARD_URL} element={<DashboardContainer />} />,
            <Route path={SIZE_CATEGORY} key={SIZE_CATEGORY} element={<GenresContainer />} />,
            <Route path={SIZE_URL} key={SIZE_URL} element={<SizesContainer />} />,
            <Route path={DESIGNERS_URL} key={DESIGNERS_URL} element={<DesignersContainer />} />,
            <Route path={PRODUCTS_URL} key={PRODUCTS_URL} element={<ProductsContainer />} />,
            <Route path={PRODUCT_URL} key={PRODUCT_URL} element={<ProductContainer />} />,
            <Route path={BANNER_URL} key={BANNER_URL} element={<BannerContainer />} />,
            <Route path={ORDERS_URL} key={ORDERS_URL} element={<OrdersContainer />} />,
            <Route path={ORDER_URL} key={ORDER_URL} element={<OrderContainer />} />,
            <Route path={DESIGNER_URL} key={DESIGNER_URL} element={<DesignerContainer />} />,
            <Route path={BLOG_URL} key={BLOG_URL} element={<ArticlesContainer />} />,
            <Route path={ARTICLE_URL} key={ARTICLE_URL} element={<ArticleContainer />} />,
            <Route path={CUSTOMERS_URL} key={CUSTOMERS_URL} element={<WritersContainer />} />,
            <Route path={CUSTOMER_URL} key={CUSTOMER_URL} element={<CustomerContainer />} />,
            <Route path={PREORDERED_PRODUCT_URL} key={PREORDERED_PRODUCT_URL} element={<PreorderdProductsContainer />} />
            <Route path={LOCATIONS} key={LOCATIONS} element={<LocationsContainer />} />
            <Route path={AMIN_CLICKS} key={AMIN_CLICKS} element={<ClicksContainer />} />
            ]
        </Route>
        <Route path="*" element={<Page404 />} />
    </Routes>
)
