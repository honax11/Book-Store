import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from 'react';
import "./styles/app.scss";
import "./styles/modalWindow.scss";
import "./styles/table-sizes-popup.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AppNavigation } from "navigation/Navigation";
import { StateProvider } from "store";
import ScrollToTop from "layouts/scrollToTop";
import { HelmetProvider } from "react-helmet-async";
import { PageLayout } from "layouts/pageLayout/PageLayout";

const App = () => (
    <Suspense>
        <StateProvider>
            <HelmetProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <PageLayout>
                        <AppNavigation />
                    </PageLayout>
                </BrowserRouter>
            </HelmetProvider>
        </StateProvider>
    </Suspense>

);

export default App;