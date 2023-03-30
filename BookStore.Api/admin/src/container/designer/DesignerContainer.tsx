import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ConfirmationPopup } from "shared/components/popups/confirmation-popup/ConfirmationPopup";
import { Category } from "shared/models/category/Category";
import { Designer } from "shared/models/designer/Designer";
import { DesignerSize } from "shared/models/designer/DesignerSize";
import { UploadFile } from "shared/models/product/UploadFile";
import { get, upload } from "shared/services/HTTPUserService";
import { onDelete } from "shared/services/Service";
import { showSuccess } from "shared/toast/notification";
import { UploadImageContainer } from "../../shared/components/popups/product/UploadImageContainer";
import { DesignerSizeTable } from "../../shared/components/tables/DesignerSizeTable";

export const DesignerContainer = () => {
    const [designer, setDesigner] = useState<Designer>();
    const [designerSizes, setDesignerSizes] = useState<DesignerSize[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [load, setLoad] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const [confirmation, setConfirmatin] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getDesigner();
        getDesignerSizes();
        getAllCategories();
    }, [])

    const getDesigner = () => {
        get(`Designer/GetById?id=${id}`)
            .then((item) => {
                setDesigner(item);
            });
    };

    const getAllCategories = () => {
        get(`Category/GetAll`)
            .then((response) => {
                setCategories(response);
            });
    };

    const getDesignerSizes = () => {
        get(`DesignerSize/GetAllByDesigner?id=${id}`)
            .then((response) => {
                setDesignerSizes(response);
            });
    }

    const uploadImages = () => {
        let pictureToCreate: UploadFile = {
            formFile: images[0],
            productId: designer!.id,
        }
        setLoad(true);
        upload(`Designer/UploadImage`, pictureToCreate)
            .then(() => {
                showSuccess("Image was uploaded");
                setLoad(false);
                getDesigner();
            });
    }

    const onDeleteDesignerBaner = () => {
        setConfirmatin(true);
    }

    const deleteDesignerBanner = (id?: string) => {
        onDelete(`Designer/DeleteBaner?id=${id}`)
            .then(() => {
                setConfirmatin(false);
                getDesigner();
            });
    }

    return (
        <>
            <div>
                <p><b>Name: </b>{designer?.firstName} {designer?.lastName}</p>
            </div>
            <div>
                <p><b>Description: </b>{designer?.description}</p>
            </div>
            <div>
                {designer?.pictures &&
                    <div>
                        <img style={{ maxWidth: '200px' }} src={designer?.pictures[0]?.url} />
                        <Button className="btn btn-danger" onClick={() => onDeleteDesignerBaner()}>Delete Banner</Button>
                    </div>}
            </div>
            <div>
                <UploadImageContainer load={load} upload={() => uploadImages()} images={images} setImages={setImages}></UploadImageContainer>
            </div>
            {designer &&
                <DesignerSizeTable
                    data={designerSizes}
                    designerId={id!}
                    refresh={getDesignerSizes}
                    categories={categories}
                ></DesignerSizeTable>}
            <ConfirmationPopup modalIsOpen={confirmation} product={designer?.firstName + " " + designer?.lastName} closeModal={() => setConfirmatin(false)} onDelete={() => deleteDesignerBanner(designer?.pictures[0]?.id)}></ConfirmationPopup>
        </>
    )
}