import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Category } from "shared/models/category/Category";
import { ProductType } from "shared/models/category/ProductType";
import { Designer } from "shared/models/designer/Designer";
import { Product } from "shared/models/product/Product";
import { get } from "shared/services/HTTPUserService";
import { onDelete } from "shared/services/Service";
import { CreateProductPopup } from "../../shared/components/popups/product/CreateProductPopup";
import { UpdateProductPopup } from "../../shared/components/popups/product/UpdateProductPopup";
import { AdminProductList } from "./ProductList";

export const ProductsContainer = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productToUpdate, setProductToUpdate] = useState<Product>();
    const [nameFilter, setNameFilter] = useState<string>();
    const [typeSelect, setTypeSelect] = React.useState(ProductType.None);
    const [categorySelect, setCategorySelect] = React.useState('');
    const [designerSelect, setDesignerSelect] = React.useState('');
    const getAllUrl = `Product/GetAllFiltered`;

    const [categories, setCategories] = useState<Category[]>([]);
    const [designers, setDesigners] = useState<Designer[]>([]);

    useEffect(() => {
        getAllProducts(getAllUrl);
        getAllCategories();
        getAllDesigners();
    }, []
    );

    const [createModalIsOpen, setCreateModalIsOpen] = React.useState(false);
    const [updateModalIsOpen, setUpdateModalIsOpen] = React.useState(false);

    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    }
    const openUpdateModal = (product: Product) => {
        setProductToUpdate(product);
        setUpdateModalIsOpen(true);
    }

    const onHandleTypeSelect = (e: any) => {
        setTypeSelect(e.target.value);
    };

    const onUpdateFilters = () => {
        let urlParam = "?";
        if (nameFilter) {
            urlParam += `name=${nameFilter}&`;
        } else {
            urlParam += `name=&`;
        }

        if (typeSelect && !nameFilter) {
            urlParam += `type=${typeSelect}&`;
        } else {
            urlParam += `type=&`;
        }

        if (categorySelect && !nameFilter) {
            urlParam += `category=${categorySelect}&`;
        } else {
            urlParam += `category=&`;
        }

        if (designerSelect && !nameFilter) {
            urlParam += `designer=${designerSelect}`;
        } else {
            urlParam += `designer=`;
        }
        getAllProducts(getAllUrl + urlParam);
    }

    const getAllDesigners = () => {
        get(`Designer/GetAll`)
            .then((response) => {
                setDesigners(response);
            });
    };

    const onDeleteProduct = (id: string) => {
        onDelete(`Product/Delete?id=${id}`)
            .then(() => {
            });
    }

    const getAllCategories = () => {
        get(`Category/GetAll`)
            .then((response) => {
                setCategories(response);
            });
    };

    const getAllProducts = (url: string) => {
        get(url)
            .then((response) => {
                const products = response.map((item: Product) => {
                    return {
                        id: item.id,
                        creationDate: item.creationDate,
                        isActive: item.isActive,
                        isDeleted: item.isDeleted,
                        name: item.name,
                        type: item.type,
                        price: item.price,
                        salePrice: item.salePrice,
                        style: item.style,
                        status: item.status,
                        color: item.color,
                        description: item.description,
                        article: item.article,
                        url: item.url,
                        designer: item.designer,
                        category: item.category,
                        pictures: item.pictures,
                        measurements: item.measurements,
                        delivery: item.delivery,
                        composition: item.composition,
                        modelParameters: item.modelParameters,
                        productParameters: item.productParameters,
                        saleDate: Date.parse(item?.saleDate ? item.saleDate.toString() : ''),
                        code: item.code,
                    };
                });
                setProducts(products);
            });
    };

    return (
        <div className="create-product">
            <h1 className="adminPageTitle">Products</h1>
            <div>
                <Button className="btn btn-success" onClick={openCreateModal}>Create Product</Button>
            </div>

            <div>
                <InputGroup className="mb-3 filtresAdminPage__products d-flex align-items-end">
                    <div>
                        <FormControl value={nameFilter} placeholder="Name" onChange={(e) => setNameFilter(e.target.value)} className="filtresAdminPage__filtres" />
                    </div>
                    <div className="d-flex">
                        <div>
                            <span>Тип</span>
                            <Form.Select as="select" value={typeSelect} onChange={(e) => onHandleTypeSelect(e)} className="filtresAdminPage__filtres">
                                <option key={ProductType.None} value={ProductType.None} >Без фільтру</option>
                                <option key={ProductType.Clothes} value={ProductType.Clothes} >Clothes</option>
                                <option key={ProductType.Shose} value={ProductType.Shose} >Shose</option>
                                <option key={ProductType.Accessories} value={ProductType.Accessories} >Accessories</option>
                            </Form.Select>
                        </div>
                        <div>
                            <span>Категорія</span>
                            <Form.Select as="select" value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)} className="filtresAdminPage__filtres">
                                <option key="" value="" >Без фільтру</option>
                                {categories.map(item => {
                                    return <option key={item.id} value={item.id} >{item.name}</option>
                                })}
                            </Form.Select>
                        </div>
                        <div>
                            <span>Бренд</span>
                            <Form.Select as="select" value={designerSelect} onChange={(e) => setDesignerSelect(e.target.value)} className="filtresAdminPage__filtres">
                                <option key="" value="" >Без фільтру</option>
                                {designers.map(item => {
                                    return <option key={item.id} value={item.id} >{`${item.firstName} ${item.lastName}`}</option>
                                })}
                            </Form.Select>
                        </div>
                    </div>
                    <div>
                        <Button variant="outline-secondary" onClick={() => onUpdateFilters()} >Filter</Button>
                    </div>
                </InputGroup>
            </div>
            {products &&
                <AdminProductList
                    openUpdateModal={openUpdateModal}
                    products={products}
                    onDelete={onDeleteProduct}
                    refresh={onUpdateFilters}
                    setProducts={setProducts}
                ></AdminProductList>}
            {categories &&
                <CreateProductPopup
                    modalIsOpen={createModalIsOpen}
                    closeModal={() => setCreateModalIsOpen(false)}
                    categories={categories}
                    designers={designers}
                    refresh={onUpdateFilters}
                ></CreateProductPopup>}

            {productToUpdate &&
                <UpdateProductPopup
                    modalIsOpen={updateModalIsOpen}
                    closeModal={() => setUpdateModalIsOpen(false)}
                    categories={categories}
                    product={productToUpdate}
                    setProduct={setProductToUpdate}
                    designers={designers}
                    refresh={onUpdateFilters}
                ></UpdateProductPopup>
            }
        </div>
    )
}