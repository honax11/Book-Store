import React from "react";
import { CellProps, Column } from "react-table";
import { ProductType } from "shared/models/category/ProductType";
import { Click } from "shared/models/clicks/Click";
import { ClickType } from "shared/models/enums/ClickType";

export const CLICKS_TABLE_COLUMNS: Column<Click>[] = [    
    {
        Header: "Country",
        accessor: "country"
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "IP",
        accessor: "ip"
    },
    {
        Header: "Name",
        accessor: "name",
        Cell: (e: CellProps<Click, string>) => <a href={process.env.REACT_APP_WEB_MAIN_URL + getUrl(e.row.original)} target="_blank">{e.value}</a>
    },
    {
        Header: "ProductType",
        accessor: (row) => {
            return ProductType[row.type]
        }
    },
    {
        Header: "ClickType",
        accessor: (row: Click) => {
            return ClickType[row.type]
        },
    },
    {
        Header: "Date",
        accessor: (row: Click) => {
            return row.creationDate.substring(0, 10)
        },
    }
]

const getUrl = (click: Click) => {
    if (click.type == ClickType.OpenProduct) {
        return "product/" + click.name;
    }
    else if (click.type == ClickType.GetBrand) {
        return "brand/" + click.name;
    }
    else if (click.type == ClickType.GetMagazine) {
        return "magazine/" + click.name;
    }
    else {
        return "/"
    }
}