import React from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { Customer } from "shared/models/customers/Customer";

export const CUSTOMERS_TABLE_COLUMNS: Column<Customer>[] = [
    {
        Header: "First Name",
        accessor: "firstName",
        Cell: (e) => <Link to={"/admin/customer/" + e.row.original.id}>{e.value}</Link>
    },
    {
        Header: "Last Name",
        accessor: "lastName"
    },
    {
        Header: "Phone",
        accessor: "phone"
    },
    {
        Header: "Email",
        accessor: "email"
    }
]