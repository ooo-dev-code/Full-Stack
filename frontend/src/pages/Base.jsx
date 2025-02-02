import React, { useState } from 'react'
import "./index.css"
import "./home.css"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Base() {

    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const change_page = (id) => {
        const coor = {
            1: "0px",
            2: "228px",
            3: "304px",
            4: "76px",
            5: "152px",
        }
        const col = {
            1: "red",
            2: "green",
            3: "blue",
            4: "orange",
            5: "yellow",
        }
        const root = document.documentElement;
        root.style.setProperty('--pos_x_nav', coor[id] || "0px");
        root.style.setProperty('--col_x_nav', col[id] || "red");

        if (id == 1) {
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        if (id == 2) {
            navigate('login/')
        }
        if (id == 3) {
            navigate("register/")
        }
        if (id == 4) {
            window.scrollTo({
                top: 616,
                behavior: 'smooth'
            });
        }
        if (id == 5) {
            window.scrollTo({
                top: 1892.3333740234375,
                behavior: 'smooth'
            });
        }
            {windowWidth > 604 ? <h1>Base</h1> : <h1>Home</h1>}
        console.log(window.scrollY)
    }

    return (
        <div>
            
            <nav style={{position: "sticky", top: 0, zIndex: 1000, border:"1px solid white", width: windowWidth > 604 ? "80%" : "100%", marginLeft: windowWidth > 604 ? "20%" : "0%", borderRadius: windowWidth > 604 ? "50px 0px 0px 50px" : "0 0 0 0"}}>
                <div className='centerNav'>
                    <div className="firm">Mark</div>
                </div>
                <div className='rightNav'>
                    <div className="btnNav1" onClick={() => change_page(1)}>Home</div>
                    <div className="btnNav4" onClick={() => change_page(4)}>About</div>
                    <div className="btnNav5" onClick={() => change_page(5)}>Contact</div>
                    <div className="btnNav2" onClick={() => change_page(2)}>Log In</div>
                    <div className="btnNav3" onClick={() => change_page(3)}>Sign Up</div>

                </div>
            </nav>

            <div>
                <div className="left">
                    <div className="text" style={{left: windowWidth > 604 ? "240px" : "0px"}}>
                        <span style={{fontSize: windowWidth > 604 ? "6rem" : "5rem"}}>Mark</span><br /> 
                        <p style={{visibility: windowWidth > 604 ? "visible" : "hidden"}}>Everything you need, small to big</p><br />
                        <button onClick={() => navigate("/login")} style={{visibility: windowWidth > 604 ? "visible" : "hidden"}}>Login</button><br />
                        <dir  style={{visibility: windowWidth > 604 ? "visible" : "hidden"}}>Don't have an account ? <u onClick={() => navigate("/register")} style={{visibility: windowWidth > 604 ? "visible" : "hidden"}}>Register</u></dir>
                    </div>
                </div>
                
                <div className="right"></div>
            </div>

            <div style={{ background: 'black', color: 'white', padding: '20px'}}>
                <h1 style={{ textAlign: 'center', fontSize: '4rem' }}>About</h1>
                <p style={{ background: "gray", padding: '10px', border: '1px solid purple', borderRadius: '10px'}}>We are a small business that sells everything that you need, food, art, table, everything.
                   We started this business 1 year ago because we wanted to create a place that people would
                   use to find the things that they need. Who never felt empty when he didn't find the stuff needed?
                   This place IS the solution. Since the creation of this enterprise, our benefits only continue to grow.</p>
                <div className="commentaries" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", padding: '10px', borderRadius: "10px"}}>
                    <div className="commentary">
                        <div className="title_comment">
                            <div className="profile" style={{background: "red"}}></div>
                            <h2>Mariah Joseph</h2>
                        </div>
                        <h5 style={{ opacity:"0.6"}}>27/01/2025</h5>
                        <p>The best place to find something. Everyone should go here. A very pleasurable experience.</p>
                    </div>
                    <div className="commentary">
                        <div className="title_comment">
                                <div className="profile" style={{background: "orange"}}></div>
                                <h2>John Doe</h2>
                            </div>
                            <h5 style={{ opacity:"0.6"}}>15/02/2025</h5>
                            <p>Great variety of products and excellent customer service. Highly recommend!</p>
                        </div>
                    <div className="commentary">
                        <div className="title_comment">
                            <div className="profile" style={{background: "yellow"}}></div>
                            <h2>Jane Smith</h2>
                        </div>
                        <h5 style={{ opacity:"0.6"}}>10/03/2025</h5>
                        <p>Found everything I needed and more. A wonderful shopping experience.</p>
                    </div>
                    <div className="commentary">
                        <div className="title_comment">
                            <div className="profile" style={{background: "green"}}></div>
                            <h2>Emily Johnson</h2>
                        </div>
                        <h5 style={{ opacity:"0.6"}}>05/04/2025</h5>
                        <p>High quality products at reasonable prices. Will definitely shop here again.</p>
                    </div>
                    <div className="commentary">
                        <div className="title_comment">
                            <div className="profile" style={{background: "blue"}}></div>
                            <h2>Michael Brown</h2>
                        </div>
                        <h5 style={{ opacity:"0.6"}}>20/05/2025</h5>
                        <p>Fast shipping and great customer support. Very satisfied with my purchase.</p>
                    </div>
                    <div className="commentary">
                        <div className="title_comment">
                            <div className="profile" style={{background: "purple"}}></div>
                            <h2>Jennifer Green</h2>
                        </div>
                        <h5 style={{ opacity:"0.6"}}>20/05/2025</h5>
                        <p>Incredible place ! Satisfied with everything.</p>
                    </div>
                </div>
                </div>



            <div className="contact" style={{ color: 'white'}}>
                <h1 className="titleContact" style={{ textAlign: 'center', fontSize: '4rem', textShadow: "10px 10px 10px black" }}>Contacts</h1>
                <form style={{ textAlign: 'center', fontSize: '2rem', boxShadow: "0 0 30px 10px black"}} action="mailto:markbuisness666@gmail.com" method="post" enctype="text/plain">
                    <div className="name">
                        <label htmlFor="name">Object:</label>
                        <input type="text" id="name" name="name" required /><br />
                    </div>

                    <div className="email">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required /><br />
                    </div>
                    
                    <div className="message">
                        <label htmlFor="message">Message:</label><br />
                        <textarea id="message" name="message" rows="4" required></textarea><br />
                    </div>

                    <input type="submit" value="Send" />
                </form>
            </div>

            <div className="bottom" style={{display: "flex", justifyContent: "space-around", fontSize: "1rem", background: "black", color: "white", fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>
                <div className="links" style={{display: "flex", padding:"10px"}}>
                    <div style={{display: "flex", padding:"10px"}}>Facebook</div>
                    <div style={{display: "flex", padding:"10px"}}>Twitter</div>
                    <div style={{display: "flex", padding:"10px"}}>Instagram</div>
                    <div style={{display: "flex", padding:"10px"}}>markbuisness666@gmail.com</div>
                </div>
            </div>
        </div>
    )
}

export default Base
