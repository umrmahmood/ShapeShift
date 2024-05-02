import React, { useState } from "react";
import "../../styling/productRegForm.css";
import physical from "../../assets/package1.png";
import digital from "../../assets/stl.png";
import axios from "axios";

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
    material: "ABS",
    tags: [],
  });

  const onClickHandler = async (event) => {
    event.preventDefault();
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("shapeshiftkey");
      // const formData = {...product};
      const formData = {
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        currency: product.currency,
        images: product.images,
        quantity: product.quantity,
        type: product.type,
        ...(product.type === "physical" && { material: product.material }),
        tags: product.tags,
      };

      console.log("Product from frontend", formData);

      // Include token in the request headers
      const response = await axios.post(
        "http://localhost:5000/api/products/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": undefined, // Let browser set Content-Type
          },
        }
      );

      console.log(response);
      setProduct({
        name: "",
        description: "",
        category: "",
        price: 0,
        currency: "USD",
        images: [],
        quantity: 0,
        type: "digital",
        material: "",
        tags: [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // const handleImageUpload = (e) => {
  // 	const files = Array.from(e.target.files);
  // 	const urls = files.map((file) => URL.createObjectURL(file));
  // 	setProduct({ ...product, images: [...product.images, ...urls] });
  // };
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const updatedImages = [...product.images];
    updatedImages[index] = imageUrl;
    setProduct({ ...product, images: updatedImages });
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

  const handleTagRemove = (index) => {
    const updatedTags = [...product.tags];
    updatedTags.splice(index, 1);
    setProduct({ ...product, tags: updatedTags });
  };

  return (
    <>
      <div className="product-reg-form-outter">
        <h1>Tell us about your listing</h1>
        <form className="product-reg-form">
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
              placeholder="max. 1000 characters."
            />
          </label>

          <div className="type-choice">
            <div className="text">
              What type of item is it?
              <div className="product-reg-type">
                <div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="digital"
                        checked={product.type === "digital"}
                        onChange={handleChange}
                      />
                    </label>
                    Digital
                  </div>
                  <div className="product-reg-img-type">
                    <img src={digital} alt="" width={"150px"} />
                  </div>
                </div>

                <div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="physical"
                        checked={product.type === "physical"}
                        onChange={handleChange}
                      />
                    </label>
                    Physical
                  </div>
                  <div>
                    <img src={physical} alt="" width={"190px"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

          {/* Tags */}
          <label>
            Tags:
            <input
              type="text"
              onKeyDown={handleTagAdd}
              placeholder="Press Enter to add tags (max. 5)"
            />
            <ul className="product-reg-tags">
              {product.tags.map((tag, index) => (
                <li key={index}>
                  {tag}
                  <button
                    className="product-reg-remove-btn"
                    type="button"
                    onClick={() => handleTagRemove(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
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
          <div>
            <div>
              <label>Upload images</label>
            </div>
            <div className="product-reg-form-image-container ">
              {[...Array(5)].map((_, index) => (
                <div
                  className="product-reg-form-image"
                  key={index}
                  onClick={() =>
                    document.getElementById(`fileInput-${index}`).click()
                  }
                >
                  {product.images[index] ? (
                    <img
                      src={product.images[index]}
                      width="100%"
                      height="100%"
                      alt={`Product ${index + 1}`}
                    />
                  ) : (
                    <span style={{ fontSize: "48px" }}>+</span>
                  )}
                  <input
                    id={`fileInput-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    style={{ display: "none" }}
                    multiple
                  />
                </div>
              ))}
            </div>
          </div>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="product-reg-submit">
          <button
            className="product-reg-form-button"
            onClick={onClickHandler}
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
