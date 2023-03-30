import { Column } from "react-table";
import { Designer } from "shared/models/designer/Designer";


export const DESIGNERS_TABLE_COLUMNS: Column<Designer>[] = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Firs Name",
        accessor: "firstName"
    },
    {
        Header: "Last Name",
        accessor: "lastName"
    }
]