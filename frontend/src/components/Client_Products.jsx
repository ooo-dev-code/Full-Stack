import React from "react";
import "./index.css"

function Products({ product }) {
    const formattedDate = new Date(product.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container" style={{ color:"white", background: "darkblue", display: "inline-block", border: "1px solid white"}}>
            <img src={`${product.image}`} alt="ohio" />
            <div className="description" style={{marginTop: "70px"}}>
                <p className="note-title" style={{textAlign: 'center', fontSize:"2rem"}}>{product.name}</p>
                <p className="note-content" style={{textAlign: 'center', background:"black", border:"1px solid white", borderRadius: "10px"}}>{product.price} $</p>
                <p className="note-content">{product.description}</p>
                <p className="note-content">Only {product.count}</p>
                <p className="note-date">{formattedDate}</p>
            </div>
        </div>
    );
}

export default Products