import React from "react";
import "./in-development-popup.scss";

interface Props {
    message: string;
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const InDevelopmentPopup = (props: Props) => {
    const { message, modalIsOpen, closeModal } = props;

    return (
        <>
            <div className={modalIsOpen ? "modalWindow active" : "modalWindow"} onClick={() => closeModal()}>
                <div className={modalIsOpen ? "modalWindow__content active" : "modalWindow__content"} onClick={(e) => e.stopPropagation()}>
                    <div>
                        <div className="popup__text">На данний момент "{message}" в розробці</div>
                    </div>

                    <div>
                        <button onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}