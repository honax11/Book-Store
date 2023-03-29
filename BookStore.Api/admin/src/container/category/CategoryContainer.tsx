import React, { useEffect, useState } from "react";
import { Category } from "shared/models/category/Category";
import { get } from "shared/services/HTTPUserService";
import { CategoryTable } from "../../shared/components/tables/CategoryTable";

export const CategoryContainer = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const getAllCategories = () => {
        get(`Category/GetAll`)
            .then((response) => {
                setCategories(response);
            });
    };
    useEffect(() => {
        getAllCategories();
    }, []
    );

    return (
        <div>
            <CategoryTable data={categories} refresh={() => getAllCategories()}></CategoryTable>
        </div>
    )
}