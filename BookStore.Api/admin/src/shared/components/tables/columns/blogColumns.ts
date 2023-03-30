import { Column } from "react-table";
import { Magazine } from "shared/models/magazine/Magazine";


export const BLOGS_TABLE_COLUMNS: Column<Magazine>[] = [
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Url",
        accessor: "url"
    }
]