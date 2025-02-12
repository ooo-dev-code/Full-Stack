import React from "react";
import "./404Page.css";

const NotFoundPage = () => {
  return (
    <div className="error-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Oops! The page you requested was not found!</p>
      <div className="search-container">
        <p>
          You can go to <a href="/" className="home-link">home</a> page or search here
        </p>
      </div>
      <footer className="footer">
        © 2024 404 error page. All rights reserved | Template by w3layouts
      </footer>
    </div>
  );
};

export default NotFoundPage;
