import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0", display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <Link to="/activities">Activities</Link>
            <Link to="/filter">Filter</Link>
            <Link to="/stats">Stats</Link>
        </nav>
    );
};

export default NavBar;
