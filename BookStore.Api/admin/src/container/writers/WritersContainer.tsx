import React, { useEffect, useState } from "react";
import { CustomersTable } from "../../shared/components/tables/CustomersTable";
import { get } from "shared/services/Service";
import { Customer } from "shared/models/customers/Customer";
import { CustomerType } from "shared/models/enums/CustomerType";

export const WritersContainer = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [type, setType] = useState(CustomerType.None)

    useEffect(() => {
        getAllCustomers();
    }, []
    );

    const getAllCustomers = () => {
        get(`Customer/GetAll?type=${type}`)
            .then((response) => {
                setCustomers(response.data);
            });
    };

    return (
        <div>
            <CustomersTable
                type={type}
                setType={setType}
                data={customers}
                refresh={() => getAllCustomers()}
            ></CustomersTable>
        </div>
    )
}