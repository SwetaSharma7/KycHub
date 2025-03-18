import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Product Details</Link></li>
        <li><Link to="/compare">Compare Products</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;