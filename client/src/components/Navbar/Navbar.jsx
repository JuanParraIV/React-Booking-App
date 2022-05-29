import React, { useContext } from "react";
import "./Navbar.modules.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">Jm Booking</span>
          </Link>

          {user ? (
            <div>{user.username}</div>
          ) : (
            <div className="navItems">
              <button className="navButton">Register</button>
              <button className="navButton">Login</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
