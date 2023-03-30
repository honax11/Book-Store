import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";
import { useColumns } from "shared/hook/useColumns";
import { Click } from "shared/models/clicks/Click";
import { CLICKS_TABLE_COLUMNS } from "./columns/clicksColumns";

interface Props {
    clicks: Click[];
    refresh: () => void;
}

export const ClicksTable = (props: Props) => {
    const { clicks, refresh } = props;
    const columns = useColumns(CLICKS_TABLE_COLUMNS);
    const table = useTable({ columns, data: clicks }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table;

    return (
        <div className="App">
            <h2 className="adminPageTitle">Clicks</h2>
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