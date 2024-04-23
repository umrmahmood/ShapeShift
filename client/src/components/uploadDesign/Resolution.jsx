

import React, { useState } from "react";
import "../../styling/resolution.css";

const Resolution = ({selectedResolution, handleResolutionSelection}) => {
   
    const [popupVisible, setPopupVisible] = useState(false);

  
    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    return (
        <div className="wrapper-outter">
            <div className="material-intro">
                <h2>Resolution</h2>
                <div className="selection">
                    <div className="slected-swatch">
                        <h3>{selectedResolution}</h3>
                    </div>
                </div>
            </div>

            
            <div className="popup-button" onClick={togglePopup}>How to choose resolution?</div>

            {popupVisible && (
                <div onClick={togglePopup}>
                    <div>
                        <p>
                            3D printing requires depositing material one layer on top of the other, until the total height of the component is reached. The height of individual layers, therefore the amount of total layers that the printer will print will define the print resolution. <b>The lower the value, the higher the resolution and the longer the printing time</b>.
                            Usually, large objects do not require high resolution, while smaller objects need more detail.
                        </p>
                    </div>
                </div>
            )}

            <div className="swatches">
                <div
                    className="color-swatch"
                    onClick={() => {
                        handleResolutionSelection("Detailed");
                      
                    }}
                >
                    <button className="button">Detailed - 0.10mm</button>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => {
                        handleResolutionSelection("Medium");
                
                    }}
                >
                    <button>Medium - 0.20mm</button>
                </div>
                <div
                    className="color-swatch"
                    onClick={() => {
                        handleResolutionSelection("Draft");
                    }}
                >
                    <button>Draft - 0.30mm</button>
                </div>
            </div>
        </div>
    );
};

export default Resolution;



