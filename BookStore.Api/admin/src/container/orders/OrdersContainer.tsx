import React, { useEffect, useState } from "react";
import { post } from "shared/services/Service";
import { OrderToView } from "shared/models/tables/OrderToView";
import { Category } from "shared/models/category/Category";
import { Designer } from "shared/models/designer/Designer";
import { ProductType } from "shared/models/category/ProductType";
import { OrderStatus } from "shared/models/enums/OrderStatus";
import { GetAllOrderFilters } from "shared/models/filters/GetAllOrderFilters";
import { get } from "shared/services/HTTPUserService";
import { OrderTable } from "shared/components/tables/OrderTable";
import { OrderTableFilters } from "shared/components/orderTable/OrderTableFilters";

export const OrdersContainer = () => {
    const [orders, setOrders] = useState<OrderToView[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [designers, setDesigners] = useState<Designer[]>([]);

    const [statusSelect, setStatusSelect] = React.useState(OrderStatus.None);
    const [typeSelect, setTypeSelect] = React.useState(ProductType.None);
    const [categorySelect, setCategorySelect] = React.useState('');
    const [designerSelect, setDesignerSelect] = React.useState('');
    const [to, setTo] = useState<Date>();
    const [from, setFrom] = useState<Date>();

    useEffect(() => {
        getAllOrders();
        getAllCategories();
        getAllDesigners();
    }, [])

    const getAllOrders = () => {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 200);
        let filter: GetAllOrderFilters = {
            status: statusSelect,
            categoryId: categorySelect,
            designerId: designerSelect,
            type: typeSelect,
            from: from,
            to: to
        }
        post(`Order/GetAll`, filter)
            .then((response) => {
                setOrders(response.data);
            });
    };

    const getAllCategories = () => {
        get(`Category/GetAll`)
            .then((response) => {
                setCategories(response);
            });
    };

    const getAllDesigners = () => {
        get(`Designer/GetAll`)
            .then((response) => {
                setDesigners(response);
            });
    };

    return (
        <div>
            <h2 className="adminPageTitle">Orders</h2>
            <OrderTableFilters
                categories={categories}
                designers={designers}
                onUpdateFilters={getAllOrders}
                setStatusSelect={setStatusSelect}
                statusSelect={statusSelect}
                categorySelect={categorySelect}
                designerSelect={designerSelect}
                typeSelect={typeSelect}
                setCategorySelect={setCategorySelect}
                setDesignerSelect={setDesignerSelect}
                setTypeSelect={setTypeSelect}
                setTo={setTo}
                setFrom={setFrom}
            ></OrderTableFilters>
            {orders &&
                <OrderTable
                    data={orders}
                    refresh={getAllOrders}
                ></OrderTable>}
        </div>
    )
}