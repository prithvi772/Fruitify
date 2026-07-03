import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./AddProducts.css";

export default function AddProducts(props) {
  let { productToBeEdited, setView, refreshList } = props;
  const availableImages = [
    "apple.jpg",
    "banana.jpg",
    "mango.jpg",
    "grapes.jpg",
    "cherry.jpg",
    "dragon.jpg",
  ];

  let [image, setImage] = useState(null);
  let [preview, setPreview] = useState(null);
  let [newProduct, setNewProduct] = useState({
    name: "",
    mrp: "",
    discount: "",
    instock: "",
    image: "",
  });

  useEffect(() => {
    if (productToBeEdited && productToBeEdited.id) {
      setNewProduct(productToBeEdited);
      setPreview(`/Images/${productToBeEdited.image}`);
    }
  }, [productToBeEdited]);

  function handleProduct(event) {
    let { name, value } = event.target;
    let newValue=value;
    if (name === "instock") {
    newValue = value === "true"; // ✅ convert string to boolean
  }
    setNewProduct({ ...newProduct, [name]: newValue });
  }

  const navigate = useNavigate();
  function goToList() {
    // navigate("/");
    props.onListClick();
  }

  function handleProductSubmit(e) {
    e.preventDefault();
    if (!image && !newProduct.image) {
      alert("Please upload an image before submitting.");
      return;
    }

    const finalProduct = {
      ...newProduct,
      image: image ? image.name : newProduct.image,
      // instock: newProduct.instock === "true",
      //  instock: element.instock === true || element.instock === "true",
    };
    console.log("Final Product:", finalProduct);

    handleAddEditProduct(finalProduct);
  }

  async function handleAddEditProduct(Product) {
    if (productToBeEdited && productToBeEdited.id) {
      await axios.put(`https://fruitify-api.onrender.com/fruits/${Product.id}`, Product);
      alert("Product Updated SuccessFully.");
      // freshList();
      await refreshList();
    } else {
      const { id, ...productWithoutId } = Product;
      await axios.post("https://fruitify-api.onrender.com/fruits", productWithoutId);
      alert("Product Added SuccessFully.");
      await refreshList();
    }
    // navigate("/");
    // setView("adminproducts");
  }
  return (
    <>
      {/* <Navbar></Navbar> */}
      <div className="product-form-page">
      <button
        className="btn btn-primary my-2"
        onClick={() => {
          goToList();
        }}
      >
        Product List
      </button>
      <div className="product-form-shell vh-100 mx-auto d-flex justify-content-center align-items-start bg-danger-subtle">
        <div className="product-form-card myborder my-5">
          {/* <form onSubmit={handleSubmit}> */}
          <form className="product-admin-form" onSubmit={handleProductSubmit}>
            <div className="product-form-field my-3">
              Product Name:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleProduct}
                required
              />
            </div>

            <div className="product-form-field my-3">
              Product Mrp:
              <input
                type="text"
                name="mrp"
                value={newProduct.mrp}
                onChange={handleProduct}
                required
              />
            </div>
            <div className="product-form-field my-3">
              Product Discount:
              <input
                type="text"
                name="discount"
                value={newProduct.discount}
                onChange={handleProduct}
                required
              />
            </div>
            <div className="product-form-field my-3">
              Product In Stock:
              <select
                name="instock"
                value={newProduct.instock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    instock: e.target.value === "true",
                  })
                }
                required
              >
                <option value="">-- Select --</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="product-form-field mb-3">
              <label className="form-label">Select Product Image:</label>
              <select
                className="form-select"
                value={newProduct.image}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, image: e.target.value });
                  setPreview(`/Images/${e.target.value}`);
                }}
              >
                <option value="">-- Select an image --</option>
                {availableImages.map((img) => (
                  <option key={img} value={img}>
                    {img}
                  </option>
                ))}
              </select>
            </div>
            {preview && (
              <div className="product-preview mb-3">
                <label className="form-label">Image Preview:</label>
                <br />
                <img src={preview} alt="preview" width="150" />
              </div>
            )}

            {newProduct && (
              <div className="product-form-actions d-flex justify-content-end gap-2 my-2">
                <button type="submit" className="btn btn-danger">
                  {productToBeEdited ? "Update Product" : "Add Product"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      </div>
    </>
  );
}
