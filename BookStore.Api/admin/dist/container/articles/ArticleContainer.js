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
exports.ArticleContainer = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const Service_1 = require("shared/services/Service");
const notification_1 = require("shared/toast/notification");
const UploadImageContainer_1 = require("../../shared/components/popups/product/UploadImageContainer");
const ArticleBlock_1 = require("./ArticleBlock");
const ArticleContainer = () => {
    var _a;
    const [article, setArticle] = (0, react_1.useState)();
    const [images, setImages] = react_1.default.useState([]);
    const [load, setLoad] = react_1.default.useState(false);
    const [imageAlt, setImageAlt] = (0, react_1.useState)();
    const [imageLink, setImageLink] = (0, react_1.useState)();
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        getMagazine();
    }, []);
    const getMagazine = () => {
        (0, HTTPUserService_1.get)(`Magazine/Get?id=${id}`)
            .then((response) => {
            setArticle(response);
            let picture = response === null || response === void 0 ? void 0 : response.magazinePictures.find(x => x.order == 0);
            if (picture) {
                setImageAlt(picture.imageAlt);
                setImageLink(picture.link);
            }
        });
    };
    const uploadImages = () => {
        let pictureToCreate = {
            formFile: images[0],
            productId: id,
            order: 0
        };
        setLoad(true);
        (0, HTTPUserService_1.upload)(`Magazine/UploadImage`, pictureToCreate)
            .then(() => {
            (0, notification_1.showSuccess)("Image was uploaded");
            setLoad(false);
        });
    };
    const onUpdate = (event) => {
        event.preventDefault();
        (0, Service_1.post)(`Magazine/Update`, article)
            .then(() => {
            getMagazine();
        });
    };
    const onDelete = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`Magazine/DeletePicture?id=${id}`)
            .then(() => {
            getMagazine();
        });
    };
    const updatePicture = (event) => {
        var _a;
        event.preventDefault();
        let pictureToUpdate = {
            id: (_a = article === null || article === void 0 ? void 0 : article.magazinePictures.find(x => x.order == 0)) === null || _a === void 0 ? void 0 : _a.id,
            imageAlt: imageAlt,
            link: imageLink
        };
        (0, Service_1.post)('Magazine/UpdatePicture', pictureToUpdate)
            .then(() => {
            getMagazine();
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("h1", null,
                    "Name: ", article === null || article === void 0 ? void 0 :
                    article.name),
                react_1.default.createElement("button", { className: "btn btn-success", type: "submit", onClick: onUpdate }, "Save Changes"),
                react_1.default.createElement("p", null, article === null || article === void 0 ? void 0 : article.mainDescription)),
            react_1.default.createElement("div", null,
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h3", { className: "center-item" }, "Main Photo")),
                react_1.default.createElement("div", { className: "center-item" }, (article === null || article === void 0 ? void 0 : article.magazinePictures.find(x => x.order == 0)) && react_1.default.createElement("img", { src: (_a = article === null || article === void 0 ? void 0 : article.magazinePictures.find(x => x.order == 0)) === null || _a === void 0 ? void 0 : _a.imageUrl, className: `blog-picture` })),
                react_1.default.createElement("div", { className: "center-item" },
                    (article === null || article === void 0 ? void 0 : article.magazinePictures.find(x => x.order == 0)) && react_1.default.createElement("button", { onClick: () => { var _a; return onDelete((_a = article === null || article === void 0 ? void 0 : article.magazinePictures.find(x => x.order == 0)) === null || _a === void 0 ? void 0 : _a.id); }, className: "btn btn-danger mt-2 ms-2" }, "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438"),
                    react_1.default.createElement(UploadImageContainer_1.UploadImageContainer, { load: load, upload: () => uploadImages(), images: images, setImages: setImages })),
                react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mt-3 mb-3 d-flex", controlId: "exampleForm.ControlInput1" },
                    react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "pe-2" }, "Image Alt:"),
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Image Alt", autoFocus: true, value: imageAlt, onChange: (e) => setImageAlt(e.target.value) })),
                react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3 d-flex", controlId: "exampleForm.ControlInput1" },
                    react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "pt-2 pe-2" }, "Link:"),
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Link", autoFocus: true, value: imageLink, onChange: (e) => setImageLink(e.target.value) })),
                (article === null || article === void 0 ? void 0 : article.magazinePictures.find(x => x.order == 0)) && react_1.default.createElement("button", { onClick: updatePicture, className: "btn btn-success mt-2 ms-2" }, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438"))),
        id && article &&
            react_1.default.createElement(ArticleBlock_1.ArticleBlock, { key: 2, name: article.subName2, description: article.subDescription2, magazine: article, articleId: id, order: 2, refresh: getMagazine, setMagazine: setArticle, onDelete: onDelete }),
        id && article &&
            react_1.default.createElement(ArticleBlock_1.ArticleBlock, { key: 3, name: article.subName3, description: article.subDescription3, magazine: article, articleId: id, order: 3, refresh: getMagazine, setMagazine: setArticle, onDelete: onDelete }),
        id && article &&
            react_1.default.createElement(ArticleBlock_1.ArticleBlock, { key: 4, name: article.subName4, description: article.subDescription4, magazine: article, articleId: id, order: 4, refresh: getMagazine, setMagazine: setArticle, onDelete: onDelete }),
        id && article &&
            react_1.default.createElement(ArticleBlock_1.ArticleBlock, { key: 5, name: article.subName5, description: article.subDescription5, magazine: article, articleId: id, order: 5, refresh: getMagazine, setMagazine: setArticle, onDelete: onDelete }),
        id && article &&
            react_1.default.createElement(ArticleBlock_1.ArticleBlock, { key: 6, name: article.subName6, description: article.subDescription6, magazine: article, articleId: id, order: 6, refresh: getMagazine, setMagazine: setArticle, onDelete: onDelete })));
};
exports.ArticleContainer = ArticleContainer;
