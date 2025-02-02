import React from "react";
import "./index.css"

function ClientBack({ bank }) {
    const formattedDate = new Date(bank.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container" style={{ color:"white", background: "darkblue", display: "inline-block", border: "1px solid white"}}>
            <div className="description" style={{marginTop: "70px"}}>
                <p className="note-title" style={{textAlign: 'center', fontSize:"2rem"}}>{bank.user}</p>
                <p className="note-content" style={{textAlign: 'center', background:"black", border:"1px solid white", borderRadius: "10px"}}>{bank.money} $</p>
                <p className="note-date">{formattedDate}</p>
            </div>
        </div>
    );
}

export default ClientBack