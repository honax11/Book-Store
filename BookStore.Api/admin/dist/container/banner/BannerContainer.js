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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerContainer = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const BannerType_1 = require("shared/models/enums/BannerType");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const Service_1 = require("shared/services/Service");
const notification_1 = require("shared/toast/notification");
const UploadImageContainer_1 = require("../../shared/components/popups/product/UploadImageContainer");
require("./bannerContainer.scss");
require("./carousel.scss");
const BannerContainer = () => {
    const [banners, setBanners] = (0, react_1.useState)([]);
    const [images, setImages] = react_1.default.useState([]);
    const [load, setLoad] = react_1.default.useState(false);
    (0, react_1.useEffect)(() => {
        getAllBanners();
    }, []);
    const getAllBanners = () => {
        (0, HTTPUserService_1.get)(`Banner/GetAll`)
            .then((response) => {
            setBanners(response);
        });
    };
    const uploadImages = () => {
        setLoad(true);
        (0, HTTPUserService_1.uploadBanner)(`Banner/Create`, images[0])
            .then(() => {
            (0, notification_1.showSuccess)("Banner uploaded successfully.");
            setLoad(false);
            getAllBanners();
        });
    };
    const ondDeleteBanner = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Banner/Delete?id=${id}`)
            .then(() => {
            (0, notification_1.showWarn)('Banner was deleted!');
            getAllBanners();
        });
    };
    const ondUpdateBanner = (banner) => {
        (0, Service_1.post)(`Banner/Update`, banner)
            .then(() => {
            (0, notification_1.showSuccess)('Banner is activated!');
            getAllBanners();
        });
    };
    const ondUpdateProductUrl = (banner) => {
        (0, Service_1.post)(`Banner/Update`, banner)
            .then(() => {
            (0, notification_1.showSuccess)('Url added to Banner!');
            getAllBanners();
        });
    };
    const setUrl = (url, banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner.productUrl = url;
        mutateBanner(banner, tempBanner);
    };
    const setName = (name, banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner.name = name;
        mutateBanner(banner, tempBanner);
    };
    const setDescription = (description, banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner.description = description;
        mutateBanner(banner, tempBanner);
    };
    const setMoreFromId = (moreFromId, banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner.moreFromId = moreFromId;
        mutateBanner(banner, tempBanner);
    };
    const setType = (type, banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner.type = type;
        mutateBanner(banner, tempBanner);
    };
    const setOrder = (order, banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner.order = order;
        mutateBanner(banner, tempBanner);
    };
    const mutateBanner = (banner, tempBanner) => {
        let bannerIndex = 0;
        banners.filter((x, i) => {
            if (x.id == banner.id) {
                bannerIndex = i;
            }
        });
        const tempBanners = [...banners];
        tempBanners[bannerIndex] = tempBanner;
        setBanners(tempBanners);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { className: "adminPageTitle" }, "Banners"),
        react_1.default.createElement("div", null, banners.map(item => (react_1.default.createElement("div", { className: "container d-flex mb-2", key: item.id },
            react_1.default.createElement("div", { className: "main__left" },
                react_1.default.createElement("img", { className: "main__photoBannerInside", src: item.url, alt: "" })),
            react_1.default.createElement("div", { className: "main__right" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "form-control-back-ground", type: "url", placeholder: "Before activation put url here", value: item.productUrl, onChange: (e) => setUrl(e.target.value, item) })),
                react_1.default.createElement("div", { className: "pt-2" },
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "form-control-back-ground", type: "number", placeholder: "input Order", value: item === null || item === void 0 ? void 0 : item.order, onChange: (e) => setOrder(+e.target.value, item) })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "form-control-back-ground", type: "string", placeholder: "Name", value: item.name, onChange: (e) => setName(e.target.value, item) })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_bootstrap_1.Form.Select, { as: "select", value: item.type, onChange: (e) => setType(+e.target.value, item) },
                        react_1.default.createElement("option", { key: BannerType_1.BannerType.None, value: BannerType_1.BannerType.None }, "None"),
                        react_1.default.createElement("option", { key: BannerType_1.BannerType.Brand, value: BannerType_1.BannerType.Brand }, "Brand"),
                        react_1.default.createElement("option", { key: BannerType_1.BannerType.Category, value: BannerType_1.BannerType.Category }, "Category"),
                        react_1.default.createElement("option", { key: BannerType_1.BannerType.Sale, value: BannerType_1.BannerType.Sale }, "Sale"))),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "form-control-back-ground", type: "string", placeholder: "MoreFromId", value: item.moreFromId, onChange: (e) => setMoreFromId(e.target.value, item) })),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 3, className: "form-control-back-ground", type: "string", placeholder: "Description", value: item.description, onChange: (e) => setDescription(e.target.value, item) })),
                react_1.default.createElement("div", { className: "pt-2" },
                    react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-warning me-2", disabled: item.productUrl == ' ' || item.isActive, onClick: () => ondUpdateBanner(item) }, "Activate"),
                    react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger me-2", onClick: () => ondDeleteBanner(item.id) }, "Delete"),
                    react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-warning", onClick: () => ondUpdateProductUrl(item) }, "Update"))))))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(UploadImageContainer_1.UploadImageContainer, { load: load, upload: () => uploadImages(), images: images, setImages: setImages })))));
};
exports.BannerContainer = BannerContainer;
