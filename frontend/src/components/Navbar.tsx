import React, { useState } from "react";
import Link from 'next/link'
import UserModal from "./UserModal";
import LoginModal from "./LoginModal";
import SideMenu from "./SideMenu";




export const Navbar = (): JSX.Element => {

    const [modal, setModal] = useState(false)
    const [login, setLogin] = useState(false)
    const [checkLogin, setCheckLogin] = useState<Boolean>(false)
    const [sideButton, setSideButton] = useState(false)

    const handleModal = () => {
        setModal(!modal)
    }
    const handleLoginModal = () => {
        setLogin(!login)
    }
    const menuButton = () => {
        setSideButton(!sideButton)
    }

    const dn = !modal ? "block" : "none"
    return (
        <div>


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
                {!checkLogin ? <div className="flex">
                    <button type="button" onClick={handleLoginModal} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                    </button>
                    <a
                        data-modal-target="defaultModal" href="/Register"
                        data-modal-toggle="defaultModal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Sign Up
                    </a>

                </div> :
                    <div className="navbar-profile" style={{ display: "block" }}>
                        <button id="dropBtn" onClick={handleModal} >
                            <img src="profileImage.png" alt="Profile Icon" className="rounded-full object-cover" />
                        </button>
                    </div>}
                <LoginModal login={login} setLogin={setLogin} setCheckLogin={setCheckLogin} />

                <UserModal modal={modal} setModal={setModal} checkLogin={checkLogin} setCheckLogin={setCheckLogin} />
            </nav >
            <div>
                <div className="">
                    <button type="button" onClick={menuButton} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Direction</button>
                </div>
            </div>
            <SideMenu sideButton={sideButton} />
        </div>


    );
};

export default Navbar;



