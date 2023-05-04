import React, { useState } from "react";
import Link from 'next/link'
import UserModal from "./UserModal";
import LoginModal from "./LoginModal";


// interface Props { } 
// export interface Modal {
//     id: Number,
//     name: string
// }

export const Navbar = (): JSX.Element => {
    const [modal, setModal] = useState(false)
    const [login, setLogin] = useState(false)
    // console.log(login);
    // console.log(modal);


    const handleModal = () => {
        setModal(!modal)
    }
    const handleLoginModal = () => {
        setLogin(!login)
    }

    const dn = !modal ? "block" : "none"
    return (
        <nav className="navbar1 static">
            <div className="navbar-logo">
                <Link href="/page1">
                    <img src="logo.png" alt="Logo" width={50} height={50} />
                </Link>
            </div>
            <div className="navbar-buttons ">
                <Link href="/page1" className="text-gray-600">
                    BUS
                </Link>
                <Link href="/People" className="text-gray-600">
                    TRACKING
                </Link>
                <Link href="/TrafficLight" className="text-gray-600">
                    TRAFFIC LIGHT
                </Link>
            </div>
            <div>
                <button type="button" onClick={handleLoginModal} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    login
                </button>

            </div>
            <div className="navbar-profile" style={{ display: "block" }}>
                <button id="dropBtn" onClick={handleModal} >
                    <img src="profileImage.png" alt="Profile Icon" className="rounded-full object-cover" />
                </button>
            </div>
            <LoginModal login={login} />
            <UserModal modal={modal} />
        </nav >

    );
};

export default Navbar;



