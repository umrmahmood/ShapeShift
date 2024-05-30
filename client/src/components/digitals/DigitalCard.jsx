import React from "react";
import { StlViewer } from "react-stl-viewer";
import placeholder from "../../CardComponent/placeholder.jpg";
import "../../components/digitals/digitalListings.css";
import resisicon from "../../assets/spec1.png";
import materialicon from "../../assets/spec2.png";
import resolicon from "../../assets/spec3.png";
import coloricon from "../../assets/spec4.png";
import { useNavigate } from "react-router-dom";

const DigitalCard = ({ product }) => {
	const navigate = useNavigate();
	const handleMoreClick = () => {
		navigate(`/digital/${product._id}`);
	};

	return (
		<div className="digital-listing-card-outter">
			<div className="digital-listing-image-container">
				{product.inquiryFile ? (
					<StlViewer
						style={{ width: "300px", height: "300px" }}
						orbitControls
						shadows
						url={product.inquiryFile}
					/>
				) : (
					<img
						src={placeholder}
						alt="placeholder"
						style={{ width: "300px", height: "300px" }}
					/>
				)}
			</div>
			<div className="learn-more-digital" onClick={handleMoreClick}>
				<div className="digital-listing-description-container">
					<div className="digital-card-heading-main">
						<h3>{product.name}</h3>
					</div>

					{/* <p>{product.description}</p> */}
				</div>
				<h3 className="digital-file-heading">Required Specs</h3>
				<div className="digital-listing-specs-container">
					<div className="digital-listing-specs">
						<div>
							<div className="digital-listing-specs-icons">
								<img src={resisicon} alt="icon" />
							</div>
							{product.resistance}
						</div>
						<div>
							<div className="digital-listing-specs-icons">
								<img src={resolicon} alt="icon" />
							</div>
							{product.resolution}
						</div>
					</div>

					<div className="digital-listing-specs">
						<div>
							<div className="digital-listing-specs-icons">
								<img src={coloricon} alt="icon" />
							</div>
							{product.color}
						</div>
						<div>
							<div className="digital-listing-specs-icons">
								<img src={materialicon} alt="icon" />
							</div>
							{product.material}
						</div>
					</div>
				</div>
			</div>

			{/* <div >
        <button className="digital-more-detail-btn" onClick={handleMoreClick}>
        More Details
        </button>
        
      </div> */}

			{/* <a href={product.inquiryFile} target="_blank" rel="noopener noreferrer">
				Download File
			</a> */}
		</div>
	);
};

export default DigitalCard;
