import React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import Image from 'next/image'
import findRoutes from './functions/findRoutes'
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
    currentLocation
}: { setSideButton: any, sideButton: boolean }): JSX.Element {
    const ds = sideButton ? "block " : "hidden"
    return (
        <div className='absolute' style={{ top: 0, left: 0 }}>
            <div id="drawer-disabled-backdrop" className={`${ds} absolute z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800`} aria-labelledby="drawer-disabled-backdrop-label">
                <h5 id="drawer-disabled-backdrop-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Direction</h5>
                <button onClick={() => setSideButton(!sideButton)} type="button" data-drawer-hide="drawer-disabled-backdrop" aria-controls="drawer-disabled-backdrop" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only" >Close menu</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <button onClick={() => changeTravelMode("WALKING")}>
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

                        )}>
                        <Image
                            src="/bus-icon.jpg"
                            alt=""
                            width={50}
                            height={50}
                        />
                    </button>
                    <button onClick={() => calculateRoute("WALKING")}>
                        Calculate route
                    </button>
                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRefOrigin.current = autocomplete)}
                        onPlaceChanged={handleOrigin}
                    >
                        <input style={{ zIndex: "10" }} type="text" placeholder={place} ref={originRef} />
                    </Autocomplete>
                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRefDest.current = autocomplete)}
                        onPlaceChanged={handleDestination}
                    >

                        <input style={{ zIndex: "1" }} type="text" placeholder="destination" ref={destinationRef} />
                    </Autocomplete>
                    <button onClick={() => clearRoute()}>
                        Clear routes
                    </button>
                </div>
            </div>
        </div>
    )
}
