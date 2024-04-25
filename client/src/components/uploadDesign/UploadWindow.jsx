import "../../styling/uploadwindow.css";
import cloud from "../../assets/cloud.png";

// const UploadWindow = () => {
// 	return (
// 		<>
// 			<h1>Get a free Quote</h1>
// 			<div className="uploadwindow-wrapper">
// 				<div className="uploadwindow-img">
// 					<img src={cloud} alt="cloud" width="130px" />
// 				</div>
// 				<p>Drag your files here</p>
// 				<p>or</p>
// 				<input type="file" className="uploadwindow-btn"  />
// 				<p>Files accepted: *.stl</p>
// 			</div>
// 		</>
// 	);
// };

// export default UploadWindow;

import React, { useState } from "react";

function UploadWindow() {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		setSelectedFile(file);
	};

	return (
        
		<>
			<h1>Get a free Quote</h1>
			<div 
                className="custom-file-upload uploadwindow-wrapper" 
                onDragOver={handleDragOver} 
                onDrop={handleDrop}
            >
				<div className="uploadwindow-img">
					<img src={cloud} alt="cloud" width="130px" />
				</div>
				<p>Drag your files here</p>
				<p>or</p>
				<label htmlFor="file-upload" className="button-text">
					Browse
				</label>
				<div className="file-info">
					{selectedFile ? selectedFile.name : "No file selected"}
				</div>
				<input
					type="file"
					id="file-upload"
					style={{ display: "none" }}
					onChange={handleFileChange}
				/>
                <p>Files accepted: *.stl</p>
			</div>
		</>
	);
}

export default UploadWindow;
