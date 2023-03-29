import React, { Fragment, useLayoutEffect, useState } from "react";
import { Magazine } from "shared/models/magazine/Magazine";

interface Props {
    subName: string | undefined;
    subDescription: string;
    orderNumber: number;
    article: Magazine | undefined;
}

export type HTMLData = {
    content: { "__html": string };
};

export const ArticleParagraphComponent = (props: Props) => {
    const [imageWidth, setImageWidth] = useState(335);
    const [imageHeight, setImageHeight] = useState(460);

    useLayoutEffect(() => {
        if (window.innerWidth < 570) {
            setImageHeight(427);
            setImageWidth(296);
        }
    }, [])

    const { subName, subDescription, orderNumber, article } = props;
    const [htmlData, setHtmlData] = useState<HTMLData>({
        content: { "__html": subDescription }
    });
    return (
        <>
            <div className="article__miniTitle"><h2><b>{subName}</b></h2></div>
            {subDescription && <p dangerouslySetInnerHTML={htmlData.content} className="article__text">
            </p>
            }
            <div className="d-flex justify-content-center">
                {article?.magazinePictures.find(x => x.order === orderNumber) &&
                    <a href={article?.magazinePictures.find(x => x.order === orderNumber)?.link}>
                        <img
                            className="article__miniPhoto"
                            alt={article?.magazinePictures.find(x => x.order === orderNumber)?.imageAlt}
                            title={article?.magazinePictures.find(x => x.order === orderNumber)?.imageAlt}
                            width={imageWidth}
                            height={imageHeight}
                            src={`https://ik.imagekit.io/mlrsaclra/tr:h-${imageHeight},w-${imageWidth}/` + article?.magazinePictures.find(x => x.order === orderNumber)?.imageUrl.substring(57)}
                        />
                    </a>}
            </div>
        </>
    )
}