import React from "react";
import { GetPrevInfoView } from "shared/models/banner/GetPrevInfoView";

interface Props {
    info: GetPrevInfoView | undefined;
}
export const PrevComponent = ({ info }: Props) => (
    <>
        <div className="prev">
            <div>
                <h1 className="prev__hub">Hub Ukrainian Books</h1>
                <h2 className="prev__text">{info?.h2Desc}</h2>
                <h3 className="prev__text">{info?.h3Desc}</h3>
                <h3 className="prev__text mb-0">{info?.lastH3Desc}</h3>
            </div>
        </div>
    </>
);