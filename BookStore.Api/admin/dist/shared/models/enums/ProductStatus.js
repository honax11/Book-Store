"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatus = void 0;
var ProductStatus;
(function (ProductStatus) {
    ProductStatus[ProductStatus["OutOfStock"] = 0] = "OutOfStock";
    ProductStatus[ProductStatus["InStock"] = 1] = "InStock";
    ProductStatus[ProductStatus["RunningLow"] = 2] = "RunningLow";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
