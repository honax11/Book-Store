import { IKImage } from "imagekitio-react";
import { ButtonBack, ButtonNext, CarouselProvider, Dot, Slide, Slider } from "pure-react-carousel";
import React, { useLayoutEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ProductPicture } from "shared/models/product/ProductPicture";

export interface Props {
    productPicture: ProductPicture[] | undefined;
    setModalBigPictureProduct: () => void;
    productName: string | undefined;
    productDescription: string | undefined;
}

export const ProductCarousel = (props: Props) => {
    const { productPicture, setModalBigPictureProduct, productName, productDescription } = props;

    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [transformImageWidth, setTransformImageWidth] = useState(0);
    const [transformImageHeight, setTransformImageHeight] = useState(0);
    const [transformThumbNailWidth, setTransformThumbNailWidth] = useState(94);
    const [transformThumbNailHeight, setTransformThumbNailHeight] = useState(130);

    const [thumbNailWidth, setThumbNailWidth] = useState(94);
    const [thumbNailHeight, setThumbNailHeight] = useState(130);

    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            const height = ref.current.offsetWidth * 1.37;
            if (window.innerWidth > 570) {
                setImageHeight(height);
                setTransformImageHeight(height);

                setImageWidth(ref.current.offsetWidth);
                setTransformImageWidth(ref.current.offsetWidth);
            } else {
                setImageHeight(height);
                setTransformImageHeight(height * 2);

                setImageWidth(ref.current.offsetWidth);
                setTransformImageWidth(ref.current.offsetWidth * 2);

                setThumbNailWidth(40);
                setThumbNailHeight(72);
                setTransformThumbNailWidth(80);
                setTransformThumbNailHeight(142);
            }
        }
    }, [ref])

    return (
        <>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={140}
                totalSlides={productPicture?.length ? productPicture?.length : 0}
                className="product__positionCarousel"
                interval={5000}
                isPlaying={true}
            >
                <div ref={ref} className="carousel__slide-focus-ring" />
                {productPicture &&
                    <Slider className="product__imgCarousel">
                        {productPicture.map((item, index) => (
                            <Slide index={index} key={index} onClick={() => setModalBigPictureProduct()}>
                                <IKImage
                                    alt={productName}
                                    title={productDescription}
                                    width={imageWidth}
                                    height={imageHeight}
                                    urlEndpoint='https://ik.imagekit.io/mlrsaclra/'
                                    path={item.imageUrl.substring(57)}
                                    lqip={{ active: true }}
                                    transformation={[{
                                        height: transformImageHeight,
                                        width: transformImageWidth
                                    }]}
                                />
                            </Slide>
                        ))}
                    </Slider>
                }
                <ButtonBack className="product__buttonBack"><IoIosArrowBack /></ButtonBack>
                <ButtonNext className="product__buttonNext"><IoIosArrowForward /></ButtonNext>
                {productPicture &&
                    <div className="product__miniminimini">
                        {productPicture.map((item, index) => (
                            <Dot slide={index} key={index} className="product__microCarousel">
                                <IKImage
                                    className='product__microCarousel product-card-image'
                                    alt={productName}
                                    title={productDescription}
                                    width={thumbNailWidth}
                                    height={thumbNailHeight}
                                    urlEndpoint='https://ik.imagekit.io/mlrsaclra/'
                                    path={item.imageUrl.substring(57)}
                                    lqip={{ active: true }}
                                    transformation={[{
                                        height: transformThumbNailHeight,
                                        width: transformThumbNailWidth
                                    }]}
                                />
                            </Dot>
                        ))}
                    </div>
                }
            </CarouselProvider>
        </>
    )
}