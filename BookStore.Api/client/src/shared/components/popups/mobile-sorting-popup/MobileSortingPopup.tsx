import { SortList } from "shared/models/enums/SortList";
import React from "react";
import "./mobile-sorting-popup.scss";

interface Props {
    modalSortOpen: boolean;
    closeModal: () => void;
    sortType: SortList
    setSortFilter: (filter: SortList) => void;
}

export const MobileSortingPopup = (props: Props) => {
    const { modalSortOpen, closeModal, sortType, setSortFilter } = props;

    return (
        <>
            <div className={modalSortOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalSortOpen ? "modalWindow__content active sort__width" : "modalWindow__content sort__width"} onClick={(e) => e.stopPropagation()}>
                    <div className="sort__header">
                        <div>Сортування</div>
                        <button className="btn-close filters__bcg" onClick={() => closeModal()}></button>
                    </div>
                    <div className="sort__body">
                        <div className={`${sortType === SortList.NewFirst ? 'sort__listDone sort__done' : 'sort__list'}`} onClick={() => setSortFilter(SortList.NewFirst)}>Від найновішого</div>
                        <div className={`${sortType === SortList.PriceIncrease ? 'sort__listDone sort__done' : 'sort__list'}`} onClick={() => setSortFilter(SortList.PriceIncrease)}>Ціна за зростанням</div>
                        <div className={`${sortType === SortList.PricesReduction ? 'sort__listDone sort__done' : 'sort__list'}`} onClick={() => setSortFilter(SortList.PricesReduction)}>Ціна за спаданням</div>
                    </div>
                    <div className="sort__btn-ok" onClick={closeModal}>
                        ОК
                    </div>
                </div>
            </div>
        </>
    )
}