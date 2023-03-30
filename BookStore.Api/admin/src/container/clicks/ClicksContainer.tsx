import React, { useEffect, useState } from "react";
import { ClicksTable } from "../../shared/components/tables/ClicksTable";
import { get } from "shared/services/Service";
import { Click } from "shared/models/clicks/Click";

export const ClicksContainer = () => {

    const [clicks, setClicks] = useState<Click[]>([]);

    useEffect(() => {
        getAllClicks();
    }, []
    );

    const getAllClicks = () => {
        get(`Click/GetAll`)
            .then((response) => {
                console.log(response);
                setClicks(response.data);
            });
    };

    return (
        <>
            <ClicksTable
                clicks={clicks}
                refresh={() => getAllClicks}
            ></ClicksTable>
        </>
    )
}