import React, { useEffect, useState } from "react";
import { get } from "shared/services/HTTPUserService";
import { AuthorTable } from "../../shared/components/tables/AuthorTable";
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
        <AuthorTable data={authors} refresh={getAllDesigners}></AuthorTable>
    )
}