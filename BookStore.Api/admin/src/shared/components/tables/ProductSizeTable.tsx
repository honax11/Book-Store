import React from 'react';
import './tablet.scss';
import { Button, Form } from 'react-bootstrap';
import { CreateProductSizePopup } from '../popups/product/CreateProductSizePopup';
import { UpdateProductSizePopup } from '../popups/product/UpdateProductSizePopup';
import { ProductSizeGetAllItem } from 'shared/models/product/ProductSizeGetAllItem';
import { Size } from 'shared/models/sizes/Size';
import { deleteRequest } from 'shared/services/HTTPUserService';
import { post } from 'shared/services/Service';
import { BiSave } from "react-icons/bi";

interface Props {
    data: ProductSizeGetAllItem[];
    sizes: Size[];
    productId: string;
    refresh: () => void;
    setProductSizes: (data: ProductSizeGetAllItem[]) => void;
}

export const ProductSizeTable = (props: Props) => {
    const { data, refresh, sizes, productId, setProductSizes } = props;

    const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);
    const [productSizeToUpdate, setProductSizeToUpdate] = React.useState<ProductSizeGetAllItem>();

    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    }

    const ondDeleteSize = (id: string) => {
        deleteRequest(`Size/DeleteProductSize?id=${id}`)
            .then(() => {
                refresh();
            });
    }

    const onUpdateHandle = (item: ProductSizeGetAllItem) => {
        setProductSizeToUpdate(item);
        setUpdateModalIsOpen(true);
    }

    const onSubmitForm = (productSize: ProductSizeGetAllItem) => {

        post(`Size/UpdateProductSize`, { id: productSize.id, quantity: productSize.quantity })
            .then(() => {
                refresh();
            });
    }

    const setQuant = (quantity: number, val: ProductSizeGetAllItem, id: string) => {
        const newState = data.map(obj => {
            if (obj.id == id) {
                return { ...obj, quantity: quantity };
            }
            return obj;
        });
        setProductSizes(newState);
    }

    return (
        <div className="App">
            <div>
                <h2>Product Sizes</h2>
                <Button className="btn btn-success" onClick={openCreateModal}>Create  Size</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, key) => {
                        return (
                            <tr key={key} className="">
                                <td>{val.size.name}</td>
                                <td className="productSizeTable">
                                    <Form.Control
                                        type="quantity"
                                        placeholder="Quantity"
                                        value={val.quantity}
                                        onChange={(e) => setQuant(+e.target.value, val, val.id)}
                                    />
                                    <button className="" onClick={() => onSubmitForm(val)}><BiSave /></button>
                                </td>
                                <td>
                                    <Button className="btn btn-info" onClick={() => onUpdateHandle(val)}>Edit</Button>
                                    <Button className="btn btn-danger" onClick={() => ondDeleteSize(val.id)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <CreateProductSizePopup
                productId={productId}
                sizes={sizes}
                modalIsOpen={createModalIsOpen}
                refresh={refresh}
                closeModal={() => setCreateModalIsOpen(false)}
            ></CreateProductSizePopup>
            {productSizeToUpdate &&
                <UpdateProductSizePopup
                    modalIsOpen={updateModalIsOpen}
                    closeModal={() => setUpdateModalIsOpen(false)}
                    refresh={refresh}
                    productSize={productSizeToUpdate}
                    setProductSize={setProductSizeToUpdate}
                ></UpdateProductSizePopup>
            }
        </div>
    );
}