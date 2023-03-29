import React, { useState } from "react";
import "../in-development-popup/in-development-popup.scss";
import "./in-search.scss";
import image from "./search.png";
import { Link } from "react-router-dom";
import { Product } from "shared/models/product/Product";
import { get } from "shared/services/HTTPUserService";

interface Props {
    modalSearchOpen: boolean;
    closeModal: () => void;
}

export const GlobalSearch = (props: Props) => {
    const { modalSearchOpen, closeModal } = props;

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState("");

    const onChangesearch = (message: string) => {
        setSearch(message);
        if (message.length > 3) {
            getSearchedProducts(message);
        }
    }

    const getSearchedProducts = (search: string) => {
        get(`Search/Get?name=${search}`).then((response: Product[]) => {
            setProducts(response);
            if (response[0]) {
                setCategory(response[0].category?.url!);
            }
        });
    };

    return (
        <>

            <div className={modalSearchOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalSearchOpen ? "modalWindow__content active search-popup__width" : "modalWindow__content search-popup__width"} onClick={(e) => e.stopPropagation()}>

                    <div className="search-popup__modal-header">
                        <div className="search-popup__width100">
                            <img src={image} className="search-popup__img" alt="search" />
                            <input type="text" placeholder="Що ви шукаєте" className="search-popup__input" onChange={(e) => onChangesearch(e.target.value)} />
                        </div>
                        <button className="btn-close" onClick={() => closeModal()}></button>
                    </div>
                    <div className="search-popup__divider"></div>
                    {products.map(item => (
                        <div key={item.id} className="search-popup__category">
                            <Link className="search-popup__cursor" to={"/product/" + item.url}>{item.name}</Link>
                        </div>
                    ))}
                    {search.length > 4 && products.length == 0 &&
                        <div className="search-popup__category">
                            <p>Продукт з іменем {search} не знайдено.</p>
                        </div>
                    }
                    <div className="search-popup__divider"></div>
                    <div className="search-popup__footer">
                        <div className="search-popup__btn">
                            {products.length == 7 &&
                                <Link to={`/clothes/${category}`}>
                                    <button className="search-popup__btnSearch" onClick={closeModal}>
                                        Дивитись більше результатів
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}