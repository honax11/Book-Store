"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignerSizeTable = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ProductType_1 = require("shared/models/category/ProductType");
const HTTPUserService_1 = require("shared/services/HTTPUserService");
const CreateDesignerSizePopup_1 = require("../popups/designer/CreateDesignerSizePopup");
const UpdateDesignerSizePopup_1 = require("../popups/designer/UpdateDesignerSizePopup");
const DesignerSizeTable = (props) => {
    const { data, refresh, designerId, categories } = props;
    const [createModalIsOpen, setCreateModalIsOpen] = react_1.default.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = react_1.default.useState(false);
    const [designerSizeToUpdate, setDesignerSizeToUpdate] = react_1.default.useState();
    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };
    const ondDeleteSize = (id) => {
        (0, HTTPUserService_1.deleteRequest)(`DesignerSize/Delete?id=${id}`)
            .then(() => {
            refresh();
        });
    };
    const onUpdateHandle = (item) => {
        setDesignerSizeToUpdate(item);
        setUpdateModalIsOpen(true);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "Designer Sizes"),
            react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-success", onClick: openCreateModal }, "Create Size")),
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Name"),
                    react_1.default.createElement("th", null, "Breast"),
                    react_1.default.createElement("th", null, "Height"),
                    react_1.default.createElement("th", null, "Hips"),
                    react_1.default.createElement("th", null, "Type"),
                    react_1.default.createElement("th", null, "Waist"),
                    react_1.default.createElement("th", null, "Slipsole"),
                    react_1.default.createElement("th", null, "Actions"))),
            react_1.default.createElement("tbody", null, data.map((val, key) => {
                return (react_1.default.createElement("tr", { key: key },
                    react_1.default.createElement("td", null, val.name),
                    react_1.default.createElement("td", null, val.breast),
                    react_1.default.createElement("td", null, val.height),
                    react_1.default.createElement("td", null, val.hips),
                    react_1.default.createElement("td", null, ProductType_1.ProductType[val.type]),
                    react_1.default.createElement("td", null, val.waist),
                    react_1.default.createElement("td", null, val.slipsole),
                    react_1.default.createElement("td", null,
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-info", onClick: () => onUpdateHandle(val) }, "Edit"),
                        react_1.default.createElement(react_bootstrap_1.Button, { className: "btn btn-danger", onClick: () => ondDeleteSize(val.id) }, "Delete"))));
            }))),
        react_1.default.createElement(CreateDesignerSizePopup_1.CreateDesignerSizePopup, { designerId: designerId, modalIsOpen: createModalIsOpen, refresh: refresh, closeModal: () => setCreateModalIsOpen(false), categories: categories }),
        designerSizeToUpdate &&
            react_1.default.createElement(UpdateDesignerSizePopup_1.UpdateDesignerSizePopup, { modalIsOpen: updateModalIsOpen, closeModal: () => setUpdateModalIsOpen(false), refresh: refresh, designerSize: designerSizeToUpdate, setDesignerSize: setDesignerSizeToUpdate, categories: categories })));
};
exports.DesignerSizeTable = DesignerSizeTable;
