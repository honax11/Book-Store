import { Column } from "react-table";
import { Ganre } from "shared/models/ganre/Ganre";

export const GANRE_TABLE_COLUMNS: Column<Ganre>[] = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Name",
        accessor: "name"
    },
];