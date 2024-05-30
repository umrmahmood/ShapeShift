import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/CardComponent/Item.css";

const EditProductModal = ({ product, token, onClose, onSave }) => {
	const [editedProduct, setEditedProduct] = useState(product);
	const [imageFile, setImageFile] = useState(null);

	useEffect(() => {
		setEditedProduct(product);
	}, [product]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedProduct((prevProduct) => ({
			...prevProduct,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let updatedProduct = { ...editedProduct };

		try {
			if (imageFile) {
				const formData = new FormData();
				formData.append("image", imageFile);

				const imageResponse = await axios.post(
					"http://localhost:5001/api/images/upload",
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);

				updatedProduct = {
					...updatedProduct,
					images: [...updatedProduct.images, imageResponse.data.imageUrl],
				};
			}
			console.log("updated product", +updatedProduct);
			console.log("editedProduct:", editedProduct);
			console.log("updatedProduct:", updatedProduct);

			// Call the onSave function passed from ItemPage with the updated product
			onSave(updatedProduct);

			// Close the modal
			onClose();
		} catch (error) {
			console.error("Error updating product:", error);
		}
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<h2>Edit Product</h2>
				<span className="close-button" onClick={onClose}>
					&times;
				</span>
				<form onSubmit={handleSubmit}>
					<h3 className="item-page-edit-product">Name</h3>
					<input
						className="item-page-edit-name"
						type="text"
						name="name"
						value={editedProduct.name}
						onChange={handleChange}
						placeholder="Enter product name"
					/>
					<h3 className="item-page-edit-product">Description</h3>
					<textarea
						className="item-page-edit-product-input edit-textbox"
						name="description"
						value={editedProduct.description}
						onChange={handleChange}
						placeholder="Enter product description"
					></textarea>
					<div className="item-page-pricequant-container">
						<div>
							<h3 className="item-page-edit-product">Price</h3>
							<input
								className="item-page-edit-product-input item-page-edit-num"
								type="number"
								name="price"
								value={editedProduct.price}
								onChange={handleChange}
								placeholder="Enter product price"
							/>
						</div>

						<div>
							<h3 className="item-page-edit-product">Quantity</h3>
							<input
								className="item-page-edit-product-input item-page-edit-num"
								type="number"
								name="quantity"
								value={editedProduct.quantity}
								onChange={handleChange}
								placeholder="Enter product quantity"
							/>
						</div>
					</div>
					<h3 className="item-page-edit-product">Material</h3>
					<input
						type="text"
						name="material"
						value={editedProduct.material}
						onChange={handleChange}
						placeholder="Enter product material"
					/>
					<input type="file" onChange={handleImageChange} />
					<div className="item-page-edit-savebtn">
						<button type="submit">Save changes</button>{" "}
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProductModal;
