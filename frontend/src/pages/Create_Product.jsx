import React from 'react'
import Products from '../components/Products';
import api from "../api";
import { useState, useEffect } from 'react';
import "./index.css"
import "./home.css"
import { useNavigate } from 'react-router-dom';


function Create_Product() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [count, setCount] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        api
            .get("/shop/product/")
            .then((res) => res.data)
            .then((data) => {
                setProducts(data);
                console.log(data);
            })
            .catch((err) => navigate("/"));
    };

    const deleteProduct = (id) => {
        api
            .delete(`/shop/product/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getProducts();
            })
            .catch((error) => alert(error));
    };

    const createProduct = (e) => {
            e.preventDefault();
            console.log(image)
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", parseFloat(price));
            formData.append("description", description);
            formData.append("count", parseInt(count));
            formData.append("image", image);

            api
                .post("/shop/product/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    if (res.status === 201) alert("Product created!");
                    else alert("Failed to create product.");
                    getProducts();
                })
                .catch((err) => alert(err));
        };

    return (
        <div>
            <h2 style={{color: "white"}}>Products</h2>
            {products.map((product) => (
                <Products product={product} onDelete={deleteProduct} key={product.id} />
            ))}

            <h2 style={{color: "white"}}>Create a Product</h2>
            <form onSubmit={createProduct}>
                <label htmlFor="name">Name:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <br />
                <label htmlFor="price">Price:</label>
                <br />
                <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
                <br />
                <label htmlFor="description">Description:</label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
                <br />
                <label htmlFor="count">Count:</label>
                <br />
                <input
                    type="number"
                    id="count"
                    name="count"
                    required
                    onChange={(e) => setCount(e.target.value)}
                    value={count}
                />
                <br />
                <label htmlFor="image">Image:</label>
                <br />
                <input
                    type="file"
                    id="image"
                    name="image"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
           
            <button 
                style={{ 
                    backgroundColor: "red", 
                    color: "white", 
                    padding: "10px 20px", 
                    margin: "10px", 
                    border: "none", 
                    borderRadius: "5px", 
                    cursor: "pointer" 
                }} 
                onClick={() => navigate(`/`)}
            >
                Log Out
            </button>
        </div>
    )
}

export default Create_Product
