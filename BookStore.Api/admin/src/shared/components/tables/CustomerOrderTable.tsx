import React from "react";
import { Link } from "react-router-dom";
import { OrderToView } from "shared/models/tables/OrderToView";
import { OrderStatus } from "shared/models/enums/OrderStatus";

export interface Props {
    orders: OrderToView[],
}

export const CustomerOrderTable = (props: Props) => {
    const { orders } = props;

    return (
        <>
            <div className="col  me-2">
                <h2 className="adminPageTitle">Order</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, key) => {
                            return (
                                <tr key={key}>
                                    <th><Link to={`/admin/order/${order.id}`} className="adminLinkProduct">{order.orderNumber}</Link></th>
                                    <th>{order.totalPrice}</th>
                                    <th>{OrderStatus[order.status]}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}