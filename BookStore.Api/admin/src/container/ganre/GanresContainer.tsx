import React, { useEffect, useState } from "react";
import { get } from "shared/services/HTTPUserService";
import { GanreTable } from "../../shared/components/tables/GanreTable";
import { Ganre } from "shared/models/ganre/Ganre";

export const GanresContainer = () => {
    const [ganre, setGanre] = useState<Ganre[]>([]);

    const getAllGanre = () => {
        get(`Ganre/GetAll`)
            .then((response) => {
                setGanre(response);
            });
    };
    useEffect(() => {
        getAllGanre();
    }, []
    );

    return (
        <div>
            <GanreTable data={ganre} refresh={() => getAllGanre()}></GanreTable>
        </div>
    )
}