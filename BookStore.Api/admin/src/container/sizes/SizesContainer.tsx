import React, { useEffect, useState } from "react";
import { Size } from "shared/models/sizes/Size";
import { get } from "shared/services/HTTPUserService";
import { SizeTablet } from "../../shared/components/tables/SizeTablet";

export const SizesContainer = () => {
    const [sizes, setsizes] = useState<Size[]>([]);

    const getAllSizes = () => {
        get(`Size/GetAll`)
            .then((response) => {
                setsizes(response);
            });
    };
    useEffect(() => {
        getAllSizes();
    }, []
    );

    return (
        <SizeTablet data={sizes} refresh={getAllSizes}></SizeTablet>
    )
}