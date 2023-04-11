import { Column } from "react-table";
import { Genre } from "shared/models/genre/Genre";

export const GENRE_TABLE_COLUMNS: Column<Genre>[] = [
    {
        Header: "Id",
        accessor: "id"
    },
    {
        Header: "Name",
        accessor: "name"
    },
];