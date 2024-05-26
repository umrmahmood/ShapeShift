import React, { useState, useEffect } from "react";
import axios from "axios";
import Resolution from "./Resolution";
import Resistance from "./Resistance";
import QuoteSummary from "./QuoteSummary";
import Material from "./Materials";
import ColorSelector from "./ColorSelector";
import "../../styling/quoteSummary.css";
import "../../styling/configComponent.css";
import UploadFile from "./UploadFile";

const baseMaterialCosts = {
	ABS: 10,
	PLA: 12,
	Flexible: 18,
	HIPS: 14,
	Nylon: 20,
	"Carbon Fiber Filled": 35,
	ASA: 16,
	"Metal Filled": 40,
	Polypropylene: 22,
	Polycarbonate: 25,
	"Wood Filled": 28,
	PVA: 30,
};

const colorMultiplier = {
	black: 1,
	red: 1.2,
	white: 1.1,
	yellow: 1.2,
	blue: 1.2,
	green: 1.2,
	orange: 1.3,
	purple: 1.3,
	silver: 1.5,
	violet: 1.4,
};

const resolutionMultiplier = {
	low: 1,
	medium: 1.5,
	high: 2,
};

const resistanceMultiplier = {
	low: 1,
	medium: 1.3,
	high: 1.6,
};

// Function to calculate the estimated cost
const calculateCost = (material, color, resolution, resistance, quantity) => {
	const materialCost = baseMaterialCosts[material] || 0;
	const colorCost = colorMultiplier[color] || 1;
	const resolutionCost = resolutionMultiplier[resolution] || 1;
	const resistanceCost = resistanceMultiplier[resistance] || 1;

	const unitCost = materialCost * colorCost * resolutionCost * resistanceCost;
	const totalCost = unitCost * quantity;

	return totalCost.toFixed(2);
};

const Popup = ({
	file,
	fileName,
	material,
	color,
	resolution,
	resistance,
	quantity,
	onClose,
	description,
}) => {
	const [isPosting, setIsPosting] = useState(false);
	const estimatedCost = calculateCost(
		material,
		color,
		resolution,
		resistance,
		quantity
	);

	const handlePostRequest = async () => {
		setIsPosting(true);
		const formData = new FormData();
		formData.append("file", file);
		formData.append("name", fileName);
		formData.append("material", material);
		formData.append("color", color);
		formData.append("resolution", resolution);
		formData.append("resistance", resistance);
		formData.append("quantity", quantity);
		formData.append("description", description);

		try {
			const token = localStorage.getItem("shapeshiftkey");
			await axios.post("/api/digitals/create", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			});
			alert("Digital product created successfully!");
			onClose();
		} catch (error) {
			console.error("Error creating digital product:", error);
			alert("Failed to create digital product. Please try again.");
		} finally {
			setIsPosting(false);
		}
	};

	return (
		<div className="quote-popup-container">
			<div className="quote-popup" onClick={(e) => e.stopPropagation()}>
				<QuoteSummary
					fileName={fileName}
					quantity={quantity}
					material={material}
					color={color}
					resolution={resolution}
					resistance={resistance}
				/>
				<p className="estimated-cost">Estimated Cost: ${estimatedCost}</p>

				<div className="file-content">
					<div>
						<a href={URL.createObjectURL(file)} download={fileName}>
							Download {fileName}.stl File
						</a>
					</div>
				</div>
				<div className="quote-popupwindow-button">
					<button className="quote-popup-close-btn" onClick={onClose}>
						Close
					</button>
					<button className="quote-popup-post-btn config-input" onClick={handlePostRequest} disabled={isPosting}>
						Post Your Request
					</button>
				</div>
				{isPosting && (
					<p className="config-file-posting">Your digital product is getting posted. Please wait<span className="loading-dots"><span>.</span><span>.</span><span>.</span></span></p>
				)}
			</div>
		</div>
	);
};

const ConfigComponent = () => {
	const [selectedMaterial, setSelectedMaterial] = useState("ABS");
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedResolution, setSelectedResolution] = useState("");
	const [selectedResistance, setSelectedResistance] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [quantity, setQuantity] = useState("");
	const [file, setFile] = useState(null);
	const [showPopup, setShowPopup] = useState(false);
	const [showValidationPopup, setShowValidationPopup] = useState(false);

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
		if (
			!selectedMaterial ||
			!selectedColor ||
			!selectedResolution ||
			!selectedResistance ||
			!file ||
			!quantity
		) {
			setShowValidationPopup(true);
		} else {
			setShowPopup(true);
		}
	};

	const handleQuantityChange = (event) => {
		let newQuantity = event.target.valueAsNumber;
		if (newQuantity < 1) {
			newQuantity = 1;
		}
		setQuantity(newQuantity);
	};

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleFileChange = (file) => {
		setFile(file);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
		setSelectedColor("");
		setSelectedResolution("");
		setSelectedResistance("");
		setSelectedMaterial("ABS");
		setQuantity("");
		setFile(null);
		setName("");
		setDescription("");
	};

	const handleCloseValidationPopup = () => {
		setShowValidationPopup(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (showPopup && !event.target.closest(".quote-popup")) {
				handleClosePopup();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showPopup]);

	return (
		<>
			<div
				className={`config-background ${
					showValidationPopup ? "dull-background" : ""
				}`}
			>
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
								Name
								<input
									className="config-input"
									type="text"
									id="nameInput"
									placeholder="Prod. Name"
									value={name}
									onChange={handleNameChange}
									style={{ width: "100px" }}
								/>
							</div>

							<div className="config-quantity">
								Description
								<textarea
									className="config-description"
									name="description"
									value={description}
									onChange={handleDescriptionChange}
									maxLength={1000}
									placeholder="max 1000 characters"
								/>
							</div>

							<div className="config-quantity">
								Quantity
								<input
									className="config-input2"
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
						<button onClick={handleSendQuote}>Request Quote</button>
					) : null}
				</div>

				{showPopup && (
					<Popup
						fileName={name}
						description={description}
						file={file}
						quantity={quantity}
						material={selectedMaterial}
						color={selectedColor}
						resolution={selectedResolution}
						resistance={selectedResistance}
						onClose={handleClosePopup}
					/>
				)}

				{showValidationPopup && (
					<div className="validation-popup">
						<p>Please select all fields and upload a file.</p>
						<button onClick={handleCloseValidationPopup}>Close</button>
					</div>
				)}
			</div>
		</>
	);
};

export default ConfigComponent;
