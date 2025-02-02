import React, { useState, useEffect } from 'react'
import ClientBack from '../components/ClientBack';
import api from '../api';


function Bank() {
    const [bank, setBank] = useState([])

    const username = window.location.pathname.split("/")[2];

    
    useEffect(() => {
        getBank();
    }, []);

    const getBank = () => {
        api
            .get("/shop/get_bank/")
            .then((res) => res.data)
            .then((data) => {
                setBank(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    return (
        
        <div>
            <ClientBack bank={bank}/>
        </div>
    )
}

export default Bank
