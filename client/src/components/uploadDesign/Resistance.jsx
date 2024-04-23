


import "../../styling/resolution.css";
import React, { useState } from "react";

const Resistance = ({selectedResistance, handleResistanceSelection}) => {
	
	const [popupVisible, setPopupVisible] = useState(false);

	const togglePopup = () => {
		setPopupVisible(!popupVisible);
	};
	return (
		<div className="wrapper-outter">
			<div className="material-intro">
				<h2>Resistance</h2>
				<div className="selection">
					<div className="slected-swatch">
						<h3>{selectedResistance}</h3>
					</div>
				</div>
			</div>

			<div className="popup-button" onClick={togglePopup}>
				How to choose resistance?
			</div>

			{popupVisible && (
				<div onClick={togglePopup}>
					<div>
						<p>
							Most FDM printed parts are not solid. Printing solid parts
							requires large amounts of material and long printing time,
							resulting in higher costs. To optimize the printing process, most
							components are printed with solid shells and filled with geometric
							structures that are empty inside.
							<b>
								The strength of a design is directly related to infill
								percentage
							</b>
							. A prototype where shape is important can be printed with very
							low infill, saving significantly on cost and time, while a
							component that will be loaded will need a higher infill
							percentage.
						</p>
					</div>
				</div>
			)}
			<div className="swatches">
				<div
					className="color-swatch"
					onClick={() => handleResistanceSelection("20%")}
				>
					<button className="button">20%</button>
				</div>
				<div
					className="color-swatch"
					onClick={() => handleResistanceSelection("60%")}
				>
					<button>60%</button>
				</div>
				<div
					className="color-swatch"
					onClick={() => handleResistanceSelection("80%")}
				>
					<button>80%</button>
				</div>
			</div>
		</div>
	);
};

export default Resistance;






