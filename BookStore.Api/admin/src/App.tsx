import { BrowserRouter } from "react-router-dom";
import React from 'react';
import AuthProvider from "shared/services/AuthProvider";
import "./styles/app.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AppNavigation } from "navigation/Navigation";
import ScrollToTop from "layouts/scrollToTop";
import PageLayout from "shared/components/page-layout/PageLayout";

const App = () => (
    <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
            <PageLayout>
                <AppNavigation />
            </PageLayout>
        </AuthProvider>
    </BrowserRouter>
);

export default App;