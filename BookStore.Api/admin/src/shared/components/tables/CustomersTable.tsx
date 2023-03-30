import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";
import { useColumns } from "shared/hook/useColumns";
import { Customer } from "shared/models/customers/Customer";
import { CustomerType } from "shared/models/enums/CustomerType";
import { CUSTOMERS_TABLE_COLUMNS } from "./columns/customersColumns";

interface Props {
    data: Customer[];
    refresh: () => void;
    type: CustomerType,
    setType: (e: CustomerType) => void;
}

export const CustomersTable = (props: Props) => {
    const { refresh, data, type, setType } = props;
    const columns = useColumns(CUSTOMERS_TABLE_COLUMNS);
    const table = useTable({ columns, data }, useSortBy);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = table;

    return (
        <div className="App">
            <h2 className="adminPageTitle">Customers</h2>
            <div>Вид</div>

            <InputGroup className="mb-3">
                <Form.Select as="select" value={type} onChange={(e) => setType(+e.target.value)}>
                    <option key={CustomerType.None} value={CustomerType.None}>Без фільтру</option>
                    <option key={CustomerType.Real} value={CustomerType.Real}>Реальні</option>
                    <option key={CustomerType.Test} value={CustomerType.Test}>Тест</option>
                </Form.Select>
                <Button variant="outline-secondary" onClick={() => refresh()}>Filter</Button>
            </InputGroup>
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