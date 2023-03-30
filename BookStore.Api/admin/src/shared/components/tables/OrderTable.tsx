import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OrderToView } from "shared/models/tables/OrderToView";
import { OrderStatus } from "shared/models/enums/OrderStatus";
import { Button } from "react-bootstrap";
import { deleteRequest } from "shared/services/HTTPUserService";
import { ConfirmationPopup } from "../popups/confirmation-popup/ConfirmationPopup";

interface Props {
    data: OrderToView[];
    refresh: () => void;
}

export const OrderTable = (props: Props) => {
    const { data, refresh } = props;

    const [confirmation, setConfirmatin] = useState(false);
    const [orderToDelete, setoOrderToDelete] = useState<OrderToView>();

    const onDeleteOrder = (order: OrderToView) => {
        setoOrderToDelete(order);
        setConfirmatin(true);
    }

    const onDelete = (id: string) => {
        deleteRequest(`Order/Delete?id=${id}`).then(() => {
            setConfirmatin(false);
            refresh();
        })
    }

    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th className="admin-panel-order-table admin-text-orders">Number</th>
                        <th className="admin-panel-order-table admin-text-orders">Brand</th>
                        <th className="admin-panel-order-table admin-text-orders">Name</th>
                        <th className="admin-panel-order-table admin-text-orders">Price</th>
                        <th className="admin-panel-order-table admin-text-orders">Created Date</th>
                        <th className="admin-panel-order-table admin-text-orders">Status</th>
                        <th className="admin-panel-order-table admin-text-orders">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td className="admin-panel-order-table">{val.orderNumber}</td>
                                <td className="admin-panel-order-table">{val.products[0]?.product?.designer?.firstName + " " + val.products[0]?.product?.designer?.lastName}</td>
                                <td className="admin-panel-order-table">{val.products[0]?.product?.name}</td>
                                <td className="admin-panel-order-table">{val.totalPrice}</td>
                                <td className="admin-panel-order-table">{val.creationDate.substring(0, 10)}</td>
                                <td className="admin-panel-order-table">{OrderStatus[val.status]}</td>
                                <td className="admin-panel-order-table">
                                    <Link className="btn btn-info adminBtnMobile" to={`/admin/order/${val.id}`}>Go to Order</Link>
                                    <Button className="btn btn-danger btn-btnCategories" onClick={() => onDeleteOrder(val)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {orderToDelete && <ConfirmationPopup onDelete={() => onDelete(orderToDelete.id)} closeModal={() => setConfirmatin(false)} modalIsOpen={confirmation} product={orderToDelete?.products[0]?.product?.name} ></ConfirmationPopup>}
        </div>
    )
};