import React from "react"
import { Footer } from "./shared/footer/Footer"
import { ToastContainer } from 'react-toastify';
import { Category } from "shared/models/category/Category";
import Header from "./shared/header/Header";
import { get } from "shared/services/HTTPUserService";

interface Props {
    children: JSX.Element;
}

export const PageLayout = (props: Props) => {
    const { children } = props;
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [isFooterActive, setIsFooterActive] = React.useState<boolean>(false);

    const getAllCategories = () => {
        get(`Category/GetAll`)
            .then((response) => {
                setCategories(response);
                setTimeout(() => {
                    setIsFooterActive(true);
                }, 1200)
            });
    };

    React.useEffect(() => {
        getAllCategories();
    }, [])


    return (
        <div>
            <ToastContainer />
            <Header categories={categories} />
            <main>
                {children}
            </main>
            {isFooterActive && <Footer />}
        </div>
    )
}
