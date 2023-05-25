import axios from 'axios';
import React, { useState, useContext } from 'react'
import { userContext } from '@/utils/Context';
import { loginContext, Context } from '@/utils/Context';
import Utils from '@/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LoginModal({ login, setLogin }: { login: boolean, setLogin: any }): any {
    const router = useRouter()
    const ds = login ? "block" : "hidden";
    const { user, setUser } = useContext(userContext)
    const { setCheckLogin } = useContext(loginContext)
    const { selectedLocation } = useContext(Context)
    const [email, setEmail] = useState<any>('')
    const [password, setPassword] = useState<any>('')
    const [loggedUser, setLoggedUser] = useState<any>([])
    { selectedLocation.length > 0 && console.log(selectedLocation); }

    function handleLogin(e: any): any {
        e.stopPropagation();

        if (selectedLocation.length > 0) {
            console.log(email, password, selectedLocation);

            axios.post(`${Utils.API_URL}/user/login`, { email: email, password: password, location: selectedLocation })
                .then(async (res) => {
                    await setLoggedUser(res.data)
                    console.log(res.data);

                    if (res.data.status == true) {
                        await setCheckLogin(true)
                        await setUser(res.data.user)
                        {
                            user &&
                                localStorage.setItem("name", res.data.user.name);
                            localStorage.setItem("email", res.data.user.email);
                            localStorage.setItem("image", res.data.user.image);
                            localStorage.setItem("id", res.data.user._id);
                            console.log(user);
                            router.push("/page1")
                        }
                        setLogin(false)

                    }
                    else alert("Бүртгэлтэй хэрэглэгч байхгүй байна!")
                })
                .catch((err) => console.log(err))
        }
    }


    return (
        <div id="authentication-modal" tabIndex={-1} className={`${ds} absolute z-50 fixed p-4 w-96 focus:bg-primary-600 mx-auto overflow-x-hidden overflow-y-auto loginModal `}>
            <div className="relative w-full max-w-md max-h-full">
                <div className=" relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={(): any => setLogin(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="authentication-modal">

                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900">Нэвтрэх</h3>
                        <div className="space-y-6" >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">И-мэйл хаяг</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e): any => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Нууц үг</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e): any => setPassword(e.target.value)}
                                    placeholder="Нууц үгээ оруулна уу" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div className="flex justify-between">

                                <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Нууц үгээ мартсан уу?</a>
                            </div>
                            <button type="submit" onClick={(e): any => handleLogin(e)} className="w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Нэвтрэх</button>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Бүртгэл байхгүй юу? <Link href="/Register" className="text-blue-700 hover:underline dark:text-blue-500">Шинээр бүртгүүлэх</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
