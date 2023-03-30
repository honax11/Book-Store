import React from "react";
import { ToastContainer } from "react-toastify";
import { SideBar } from "../sideBar/SideBar";
import "./pageLayout.scss";

interface Props {
    children: JSX.Element;
}

const PageLayout = (props: Props) => {
    const { children } = props;

    return (
        <div className="app toggled">
            <ToastContainer />
            <SideBar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default PageLayout;
