import './header.scss';
import React, { useContext, useLayoutEffect, useState } from "react";
import { HeaderLocalizationText } from "shared/modules/layout/layout.type";
import { Language, store } from "store";
import searchNew from "../../../../assets/icons/searchNew.png";
import bagNew from "../../../../assets/icons/bagNew.png";
import microLogo from "../../../../assets/icons/H.U.B.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "./mobile/menu";
import { GlobalSearch } from "shared/components/popups/global-search/GlobalSearch";
import { Category } from "shared/models/category/Category";
import { HeaderLocalization } from "shared/modules/layout/layout.const";
import { BagPreview } from "shared/components/popups/bag/BagPreview";

interface Props {
    categories: Readonly<Category[]>
}

const Header = (props: Props) => {
    const { categories } = props;
    const [mobileMenuActive, setMobileMenuActive] = useState(true);
    const [modalSearchOpen, setSearchProduct] = useState(false);
    const [modalBagOpen, setBagActive] = useState(false);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const globalState = useContext(store);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (window.innerWidth > 570) {
            setImageHeight(40);
            setImageWidth(115);
        } else {
            setImageHeight(27);
            setImageWidth(70);
        }
    }, [])

    const setLocalization = (button: HeaderLocalizationText) => {
        if (globalState.appState?.language == Language.EN) {
            return HeaderLocalization.EN[button];
        }
        else {
            return HeaderLocalization.UA[button];
        }
    }


    const changeLocation = (placeToGo: string) => {
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__newHeader">
                    <div className="header__webMenu">
                        <Link to={"/"}>
                            <img
                                src={microLogo}
                                width={imageWidth}
                                height={imageHeight}
                                alt="Logo H.U.B."
                                title="Hub Ukrainian Brands. Main logo."
                                className="header__newLogo"
                            /></Link>
                        <div className="header__newOne">
                            <Link to={"/clothes"} onClick={() => changeLocation("/clothes")} className="header__newButtonLink">КНИГИ</Link>
                            <Link to={"/shose"} onClick={() => changeLocation("/shose")} className="header__newButtonLink">ЖУРНАЛИ</Link>
                            <Link to={"/brands"} onClick={() => changeLocation("/brands")} className="header__newButtonLink">ПИСЬМЕННИКИ</Link>
                            <Link to={"/sale"} onClick={() => changeLocation("/sale")} className="header__newButtonLink">SALE</Link>
                        </div>
                    </div>
                    <div className="header__mobilMenu">
                        <div className="header__burger" onClick={() => setMobileMenuActive(!mobileMenuActive)}>
                            <span className="header__burger--line" />
                            <span className="header__burger--line" />
                            <span className="header__burger--line" />
                        </div>
                    </div>
                    <div className="header__logo">
                        <Link to={"/"}><img
                            className="header__logo--img"
                            src={microLogo}
                            alt="Logo H.U.B."
                            title="Hub Ukrainian Brands. Main logo."
                        /></Link>
                    </div>
                    <div className="d-flex">
                        <div className="header__search">
                            <img src={searchNew} width={21} height={21} alt="Search icon" title='Search icon' className="header__search--img" onClick={() => setSearchProduct(true)} />
                        </div>
                        <div onClick={(e) => setBagActive(true)} className="header__bag-menu">
                            <img
                                src={bagNew}
                                alt="Shopping bag icon"
                                title='Shopping bag icon'
                                className="header__bag"
                                width={22}
                                height={24}
                            />
                            {
                                globalState.appState.products.length > 0 && <div className="header__bag-counter">{globalState.appState.products.length}</div>
                            }
                        </div>
                        <div className="header__language">
                            {Language[0]}
                        </div>
                    </div>
                </div>
            </div>
            <Menu categories={categories} modalIsOpen={mobileMenuActive} closeModal={(e) => setMobileMenuActive(false)}></Menu>
            <GlobalSearch closeModal={() => setSearchProduct(false)} modalSearchOpen={modalSearchOpen}></GlobalSearch>
            <BagPreview closeModal={() => setBagActive(false)} modalIsOpen={modalBagOpen}></BagPreview>
        </header>
    );
};

export default React.memo(Header);
