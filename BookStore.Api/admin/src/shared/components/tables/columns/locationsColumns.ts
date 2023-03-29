import { Column } from "react-table";
import { Locations } from "shared/models/locations/Locations";

export const LOCATIONS_TABLE_COLUMNS: Column<Locations>[] = [
    {
        Header: "Country",
        accessor: "country"
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "Orders Count",
        accessor: "orderCount"
    }
]