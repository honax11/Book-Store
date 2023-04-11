import React, { lazy } from "react";
import { Route } from "react-router-dom";
import {
    ACCESSORIES_URL,
    SHOES_URL,
    CLOTHES_URL,
    MAIN_URL,
    ABOUT_US_URL,
    CONTACTS_URL,
    DELIVERY_URL,
    RETURN_URL,
    COOPERATION_URL,
    PAYMENT_URL,
    PUBLIC_OFFER_URL,
    PRODUCT_URL,
    CHECK_OUT_URL,
    BRANDS_URL,
    BRAND_URL,
    SALE_URL,
    SUCCESSFUL_PAYMENT_URL,
    FAILED_PAYMENT_URL,
    CLOTHES_CATEGORY_URL,
    SHOES_CATEGORY_URL,
    ACCESSORIES_CATEGORY_URL,
    MAGAZINE_URL,
    ARTICLE_URL,

} from "../shared/modules/url/publicUrl.const";

import { MainPageContainer } from "container/mainPageContainer/MainPageContainer";
// import ClothesContainer from "container/clothesContainer/ClothesContainer";
// import ArticleContainer from "container/articleContainer/ArticleContainer";
// import MagazineContainer from "container/magazineContainer/MagazineContainer";
// import CheckOutContainer from "container/checkOutContainer/CheckOutContainer";
// import BrandsContainer from "container/brandsContainer/BrandsContainer";
// import BrandContainer from "container/brandContainer/BrandContainer";


import { ProductType } from "shared/models/category/ProductType";
import { ACCESSORIS_DESC, CLOTHES_DESC, SALE_DESC, SHOSE_DESC } from "shared/modules/ceo/CEODesctiptionConst";
import { ACCESSORIS_TITLE, CLOTHES_TITLE, SALE_TITLE, SHOSE_TITLE } from "shared/modules/ceo/CEOTitleConst";

const BrandsContainer = lazy(() => import('../container/writersContainer/WritersContainer'));
const CheckOutContainer = lazy(() => import('../container/checkOutContainer/CheckOutContainer'));
const MagazineContainer = lazy(() => import('../container/magazineContainer/MagazineContainer'));
const ArticleContainer = lazy(() => import('../container/articleContainer/ArticleContainer'));
const ClothesContainer = lazy(() => import('../container/booksContainer/BooksContainer'));
const BrandContainer = lazy(() => import('../container/brandContainer/BrandContainer'));

const SuccessfulPaymentContainer = lazy(() => import('../container/successfulPaymentContainer/SuccessfulPaymentContainer'));
const PaymentContainer = lazy(() => import('../container/paymentContainer/PaymentContainer'));
const PublicOfferContainer = lazy(() => import('../container/publicOfferContainer/PublicOfferContainer'));
const AboutUsContainer = lazy(() => import('../container/aboutUsContainer/AboutUsContainer'));
const DeliveryContainer = lazy(() => import('../container/deliveryContainer/DeliveryContainer'));
const ReturnContainer = lazy(() => import('../container/returnContainer/ReturnContainer'));
const ContactsContainer = lazy(() => import('../container/contactsContainer/ContactsContainer'));
const CooperationContainer = lazy(() => import('../container/cooperationContainer/CooperationContainer'));
const FailedPaymentContainer = lazy(() => import('../container/failedPaymentContainer/FailedPaymentContainer'));
const ProductContainer = lazy(() => import('../container/productContainer/ProductContainer'));

export const PublicNavigation = [
    <Route index key={MAIN_URL} element={<MainPageContainer />} />,
    <Route path={CLOTHES_URL} key={CLOTHES_URL} element={
        <ClothesContainer
            pageDescription={CLOTHES_DESC}
            pageTitle={CLOTHES_TITLE}
            pageType={ProductType.Clothes}
        />} />,
    <Route path={CLOTHES_CATEGORY_URL} key={CLOTHES_CATEGORY_URL} element={
        <ClothesContainer
            pageDescription={CLOTHES_DESC}
            pageTitle={CLOTHES_TITLE}
            pageType={ProductType.Clothes}
        />} />,

    <Route path={SHOES_URL} key={SHOES_URL} element={<ClothesContainer
        pageDescription={SHOSE_DESC}
        pageTitle={SHOSE_TITLE}
        pageType={ProductType.Shose}
    />} />,
    <Route path={SHOES_CATEGORY_URL} key={SHOES_CATEGORY_URL} element={<ClothesContainer
        pageDescription={SHOSE_DESC}
        pageTitle={SHOSE_TITLE}
        pageType={ProductType.Shose}
    />} />,

    <Route path={ACCESSORIES_URL} key={ACCESSORIES_URL} element={
        <ClothesContainer
            pageDescription={ACCESSORIS_DESC}
            pageTitle={ACCESSORIS_TITLE}
            pageType={ProductType.Accessories}
        />} />,
    <Route path={ACCESSORIES_CATEGORY_URL} key={ACCESSORIES_CATEGORY_URL} element={
        <ClothesContainer
            pageDescription={ACCESSORIS_DESC}
            pageTitle={ACCESSORIS_TITLE}
            pageType={ProductType.Accessories}
        />} />,
    <Route path={SALE_URL} key={SALE_URL} element={
        <ClothesContainer
            pageDescription={SALE_DESC}
            pageTitle={SALE_TITLE}
            pageType={ProductType.Sale}
        />} />,
    <Route path={PRODUCT_URL} key={PRODUCT_URL} element={<ProductContainer />} />,
    <Route path={ABOUT_US_URL} key={ABOUT_US_URL} element={<AboutUsContainer />} />,
    <Route path={CONTACTS_URL} key={CONTACTS_URL} element={<ContactsContainer />} />,
    <Route path={DELIVERY_URL} key={DELIVERY_URL} element={<DeliveryContainer />} />,
    <Route path={RETURN_URL} key={RETURN_URL} element={<ReturnContainer />} />,
    <Route path={COOPERATION_URL} key={COOPERATION_URL} element={<CooperationContainer />} />,
    <Route path={PAYMENT_URL} key={PAYMENT_URL} element={<PaymentContainer />} />,
    <Route path={CHECK_OUT_URL} key={CHECK_OUT_URL} element={<CheckOutContainer />} />,
    <Route path={PUBLIC_OFFER_URL} key={PUBLIC_OFFER_URL} element={<PublicOfferContainer />} />,
    <Route path={BRANDS_URL} key={BRANDS_URL} element={<BrandsContainer />} />,
    <Route path={BRAND_URL} key={BRAND_URL} element={<BrandContainer />} />,
    <Route path={SUCCESSFUL_PAYMENT_URL} key={SUCCESSFUL_PAYMENT_URL} element={<SuccessfulPaymentContainer />} />,
    <Route path={FAILED_PAYMENT_URL} key={FAILED_PAYMENT_URL} element={<FailedPaymentContainer />} />,
    <Route path={MAGAZINE_URL} key={MAGAZINE_URL} element={<MagazineContainer />} />,
    <Route path={ARTICLE_URL} key={ARTICLE_URL} element={<ArticleContainer />} />,
]