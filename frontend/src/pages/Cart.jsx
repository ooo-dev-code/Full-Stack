import React, { useState, useEffect } from 'react';
import api from '../api';

function Cart() {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const username = window.location.pathname.split("/")[2]; // Extract the username from the URL

    useEffect(() => {
        // Combine both API calls in one useEffect to avoid calling them separately
        const fetchData = async () => {
            try {
                const cartRes = await api.get(`/shop/get_cart/${username}`);
                setCart(cartRes.data);
                console.log(cartRes.data);  // Log the cart data for debugging

                const orderRes = await api.get(`/shop/order/${username}`);
                setOrders(orderRes.data);
                console.log(orderRes.data);  // Log the order data for debugging
            } catch (err) {
                alert("Error fetching data: " + err);
            }
        };

        fetchData();  // Call the fetchData function to get both cart and orders
    }, [username]);  // Dependency on username to ensure data is fetched for the correct user

    const deleteOrder = (orderId) => {
        // Delete order and update state
        console.log("Delete order with id:", orderId);
        api.delete(`/shop/order/delete/${orderId}`)
            .then(() => {
                setOrders((prevOrders) => prevOrders.filter(order => order.id !== orderId)); // Remove the deleted order
                alert("Order deleted successfully.");
            })
            .catch((err) => {
                console.error("Error deleting order: ", err);
                alert("Failed to delete the order.");
            });
    };

    return (
        <div>
            <h1>Cart and Orders</h1>

            {/* Cart Section */}
            <div>
                <h2>Your Cart</h2>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.name} - {item.price} USD
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            {/* Orders Section */}
            <div>
                <h2>Your Orders</h2>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id}>
                            <p>Order ID: {order.id}</p>
                            <button onClick={() => deleteOrder(order.id)}>Delete Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
}

export default Cart;
