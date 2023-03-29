import React from "react";
import { CellProps, Column } from "react-table";
import { PreOrderedProductStatus } from "shared/models/enums/PreOrderedProductStatus";
import { PreOrderedProduct } from "shared/models/pre-ordered-products/PreOrderedProduct";

export const PREORDERS_TABLE_COLUMNS: Column<PreOrderedProduct>[] = [
    {
        Header: "Name",
        accessor: (row) => {
            return row.product.name
        },
        Cell: (e: CellProps<PreOrderedProduct, string>) => <a href={process.env.REACT_APP_WEB_MAIN_URL + "product/" + e.row.original.product.url} target="_blank">{e.value}</a>
    },
    {
        Header: "Category",
        accessor: (row) => {
            return row.product.category?.name
        }
    },
    {
        Header: "Country",
        accessor: "country"
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "Ip",
        accessor: "ip"
    },
    {
        Header: "Status",
        accessor: (row) => {
            return PreOrderedProductStatus[row.status]
        },
    },
    {
        Header: "Date",
        accessor: (row) => {
            return row.creationDate.substring(0, 10)
        },
    }
]