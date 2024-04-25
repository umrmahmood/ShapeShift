import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../../styling/productForm.css";

const ProductForm = () => {
	const [product, setProduct] = useState({
		name: "",
		description: "",
		category: "",
		price: 0,
		currency: "USD",
		images: [],
		quantity: 0,
		type: "digital",
		material: "",
		dimensions: {
			width: { value: 0, unit: "cm" },
			height: { value: 0, unit: "cm" },
			depth: { value: 0, unit: "cm" },
		},
		tags: [],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files);
		const urls = files.map((file) => URL.createObjectURL(file));
		setProduct({ ...product, images: [...product.images, ...urls] });
	};

	const handleTagAdd = (e) => {
		if (e.key === "Enter" && product.tags.length < 5) {
			const tag = e.target.value.trim();
			if (tag) {
				setProduct({ ...product, tags: [...product.tags, tag] });
				e.target.value = "";
			}
		}
	};

	return (
		<>
			{/* <Navbar /> */}
      <h1>Register & Start Selling Today</h1>
			<form className="product-reg-form">
				<label>
					Product Name:
					<input
						type="text"
						name="name"
						value={product.name}
						onChange={handleChange}
						required
					/>
				</label>

				<label>
					Product Description:
					<textarea
						name="description"
						value={product.description}
						onChange={handleChange}
						maxLength={500}
					/>
				</label>

				<label>
					Category:
					<input
						type="text"
						name="category"
						value={product.category}
						onChange={handleChange}
					/>
					
				</label>

				<label>
					Price:
					<input
						type="number"
						name="price"
						value={product.price}
						onChange={handleChange}
						min={0}
						step="0.01"
						required
					/>
				</label>

				<label>
					Currency:
					<select
						name="currency"
						value={product.currency}
						onChange={handleChange}
					>
						{["USD", "EUR", "GBP", "JPY", "CAD", "CNY", "KRW"].map(
							(currency) => (
								<option key={currency} value={currency}>
									{currency}
								</option>
							)
						)}
					</select>
				</label>

				{/* Image upload */}
				<input
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					multiple
				/>
				{product.images.map((image, index) => (
					<img key={index} src={image} alt={`Product ${index + 1}`} />
				))}

				<label>
					Quantity:
					<input
						type="number"
						name="quantity"
						value={product.quantity}
						onChange={handleChange}
					/>
				</label>

				<div className="type-choice">
					<div className='text'>Type:
					<label>
						<input
							type="radio"
							name="type"
							value="digital"
							checked={product.type === "digital"}
							onChange={handleChange}
						/>
						
					</label>Digital
					<label>
						<input
							type="radio"
							name="type"
							value="physical"
							checked={product.type === "physical"}
							onChange={handleChange}
						/>
						
					</label>Physical
					</div>
				</div>

				{/* Material dropdown, displayed if product type is physical */}
				{product.type === "physical" && (
					<label>
						Material:
						<select
							name="material"
							value={product.material}
							onChange={handleChange}
						>
							{[
								"PLA",
								"ABS",
								"PETG",
								"TPU",
								"TPE",
								"TPC",
								"Nylon",
								"ASA",
								"PVB",
								"HIPS",
								"PVA",
								"PC",
								"PEI",
								"PEEK",
								"PEKK",
								"PVDF",
								"PPSU",
								"Resins",
								"Ceramics",
								"Silicone",
								"Metals",
							].map((material) => (
								<option key={material} value={material}>
									{material}
								</option>
							))}
						</select>
					</label>
				)}

				
				<label>
					Width:
					<input
						type="number"
						name="width"
						value={product.dimensions.width.value}
						onChange={(e) =>
							setProduct({
								...product,
								dimensions: {
									...product.dimensions,
									width: { ...product.dimensions.width, value: e.target.value },
								},
							})
						}
					/>
					<select
						name="widthUnit"
						value={product.dimensions.width.unit}
						onChange={(e) =>
							setProduct({
								...product,
								dimensions: {
									...product.dimensions,
									width: { ...product.dimensions.width, unit: e.target.value },
								},
							})
						}
					>
						<option value="cm">cm</option>
						<option value="in">in</option>
					</select>
				</label>

				{/* Tags */}
				<label>
					Tags:
					<input
						type="text"
						onKeyDown={handleTagAdd}
						placeholder="Press Enter to add tag"
					/>
					<ul>
						{product.tags.map((tag, index) => (
							<li key={index}>{tag}</li>
						))}
					</ul>
				</label>

				<button type="submit">Submit</button>
			</form>
			{/* <Footer /> */}
		</>
	);
};

export default ProductForm;
