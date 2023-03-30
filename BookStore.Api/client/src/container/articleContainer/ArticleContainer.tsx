import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Product } from "shared/models/product/Product";
import { Magazine } from "shared/models/magazine/Magazine";
import { getMagazineClick } from "shared/services/customer-services/click/click-service";
import './articleContainer.scss';
import { ArticleParagraphComponent } from "./ArticleParagraphComponent";
import { MoreFromCategory } from "shared/components/more-from-category/MoreFromCategory";
import { get } from "shared/services/HTTPUserService";

const ArticleContainer = () => {
    const [article, setArticle] = useState<Magazine>();
    const { id } = useParams();
    const [imageWidth, setImageWidth] = useState(776);
    const [imageHeight, setImageHeight] = useState(587);
    const [moreProductsFromCategory, setMoreProductsFromCategory] = useState<Product[]>([]);

    useEffect(() => {
        getAllMagazine();
    }, []);

    useLayoutEffect(() => {
        if (window.innerWidth < 570) {
            setImageHeight(235);
            setImageWidth(296);
        }
    }, [])

    const getAllMagazine = () => {
        get(`Magazine/GetByUrl?url=${id}`)
            .then((response) => {
                setArticle(response);
                getMoreFromCategory(response?.categoryId);
                getMagazineClick(response.name);
            });
    };

    const getMoreFromCategory = (categoryId: string) => {
        get(`Product/GetMoreFromCategory?category=${categoryId}`)
            .then((response) => {
                setMoreProductsFromCategory(response);
            });
    };

    return (
        <>
            <Helmet>
                <title>{`${article?.name}`}</title>
                <meta name="description" content={`${article?.mainDescription.substring(0, 153)}`} />
                <link rel="canonical" href={process.env.REACT_APP_URL + `/magazine/${id}`} />
            </Helmet>
            <div className="article">
                <div className="container">
                    <div className="article__header">
                        <Link to={`/magazine`} className="article__titleMain"><h1 className="article__titleMain">H.U.B БЛОГ</h1></Link>
                    </div>
                    <div className="article__bodyArticle">
                        <div className="article__article">
                            <a rel="noreferrer" href={article?.magazinePictures.find(x => x.order === 0)?.link} target="_blank">
                                <img
                                    alt={article?.magazinePictures.find(x => x.order === 0)?.imageAlt}
                                    title={article?.magazinePictures.find(x => x.order === 0)?.imageAlt}
                                    className="article__photo"
                                    width={imageWidth}
                                    height={imageHeight}
                                    src={`https://ik.imagekit.io/mlrsaclra/tr:h-${470},w-${592}/` + article?.magazinePictures.find(x => x.order === 0)?.imageUrl.substring(57)}
                                />
                            </a>
                        </div>
                        <h1 className="article__title">{article?.name}</h1>
                        <p className="article__text">
                            {article?.mainDescription}
                        </p>
                        {article?.subDescription2 && <ArticleParagraphComponent
                            subName={article?.subName2}
                            subDescription={article?.subDescription2}
                            orderNumber={1}
                            article={article}
                        ></ArticleParagraphComponent>
                        }
                        {article?.subDescription3 &&
                            <ArticleParagraphComponent
                                subName={article?.subName3}
                                subDescription={article?.subDescription3}
                                orderNumber={2}
                                article={article}
                            ></ArticleParagraphComponent>
                        }
                        {article?.subDescription4 &&
                            <ArticleParagraphComponent
                                subName={article?.subName4}
                                subDescription={article?.subDescription4}
                                orderNumber={3}
                                article={article}
                            ></ArticleParagraphComponent>
                        }
                        {article?.subDescription5 &&
                            <ArticleParagraphComponent
                                subName={article?.subName5}
                                subDescription={article?.subDescription5}
                                orderNumber={4}
                                article={article}
                            ></ArticleParagraphComponent>
                        }
                        {article?.subDescription6 &&
                            <ArticleParagraphComponent
                                subName={article?.subName6}
                                subDescription={article?.subDescription6}
                                orderNumber={5}
                                article={article}
                            ></ArticleParagraphComponent>
                        }
                        <div className="footer__divider article__mt10"></div>
                        {article?.category && <MoreFromCategory
                            categoryUrl={article?.category?.url}
                            categoryName={article?.category?.name}
                            moreProductsFromCategory={moreProductsFromCategory}
                        ></MoreFromCategory>}

                        <div className="article__article">
                            <button className="article__btnNext">
                                <Link to={`/clothes`} className="article__btn">
                                    Перейти до каталогу
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ArticleContainer;