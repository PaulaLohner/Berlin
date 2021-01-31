import React from "react";

const InfoModal = ({ selected, onCloseClick }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{selected.name}</h2>
                <p>{selected.address}</p>
                <img src={selected.image} alt={selected.name}></img>
                <p>{selected.description}</p>
                <p className="close-modal" onClick={() => onCloseClick()}>
                    Back to the map
                </p>
            </div>
        </div>
    );
};

export default InfoModal;
