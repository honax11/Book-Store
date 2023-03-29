import React, { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllBrandsViewItem } from "shared/models/brands/GetAllBrandsViewItem";

export interface Props {
    brands: GetAllBrandsViewItem[];
    selectedLetters: string[];
}

export const BrandsListComponent = (props: Props) => {
    const { brands, selectedLetters } = props;

    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [transformImageWidth, setTransformImageWidth] = useState(0);
    const [transformImageHeight, setTransformImageHeight] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            if (window.innerWidth < 570) {
                setTransformImageHeight(170);
                setTransformImageWidth(292);

                const width = ref.current.offsetWidth / 2;
                setImageHeight(width * 0.58 - 7);
                setImageWidth(width - 21);
            } else {
                const width = ref.current.offsetWidth / 2;
                setImageHeight(width * 0.58 - 12);
                setImageWidth(width - 21);

                setTransformImageHeight(width * 0.58 - 12);
                setTransformImageWidth(width - 21);
            }
        }

    }, [ref])

    return (
        <>
            <div ref={ref} className="brands__brands">

                    {brands.filter(x => x.designers.length > 0).map(item => (
                        <div ref={ref} key={item.letter} className="brands__letter">
                            {item?.designers?.length > 0 && <div className="brands__brand">{item.letter}</div>}
                            {
                                <div className="brands__imageBrand">
                                    {item.designers.map(designer => {
                                        return selectedLetters.includes(item.letter) ?
                                            <div key={designer.id}>
                                                <Link to={`/brand/${designer.url}`} >
                                                    <img
                                                        alt={designer.imageAlt}
                                                        title={designer.imageAlt}
                                                        height={imageHeight}
                                                        width={imageWidth}
                                                        className="brands__imagePicture"
                                                        src={`https://ik.imagekit.io/mlrsaclra/tr:h-${transformImageHeight},w-${transformImageWidth}/` + designer?.pictures[0]?.url.substring(57)}
                                                    />
                                                </Link>
                                            </div>
                                            :
                                            ""
                                    })}
                                </div>
                            }
                        </div>
                    ))}
                </div>
        </>
    )
}