import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Banner } from "shared/models/banner/Banner";
import { BannerType } from "shared/models/enums/BannerType";
import { deleteRequest, get, uploadBanner } from "shared/services/HTTPUserService";
import { post } from "shared/services/Service";
import { showSuccess, showWarn } from "shared/toast/notification";
import { UploadImageContainer } from "../../shared/components/popups/product/UploadImageContainer";
import "./bannerContainer.scss";
import "./carousel.scss";

export const BannerContainer = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [images, setImages] = React.useState([]);
    const [load, setLoad] = React.useState(false);

    useEffect(() => {
        getAllBanners();
    }, []);

    const getAllBanners = () => {
        get(`Banner/GetAll`)
            .then((response) => {
                setBanners(response);
            });
    };

    const uploadImages = () => {
        setLoad(true);
        uploadBanner(`Banner/Create`, images[0])
            .then(() => {
                showSuccess("Banner uploaded successfully.")
                setLoad(false);
                getAllBanners();

            });
    }

    const ondDeleteBanner = (id: string) => {
        deleteRequest(`Banner/Delete?id=${id}`)
            .then(() => {
                showWarn('Banner was deleted!');
                getAllBanners();
            })
    }
    const ondUpdateBanner = (banner: Banner) => {
        post(`Banner/Update`, banner)
            .then(() => {
                showSuccess('Banner is activated!');
                getAllBanners();
            })
    }

    const ondUpdateProductUrl = (banner: Banner) => {
        post(`Banner/Update`, banner)
            .then(() => {
                showSuccess('Url added to Banner!');
                getAllBanners();
            })

    }

    const setUrl = (url: string, banner: Banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner!.productUrl = url;

        mutateBanner(banner, tempBanner!);
    }
    const setName = (name: string, banner: Banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner!.name = name;

        mutateBanner(banner, tempBanner!);
    }

    const setDescription = (description: string, banner: Banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner!.description = description;

        mutateBanner(banner, tempBanner!);
    }
    const setMoreFromId = (moreFromId: string, banner: Banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner!.moreFromId = moreFromId;

        mutateBanner(banner, tempBanner!);
    }
    const setType = (type: BannerType, banner: Banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner!.type = type;

        mutateBanner(banner, tempBanner!);
    }

    const setOrder = (order: number, banner: Banner) => {
        const tempBanner = banners.find(x => x.id == banner.id);
        tempBanner!.order = order;

        mutateBanner(banner, tempBanner!);
    }

    const mutateBanner = (banner: Banner, tempBanner: Banner) => {
        let bannerIndex = 0;
        banners.filter((x, i) => {
            if (x.id == banner.id) {
                bannerIndex = i;
            }
        })
        const tempBanners = [...banners];
        tempBanners[bannerIndex] = tempBanner!;

        setBanners(tempBanners);
    }

    return (
        <div>
            <h1 className="adminPageTitle">Banners</h1>
            <div>
                {banners.map(item => (
                    <div className="container d-flex mb-2" key={item.id}>
                        <div className="main__left" >
                            <img className="main__photoBannerInside" src={item.url} alt="" />
                        </div>
                        <div className="main__right">
                            <div>
                                <Form.Control
                                    className="form-control-back-ground"
                                    type="url"
                                    placeholder="Before activation put url here"
                                    value={item.productUrl}
                                    onChange={(e) => setUrl(e.target.value, item)}
                                />
                            </div>

                            <div className="pt-2">
                                <Form.Control
                                    className="form-control-back-ground"
                                    type="number"
                                    placeholder="input Order"
                                    value={item?.order}
                                    onChange={(e) => setOrder(+e.target.value, item)}
                                />
                            </div>
                            <div>
                                <Form.Control
                                    className="form-control-back-ground"
                                    type="string"
                                    placeholder="Name"
                                    value={item.name}
                                    onChange={(e) => setName(e.target.value, item)}
                                />
                            </div>
                            <div>
                                <Form.Select as="select" value={item.type} onChange={(e) => setType(+e.target.value, item)}>
                                    <option key={BannerType.None} value={BannerType.None} >None</option>
                                    <option key={BannerType.Brand} value={BannerType.Brand} >Brand</option>
                                    <option key={BannerType.Category} value={BannerType.Category} >Category</option>
                                    <option key={BannerType.Sale} value={BannerType.Sale} >Sale</option>
                                </Form.Select>
                            </div>
                            <div>
                                <Form.Control
                                    className="form-control-back-ground"
                                    type="string"
                                    placeholder="MoreFromId"
                                    value={item.moreFromId}
                                    onChange={(e) => setMoreFromId(e.target.value, item)}
                                />
                            </div>
                            <div>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    className="form-control-back-ground"
                                    type="string"
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => setDescription(e.target.value, item)}
                                />
                            </div>
                            <div className="pt-2">
                                <Button className="btn btn-warning me-2" disabled={item.productUrl == ' ' || item.isActive} onClick={() => ondUpdateBanner(item)}>Activate</Button>
                                <Button className="btn btn-danger me-2" onClick={() => ondDeleteBanner(item.id)}>Delete</Button>
                                <Button className="btn btn-warning" onClick={() => ondUpdateProductUrl(item)}>Update</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <UploadImageContainer load={load} upload={() => uploadImages()} images={images} setImages={setImages}></UploadImageContainer>
                </div>
            </div>
        </div>
    )
}