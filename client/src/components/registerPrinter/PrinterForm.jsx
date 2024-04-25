import React, { useState } from "react";

function PrinterForm() {
	const [model, setModel] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [plateSize, setPlateSize] = useState({
		width: "",
		depth: "",
		height: "",
	});
	const [quality, setQuality] = useState([]);
	const [materials, setMaterials] = useState([]);
	// const [isChecked, setIsChecked] = useState(false);

	// const handleCheckboxChange = () => {
	//     setIsChecked(!isChecked);
	//   };

	const handleQualityChange = (qualityOption) => {
		if (quality.includes(qualityOption)) {
			setQuality(quality.filter((item) => item !== qualityOption));
		} else {
			setQuality([...quality, qualityOption]);
		}
	};

	const handleMaterialsChange = (materialOption) => {
		if (materials.includes(materialOption)) {
			setMaterials(materials.filter((item) => item !== materialOption));
		} else {
			setMaterials([...materials, materialOption]);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// need to handle submission here for back end, working ok for now
		// console.log(model, name, description, plateSize, quality, materials)

		// Clear all form fields
		setModel("");
		setName("");
		setDescription("");
		setPlateSize({ width: "", depth: "", height: "" });
		setQuality([]);
		setMaterials([]);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="regprinter-field">
				<div>
					<label htmlFor="model">Model</label>
				</div>

				<select
					id="model"
					value={model}
					onChange={(e) => setModel(e.target.value)}
				>
					<option value="Ultimaker S5">Ultimaker S5</option>
					<option value="Creality Ender 3">Creality Ender 3</option>
					<option value="Prusa i3 MK3S+">Prusa i3 MK3S+</option>
					<option value="Formlabs Form 3">Formlabs Form 3</option>
					<option value="Anycubic Photon Mono X">Anycubic Photon Mono X</option>
					<option value="FlashForge Creator Pro">FlashForge Creator Pro</option>
					<option value="LulzBot Mini 2">LulzBot Mini 2</option>
					<option value="Monoprice Select Mini V2">
						Monoprice Select Mini V2
					</option>
					<option value="XYZprinting da Vinci Mini">
						XYZprinting da Vinci Mini
					</option>
					<option value="Dremel DigiLab 3D45">Dremel DigiLab 3D45</option>
					<option value="MakerBot Replicator+">MakerBot Replicator+</option>
					<option value="Raise3D Pro2 Plus">Raise3D Pro2 Plus</option>
					<option value="BCN3D Sigma R19">BCN3D Sigma R19</option>
					<option value="Sindoh 3DWOX 1">Sindoh 3DWOX 1</option>
					<option value="Robo R2">Robo R2</option>
					<option value="Zortrax M200">Zortrax M200</option>
					<option value="TEVO Tarantula Pro">TEVO Tarantula Pro</option>
					<option value="Anet A8">Anet A8</option>
					<option value="Geeetech A10">Geeetech A10</option>
					<option value="Wanhao Duplicator i3 Plus">
						Wanhao Duplicator i3 Plus
					</option>
					<option value="CraftBot Plus">CraftBot Plus</option>
					<option value="Monoprice Maker Select Plus">
						Monoprice Maker Select Plus
					</option>
					<option value="Qidi Tech X-Plus">Qidi Tech X-Plus</option>
					<option value="Printrbot Simple Pro">Printrbot Simple Pro</option>
					<option value="Tronxy X5SA">Tronxy X5SA</option>
					<option value="Artillery Sidewinder X1">
						Artillery Sidewinder X1
					</option>
					<option value="JGAurora A5S">JGAurora A5S</option>
					<option value="FlashForge Finder">FlashForge Finder</option>
					<option value="ELEGOO Mars">ELEGOO Mars</option>
					<option value="BIBO 2 Touch">BIBO 2 Touch</option>
				</select>
			</div>
			<div className="regprinter-field">
				<div>
					<label htmlFor="name">Name</label>
				</div>
				<div>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
			</div>
			<div className="regprinter-field">
				<div>
					<label htmlFor="description">Description</label>
				</div>
				<div>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</div>
			<div className="regprinter-field">
				<div>
					<label htmlFor="plateSize">Print plate size (cm)</label>
				</div>

				<input
					type="text"
					placeholder="Width (X)"
					value={plateSize.width}
					onChange={(e) =>
						setPlateSize({ ...plateSize, width: e.target.value })
					}
				/>
				<input
					type="text"
					placeholder="Depth (Y)"
					value={plateSize.depth}
					onChange={(e) =>
						setPlateSize({ ...plateSize, depth: e.target.value })
					}
				/>
				<input
					type="text"
					placeholder="Height (Z)"
					value={plateSize.height}
					onChange={(e) =>
						setPlateSize({ ...plateSize, height: e.target.value })
					}
				/>
			</div>
			<div className="regprinter-field">
				<label>Printing quality</label>
				<div className="regprinter-quality">
					<label>
						<input
							type="checkbox"
							name="quality"
							value="Draft"
							onChange={() => handleQualityChange("Draft")}
						/>
						Draft - 0.30 mm
					</label>
					<label>
						<input
							type="checkbox"
							name="quality"
							value="Medium"
							onChange={() => handleQualityChange("Medium")}
						/>
						Medium - 0.20 mm
					</label>
					<label>
						<input
							type="checkbox"
							name="quality"
							value="Detailed"
							onChange={() => handleQualityChange("Detailed")}
						/>
						Detailed - 0.10 mm
					</label>
				</div>
			</div>
			<div className="regprinter-field">
				<label>Printable materials</label>
				<div className="regprinter-materials">
					<label>
						<input
							type="checkbox"
							name="materials"
							value="ABS"
							onChange={() => handleMaterialsChange("ABS")}
						/>
						ABS
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="PLA"
							onChange={() => handleMaterialsChange("PLA")}
						/>
						PLA
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="Flexible"
							onChange={() => handleMaterialsChange("Flexible")}
						/>
						Flexible
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="HIPS"
							onChange={() => handleMaterialsChange("HIPS")}
						/>
						HIPS
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="Nylon"
							onChange={() => handleMaterialsChange("Nylon")}
						/>
						Nylon
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="Carbon Fiber Filled"
							onChange={() => handleMaterialsChange("Carbon Fiber Filled")}
						/>
						Carbon Fiber Filled
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="ASA"
							onChange={() => handleMaterialsChange("ASA")}
						/>
						ASA
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="Metal Filled"
							onChange={() => handleMaterialsChange("Metal Filled")}
						/>
						Metal Filled
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="Polypropylene"
							onChange={() => handleMaterialsChange("Polypropylene")}
						/>
						Polypropylene
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="Polycarbonate"
							onChange={() => handleMaterialsChange("Polycarbonate")}
						/>
						Polycarbonate
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="Wood Filled"
							onChange={() => handleMaterialsChange("Wood Filled")}
						/>
						Wood Filled
					</label>
					<label>
						<input
							type="checkbox"
							name="materials"
							value="PVA"
							onChange={() => handleMaterialsChange("PVA")}
						/>
						PVA
					</label>
				</div>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

export default PrinterForm;
