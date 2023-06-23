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
exports.DesignerContainer = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
const ConfirmationPopup_1 = require("shared/components/popups/confirmation-popup/ConfirmationPopup");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const Service_1 = require("shared/services/Service");
const notification_1 = require("shared/toast/notification");
const UploadImageContainer_1 = require("../../shared/components/popups/product/UploadImageContainer");
const DesignerSizeTable_1 = require("../../shared/components/tables/DesignerSizeTable");
const DesignerContainer = () => {
    var _a;
    const [designer, setDesigner] = (0, react_1.useState)();
    const [designerSizes, setDesignerSizes] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [load, setLoad] = react_1.default.useState(false);
    const [images, setImages] = react_1.default.useState([]);
    const [confirmation, setConfirmatin] = (0, react_1.useState)(false);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        getDesigner();
        getDesignerSizes();
        getAllCategories();
    }, []);
    const getDesigner = () => {
        (0, HTTPUserService_1.get)(`Designer/GetById?id=${id}`)
            .then((item) => {
            setDesigner(item);
        });
    };
    const getAllCategories = () => {
        (0, HTTPUserService_1.get)(`Category/GetAll`)
            .then((response) => {
            setCategories(response);
        });
    };
    const getDesignerSizes = () => {
        (0, HTTPUserService_1.get)(`DesignerSize/GetAllByDesigner?id=${id}`)
            .then((response) => {
            setDesignerSizes(response);
        });
    };
    const uploadImages = () => {
        let pictureToCreate = {
            formFile: images[0],
            productId: designer.id,
        };
        setLoad(true);
        (0, HTTPUserService_1.upload)(`Designer/UploadImage`, pictureToCreate)
            .then(() => {
            (0, notification_1.showSuccess)("Image was uploaded");
            setLoad(false);
            getDesigner();
        });
    };
    const onDeleteDesignerBaner = () => {
        setConfirmatin(true);
    };
    const deleteDesignerBanner = (id) => {
        (0, Service_1.onDelete)(`Designer/DeleteBaner?id=${id}`)
            .then(() => {
            setConfirmatin(false);
            getDesigner();
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                react_1.default.createElement("b", null, "Name: "), designer === null || designer === void 0 ? void 0 :
                designer.firstName,
                " ", designer === null || designer === void 0 ? void 0 :
                designer.lastName)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                react_1.default.createElement("b", null, "Description: "), designer === null || designer === void 0 ? void 0 :
                designer.description)),
        react_1.default.createElement("div", null, (designer === null || designer === void 0 ? void 0 : designer.pictures) &&
            react_1.default.createElement("div", null,
                react_1.default.createElement("img", { style: { maxWidth: '200px' }, src: (_a = designer === null || designer === void 0 ? void 0 : designer.pictures[0]) === null || _a === void 0 ? void 0 : _a.url }),
                react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger", onClick: () => onDeleteDesignerBaner() }, "Delete Banner"))),
        react_1.default.createElement("div", null,
            react_1.default.createElement(UploadImageContainer_1.UploadImageContainer, { load: load, upload: () => uploadImages(), images: images, setImages: setImages })),
        designer &&
            react_1.default.createElement(DesignerSizeTable_1.DesignerSizeTable, { data: designerSizes, designerId: id, refresh: getDesignerSizes, categories: categories }),
        react_1.default.createElement(ConfirmationPopup_1.ConfirmationPopup, { modalIsOpen: confirmation, product: (designer === null || designer === void 0 ? void 0 : designer.firstName) + " " + (designer === null || designer === void 0 ? void 0 : designer.lastName), closeModal: () => setConfirmatin(false), onDelete: () => { var _a; return deleteDesignerBanner((_a = designer === null || designer === void 0 ? void 0 : designer.pictures[0]) === null || _a === void 0 ? void 0 : _a.id); } })));
};
exports.DesignerContainer = DesignerContainer;
