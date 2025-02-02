import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Client_Products from '../components/Client_Products';
import "./index.css";
import "./home.css";
import { useLocation } from "react-router-dom";
function Home() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);  // Separate cart state
    const [money, setMoney] = useState(1000.0);
    const [productCounts, setProductCounts] = useState({});  // Keep track of product counts
    const [isAuth, setIsAuth] = useState(false);
    
    const username = window.location.pathname.split("/")[2];
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const navigate = useNavigate();

    // Check authentication state (if user is logged in)
    useEffect(() => {
        setIsAuth(localStorage.getItem('access_token') !== null);
    }, []);

    useEffect(() => {
        getProducts();
    }, []);

    // Fetch products
    const getProducts = async () => {
        try {
            const res = await api.get("/shop/product/user");
            setProducts(res.data);
        } catch (err) {
            alert("Error fetching products: " + err);
        }
    };

    // Fetch the cart
    const getCart = async () => {
        try {
            const res = await api.get("/shop/get_cart");
            setCart(res.data);
        } catch (err) {
            alert("Error fetching cart: " + err);
        }
    };

    // Create bank account
    const createBank = async (e) => {
        e.preventDefault();
        
        if (isNaN(money) || money <= 0) {
            alert("Please provide a valid amount for money.");
            return;
        }

        const formData = new FormData();
        formData.append("user", username);
        formData.append("money", parseFloat(money));

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert("Authorization required");
            return;
        }

        try {
            const res = await api.post("/shop/get_bank/", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 200) alert("Bank created!");
            else alert("Failed to create bank.");
            getProducts();  // Update products
        } catch (err) {
            alert(err.response ? err.response.data : "Something went wrong.");
        }
    };

    // Create order
    const createOrder = async (e) => {
        e.preventDefault();

        const orderData = {
            products: cart,
        };

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert("Authorization required");
            return;
        }

        try {
            const res = await api.post("/shop/order/", orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 201) alert("Order created!");
            else alert("Failed to create order.");
            getCart();  // Update cart
        } catch (err) {
            alert("Error creating order: " + err);
        }
    };

    // Add product to cart
    const createCart = async (e, product) => {
        e.preventDefault();

        const count = productCounts[product.id] || 0;
        if (count <= 0) {
            alert("Please select a quantity greater than 0.");
            return;
        }

        const cartData = {
            username: username,
            product: product,
            count: count,
        };

        const token = localStorage.getItem('access_token');
        if (!token) {
            alert("Authorization required");
            return;
        }

        try {
            const res = await api.post("/shop/product/", cartData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 201) alert("Added to cart!");
            else alert("Failed to add to cart.");
            getCart();  // Update cart
        } catch (err) {
            alert("Error adding to cart: " + err);
        }
    };

    // Navigate to bank page
    const toBank = (e) => {
        createBank(e);
        navigate(`/bank/${username}`);
    };

    // Navigate to cart page and create order
    const toCart = (e) => {
        createOrder(e);
        navigate(`/cart/${username}`);
    };

    // Handle product count change
    const handleCountChange = (productId, value) => {
        setProductCounts(prevCounts => ({
            ...prevCounts,
            [productId]: parseInt(value, 10) || 0, // Ensure count is an integer
        }));
    };

    return (
        <div>
            <nav style={{display: "flex",border: "1px solid white", width: window.innerWidth > 604 ? "80%" : "100%", marginLeft: window.innerWidth > 604 ? "20%" : "0%", borderRadius: window.innerWidth > 604 ? "50px 0px 0px 50px" : "0 0 0 0" }}>
                <div className='centerNav'>
                    <div className="firm">Mark</div>
                </div>
                <div className="rightNav" style={{display: "flex" }}>
                    <div className="btnNav1" onClick={(e) => toCart(e)}>Cart</div>
                    <div className="btnNav2" onClick={(e) => toBank(e)}>Bank</div>
                    <div className="btnNav3" onClick={() => navigate("/")}>Log Out</div>
                </div>
            </nav>

            <div>
                <div style={{ marginTop: "100px", display: "grid", gridTemplateColumns: `repeat(${window.innerWidth > 604 ? "3" : "1"}, 1fr)`, gridAutoRows: "minmax(100px, auto)", gap: "20px", rowGap: "150px", marginLeft: windowWidth > 604 ? "0" : "30px"}}>
                    {products.map((product) => (
                        <div key={product.id}>
                            <Client_Products product={product} onDelete={null} />
                            <input
                                type="number"
                                id="count"
                                name="count"
                                required
                                onChange={(e) => handleCountChange(product.id, e.target.value)}
                                value={productCounts[product.id] || 0}
                            />
                            <button 
                                style={{ color: "white", background: "black", border: "1px solid white", borderRadius: "10px" }}
                                onClick={(e) => createCart(e, product)}>
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
