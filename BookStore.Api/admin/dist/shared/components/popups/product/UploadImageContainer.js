"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImageContainer = void 0;
const react_1 = __importDefault(require("react"));
const react_images_uploading_1 = __importDefault(require("react-images-uploading"));
const UploadImageContainer = (props) => {
    const { images, setImages, upload, load } = props;
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(react_images_uploading_1.default, { multiple: true, value: images, onChange: onChange, maxNumber: maxNumber, dataURLKey: "data_url" }, ({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, }) => (
        // write your building UI
        react_1.default.createElement("div", { className: "upload__image-wrapper" },
            react_1.default.createElement("div", { className: "btnAdminBanners ps-3" },
                react_1.default.createElement("button", Object.assign({ style: isDragging ? { color: 'red' } : undefined, onClick: onImageUpload }, dragProps, { className: "btn btn-dark me-2 mt-2" }), "Click or Drop here"),
                react_1.default.createElement("button", { disabled: images.length == 0 || load, onClick: onImageRemoveAll, className: "btn btn-dark me-2 mt-2" }, "Remove all images"),
                react_1.default.createElement("button", { disabled: images.length == 0 || load, onClick: upload, className: "btn btn-dark mt-2" }, "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438")),
            imageList.map((image, index) => (react_1.default.createElement("div", { key: index, className: "image-item" },
                react_1.default.createElement("img", { src: image['data_url'], alt: "", width: "100" }),
                react_1.default.createElement("div", { className: "image-item__btn-wrapper" },
                    react_1.default.createElement("button", { onClick: () => onImageUpdate(index) }, "Update"),
                    react_1.default.createElement("button", { onClick: () => onImageRemove(index) }, "Remove"))))))))));
};
exports.UploadImageContainer = UploadImageContainer;
