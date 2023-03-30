import React, { useEffect, useState } from "react";
import { LocationsTable } from "../../shared/components/tables/LocationsTable";
import { get } from "shared/services/Service";
import { Locations } from "shared/models/locations/Locations";

export const LocationsContainer = () => {

    const [locations, setLocations] = useState<Locations[]>([]);
    
    useEffect(() => {
        getAllLocations();
    }, []
    );

    const getAllLocations = () => {
        get(`Location/GetAll`)
            .then((response) => {
                setLocations(response.data);
            });
    };
    
    return (
        <>
            <LocationsTable
                locations={locations}
                refresh={() => getAllLocations()}
            ></LocationsTable>
        </>
    )
}