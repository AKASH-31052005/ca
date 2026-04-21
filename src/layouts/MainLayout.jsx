import React from "react";
import NavBar from "../components/NavBar";

const MainLayout = ({ children }) => {
    return (
        <div className="layout">
            <NavBar />
            <main className="content">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
