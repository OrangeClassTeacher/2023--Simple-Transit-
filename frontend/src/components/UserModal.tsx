import React, { useContext } from 'react'
import { loginContext } from '@/utils/Context';
import { userContext } from '@/utils/Context';
import { useRouter } from 'next/router'

export default function UserModal({ modal, setModal }: { modal: boolean, setModal: any }): JSX.Element {
    const dn = modal ? "block" : "hidden";
    const route = useRouter()
    const { user } = useContext(userContext)
    const { checkLogin, setCheckLogin } = useContext(loginContext)
    function handleLogout(): any {
        setCheckLogin(!checkLogin)
        setModal(!modal)
        localStorage.clear()
        route.push("/page1")
    }
    return (

        <div id='dropdownModal' className={`${dn} mx-auto right-0 mt-2 absolute top-20 w-60 z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-60`} aria-labelledby='dropBtn'>
            <div className="bg-white rounded overflow-hidden shadow-lg">
                <div className="text-center p-6 bg-gray-800 border-b">
                    <img src={user.image} alt="Profile Icon" className="rounded-full object-cover h-full settingPro mx-auto" width={50} height={50} />
                    <p className="pt-2 text-lg font-semibold text-gray-50">{user.name} </p>
                    <p className="text-sm text-gray-100">{user.email}</p>
                    <div className="mt-5">
                        <a href='/UserProfile' className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 cursor-pointer">
                            Manage your Account
                        </a>
                    </div>
                </div>
                <div className='border-b'>
                    <ul>
                        <li>
                            <a href="#" className='px-4 py-2 text-black hover:bg-gray-100 flex'>Chat</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 text-black hover:bg-gray-100 flex'>Friends</a>
                        </li>
                        <li>
                            <a href="#" className='px-4 py-2 text-black hover:bg-gray-100 flex'>Settings</a>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <button onClick={(): any => handleLogout()} className="w-full px-4 py-2 pb-4 bg-red-700 hover:bg-red-500 flex">
                        <p className="text-lg font-medium text-white leading-none mx-auto ps-auto"> Системээс Гарах
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}
