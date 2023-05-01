/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from 'next/link'


interface Props { }

export const Navbar = (): JSX.Element => {
    return (
        <nav className="navbar1">
            <div className="navbar-logo">
                <Link href="/page1">
                    <img src="logo.png" alt="Logo" width={50} height={50} />
                </Link>
            </div>
            <div className="navbar-buttons ">
                <Link href="/landing" className="text-gray-600 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded">
                    BUS
                </Link>
                <Link href="/People" className="text-gray-600">
                    PEOPLE
                </Link>
                <Link href="/Traffic" className="text-gray-600">
                    TRAFFIC
                </Link>
            </div>
            <div className="navbar-profile">
                <Link href="#">
                    <img src="icon.png" alt="Profile Icon" width={50} height={50} />
                </Link>
            </div>
        </nav>

    );
};

export default Navbar;



