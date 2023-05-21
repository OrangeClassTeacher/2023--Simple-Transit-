import React, { useState, useContext, useEffect } from "react";
import Link from 'next/link'
import UserModal from "./UserModal";
import LoginModal from "./LoginModal";
import { loginContext, userContext } from "@/utils/Context";


export const Navbar = (): JSX.Element => {
    const { user, setUser } = useContext<any>(userContext)
    const [modal, setModal] = useState<any>(false)
    const [login, setLogin] = useState<any>(false)
    const { checkLogin, setCheckLogin } = useContext<any>(loginContext)


    useEffect(() => {


        if (localStorage.getItem("name")) {
            setCheckLogin(true)
            setUser({
                ...user,
                name: localStorage.getItem("name"),
                email: localStorage.getItem("email"),
                image: localStorage.getItem("image"),
                _id: localStorage.getItem("id")
            })
        }
    }, [checkLogin])

    const handleModal = (): any => {
        setModal(!modal)
    }
    const handleLoginModal = (): any => {
        setLogin(!login)
    }
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
                    {checkLogin ? (<Link href="/People" className="text-gray-600">
                        TRACKING
                    </Link>) : (null)}
                    <Link href="/TrafficLight" className="text-gray-600">
                        TRAFFIC LIGHT
                    </Link>
                </div>
                {!checkLogin ? <div className="flex">
                    <button type="button" onClick={handleLoginModal} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                    </button>
                    <Link
                        data-modal-target="defaultModal" href="/Register"
                        data-modal-toggle="defaultModal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Sign Up
                    </Link>

                </div> :
                    <div className="navbar-profile" style={{ display: "block" }}>
                        <button id="dropBtn" onClick={handleModal} >
                            <img src={user.image} alt="Profile Icon" className="rounded-full object-cover" />
                        </button>
                    </div>}
                <LoginModal login={login} setLogin={setLogin} />

                <UserModal modal={modal} setModal={setModal} />
            </nav >
        </div>
    );
};

export default Navbar;



