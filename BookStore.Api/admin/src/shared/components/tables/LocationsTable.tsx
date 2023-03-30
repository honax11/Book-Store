import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";
import { useColumns } from "shared/hook/useColumns";
import { Locations } from "shared/models/locations/Locations";
import { LOCATIONS_TABLE_COLUMNS } from "./columns/locationsColumns";

interface Props {
    locations: Locations[];
    refresh: () => void;
}

export const LocationsTable = (props: Props) => {
    const { refresh, locations } = props;
    const columns = useColumns(LOCATIONS_TABLE_COLUMNS);
    const table = useTable({ columns, data: locations }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table;

    return (
        <div className="App">
            <h2 className="adminPageTitle">Locations</h2>

            <table {...getTableProps()}>
                <thead >
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? "desc"
                                                : "asc"
                                            : ""
                                    }
                                >
                                    {column.render("Header")}
                                    <span>{column.isSorted ? (column.isSortedDesc ? <FaArrowUp className='ms-2' /> : <FaArrowDown className='ms-2' />) : ""}</span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {
                                                        cell.render("Cell")
                                                    }
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}