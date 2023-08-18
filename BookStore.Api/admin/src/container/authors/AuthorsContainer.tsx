import React, { useEffect, useState } from "react";
import { get } from "shared/services/HTTPUserService";
import { AuthorsTable } from "../../shared/components/tables/AuthorsTable";
import { Author } from "shared/models/author/Author";

export const AuthorsContainer = () => {
    const [authors, setAuthors] = useState<Author[]>([]);

    const getAllAuthor = () => {
        get(`Author/GetAllAction`)
            .then((response) => {
                setAuthors(response);
            });
    };
    useEffect(() => {
        getAllAuthor();
    }, []
    );

    return (
        <AuthorsTable data={authors} refresh={getAllAuthor}></AuthorsTable>
    )
}