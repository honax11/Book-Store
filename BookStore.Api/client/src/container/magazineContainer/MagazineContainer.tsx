import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./magazine.scss";
import { Magazine } from "shared/models/magazine/Magazine";
import { Helmet } from "react-helmet-async";
import { getMagazineAllClick } from "shared/services/customer-services/click/click-service";
import { get } from "shared/services/HTTPUserService";
import { BLOG_DESC } from "shared/modules/ceo/CEODesctiptionConst";
import { BLOG_TITLE } from "shared/modules/ceo/CEOTitleConst";

const MagazineContainer = () => {
    const [articles, setArticles] = useState<Magazine[]>([]);
    const [imageWidth, setImageWidth] = useState(367);
    const [imageHeight, setImageHeight] = useState(277);
    const [transformImageWidth, setTransformImageWidth] = useState(367);
    const [transformImageHeight, setTransformImageHeight] = useState(277);

    const getAllMagazines = () => {
        get(`Magazine/GetAll`)
            .then((response) => {
                setArticles(response);
            });
    };
    useEffect(() => {
        getAllMagazines();
        getMagazineAllClick();
    }, []);

    useLayoutEffect(() => {
        if (window.innerWidth < 570) {
            setImageHeight(223);
            setImageWidth(295);

            setTransformImageWidth(560);
            setTransformImageHeight(422);
        }
    }, []);

    return (
        <>
            <Helmet>
                <title>{BLOG_TITLE}</title>
                <meta name="description" content={BLOG_DESC} />
                <link rel="canonical" href={process.env.REACT_APP_URL + '/magazine'} />
            </Helmet>
            <div className="container">
                <h1 className="hubBlog__microTitle">БЛОГ</h1>
                <div className="hubBlog">
                    <div className="hubBlog__articles">
                        {articles.map(item => (
                            <div key={item.id} className="hubBlog__article">
                                {item.magazinePictures.find(x => x.order == 0)?.imageUrl &&
                                    <img
                                        alt={item.magazinePictures[0]?.imageAlt}
                                        title={item.magazinePictures[0]?.imageAlt}
                                        width={imageWidth}
                                        height={imageHeight}
                                        className="hubBlog__photo"
                                        src={`https://ik.imagekit.io/mlrsaclra/tr:h-${transformImageHeight},w-${transformImageWidth}/` + item.magazinePictures[0]?.imageUrl.substring(57)}
                                    />
                                }
                                <div className="hubBlog__articleContent">
                                    <Link to={`/magazine/${item.url}`} className="link" ><h2 className="hubBlog__titleArticle">{item.name}</h2></Link>
                                    <div className="hubBlog__text">{item.mainDescription.substring(0, 153)}...</div>
                                    <Link to={`/magazine/${item.url}`} className="hubBlog__readNext">Читати далі</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default MagazineContainer;