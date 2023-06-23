"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumns = void 0;
const react_1 = require("react");
const useColumns = (data) => {
    const columns = (0, react_1.useMemo)(() => data, []);
    return columns;
};
exports.useColumns = useColumns;
