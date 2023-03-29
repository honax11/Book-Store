import React from "react";
import { ProductType } from "shared/models/category/ProductType";
import { DesignerSize } from "shared/models/designer/DesignerSize";
import "./adminTablet.scss";

interface Props {
    modalTableOpen: boolean;
    closeModal: () => void;
    sizes: DesignerSize[];
    designerName: string;
    productType: ProductType;
}

export const TableSizesPopup = (props: Props) => {
    const { modalTableOpen, closeModal, sizes, designerName, productType } = props;

    return (
        <>
            <div className={modalTableOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalTableOpen ? "modalWindow__content active table__width" : "modalWindow__content table__width"} onClick={(e) => e.stopPropagation()}>
                    <div className="table__header">
                        <div>Таблиця розмірів {designerName}</div>
                        <button className="btn-close" onClick={() => closeModal()}></button>
                    </div>
                    <div className="footer__divider"></div>
                    <div>
                        <table>
                            <thead>
                                {productType == ProductType.Clothes ?
                                    <tr className="table-color">
                                        <th>Розмір</th>
                                        <th>Груди</th>
                                        <th>Талія</th>
                                        <th>Бедра</th>
                                        <th>Зріст</th>
                                    </tr>
                                    :
                                    <tr className="table-color">
                                        <th>Розмір</th>
                                        <th>Устілка, см</th>
                                    </tr>}
                            </thead>
                            <tbody>
                                {
                                    sizes.map(item => {
                                        if (productType == ProductType.Clothes && !item.categoryId) {
                                            return (
                                                <tr key={item.id} className="table-color">
                                                    <th>{item.name}</th>
                                                    <th>{item.breast}</th>
                                                    <th>{item.waist}</th>
                                                    <th>{item.hips}</th>
                                                    <th>{item.height}</th>
                                                </tr>
                                            )
                                        }
                                        if (productType == ProductType.Shose) {
                                            return (
                                                <tr key={item.id} className="table-color">
                                                    <th>{item.name}</th>
                                                    <th>{item.slipsole}</th>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                        {sizes.find(x => x.categoryId) && <div>Для категорії: {sizes.find(x => x.categoryId)?.category?.name}</div>}

                        {sizes.find(x => x.categoryId) &&
                            <table>
                                <thead>
                                    <tr className="table-color">
                                        <th>Розмір</th>
                                        <th>Груди</th>
                                        <th>Талія</th>
                                        <th>Бедра</th>
                                        <th>Зріст</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sizes.map(item => {
                                            if (item.categoryId) {
                                                return (
                                                    <tr key={item.id} className="table-color">
                                                        <th>{item.name}</th>
                                                        <th>{item.breast}</th>
                                                        <th>{item.waist}</th>
                                                        <th>{item.hips}</th>
                                                        <th>{item.height}</th>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
