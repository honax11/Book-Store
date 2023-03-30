import React from "react";
import { Product } from "shared/models/product/Product";

export interface Props {
    products: Product[],
}

export const CustomerProductsTable = (props: Props) => {
    const { products } = props;
    
    return (
        <>
            <div className="col">
                <h2 className="adminPageTitle">Product</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Article</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, key) => {
                            return (
                                <tr key={key}>
                                    <th><a target="_blank" className="adminLinkProduct" href={"https://www.hubukrbrands.com/product/" + product.url}>{product.name}</a></th>
                                    <th>{product.price}</th>
                                    <th>{product.article}</th>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}