import React from "react";

interface Props { }

export const Navbar = (): JSX.Element => {
    return (
        <nav className="navbar1">
            <div className="navbar-logo">
                <a href="#">
                    <img src="logo.png" alt="Logo" width={50} height={50} />
                </a>
            </div>
            <div className="navbar-buttons">
                <a href="#" className="text-gray-600">
                    BUS
                </a>
                <a href="#" className="text-gray-600">
                    TRACKING
                </a>
                <a href="#" className="text-gray-600">
                    TRAFFIC LIGHT
                </a>
            </div>
            <div className="navbar-profile">
                <a href="#">
                    <img src="icon.png" alt="Profile Icon" width={50} height={50} />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;



