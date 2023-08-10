import React, { useEffect, useState } from "react";
import { get } from "shared/services/HTTPUserService";
import { AuthorsTable } from "../../shared/components/tables/AuthorsTable";
import { Author } from "shared/models/author/Author";

export const AuthorsContainer = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    const getAllDesigners = () => {
        get(`Author/GetAll`)
            .then((response) => {
                setAuthors(response);
            });
    };
    useEffect(() => {
        getAllDesigners();
    }, []
    );

    return (
        <AuthorsTable data={authors} refresh={getAllDesigners}></AuthorsTable>
    )
}