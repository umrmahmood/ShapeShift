import React, { useState, useEffect } from "react";
import Resolution from "./Resolution";
import Resistance from "./Resistance";
import QuoteSummary from "./QuoteSummary";
import Material from "./Materials";
import ColorSelector from "./ColorSelector";
import "../../styling/quoteSummary.css";
import "../../styling/configComponent.css";
import UploadFile from "./UploadFile";


const Popup = ({
	file,
	fileName,
	material,
	color,
	resolution,
	resistance,
	quantity,
	onClose,
}) => {
	return (
		<div className="popup-container">
			<div className="popup" onClick={(e) => e.stopPropagation()}>
				<QuoteSummary
					fileName={fileName}
					quantity={quantity}
					material={material}
					color={color}
					resolution={resolution}
					resistance={resistance}
				/>

				<div className="file-content">
					
					<div>
						<a href={URL.createObjectURL(file)} download={fileName}>
							Download .Stl File
						</a>
					</div>
				</div>
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
	const [quantity, setQuantity] = useState("Enter quantity)");
	const [fileName, setFileName] = useState("");
	const [file, setFile] = useState("");
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

	const handleQuantityChange = (event) => {
		let newQuantity = event.target.valueAsNumber;

		if (newQuantity < 1) {
			newQuantity = 1;
		}
		setQuantity(newQuantity);
	};

	const handleFileChange = (file, name) => {
		setFileName(name);
		setFile(file);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		setSelectedColor("");
		setSelectedResolution("");
		setSelectedResistance("");
		setSelectedMaterial("ABS");
		setQuantity("Enter quantity");
		setFileName("");
		setFile(null);
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
						
						<UploadFile onFileChange={handleFileChange} />
						<div className="config-quantity">
							Quantity 
							<input
								type="number"
								id="quantityInput"
								placeholder="Enter qty"
								value={quantity}
								onChange={handleQuantityChange}
								style={{ width: "80px" }}
							/>
							</div>
						
					</div>
				</div>
			</div>

			<div className="button-quote">
				{!showPopup ? (
					<button onClick={handleSendQuote}>Send Quote</button>
				) : null}
			</div>

			{showPopup && (
				<Popup
					fileName={fileName}
					file={file}
					quantity={quantity}
					material={selectedMaterial}
					color={selectedColor}
					resolution={selectedResolution}
					resistance={selectedResistance}
					onClose={handleClosePopup}
				/>
			)}

		
		</>
	);
};

export default ConfigComponent;
