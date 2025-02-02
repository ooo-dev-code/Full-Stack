import React from "react";
import "./index.css"

function Orders({ orders }) {
    const formattedDate = new Date(orders.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container" style={{ color:"white", background: "darkblue", display: "inline-block", border: "1px solid white"}}>
            <div className="description" style={{marginTop: "70px"}}>
                <p className="note-title" style={{textAlign: 'center', fontSize:"2rem"}}>{orders.product}</p>
                <p className="note-date">{formattedDate}</p>
            </div>
        </div>
    );
}

export default Orders