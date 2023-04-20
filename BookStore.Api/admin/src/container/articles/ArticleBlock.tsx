import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Magazine } from "shared/models/magazine/Magazine";
import { MagazinePictureToCreateView } from "shared/models/magazine/MagazinePictureToCreateView";
import { UploadFile } from "shared/models/product/UploadFile";
import { upload } from "shared/services/HTTPUserService";
import { post } from "shared/services/Service";
import { showSuccess } from "shared/toast/notification";
import { UploadImageContainer } from "../../shared/components/popups/product/UploadImageContainer";
import './articleBlock.scss';

interface Props {
    order: number;
    articleId: string;
    refresh: () => void;
    description: string | undefined;
    name: string | undefined;
    magazine: Magazine;
    setMagazine: (magazine: Magazine) => void;
    onDelete: (id: any) => void;
}

export const ArticleBlock = (props: Props) => {
    const { order, articleId, magazine, name, setMagazine, description, refresh, onDelete } = props;

    const [images, setImages] = React.useState([]);
    const [load, setLoad] = React.useState(false);
    const [imageAlt, setImageAlt] = useState<string>();
    const [imageLink, setImageLink] = useState<string>();

    useEffect(() => {
        let picture = magazine?.magazinePictures.find(x => x.order == order - 1);
        if (picture) {
            setImageAlt(picture.imageAlt);
            setImageLink(picture.link);
        }
    }, []);

    const setDescription = (description: string) => {
        if (order == 2) {
            setMagazine({ ...magazine, subDescription2: description })
        }
        if (order == 3) {
            setMagazine({ ...magazine, subDescription3: description })
        }
        if (order == 4) {
            setMagazine({ ...magazine, subDescription4: description })
        }
        if (order == 5) {
            setMagazine({ ...magazine, subDescription5: description })
        }
        if (order == 6) {
            setMagazine({ ...magazine, subDescription6: description })
        }
    }

    const setName = (name: string) => {
        if (order == 2) {
            setMagazine({ ...magazine, subName2: name })
        }
        if (order == 3) {
            setMagazine({ ...magazine, subName3: name })
        }
        if (order == 4) {
            setMagazine({ ...magazine, subName4: name })
        }
        if (order == 5) {
            setMagazine({ ...magazine, subName5: name })
        }
        if (order == 6) {
            setMagazine({ ...magazine, subName6: name })
        }
    }

    const uploadImages = () => {
        let pictureToCreate: UploadFile = {
            formFile: images[0],
            productId: articleId,
            order: order - 1
        };
        setLoad(true);
        upload(`Magazine/UploadImage`, pictureToCreate)
            .then(() => {
                showSuccess("Image was uploaded");
                setLoad(false);
                refresh();
            });
    }

    const updatePicture = (event: any) => {
        event.preventDefault();
        let pictureToUpdate: MagazinePictureToCreateView = {
            id: magazine?.magazinePictures.find(x => x.order == order - 1)?.id!,
            imageAlt: imageAlt,
            link: imageLink
        }
        post('Magazine/UpdatePicture', pictureToUpdate)
            .then(() => {
                refresh();
            });
    }


    return (
        <div>
            <div>
                <h2 className="center-header">Header №: {order}</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Sub Name-{order}</Form.Label>
                    <Form.Control type="name" placeholder={`Name-${order}`} autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Sub Description {order}</Form.Label>
                    <Form.Control as="textarea" rows={7} type="description" placeholder={`Description-${order}`} autoFocus value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
            </div>
            <div>
                <div>
                    <h4 className="center-header">Photo for Header №: {order}</h4>
                </div>
                <div className="center-item">
                    {magazine?.magazinePictures.find(x => x.order == order - 1) && <img src={magazine?.magazinePictures.find(x => x.order == order - 1)?.imageUrl} className="blog-picture" />}
                </div>
                <div className="center-item">
                    {magazine?.magazinePictures.find(x => x.order == order - 1) && <button onClick={() => onDelete(magazine?.magazinePictures.find(x => x.order == order - 1)?.id)} className="btn btn-danger mt-2 ms-2">Видалити</button>}
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
                {magazine?.magazinePictures.find(x => x.order == order - 1) && <button onClick={updatePicture} className="btn btn-success mt-2 ms-2">Завантажити</button>}
            </div>
        </div>
    );
}
