import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { PreOrderedProduct } from "shared/models/pre-ordered-products/PreOrderedProduct";
import { PreOrderedProductStatus } from "shared/models/enums/PreOrderedProductStatus";
import { get } from "shared/services/Service";
import { PreOrderTable } from "shared/components/tables/PreOrderTable";

export const PreorderdProductsContainer = () => {
    const [products, setProducts] = useState<PreOrderedProduct[]>([]);
    const [status, setStatus] = useState(PreOrderedProductStatus.None)

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = () => {
        get(`PreOrder/GetAll?status=${status}`)
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            });
    };

    return (
        <>
            <div className="App">
                <h2 className="adminPageTitle">Pre-ordered Products</h2>
                <div>Вид</div>

                <InputGroup className="mb-3">
                    <Form.Select as="select" value={status} onChange={(e) => setStatus(+e.target.value)}>
                        <option key={PreOrderedProductStatus.None} value={PreOrderedProductStatus.None}>Без фільтру</option>
                        <option key={PreOrderedProductStatus.AddedToCart} value={PreOrderedProductStatus.AddedToCart}>Added To Cart</option>
                        <option key={PreOrderedProductStatus.PressCheckOut} value={PreOrderedProductStatus.PressCheckOut}>Press CheckOut</option>
                        <option key={PreOrderedProductStatus.PressedNext} value={PreOrderedProductStatus.PressedNext}>Pressed Next</option>
                    </Form.Select>
                    <Button variant="outline-secondary" onClick={() => getAllProducts()}>Filter</Button>
                </InputGroup>
                <PreOrderTable
                    products={products}
                ></PreOrderTable>
            </div>
        </>
    )
}