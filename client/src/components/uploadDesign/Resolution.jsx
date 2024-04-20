// import "../../styling/resolution.css";
// import React, { useState } from "react";

// const Resolution = () => {
// 	const [selectedResolution, setSelectedResolution] = useState("");

// 	const handleResolutionSelection = (color) => {
// 		setSelectedResolution(color);
// 	};

// 	return (
// 		<div className="wrapper-outter">
// 			<div className="material-intro">
// 				<h2>Resolution</h2>
                
// 				<div className="selection">
// 					<div className="slected-swatch"> <h3>{selectedResolution}</h3></div>
                    
// 				</div>
               
// 			</div>
//             <div className="popup">What is it?</div>

// 			<div className="swatches">
// 				<div
// 					className="color-swatch"
// 					onClick={() => handleResolutionSelection("Detailed")}
// 				>
// 					<button className="button-4 button">Detailed - 0.10mm</button>
// 				</div>
// 				<div
// 					className="color-swatch"
// 					onClick={() => handleResolutionSelection("Medium")}
// 				>
// 					<button>Medium - 0.20mm</button>
// 				</div>
// 				<div
// 					className="color-swatch"
// 					onClick={() => handleResolutionSelection("Draft")}
// 				>
// 					<button>Draft - 0.30mm</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Resolution;

// <p>3D printing requires depositing material one layer on top of the other, until the total height of the component is reached. The height of individual layers, therefore the amount of total layers that the printer will print will define the print resolution. The lower the value, the higher the resolution and the longer the printing time.

// Usually, large objects do not require high resolution, while smaller objects need more detail.</p>

// 0.10mm
// 0.20mm
// 0.30mm

//Resistance
// Most FDM printed parts are not solid. Printing solid parts requires large amounts of material and long printing time, resulting in higher costs. To optimize the printing process, most components are printed with solid shells and filled with geometric structures that are empty inside.

// The strength of a design is directly related to infill percentage.

// A prototype where shape is important can be printed with very low infill, saving significantly on cost and time, while a component that will be loaded will need a higher infill percentage.

// import React, { useState } from "react";
// import "../../styling/resolution.css";

// const Resolution = () => {
//     const [selectedResolution, setSelectedResolution] = useState("");
//     const [popupVisible, setPopupVisible] = useState(false);

//     const handleResolutionSelection = (resolution) => {
//         setSelectedResolution(resolution);
//     };

//     const togglePopup = () => {
//         setPopupVisible(!popupVisible);
//     };

//     return (
//         <div className="wrapper-outter">
//             <div className="material-intro">
//                 <h2>Resolution</h2>
//                 <div className="selection">
//                     <div className="slected-swatch">
//                         <h3>{selectedResolution}</h3>
//                     </div>
//                 </div>
//             </div>

//             {/* Popup */}
//             {popupVisible && (
//                 <div className="popup" onClick={togglePopup}>
//                     <div className="popup-content">
//                         <p>
//                             3D printing requires depositing material one layer on top of the other, until the total height of the component is reached. The height of individual layers, therefore the amount of total layers that the printer will print will define the print resolution. The lower the value, the higher the resolution and the longer the printing time.
//                         </p>
//                         <p>
//                             Usually, large objects do not require high resolution, while smaller objects need more detail.
//                         </p>
//                     </div>
//                 </div>
//             )}

//             <div className="swatches">
//                 <div
//                     className="color-swatch"
//                     onClick={() => {
//                         handleResolutionSelection("Detailed");
//                         togglePopup();
//                     }}
//                 >
//                     <button className="button-4 button">Detailed - 0.10mm</button>
//                 </div>
//                 <div
//                     className="color-swatch"
//                     onClick={() => {
//                         handleResolutionSelection("Medium");
//                         togglePopup();
//                     }}
//                 >
//                     <button>Medium - 0.20mm</button>
//                 </div>
//                 <div
//                     className="color-swatch"
//                     onClick={() => {
//                         handleResolutionSelection("Draft");
//                         togglePopup();
//                     }}
//                 >
//                     <button>Draft - 0.30mm</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Resolution;


import React, { useState } from "react";
import "../../styling/resolution.css";

const Resolution = () => {
    const [selectedResolution, setSelectedResolution] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);

    const handleResolutionSelection = (resolution) => {
        setSelectedResolution(resolution);
    };

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
                    <button className="button-4 button">Detailed - 0.10mm</button>
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

