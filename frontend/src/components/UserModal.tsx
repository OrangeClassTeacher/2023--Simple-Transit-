import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
// export interface Modal {
//     modal: boolean
// }
import { userContext } from '@/utils/Context';

export default function UserModal({ modal, setModal, checkLogin, setCheckLogin }: { modal: boolean }): JSX.Element {
    const dn = modal ? "block" : "hidden";
    const { user, setUser } = useContext(userContext)
    function handleLogout() {
        setCheckLogin(!checkLogin)
        setModal(!modal)
    }



    return (

        <div id='dropdownModal' className={`${dn} mx-auto right-0 mt-2 absolute top-20 w-60 z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-60`} aria-labelledby='dropBtn'>
            <div className="bg-white rounded overflow-hidden shadow-lg">
                <div className="text-center p-6 bg-gray-800 border-b">
                    <img src="profileImage.png" alt="Profile Icon" className="rounded-full object-cover h-full settingPro mx-auto" width={50} height={50} />
                    <p className="pt-2 text-lg font-semibold text-gray-50">{user.name} </p>
                    <p className="text-sm text-gray-100">{user.email}</p>
                    <div className="mt-5">
                        <a className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 cursor-pointer">
                            Manage your Account
                        </a>
                    </div>
                </div>
                <div className='border-b'>
                    <ul>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Chat</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Friends</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Privace and Policy</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Help center</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 hover:bg-gray-100 flex'>Settings</a>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <button onClick={() => handleLogout()} className="w-full px-4 py-2 pb-4 bg-red-700 hover:bg-red-500 flex">
                        <p className="text-lg font-medium text-white leading-none mx-auto ps-auto"> Logout
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}
