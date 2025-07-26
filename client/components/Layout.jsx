// Layout.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import '../src/index.css';

export default function Layout() {
  return (
    <>
      <div className="header-container">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Style Threads</h1>
      </div>

      {/* Main navigation bar */}
      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink> | 
        <NavLink to="/product" className={({ isActive }) => isActive ? "active" : undefined}>Product</NavLink> | 
        <NavLink to="/order" className={({ isActive }) => isActive ? "active" : undefined}>Order</NavLink> |
        <NavLink to="/customer" className={({ isActive }) => isActive ? "active" : undefined}>Customer</NavLink>
      </nav>

      {/* Secondary nav */}
      <div className="auth-nav"> 
        <NavLink to="/signin" className={({ isActive }) => isActive ? "active" : undefined}>Sign In</NavLink> | 
        <NavLink to="/signout" className={({ isActive }) => isActive ? "active" : undefined}>Sign Out</NavLink>
      </div>

      <br />
      <hr />
    </>
  );
}