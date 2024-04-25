

import React, { useState } from "react";
import shop from "../../assets/shop_icon.png";
import '../../styling/popupwindowshop.css'


const OpenShopForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    taxId: "",
    active: false,
  });

  const [showPopup, setShowPopup] = useState(false); 

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    if (type === "file") {
      const reader = new FileReader();
      reader.onload = () => {
        if (name === "profilePicture") {
          setFormData({ ...formData, profilePicturePreview: reader.result });
        } else if (name === "bannerPicture") {
          setFormData({ ...formData, bannerPicturePreview: reader.result });
        }
      };
      reader.readAsDataURL(files[0]);
    }

    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send to backend
    console.log(formData);
    setShowPopup(true); 
  };

  const handlePopupClose = () => {
    setShowPopup(false); 
  };

  return (
    <>
      <div className="regshop-container">
        <div>
          <form onSubmit={handleSubmit}>
		  <div className="regshop-field">
 							<label>Name</label>
							<div>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="regshop-field">
							<label htmlFor="description">Description</label>

							<div>
								<textarea
									className="description"
									name="description"
									value={formData.description}
									onChange={handleChange}
									maxLength={300}
								/>
							</div>
						</div>

						<div className="regshop-field">
							<label>Location</label>

							<div>
								<input
									type="text"
									name="location"
									value={formData.location}
									onChange={handleChange}
									required
								/>
							</div>
						</div>

						<div className="regshop-field">
							<label>Tax ID</label>
							<div>
								<input
									type="text"
									name="taxId"
									value={formData.taxId}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className="regshop-field">
							<label>
								Active
								<input
									type="checkbox"
									name="active"
									checked={formData.active}
									onChange={handleChange}
								/>
							</label>
						</div>
					
					{/* this should go in shop settings */}
{/* 
						<label className="regshop-field">
							Upload Profile Picture
							<input
								type="file"
								name="profilePicture"
								onChange={handleChange}
								accept="image/*"
							/>
							<div>
								{formData.profilePicturePreview && (
									<img
										src={formData.profilePicturePreview}
										alt="Profile Preview"
										style={{ maxWidth: "100px", maxHeight: "100px" }}
									/>
								)}
							</div>
						</label>

						<label className="regshop-field">
							Upload Banner Picture
							<input
								type="file"
								name="bannerPicture"
								onChange={handleChange}
								accept="image/*"
							/>
							<div>
								{formData.bannerPicturePreview && (
									<img
										src={formData.bannerPicturePreview}
										alt="Banner Preview"
										style={{ maxWidth: "100px", maxHeight: "100px" }}
									/>
								)}
							</div>
						</label> */}
						<div className="regshop-submit">
							<button type="submit">Submit</button>
						</div>
					</form>
            
            
			
          
		  
        </div>
        <div className="regshop-image">
          <img src={shop} alt="shoppng" />
        </div>
      </div>

    
      {showPopup && (
        <div className="reg-popup">
          <div className="reg-popup-content">
            <h2>Your shop has been registered successfully!</h2>
			<div className="reg-regshop-popup-buttons">
			<button onClick={handlePopupClose}>Close</button>
			<button>Go to My Shop</button>
			</div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default OpenShopForm;

