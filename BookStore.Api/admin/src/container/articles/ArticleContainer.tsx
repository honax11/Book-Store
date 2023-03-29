import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Magazine } from "shared/models/magazine/Magazine";
import { MagazinePictureToCreateView } from "shared/models/magazine/MagazinePictureToCreateView";
import { UploadFile } from "shared/models/product/UploadFile";
import { deleteRequest, get, upload } from "shared/services/HTTPUserService";
import { post } from "shared/services/Service";
import { showSuccess } from "shared/toast/notification";
import { UploadImageContainer } from "../../shared/components/popups/product/UploadImageContainer";
import { ArticleBlock } from "./ArticleBlock";


export const ArticleContainer = () => {
    const [article, setArticle] = useState<Magazine>();
    const [images, setImages] = React.useState([]);
    const [load, setLoad] = React.useState(false);
    const [imageAlt, setImageAlt] = useState<string>();
    const [imageLink, setImageLink] = useState<string>();
    const { id } = useParams();

    useEffect(() => {
        getMagazine();
    }, []);

    const getMagazine = () => {
        get(`Magazine/Get?id=${id}`)
            .then((response: Magazine) => {
                setArticle(response);
                let picture = response?.magazinePictures.find(x => x.order == 0);
                if (picture) {
                    setImageAlt(picture.imageAlt);
                    setImageLink(picture.link);
                }
            });
    };

    const uploadImages = () => {
        let pictureToCreate: UploadFile = {
            formFile: images[0],
            productId: id!,
            order: 0
        }
        setLoad(true);
        upload(`Magazine/UploadImage`, pictureToCreate)
            .then(() => {
                showSuccess("Image was uploaded");
                setLoad(false);
            });
    }

    const onUpdate = (event: any) => {
        event.preventDefault();

        post(`Magazine/Update`, article)
            .then(() => {
                getMagazine();
            });
    }

    const onDelete = (id: any) => {
        deleteRequest(`Magazine/DeletePicture?id=${id}`)
            .then(() => {
                getMagazine();
            });
    }

    const updatePicture = (event: any) => {
        event.preventDefault();

        let pictureToUpdate: MagazinePictureToCreateView = {
            id: article?.magazinePictures.find(x => x.order == 0)?.id!,
            imageAlt: imageAlt,
            link: imageLink
        }
        post('Magazine/UpdatePicture', pictureToUpdate)
            .then(() => {
                getMagazine();
            });
    }

    return (
        <div>
            <div>
                <div>
                    <h1>Name: {article?.name}</h1>
                    <button className="btn btn-success" type="submit" onClick={onUpdate}>
                        Save Changes
                    </button>
                    <p>{article?.mainDescription}</p>
                </div>
                <div>
                    <div>
                        <h3 className="center-item">Main Photo</h3>
                    </div>
                    <div className="center-item">
                        {article?.magazinePictures.find(x => x.order == 0) && <img src={article?.magazinePictures.find(x => x.order == 0)?.imageUrl} className={`blog-picture`} />}
                    </div>
                    <div className="center-item">
                        {article?.magazinePictures.find(x => x.order == 0) && <button onClick={() => onDelete(article?.magazinePictures.find(x => x.order == 0)?.id)} className="btn btn-danger mt-2 ms-2">Видалити</button>}
                        <UploadImageContainer load={load} upload={() => uploadImages()} images={images} setImages={setImages}></UploadImageContainer>
                    </div>
                    <Form.Group className="mt-3 mb-3 d-flex" controlId="exampleForm.ControlInput1">
                        <Form.Label className="pe-2">Image Alt:</Form.Label>
                        <Form.Control
                            type="string"
                            placeholder="Image Alt"
                            autoFocus
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
                        <Form.Label className="pt-2 pe-2">Link:</Form.Label>
                        <Form.Control
                            type="string"
                            placeholder="Link"
                            autoFocus
                            value={imageLink}
                            onChange={(e) => setImageLink(e.target.value)}
                        />
                    </Form.Group>
                    {article?.magazinePictures.find(x => x.order == 0) && <button onClick={updatePicture} className="btn btn-success mt-2 ms-2">Завантажити</button>}
                </div>
            </div>
            {id && article &&
                <ArticleBlock
                    key={2}
                    name={article.subName2}
                    description={article.subDescription2}
                    magazine={article}
                    articleId={id}
                    order={2}
                    refresh={getMagazine}
                    setMagazine={setArticle}
                    onDelete={onDelete}
                ></ArticleBlock>
            }
            {id && article &&
                <ArticleBlock
                    key={3}
                    name={article.subName3}
                    description={article.subDescription3}
                    magazine={article}
                    articleId={id}
                    order={3}
                    refresh={getMagazine}
                    setMagazine={setArticle}
                    onDelete={onDelete}
                ></ArticleBlock>
            }
            {id && article &&
                <ArticleBlock
                    key={4}
                    name={article.subName4}
                    description={article.subDescription4}
                    magazine={article}
                    articleId={id}
                    order={4}
                    refresh={getMagazine}
                    setMagazine={setArticle}
                    onDelete={onDelete}
                ></ArticleBlock>
            }
            {id && article &&
                <ArticleBlock
                    key={5}
                    name={article.subName5}
                    description={article.subDescription5}
                    magazine={article}
                    articleId={id}
                    order={5}
                    refresh={getMagazine}
                    setMagazine={setArticle}
                    onDelete={onDelete}
                ></ArticleBlock>
            }

            {id && article &&
                <ArticleBlock
                    key={6}
                    name={article.subName6}
                    description={article.subDescription6}
                    magazine={article}
                    articleId={id}
                    order={6}
                    refresh={getMagazine}
                    setMagazine={setArticle}
                    onDelete={onDelete}
                ></ArticleBlock>
            }
        </div>
    )
}