"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Created"] = 0] = "Created";
    OrderStatus[OrderStatus["VerifiedByTheBrand"] = 1] = "VerifiedByTheBrand";
    OrderStatus[OrderStatus["AwaitingPayment"] = 2] = "AwaitingPayment";
    OrderStatus[OrderStatus["ReadyToShip"] = 3] = "ReadyToShip";
    OrderStatus[OrderStatus["Sent"] = 4] = "Sent";
    OrderStatus[OrderStatus["Received"] = 5] = "Received";
    OrderStatus[OrderStatus["AReturnIsExpected"] = 6] = "AReturnIsExpected";
    OrderStatus[OrderStatus["Return"] = 7] = "Return";
    OrderStatus[OrderStatus["Cancel"] = 8] = "Cancel";
    OrderStatus[OrderStatus["Test"] = 9] = "Test";
    OrderStatus[OrderStatus["None"] = 100] = "None";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
