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
exports.ArticleBlock = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const Service_1 = require("shared/services/Service");
const notification_1 = require("shared/toast/notification");
const UploadImageContainer_1 = require("../../shared/components/popups/product/UploadImageContainer");
require("./articleBlock.scss");
const ArticleBlock = (props) => {
    var _a;
    const { order, articleId, magazine, name, setMagazine, description, refresh, onDelete } = props;
    const [images, setImages] = react_1.default.useState([]);
    const [load, setLoad] = react_1.default.useState(false);
    const [imageAlt, setImageAlt] = (0, react_1.useState)();
    const [imageLink, setImageLink] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        let picture = magazine === null || magazine === void 0 ? void 0 : magazine.magazinePictures.find(x => x.order == order - 1);
        if (picture) {
            setImageAlt(picture.imageAlt);
            setImageLink(picture.link);
        }
    }, []);
    const setDescription = (description) => {
        if (order == 2) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subDescription2: description }));
        }
        if (order == 3) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subDescription3: description }));
        }
        if (order == 4) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subDescription4: description }));
        }
        if (order == 5) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subDescription5: description }));
        }
        if (order == 6) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subDescription6: description }));
        }
    };
    const setName = (name) => {
        if (order == 2) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subName2: name }));
        }
        if (order == 3) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subName3: name }));
        }
        if (order == 4) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subName4: name }));
        }
        if (order == 5) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subName5: name }));
        }
        if (order == 6) {
            setMagazine(Object.assign(Object.assign({}, magazine), { subName6: name }));
        }
    };
    const uploadImages = () => {
        let pictureToCreate = {
            formFile: images[0],
            productId: articleId,
            order: order - 1
        };
        setLoad(true);
        (0, HTTPUserService_1.upload)(`Magazine/UploadImage`, pictureToCreate)
            .then(() => {
            (0, notification_1.showSuccess)("Image was uploaded");
            setLoad(false);
            refresh();
        });
    };
    const updatePicture = (event) => {
        var _a;
        event.preventDefault();
        let pictureToUpdate = {
            id: (_a = magazine === null || magazine === void 0 ? void 0 : magazine.magazinePictures.find(x => x.order == order - 1)) === null || _a === void 0 ? void 0 : _a.id,
            imageAlt: imageAlt,
            link: imageLink
        };
        (0, Service_1.post)('Magazine/UpdatePicture', pictureToUpdate)
            .then(() => {
            refresh();
        });
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", { className: "center-header" },
                "Header \u2116: ",
                order),
            react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput4" },
                react_1.default.createElement(react_bootstrap_1.Form.Label, null,
                    "Sub Name-",
                    order),
                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "name", placeholder: `Name-${order}`, autoFocus: true, value: name, onChange: (e) => setName(e.target.value) })),
            react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput5" },
                react_1.default.createElement(react_bootstrap_1.Form.Label, null,
                    "Sub Description ",
                    order),
                react_1.default.createElement(react_bootstrap_1.Form.Control, { as: "textarea", rows: 7, type: "description", placeholder: `Description-${order}`, autoFocus: true, value: description, onChange: (e) => setDescription(e.target.value) }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", null,
                react_1.default.createElement("h4", { className: "center-header" },
                    "Photo for Header \u2116: ",
                    order)),
            react_1.default.createElement("div", { className: "center-item" }, (magazine === null || magazine === void 0 ? void 0 : magazine.magazinePictures.find(x => x.order == order - 1)) && react_1.default.createElement("img", { src: (_a = magazine === null || magazine === void 0 ? void 0 : magazine.magazinePictures.find(x => x.order == order - 1)) === null || _a === void 0 ? void 0 : _a.imageUrl, className: "blog-picture" })),
            react_1.default.createElement("div", { className: "center-item" },
                (magazine === null || magazine === void 0 ? void 0 : magazine.magazinePictures.find(x => x.order == order - 1)) && react_1.default.createElement("button", { onClick: () => { var _a; return onDelete((_a = magazine === null || magazine === void 0 ? void 0 : magazine.magazinePictures.find(x => x.order == order - 1)) === null || _a === void 0 ? void 0 : _a.id); }, className: "btn btn-danger mt-2 ms-2" }, "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438"),
                react_1.default.createElement(UploadImageContainer_1.UploadImageContainer, { load: load, upload: () => uploadImages(), images: images, setImages: setImages })),
            react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mt-3 mb-3 d-flex", controlId: "exampleForm.ControlInput1" },
                react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "pe-2" }, "Image Alt:"),
                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Image Alt", autoFocus: true, value: imageAlt, onChange: (e) => setImageAlt(e.target.value) })),
            react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3 d-flex", controlId: "exampleForm.ControlInput1" },
                react_1.default.createElement(react_bootstrap_1.Form.Label, { className: "pt-2 pe-2" }, "Link:"),
                react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "string", placeholder: "Link", autoFocus: true, value: imageLink, onChange: (e) => setImageLink(e.target.value) })),
            (magazine === null || magazine === void 0 ? void 0 : magazine.magazinePictures.find(x => x.order == order - 1)) && react_1.default.createElement("button", { onClick: updatePicture, className: "btn btn-success mt-2 ms-2" }, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438"))));
};
exports.ArticleBlock = ArticleBlock;
