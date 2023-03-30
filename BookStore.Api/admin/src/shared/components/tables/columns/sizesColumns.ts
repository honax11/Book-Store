import { Column } from "react-table";
import { ProductType } from "shared/models/category/ProductType";
import { Size } from "shared/models/sizes/Size";


export const SIZES_TABLE_COLUMNS: Column<Size>[] = [
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
    {
        Header: "Order",
        accessor: "order"
    }
]