import React, { createContext, useEffect, useState } from 'react';
import { ProductPicture } from 'shared/models/product/ProductPicture';

export interface AppStateObj {
    isShopingCartOpen: boolean,
    products: OrderProduct[],
    language: Language
}

interface State {
    appState: AppStateObj,
    setAppState: (state: AppStateObj) => void;
}

export enum Language {
    UA,
    EN
}
export interface OrderProduct {
    id: string,
    url: string,
    name: string,
    price: number,
    pictures: ProductPicture[],
    quantity: number,
    size: string,
    sizeName: string,
    salePrice: number,
}

const initialState: AppStateObj = {
    isShopingCartOpen: false,
    products: [],
    language: Language.UA
};
const store = createContext<State>({ appState: initialState, setAppState: () => { } });
const { Provider } = store;

interface Props {
    children: JSX.Element;
}

const StateProvider = ({ children }: Props) => {
    const [appState, setAppStateObj] = useState<AppStateObj>(initialState);

    const setAppState = (state: AppStateObj) => {
        setAppStateObj(state);
        localStorage.setItem('shopingCard', JSON.stringify(state));
    }

    useEffect(() => {
        const tempState = localStorage.getItem('shopingCard');

        if (tempState) {
            const cartItemsData = JSON.parse(tempState) as AppStateObj;
            if (!cartItemsData.language) {
                cartItemsData.language = Language.UA;
            }
            setAppStateObj(cartItemsData);
        }
    }, [])

    return <Provider value={{ appState, setAppState }} >{children}</Provider>;
};

export { store, StateProvider }