import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/views/NotFound.css'

const NotFound = () => (
  <div className="not-found">
    <h1>404 - Not Found!</h1>
    <Link to="/" className="home-link">
      Go Home
    </Link>
  </div>
);

export default NotFound;