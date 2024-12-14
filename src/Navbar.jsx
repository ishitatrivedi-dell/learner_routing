import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink className={(e) => (e.isActive ? "blue" : "")} to="/">
          <li>About Us</li>
        </NavLink>
        <NavLink className={(e) => (e.isActive ? "blue" : "")} to="/bank">
          <li>Bank</li>
        </NavLink>
        <NavLink className={(e) => (e.isActive ? "blue" : "")} to="/cocktail">
          <li>Cocktail</li>
        </NavLink>
        <NavLink className={(e) => (e.isActive ? "blue" : "")} to="/mealdb">
          <li>Mealdb</li>
        </NavLink>
        <NavLink className={(e) => (e.isActive ? "blue" : "")} to="/potter">
          <li>Potter</li>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

