import React, { useEffect, useState } from "react";
import { AboutUsView } from "shared/models/footer/AboutUsView";
import { get } from "shared/services/HTTPUserService";
import "./aboutUsContainer.scss";

const AboutUsContainer = () => {
    const [aboutUsView, setaboutUsView] = useState<AboutUsView>();

    const getAboutUs = () => {
        get(`Footer/GetAboutUs`)
            .then((response) => {
                setaboutUsView(response);
            });
    };
    useEffect(() => {
        getAboutUs();
    }, []);
    return (
        <div className="about-us">
            <div className="container">
                <div className="about-us__title">{aboutUsView?.name}</div>
                <div className="about-us__media">
                    <div className="about-us__text">
                        <p>{aboutUsView?.firstParagraph}</p>
                        <p>{aboutUsView?.secondParagraph}</p>
                        <p>{aboutUsView?.thirdParagraph}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutUsContainer;