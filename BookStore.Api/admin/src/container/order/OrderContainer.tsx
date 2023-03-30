import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaymentType } from "shared/models/check-out/PaymentType";
import { showSuccess } from "shared/toast/notification";
import './orderContainer.scss';
import { post, get } from "shared/services/Service";
import { Button, Form } from "react-bootstrap";
import { OrderToView } from "shared/models/tables/OrderToView";
import { CreateOrderView } from "shared/models/tables/CreateOrderView";
import { OrderStatus } from "shared/models/enums/OrderStatus";
import { deleteRequest } from "shared/services/HTTPUserService";

export const OrderContainer = () => {
    const [order, setOrder] = useState<OrderToView>();
    const { id } = useParams();
    const [adminComment, setAdminComment] = useState<string>('');
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.Created);

    useEffect(() => {
        getOrder();
    }, [])

    const getOrder = () => {
        get(`Order/Get?id=${id}`)
            .then((item) => {
                setOrder(item.data);
                setStatus(item.data.status);
                setAdminComment(item.data.adminComment);
            });
    };

    const onUpdateStatus = () => {
        const requestView: CreateOrderView = {
            id: order?.id!,
            adminComment: adminComment,
            status: status
        }
        post(`Order/Update`, requestView)
            .then(() => {
                showSuccess('Status Updated');
                getOrder();
            });
    }

    const onDeleteOrderProduct = (id: string) => {
        deleteRequest(`Order/DeleteOrderProduct?id=${id}`).then(() => {
            getOrder();
        })
    }

    return (
        <div>
            <h1 className="admin-header-centre">Order</h1>
            <Button variant="secondary" onClick={onUpdateStatus}>
                Update
            </Button>
            {order &&
                <div>
                    <div className="order-main">
                        <div>
                            <h3>General Information</h3>
                            <p><b>Order Number: </b>{order?.orderNumber}</p>
                            <p><b>Date: </b>{order?.creationDate.substring(0, 10)}</p>
                            <p><b>Payment Type: </b>{PaymentType[order?.payType]}</p>
                            <p><b>Order Status: </b>{OrderStatus[order.status]}</p>
                            <p><b>Total Price: </b>{order?.totalPrice}</p>
                            <p><b>Call Back: </b>{order.callBack ? 'No' : 'Yes'}</p>
                        </div>

                        <div>
                            <h3>Location</h3>
                            <p><b>Country: </b>{order?.orderLocation?.country}</p>
                            <p><b>City: </b>{order?.orderLocation?.city}</p>
                            <p><b>Street: </b>{order?.orderLocation?.street}</p>
                            <p><b>House: </b>{order?.orderLocation?.house}</p>
                            <p><b>Appartement: </b>{order?.orderLocation?.appartement}</p>
                        </div>

                        <div>
                            <h3>Customer</h3>
                            <p><b>First Name: </b>{order.customerUser?.firstName}</p>
                            <p><b>Last Name: </b>{order.customerUser?.lastName}</p>
                            <p><b>Email: </b>{order.customerUser?.email}</p>
                            <p><b>Phone: </b>{order.customerUser?.phone}</p>
                        </div>
                    </div>
                    {order.orderLocation?.novaPoshta && <div><p><b>Nova Poshta </b>{order.orderLocation?.novaPoshta}</p></div>}
                    {order.comment && <div><p><b>Comment: </b>{order?.comment}</p></div>}
                    <p><b>Admin Comment: </b><Form.Control type="text" onChange={(e) => setAdminComment(e.target.value)} value={adminComment} placeholder="Admin Comment" /></p>
                    <div>
                        <h3>Status</h3>
                        <div className="admin-order-products">
                            <Form.Select as="select" value={status} onChange={(e) => setStatus(+e.target.value)}>
                                <option key={OrderStatus.Created} value={OrderStatus.Created} >Створено</option>
                                <option key={OrderStatus.VerifiedByTheBrand} value={OrderStatus.VerifiedByTheBrand} >Підтверджено брендом</option>
                                <option key={OrderStatus.AwaitingPayment} value={OrderStatus.AwaitingPayment} >Очікує оплати</option>
                                <option key={OrderStatus.ReadyToShip} value={OrderStatus.ReadyToShip} >Готовий до відправки</option>
                                <option key={OrderStatus.Sent} value={OrderStatus.Sent} >Відправлено</option>
                                <option key={OrderStatus.Received} value={OrderStatus.Received} >Отримано</option>
                                <option key={OrderStatus.AReturnIsExpected} value={OrderStatus.AReturnIsExpected} >Очікується повернення</option>
                                <option key={OrderStatus.Return} value={OrderStatus.Return} >Повернення</option>
                                <option key={OrderStatus.Cancel} value={OrderStatus.Cancel} >Відміна</option>
                                <option key={OrderStatus.Test} value={OrderStatus.Test} >Тест</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div className="order-main-low">
                        <div style={{ marginRight: "100px" }}>
                            <h3 className="admin-header-centre">Products</h3>
                            <div className="admin-order-products">
                                {
                                    order.products.map(item => (
                                        <div className="admin-order-productInProducts">
                                            <h5 className="admin-order-product">Product</h5>
                                            <p><b>Name: </b><a target="_blank" className="adminLinkProduct" href={"https://www.hubukrbrands.com/product/" + item.product.url}>{item.product.name}</a></p>
                                            <p><b>Price: </b>{item.product.price}</p>
                                            <p><b>Article: </b>{item.product.article}</p>
                                            <p><b>Quantity: </b>{item.quantity}</p>
                                            <p><b>Size: </b>{item.productSize.size.name}</p>
                                            <p><b>Deleted: </b>{`${item.isDeleted}`}</p>
                                            <Button className="btn btn-danger btn-btnCategories" onClick={() => onDeleteOrderProduct(item.id)}>Delete</Button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}