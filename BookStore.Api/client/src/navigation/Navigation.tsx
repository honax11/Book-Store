import React from "react";
import { Route, Routes } from "react-router-dom";
import { MAIN_URL } from "shared/modules/url/publicUrl.const";
import { PublicNavigation } from "./PublicNavigation";
import Page404 from "shared/components/page-404/Page404";

export const AppNavigation = () => (
    <Routes>
        <Route path={MAIN_URL}>
            {PublicNavigation}
        </Route>

        <Route path="*" element={<Page404 />} />
    </Routes>
)
