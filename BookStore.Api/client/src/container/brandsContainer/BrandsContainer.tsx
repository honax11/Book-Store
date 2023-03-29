import React, { useEffect, useState } from "react";
import "./brandsContainer.scss";
import { GetAllBrandsView } from "shared/models/brands/GetAllBrandsView";
import { GetAllBrandsViewItem } from "shared/models/brands/GetAllBrandsViewItem";
import { Helmet } from "react-helmet-async";
import { getAllBrandsClick } from "shared/services/customer-services/click/click-service";
import { get } from "shared/services/HTTPUserService";
import { BrandsListComponent } from "./BrandsListComponent";

const BrandsContainer = () => {
    const [brands, setBrands] = useState<GetAllBrandsViewItem[]>([]);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const setLetterActive = (letter: string) => {
        if (selectedLetters.includes(letter)) {
            const tempLetters = selectedLetters.filter((x) => {
                if (letter !== x) {
                    return x;
                }
            });
            setSelectedLetters(tempLetters);
        }
        else {
            const tempLetters = [...selectedLetters];
            tempLetters.shift();
            tempLetters.push(letter);
            setSelectedLetters(tempLetters);
        }
    }

    useEffect(() => {
        getAllBrands();
    }, []);

    const getAllBrands = () => {
        get(`Designer/GetAllForBrands`)
            .then((response: GetAllBrandsView) => {
                setBrands(response.brands);
                setTitle(response.title);
                setDesc(response.description);
                const tempLetters = [...selectedLetters];
                response.brands.map(item => {
                    if (item.designers.length > 0) {
                        tempLetters.push(item.letter);
                    }
                })
                setSelectedLetters(tempLetters);
            });
        getAllBrandsClick();
    };
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={desc} />
                <link rel="canonical" href={process.env.REACT_APP_URL + '/brands'} />
            </Helmet>
            <div className="brands">
                <div className="container">
                    <h1 className="clothes__title">Список українських брендів</h1>
                    <div className="brands__header">
                        {brands.map(item => (
                            <p key={item.letter} onClick={() => setLetterActive(item.letter)} className={`brands__letterIsActiv ${selectedLetters.includes(item.letter) ? "brands__letterActiv" : " "}`}>{item.letter}</p>
                        ))}
                    </div>
                    <div className="brands__media">
                        <BrandsListComponent
                            brands={brands}
                            selectedLetters={selectedLetters}
                        ></BrandsListComponent>
                    </div>
                </div>
            </div>
        </>
    )
}
export default BrandsContainer;