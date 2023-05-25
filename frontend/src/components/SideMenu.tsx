import React, { useState, useContext } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Image from 'next/image'
import findRoutes from './functions/findRoutes'
import axios from 'axios'
import { useRouter } from "next/router";
import { userContext } from '@/utils/Context'
import Utils from '@/utils/utils'
export default function SideMenu({
    sideButton,
    setSideButton,
    place,
    autocompleteRefOrigin,
    autocompleteRefDest,
    handleOrigin,
    handleDestination,
    originRef,
    destinationRef,
    clearRoute,
    changeTravelMode,
    calculateRoute,
    busStopData,
    busRouteData,
    origin,
    destination,
    currentLocation,
    setMarkerPoints,
    setInfoWindowPoints,
    infoWindowPoints,
    map,
    setDirectionsResponse,
    setStartDirectionResponse,
    setEndDirectionResponse
}: any): JSX.Element {
    const router = useRouter()
    const [userSearch, setUserSearch] = useState<any>("")
    const ds = sideButton ? "block " : "hidden"
    const [userData, setUserData] = useState<any>([])
    const { user } = useContext(userContext)


    function filterFriends(): any {
        axios.post(`${Utils.API_URL}/user/getallnotfriends`, { userId: user._id, name: userSearch })
            .then((res) => setUserData(res.data.ress))
            .catch((err) => console.log(err)
            )
    }

    function addFriend(param: any): any {

        axios.post(`${Utils.API_URL}/user/connection`, {
            requester: user._id,
            recipient: param,
            status: "pending"
        })
            .then((res) => { console.log(res.data.result); if (res.data.realStatus == true) { filterFriends } }
            )
            .catch((err) => console.log(err))
    }

    function TestsetDire(response) {
        console.log("response ----- ", response);
        setDirectionsResponse(response)



        // setDirectionsResponse((prev) => response)


    }
    return (
        <div className='absolute' style={{ top: 0, left: 0 }}>
            <div id="drawer-disabled-backdrop" className={`${ds} absolute z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800`} aria-labelledby="drawer-disabled-backdrop-label">
                {router.pathname == "/page1" ? (<h5 id="drawer-disabled-backdrop-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Чиглэл</h5>) : (<h5 id="drawer-disabled-backdrop-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Найзаа хайх</h5>)}
                < button onClick={(): any => setSideButton(!sideButton)} type="button" data-drawer-hide="drawer-disabled-backdrop" aria-controls="drawer-disabled-backdrop" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >

                    <span className="sr-only" >Close menu</span>
                </button>
                {router.pathname == "/page1" ? (<div className="py-4 overflow-y-auto">
                    <div className='flex justify-around border-b-black direcIcons focus:bg-slate-700'>
                        <button onClick={(): any => changeTravelMode("WALKING")}>
                            <Image
                                src="/walking-icon.jpg"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </button>
                        <button onClick={(): any => changeTravelMode("DRIVING")}>
                            <Image
                                src="/driving-icon.png"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </button>
                        <button
                            onClick={(): any => findRoutes(
                                origin ? [origin.lat(), origin.lng()] : [currentLocation.lat, currentLocation.lng],
                                destination ? [destination.lat(), destination.lng()] : null,
                                busRouteData,
                                busStopData,
                                setMarkerPoints,
                                setInfoWindowPoints,
                                TestsetDire,
                                setDirectionsResponse,
                                setStartDirectionResponse,
                                setEndDirectionResponse,

                            )}>
                            <Image
                                src="/bus-icon.jpg"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </button>
                    </div>
                    <div className='mt-2'>
                        <div className='flex'>
                            <img src="/my-location-icon.png" alt="icon" className='inputIcon' />
                            <Autocomplete
                                onLoad={(autocomplete): any => (autocompleteRefOrigin.current = autocomplete)}
                                onPlaceChanged={handleOrigin}>
                                <input className='bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500' style={{ zIndex: "10" }} type="text" placeholder={place} ref={originRef} />
                            </Autocomplete>
                        </div>
                        <div className='flex'>
                            <img src="/marker.png" alt="icon" className='inputIcon' />
                            <Autocomplete
                                onLoad={(autocomplete): any => (autocompleteRefDest.current = autocomplete)}
                                onPlaceChanged={handleDestination}>
                                <input className='bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500' style={{ zIndex: "1" }} type="text" placeholder="destination" ref={destinationRef} />
                            </Autocomplete>
                        </div>
                    </div>
                    <div className='mt-2 flex justify-center'>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={(): any => calculateRoute("TRANSIT")}>
                            Чиглэл тооцоолох
                        </button>
                        <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={(): any => clearRoute()}>
                            Чиглэл арилгах
                        </button>
                    </div>

                    <hr />
                    {originRef?.current?.value ? (
                        <div>
                            <h1>{originRef?.current?.value}</h1>
                        </div>
                    ) :
                        (<div>
                            {place}
                        </div>)
                    }

                    <div>
                        Walk
                    </div>
                    <hr />
                    {infoWindowPoints.length > 0 && (
                        <div>
                            {infoWindowPoints[0].stopName}
                            <br />
                            Bus
                            <br />
                            {infoWindowPoints[infoWindowPoints.length - 1].stopName}
                        </div>
                    )}
                    <hr />
                    <div>
                        Walk
                    </div>
                    {destinationRef?.current?.value && (
                        <div>
                            <h1>{destinationRef?.current?.value}</h1>
                        </div>
                    )}
                </div>) :
                    (<div>
                        <div className='relative mt-3'>

                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='search' value={userSearch}
                                onChange={(e): any => setUserSearch(e.target.value)}
                            />
                            <button className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={(): any => filterFriends()}>
                                Хайх
                            </button>
                        </div>
                        {
                            userData && userData.map((e: any, i: any) => (
                                <div className='flex justify-between mt-2' key={i}>
                                    {e.name}
                                    <button className='px-3 py-2 text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' onClick={(): any => addFriend(e._id)} >Найзаар нэмэх</button>
                                </div>
                            ))

                        }
                    </div>)}
            </div>
        </div >
    )
}