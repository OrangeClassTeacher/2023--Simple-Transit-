import axios from 'axios';
import React, { useState, useContext } from 'react'
import { userContext } from '@/utils/Context';
import { loginContext } from '@/utils/Context';
import Utils from '@/utils/utils';
import Link from 'next/link';
export default function LoginModal({ login, setLogin }: { login: boolean, setLogin: any }): any {
    const ds = login ? "block" : "hidden";
    const { user, setUser } = useContext(userContext)
    const { setCheckLogin } = useContext(loginContext)
    const [email, setEmail] = useState<any>('')
    const [password, setPassword] = useState<any>('')
    const [loggedUser, setLoggedUser] = useState<any>([])

    function handleLogin(e: any): any {
        e.stopPropagation();

        axios.post(`${Utils.API_URL}/user/login`, { email: email, password: password })
            .then(async (res) => {
                setLoggedUser(res.data)
                if (res.data.status == true) {
                    await setCheckLogin(true)
                    await setUser(res.data.user)
                    { user && console.log("user", loggedUser); localStorage.setItem("id", user._id) }
                    setLogin(false)

                }
                else alert("amjiltgui")
            })
            .catch((err) => console.log(err))
    }


    return (
        <div id="authentication-modal" tabIndex={-1} className={`${ds} absolute z-50 fixed p-4 w-96 focus:bg-primary-600 mx-auto overflow-x-hidden overflow-y-auto loginModal `}>
            <div className="relative w-full max-w-md max-h-full">
                <div className=" relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={(): any => setLogin(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">

                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                        <div className="space-y-6" >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e): any => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e): any => setPassword(e.target.value)}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div className="flex justify-between">

                                <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                            </div>
                            <button type="submit" onClick={(e): any => handleLogin(e)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered? <Link href="/Register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
