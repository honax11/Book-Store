import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Magazine } from "shared/models/magazine/Magazine";
import "./blogCommponent.scss";

export interface Props {
    articles: Magazine[];
}
export const BlogCommponent = ({ articles }: Props) => {
    const [imageWidth, setImageWidth] = useState(367);
    const [imageHeight, setImageHeight] = useState(277);
    const [transformImageWidth, setTransformImageWidth] = useState(367);
    const [transformImageHeight, setTransformImageHeight] = useState(265);

    const [mainImageWidth, setMainImageWidth] = useState(464);
    const [mainImageHeight, setMainImageHeight] = useState(272);

    useLayoutEffect(() => {
        if (window.innerWidth < 570) {
            setImageHeight(262);
            setImageWidth(346);

            setTransformImageWidth(692);
            setTransformImageHeight(524);

            const mobileMainImgWidth = window.innerWidth;
            setMainImageWidth(mobileMainImgWidth);
            setMainImageHeight(mobileMainImgWidth * 0.757 - 51);
        }
    }, []);
    return (
        <>
            <div className="blogCommponent">
                <div className="blogCommponent__left">
                    <Link to={"/magazine"} className="blogCommponent__title">
                        <h2 className="blogCommponent__title">БЛОГ</h2>
                    </Link>
                    <Link to={"/magazine/" + articles[0]?.url} className="blogCommponent__article">
                        <h3 className="blogCommponent__article">{articles[0]?.name}</h3>
                    </Link>
                    <p className="blogCommponent__description">{articles[0]?.mainDescription}</p>
                    <Link to={"/magazine/" + articles[0]?.url} className="blogCommponent__readNext blogCommponent__fontWeight">Читати далі</Link>
                </div>
                <div className="blogCommponent__right">
                    {articles[0] &&
                        <Link to={"/magazine/" + articles[0]?.url}>
                            <img
                                className="blogCommponent__photo"
                                alt={'https://ik.imagekit.io/mlrsaclra/' + articles[0]?.magazinePictures[0]?.imageAlt}
                                title={'https://ik.imagekit.io/mlrsaclra/' + articles[0]?.magazinePictures[0]?.imageAlt}
                                width={570}
                                height={431}
                                src={`https://ik.imagekit.io/mlrsaclra/tr:h-${431},w-${570}/` + articles[0]?.magazinePictures[0]?.imageUrl.substring(57)}
                            />
                        </Link>
                    }
                </div>
            </div>

            <div className="blogCommponentMobile">
                <div className="blogCommponent__left">
                    <Link to={"/magazine"} className="blogCommponent__title">
                        <h2 className="blogCommponent__title">БЛОГ</h2>
                    </Link>

                    {articles[0] && <Link to={"/magazine/" + articles[0]?.url}>
                        <img
                            className="blogCommponent__photo"
                            alt={'https://ik.imagekit.io/mlrsaclra/' + articles[0]?.magazinePictures[0]?.imageAlt}
                            title={'https://ik.imagekit.io/mlrsaclra/' + articles[0]?.magazinePictures[0]?.imageAlt}
                            width={mainImageWidth}
                            height={mainImageHeight}
                            src={`https://ik.imagekit.io/mlrsaclra/tr:h-${244},w-${322}/` + articles[0]?.magazinePictures[0]?.imageUrl.substring(57)}
                        />
                    </Link>
                    }
                    <Link to={"/magazine/" + articles[0]?.url} className="blogCommponent__article">
                        <h3 className="blogCommponent__article">{articles[0]?.name}</h3>
                    </Link>
                    <p className="blogCommponent__description">{articles[0]?.mainDescription}</p>
                    <Link to={"/magazine/" + articles[0]?.url} className="blogCommponent__readNext blogCommponent__mobile blogCommponent__fontWeight">Читати далі</Link>
                </div>
            </div>

            <div className="hubBlog">
                <div className="hubBlog__articles">
                    {articles.map((item, index) => {
                        if (index > 0) {
                            return (
                                <div key={item.id} className="hubBlog__article">
                                    {item.magazinePictures.find(x => x.order == 0)?.imageUrl &&
                                        <Link to={`/magazine/${item.url}`}>
                                            <img
                                                alt={item.magazinePictures[0]?.imageAlt}
                                                title={item.magazinePictures[0]?.imageAlt}
                                                className="hubBlog__photo"
                                                width={imageWidth}
                                                height={imageHeight}
                                                src={`https://ik.imagekit.io/mlrsaclra/tr:h-${transformImageHeight},w-${transformImageWidth}/` + item.magazinePictures[0]?.imageUrl.substring(57)}
                                            />
                                        </Link>
                                    }
                                    <div className="hubBlog__articleContent">
                                        <Link to={`/magazine/${item.url}`} className="link" ><h2 className="blogCommponent__titleArticle">{item.name}</h2></Link>
                                        <div className="blogCommponent__text">{item.mainDescription.substring(0, 153)}...</div>
                                        <Link to={`/magazine/${item.url}`} className="hubBlog__readNext">Читати далі</Link>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}