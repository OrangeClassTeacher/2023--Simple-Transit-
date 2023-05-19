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
    return (
        <div className='absolute' style={{ top: 0, left: 0 }}>
            <div id="drawer-disabled-backdrop" className={`${ds} absolute z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800`} aria-labelledby="drawer-disabled-backdrop-label">
                <h5 id="drawer-disabled-backdrop-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Direction</h5>
                <button onClick={(): any => setSideButton(!sideButton)} type="button" data-drawer-hide="drawer-disabled-backdrop" aria-controls="drawer-disabled-backdrop" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >

                    <span className="sr-only" >Close menu</span>
                </button>
                {router.pathname == "/page1" ? (<div className="py-4 overflow-y-auto">
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
                            setDirectionsResponse,
                            setStartDirectionResponse,
                            setEndDirectionResponse
                        )}>
                        <Image
                            src="/bus-icon.jpg"
                            alt=""
                            width={50}
                            height={50}
                        />
                    </button>
                    <button onClick={(): any => calculateRoute("WALKING")}>
                        Calculate route
                    </button>
                    <Autocomplete
                        onLoad={(autocomplete): any => (autocompleteRefOrigin.current = autocomplete)}
                        onPlaceChanged={handleOrigin}
                    >
                        <input style={{ zIndex: "10" }} type="text" placeholder={place} ref={originRef} />
                    </Autocomplete>
                    <Autocomplete
                        onLoad={(autocomplete): any => (autocompleteRefDest.current = autocomplete)}
                        onPlaceChanged={handleDestination}
                    >

                        <input style={{ zIndex: "1" }} type="text" placeholder="destination" ref={destinationRef} />
                    </Autocomplete>
                    <button onClick={(): any => clearRoute()}>
                        Clear routes
                    </button>
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
                        <input placeholder='search' value={userSearch}
                            onChange={(e): any => setUserSearch(e.target.value)}
                        />
                        <button onClick={(): any => filterFriends()}>
                            Search
                        </button>
                        {
                            userData && userData.map((e: any, i: any) => (
                                <div key={i}>
                                    {e.name}
                                    <button onClick={(): any => addFriend(e._id)} >Add friend</button>
                                </div>
                            ))

                        }
                    </div>)}
            </div>
        </div>
    )
}
