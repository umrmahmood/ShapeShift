

// import React, { useState, useEffect } from "react";
// import Resolution from "./Resolution";
// import Resistance from "./Resistance";
// import QuoteSummary from "./QuoteSummary";
// import Material from "./Materials";
// import ColorSelector from "./ColorSelector";
// import "../../styling/quoteSummary.css";
// import "../../styling/configComponent.css";
// import UploadFile from "./UploadFile";
// import Navbar from "../../components/Navbar.jsx";
// import Footer from "../../components/Footer.jsx";

// const Popup = ({ material, color, resolution, resistance, onClose }) => {
// 	return (
// 		<div className="popup-container">
// 			<div className="popup" onClick={(e) => e.stopPropagation()}>
// 				<QuoteSummary
// 					material={material}
// 					color={color}
// 					resolution={resolution}
// 					resistance={resistance}
// 				/>
// 				<div className="popupwindow-button">
// 					<button className="close-btn" onClick={onClose}>
// 						Close
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const ConfigComponent = () => {
// 	const [selectedMaterial, setSelectedMaterial] = useState("ABS");
// 	const [selectedColor, setSelectedColor] = useState("");
// 	const [selectedResolution, setSelectedResolution] = useState("");
// 	const [selectedResistance, setSelectedResistance] = useState("");
// 	const [showPopup, setShowPopup] = useState(false);

// 	const handleMaterialChange = (e) => {
// 		setSelectedMaterial(e.target.value);
// 	};

// 	const handleColorSelection = (color) => {
// 		setSelectedColor(color);
// 	};

// 	const handleResistanceSelection = (resistance) => {
// 		setSelectedResistance(resistance);
// 	};

// 	const handleResolutionSelection = (resolution) => {
// 		setSelectedResolution(resolution);
// 	};

// 	const handleSendQuote = () => {
// 		setShowPopup(true);
// 	};

// 	const handleClosePopup = () => {
// 		setShowPopup(false);
// 		setSelectedColor("");
// 		setSelectedResolution("");
// 		setSelectedResistance("");
// 		setSelectedMaterial("ABS");
// 	};

// 	useEffect(() => {
// 		const handleClickOutside = (event) => {
// 			if (showPopup && !event.target.closest(".popup")) {
// 				setShowPopup(false);
// 			}
// 		};

// 		document.addEventListener("mousedown", handleClickOutside);

// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [showPopup]);

// 	return (
// 		<>
// 		<Navbar/>
// 			<div className="config-container">
// 				<div>
// 					<Material
// 						selectedMaterial={selectedMaterial}
// 						handleMaterialChange={handleMaterialChange}
// 					/>

// 					<ColorSelector
// 						selectedColor={selectedColor}
// 						handleColorSelection={handleColorSelection}
// 					/>
// 					<Resolution
// 						selectedResolution={selectedResolution}
// 						handleResolutionSelection={handleResolutionSelection}
// 					/>
// 					<Resistance
// 						selectedResistance={selectedResistance}
// 						handleResistanceSelection={handleResistanceSelection}
// 					/>
// 				</div>

// 				<div className="upload-file">
// 					<UploadFile/>
// 				</div>
// 			</div>

// 			{!showPopup ? (
// 				<button onClick={handleSendQuote}>Send Quote</button>
// 			) : null}

// 			{showPopup && (
// 				<Popup
// 					material={selectedMaterial}
// 					color={selectedColor}
// 					resolution={selectedResolution}
// 					resistance={selectedResistance}
// 					onClose={handleClosePopup}
// 				/>
// 			)}

// 			<Footer/>
// 		</>
// 	);
// };

// export default ConfigComponent;

import React, { useState, useEffect } from "react";
import Resolution from "./Resolution";
import Resistance from "./Resistance";
import QuoteSummary from "./QuoteSummary";
import Material from "./Materials";
import ColorSelector from "./ColorSelector";
import "../../styling/quoteSummary.css";
import "../../styling/configComponent.css";
import UploadFile from "./UploadFile";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

const Popup = ({ material, color, resolution, resistance, onClose }) => {
	return (
		<div className="popup-container">
			<div className="popup" onClick={(e) => e.stopPropagation()}>
				<QuoteSummary
					material={material}
					color={color}
					resolution={resolution}
					resistance={resistance}
				/>
				<div className="popupwindow-button">
					<button className="close-btn" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

const ConfigComponent = () => {
	const [selectedMaterial, setSelectedMaterial] = useState("ABS");
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedResolution, setSelectedResolution] = useState("");
	const [selectedResistance, setSelectedResistance] = useState("");
	const [showPopup, setShowPopup] = useState(false);

	const handleMaterialChange = (e) => {
		setSelectedMaterial(e.target.value);
	};

	const handleColorSelection = (color) => {
		setSelectedColor(color);
	};

	const handleResistanceSelection = (resistance) => {
		setSelectedResistance(resistance);
	};

	const handleResolutionSelection = (resolution) => {
		setSelectedResolution(resolution);
	};

	const handleSendQuote = () => {
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		setSelectedColor("");
		setSelectedResolution("");
		setSelectedResistance("");
		setSelectedMaterial("ABS");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (showPopup && !event.target.closest(".popup")) {
				setShowPopup(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showPopup]);

	return (
		<>
			<Navbar/>
			<div className="config-container">
				<div className="left-div">
					<Material
						selectedMaterial={selectedMaterial}
						handleMaterialChange={handleMaterialChange}
					/>

					<ColorSelector
						selectedColor={selectedColor}
						handleColorSelection={handleColorSelection}
					/>
					<Resolution
						selectedResolution={selectedResolution}
						handleResolutionSelection={handleResolutionSelection}
					/>
					<Resistance
						selectedResistance={selectedResistance}
						handleResistanceSelection={handleResistanceSelection}
					/>
				</div>

				<div className="right-div">
					<div className="upload-file">
						<UploadFile />
					</div>
				</div>
			</div>

<div className="button-quote">{!showPopup ? (
				<button onClick={handleSendQuote}>Send Quote</button>
			) : null}</div>
			

			{showPopup && (
				<Popup
					material={selectedMaterial}
					color={selectedColor}
					resolution={selectedResolution}
					resistance={selectedResistance}
					onClose={handleClosePopup}
				/>
			)}

			<Footer />
		</>
	);
};

export default ConfigComponent;

