import React, { useState, useEffect, useContext } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Image from 'next/image'
import findRoutes from './functions/findRoutes'
import axios from 'axios'
import { useRouter } from "next/router";
import { userContext, loginContext } from '@/utils/Context'
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
    map,
    origin,
    destination,
    currentLocation,
    setMarkerPoints,
    setInfoWindowPoints,
    infoWindowPoints,
    directionsResponse,
    setDirectionsResponse,
    startDirectionResponse,
    setStartDirectionResponse,
    endDirectionResponse,
    setEndDirectionResponse
}: any): JSX.Element {
    const router = useRouter()
    const [userSearch, setUserSearch] = useState("")
    const ds = sideButton ? "block " : "hidden"
    const [userData, setUserData] = useState([])
    const { user, setUser } = useContext(userContext)
    const { checkLogin, setCheckLogin } = useContext(loginContext)

    function filterFriends() {
        axios.post("http://localhost:9000/api/user/getallnotfriends", { userId: user._id, name: userSearch })
            .then((res) => setUserData(res.data.ress))
            .catch((err) => console.log(err)
            )
    }

    function addFriend(param: any) {

        axios.post("http://localhost:9000/api/user/connection", {
            requester: user._id,
            recipient: param,
            status: "pending"
        })
            .then((res) => { console.log(res.data.result); if (res.data.realStatus == true) { filterFriends } }
            )
            .catch((err) => console.log(err))
    }
    return (
        <div className='absolute' style={{ top: 0, left: 0 }}>
            <div id="drawer-disabled-backdrop" className={`${ds} absolute z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800`} aria-labelledby="drawer-disabled-backdrop-label">
                {router.pathname == "/page1" ? <h5 id="drawer-disabled-backdrop-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Direction</h5> : <h5 id="drawer-disabled-backdrop-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Search Friends</h5>}
                <button onClick={() => setSideButton(!sideButton)} type="button" data-drawer-hide="drawer-disabled-backdrop" aria-controls="drawer-disabled-backdrop" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only" >Close menu</span>
                </button>
                {router.pathname == "/page1" ? (<div className="py-4 overflow-y-auto">
                    <div className='flex justify-around border-b-black direcIcons focus:bg-slate-700'>
                        <button className='walkingButton' onClick={() => changeTravelMode("WALKING")}>
                            <Image
                                src="/walking-icon.jpg"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </button>
                        <button onClick={() => changeTravelMode("DRIVING")}>
                            <Image
                                src="/driving-icon.png"
                                alt=""
                                width={50}
                                height={50}
                            />
                        </button>
                        <button
                            onClick={() => findRoutes(
                                origin ? [origin.lat(), origin.lng()] : [currentLocation.lat, currentLocation.lng],
                                destination ? [destination.lat(), destination.lng()] : null,
                                busRouteData,
                                busStopData,
                                map,
                                setMarkerPoints,
                                setInfoWindowPoints,
                                setDirectionsResponse,
                                setStartDirectionResponse,
                                setEndDirectionResponse,
                                startDirectionResponse
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
                                onLoad={(autocomplete) => (autocompleteRefOrigin.current = autocomplete)}
                                onPlaceChanged={handleOrigin}
                            >

                                <input style={{ zIndex: "10" }} className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" type="text" placeholder={place} ref={originRef} />
                            </Autocomplete>
                        </div>
                        <div className='flex '>
                            <img src="/marker.png" alt="icon" className='inputIcon' />
                            <Autocomplete
                                onLoad={(autocomplete) => (autocompleteRefDest.current = autocomplete)}
                                onPlaceChanged={handleDestination}
                            >

                                <input style={{ zIndex: "1" }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="destination" ref={destinationRef} />
                            </Autocomplete>

                        </div>
                    </div>
                    <div className='mt-2 flex justify-center'>
                        <button className='px-3 py-2 text-xs text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' onClick={() => calculateRoute("WALKING")}>
                            Calculate route
                        </button>
                        <button className='px-3 py-2 text-xs text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' onClick={() => clearRoute()}>
                            Clear routes
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
                            <input className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500' placeholder='Search Friend' value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                            />
                            <button className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2' onClick={() => filterFriends()}>
                                Search
                            </button>

                        </div>
                        {
                            userData && userData.map((e, i) => {
                                return <div key={i} className="flex justify-between mt-2">
                                    {e.name}
                                    <button className='px-3 py-2 text-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2' onClick={() => addFriend(e._id)} >Add friend</button>
                                </div>
                            })
                        }
                    </div>)}
            </div>
        </div>
    )
}
