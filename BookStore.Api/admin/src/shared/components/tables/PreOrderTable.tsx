import React from "react";
import { useColumns } from "shared/hook/useColumns";
import { PREORDERS_TABLE_COLUMNS } from "shared/components/tables/columns/preOrderProductsColumns";
import { useSortBy, useTable } from "react-table";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { PreOrderedProduct } from "shared/models/pre-ordered-products/PreOrderedProduct";

interface Props {
    products: PreOrderedProduct[]
}

export const PreOrderTable = (props: Props) => {
    const { products } = props;
    const columns = useColumns(PREORDERS_TABLE_COLUMNS);
    const table = useTable({ columns, data: products }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table;

    return (
        <>
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
        </>
    )
}