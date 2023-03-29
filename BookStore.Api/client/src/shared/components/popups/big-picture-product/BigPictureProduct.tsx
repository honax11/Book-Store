import { IKImage } from "imagekitio-react";
import { ButtonBack, ButtonNext, CarouselProvider, Dot, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Product } from "shared/models/product/Product";
import "./bigPictureProduct.scss"

interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
    product: Product;
}

export const BigPictureProduct = (props: Props) => {
    const { modalIsOpen, closeModal, product, } = props;

    return (
        <>
            <div className={modalIsOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalIsOpen ? "modalWindow__content active bigPictureProduct__width" : "modalWindow__content bigPictureProduct__width"} onClick={(e) => e.stopPropagation()}>
                    <div className="bigPictureProduct">
                        <div className="bigPictureProduct__btnClose">
                            <button className="btn-close" onClick={() => closeModal()}></button>
                        </div>

                        {product.pictures && <CarouselProvider
                            naturalSlideWidth={100}
                            naturalSlideHeight={140}
                            totalSlides={product.pictures.length}
                            interval={5000}
                            isPlaying={true}
                        >
                            <div className="carousel__slide-focus-ring" />
                            <Slider>
                                {product.pictures.map((item, index) => (
                                    <Slide index={index} key={index}>
                                        <IKImage
                                            urlEndpoint='https://ik.imagekit.io/mlrsaclra/'
                                            path={item.imageUrl.substring(57)}
                                            alt=''
                                            lqip={{ active: true }}
                                            loading="lazy"
                                        />
                                    </Slide>
                                ))}
                            </Slider>

                            <ButtonBack className="product__buttonBack"><IoIosArrowBack /></ButtonBack>
                            <ButtonNext className="product__buttonNext"><IoIosArrowForward /></ButtonNext>

                            <div className="product__miniminimini">
                                {product.pictures.map((item, index) => (
                                    <Dot slide={index} key={index} className="product__microCarousel">
                                        <IKImage
                                            urlEndpoint='https://ik.imagekit.io/mlrsaclra/'
                                            path={item.imageUrl.substring(57)}
                                            alt=''
                                            lqip={{ active: true }}
                                            loading="lazy"
                                        />
                                    </Dot>
                                ))}
                            </div>
                        </CarouselProvider>}
                    </div>
                </div>
            </div>
        </>
    );
}