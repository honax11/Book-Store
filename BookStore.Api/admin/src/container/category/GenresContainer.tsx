import React, { useEffect, useState } from "react";
import { get } from "shared/services/HTTPUserService";
import { GenreTable } from "../../shared/components/tables/GenreTable";
import { Genre } from "shared/models/genre/Genre";

export const GenresContainer = () => {
    const [genre, setGenre] = useState<Genre[]>([]);

    const getAllGanre = () => {
        get(`Ganre/GetAll`)
            .then((response) => {
                setGenre(response);
            });
    };
    useEffect(() => {
        getAllGanre();
    }, []
    );

    return (
        <div>
            <GenreTable data={genre} refresh={() => getAllGanre()}></GenreTable>
        </div>
    )
}