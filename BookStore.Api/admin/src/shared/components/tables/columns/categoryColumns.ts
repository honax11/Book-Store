import { Column } from "react-table";
import { Category } from "shared/models/category/Category";
import { ProductType } from "shared/models/category/ProductType";

export const CATEGORIES_TABLE_COLUMNS: Column<Category>[] = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Type",
        accessor: (row) => {
            return ProductType[row.type]
        }
    },
];