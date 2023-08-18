import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    MAIN_URL,
    AUTHORS_URL,
    AUTHOR_URL,
    SIZE_GANRE,
    URL,

} from "shared/modules/url/url.const";
import { Rout } from "navigation/Rout";
import Page404 from "shared/components/page-404/Page404";
import { AuthorContainer } from "container/author/AuthorContainer";
import { GanresContainer } from "container/ganre/GanresContainer";
import { AuthorsContainer } from "container/authors/AuthorsContainer";
import { LoginContainer } from "container/login/LoginContainer";

export const AppNavigation = () => (
    <Routes>

        <Route path={MAIN_URL} key={URL} element={<LoginContainer />} />,

        <Route path={URL} element={<Rout />}>
            [
            <Route path={SIZE_GANRE} key={SIZE_GANRE} element={<GanresContainer />} />,
            <Route path={AUTHORS_URL} key={AUTHORS_URL} element={<AuthorsContainer />} />,
            <Route path={AUTHOR_URL} key={AUTHOR_URL} element={<AuthorContainer />} />,
            ]
        </Route>
        <Route path="*" element={<Page404 />} />
    </Routes>
)
