import React, { useEffect, useState } from "react";
import { get } from "shared/services/Service";
import { useParams } from "react-router-dom";
import { OrderToView } from "shared/models/tables/OrderToView";
import { CustomerOrderTable } from "../../shared/components/tables/CustomerOrderTable";
import { Product } from "shared/models/product/Product";
import { CustomerProductsTable } from "../../shared/components/tables/CustomerProductsTable";
import { Button, Form } from "react-bootstrap";
import { showSuccess } from "shared/toast/notification";
import { Customer } from "shared/models/customers/Customer";
import { CustomerType } from "shared/models/enums/CustomerType";
import { OrderStatus } from "shared/models/enums/OrderStatus";

export const CustomerContainer = () => {

    const [infoCustomer, setInfoCustomer] = useState<Customer>();
    const [orders, setOrders] = useState<OrderToView[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [statusCustomer, setStatusCustomer] = useState<CustomerType>(CustomerType.None)

    const { id } = useParams();

    useEffect(() => {
        getInfoCustomer();
        getOrdersInfo();
        getAllProductsCustomer();
    }, []
    );

    const getInfoCustomer = () => {
        get(`Customer/Get/?id=${id}`)
            .then((response) => {
                setInfoCustomer(response.data);
                setStatusCustomer(response.data.type);
            });
    };

    const getOrdersInfo = () => {
        get(`Customer/GetAllOrders?id=${id}`)
            .then((response) => {
                setOrders(response.data);
            })
    }

    const getAllProductsCustomer = () => {
        get(`Customer/GetAllProducts?id=${id}`)
            .then((responce) => {
                setProducts(responce.data);
            })
    }

    const onUpdateStatus = () => {
        get(`Customer/Update?id=${id}&type=${statusCustomer}`)
            .then(() => {
                showSuccess('Status Updated');
                getInfoCustomer();
            });
    }

    return (
        <>
            <h2 className="adminPageTitle">Customer</h2>
            <div>
                <Button variant="secondary" onClick={onUpdateStatus} className="mb-2">
                    Update
                </Button>
                <p>First name: {infoCustomer?.firstName}</p>
                <p>LastName: {infoCustomer?.lastName}</p>
                <p>Phone: {infoCustomer?.phone}</p>
                <p>Email: {infoCustomer?.email}</p>
            </div>
            <div className="">
                <h3>Type</h3>
                <div className="admin-order-products">
                    <Form.Select as="select" value={statusCustomer} onChange={(e) => setStatusCustomer(+e.target.value)}>
                        <option key={CustomerType.None} value={CustomerType.None} >Без фильтрів</option>
                        <option key={CustomerType.Real} value={CustomerType.Real} >Реальний</option>
                        <option key={CustomerType.Test} value={OrderStatus.Test} >Тест</option>
                    </Form.Select>
                </div>
            </div>
            <div className="d-flex">
                <CustomerOrderTable
                    orders={orders}
                ></CustomerOrderTable>
                <CustomerProductsTable
                    products={products}
                ></CustomerProductsTable>
            </div>
        </>
    )
}