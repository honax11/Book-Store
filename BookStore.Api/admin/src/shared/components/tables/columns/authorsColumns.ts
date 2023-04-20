import { Column } from "react-table";
import { Author } from "shared/models/author/Author";


export const AUTHORS_TABLE_COLUMNS: Column<Author>[] = [
    {
        Header: "Id",
        accessor: "id"

    },
    {
        Header: "First Name",
        accessor: "firstName"
    },
    {
        Header: "Last Name",
        accessor: "secondName"
    }
]