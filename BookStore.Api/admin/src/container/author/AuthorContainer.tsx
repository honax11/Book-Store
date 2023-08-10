import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "shared/services/HTTPUserService";
import { onDelete } from "shared/services/Service";
import { Author } from "shared/models/author/Author";

export const AuthorContainer = () => {
    const [author, setAuthor] = useState<Author>();
    const [load, setLoad] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const [confirmation, setConfirmatin] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getAuthor();
    }, [])

    const getAuthor = () => {
        debugger;
        get(`Author/FindId?id=${id}`)
            .then((item) => {
                setAuthor(item);
            });
    };

    const onDeleteDesignerBaner = () => {
        setConfirmatin(true);
    }

    const deleteDesignerBanner = (id?: string) => {
        onDelete(`Designer/DeleteBaner?id=${id}`)
            .then(() => {
                setConfirmatin(false);
                getAuthor();
            });
    }

    return (
        <>
            <div>
                <p><b>Name: </b>{author?.firstName} {author?.secondName}</p>
            </div>
            <div>
                <p><b>Description: </b>{author?.id}</p>
            </div>
            {author?.ganres &&
                <div>
                    {author?.ganres.map(item => {
                        return <p><b>Ganres: </b>{item?.name}</p>
                    }
                    )}
                </div>
            }
            <div>
                <p><b>Birth Day: </b>{author?.birthDay.substring(0, 10)}</p>
            </div>
            {author?.dayOfDeath &&
                <div>
                    <p><b>Day Of Death: </b>{author?.dayOfDeath.substring(0, 10)}</p>
                </div>
            }
            <div>
                <p><b>isActive: </b>{author?.isActive.toString()}</p>
            </div>
            <div>
                <p><b>isDeleted: </b>{author?.isDeleted.toString()}</p>
            </div>
        </>
    )
}