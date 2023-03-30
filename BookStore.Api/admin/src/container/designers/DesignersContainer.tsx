import React, { useEffect, useState } from "react";
import { Designer } from "shared/models/designer/Designer";
import { get } from "shared/services/HTTPUserService";
import { DesignerTable } from "../../shared/components/tables/DesignerTable";

export const DesignersContainer = () => {
    const [designers, setDesigners] = useState<Designer[]>([]);

    const getAllDesigners = () => {
        get(`Designer/GetAllWithPictures`)
            .then((response) => {
                setDesigners(response);
            });
    };
    useEffect(() => {
        getAllDesigners();
    }, []
    );

    return (
        <DesignerTable data={designers} refresh={getAllDesigners}></DesignerTable>
    )
}