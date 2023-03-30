import React, { useEffect, useState } from "react";
import { Category } from "shared/models/category/Category";
import { Magazine } from "shared/models/magazine/Magazine";
import { get } from "shared/services/HTTPUserService";
import { BlogTable } from "../../shared/components/tables/BlogTable";

export const ArticlesContainer = () => {
    const [articles, setArticles] = useState<Magazine[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const getAllCategories = () => {
        get(`Category/GetAll`)
            .then((response) => {
                setCategories(response);
            });
    };
    const getAllMagazines = () => {
        get(`Magazine/GetAll`)
            .then((response) => {
                setArticles(response);
            });
    };
    useEffect(() => {
        getAllMagazines();
        getAllCategories();
    }, []
    );

    return (
        <div>
            <BlogTable categories={categories} data={articles} refresh={() => getAllMagazines()}></BlogTable>
        </div>
    )
}