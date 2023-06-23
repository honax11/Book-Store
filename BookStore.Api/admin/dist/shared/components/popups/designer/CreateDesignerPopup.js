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
exports.CreateDesignerPopup = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_datepicker_1 = __importDefault(require("react-datepicker"));
const multiselect_react_dropdown_1 = __importDefault(require("multiselect-react-dropdown"));
const Service_1 = require("shared/services/Service");
const CreateDesignerPopup = (props) => {
    const { modalIsOpen, closeModal, refresh, ganresAll } = props;
    const [firstName, setFirstName] = react_1.default.useState('');
    const [secondName, setSecondName] = react_1.default.useState('');
    const [birthDay, setBirthDay] = react_1.default.useState(new Date());
    const [dayOfDeath, setDayOfDeath] = react_1.default.useState(new Date());
    const [ganres, setGanres] = (0, react_1.useState)([]);
    const onSubmitForm = (event) => {
        debugger;
        event.preventDefault();
        let authorToCreate = {
            firstName: firstName,
            secondName: secondName,
            birthDay: birthDay,
            dayOfDeath: dayOfDeath,
            ganres: ganres,
        };
        (0, Service_1.post)(`Designer/Create`, authorToCreate)
            .then(() => {
            refresh();
            setFirstName('');
            setSecondName('');
            setBirthDay(birthDay);
            setDayOfDeath(dayOfDeath);
        });
        closeModal();
    };
    const onSelectGenre = (selectedList, selectedItem) => {
        let tempGenres = [...ganres];
        tempGenres.push(selectedItem.id);
        setGanres(tempGenres);
    };
    const onRemoveGenre = (selectedList, removedItem) => {
        debugger;
        let tempGenres = [...ganres];
        tempGenres = ganres.filter(x => x != removedItem.id);
        setGanres(tempGenres);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: modalIsOpen, onHide: closeModal },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Create Author")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput1" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "First Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "firstName", placeholder: "First Name", autoFocus: true, value: firstName, onChange: (e) => setFirstName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput2" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Second Name"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "secondName", placeholder: "Second Name", value: secondName, onChange: (e) => setSecondName(e.target.value) })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput2" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Birth Day"),
                        react_1.default.createElement(react_datepicker_1.default, { selected: birthDay, onChange: (birthDay) => setBirthDay(birthDay), className: "form-control modal-number-input" })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput2" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Day Of Death"),
                        react_1.default.createElement(react_datepicker_1.default, { selected: dayOfDeath, onChange: (dayOfDeath) => setDayOfDeath(dayOfDeath), className: "form-control modal-number-input" })),
                    react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3", controlId: "exampleForm.ControlInput2" },
                        react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Ganres"),
                        react_1.default.createElement(multiselect_react_dropdown_1.default, { id: 'Ganres', options: ganresAll, onSelect: onSelectGenre, onRemove: onRemoveGenre, displayValue: "name", placeholder: "Ganres", emptyRecordMsg: "\u0412\u0441\u0456 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457 \u0432\u0438\u0431\u0440\u0430\u043D\u0456" })))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: closeModal }, "Close"),
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", onClick: onSubmitForm }, "Save Changes")))));
};
exports.CreateDesignerPopup = CreateDesignerPopup;
