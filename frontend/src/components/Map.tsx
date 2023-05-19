import { GoogleMap, useLoadScript, InfoWindow, DirectionsRenderer, Marker } from "@react-google-maps/api";
import React, { useState, useRef, useCallback, useEffect } from "react";

import axios from "axios";
import { useRouter } from "next/router";
import SideMenu from "./SideMenu";
import Utils from "@/utils/utils";

const libraries: any = ["places"];
interface ILOC {
  lat: number,
  lng: number
}

const Map = (): any => {

  const router = useRouter()
  const [sideButton, setSideButton] = useState<boolean>(false)
  const menuButton = (): any => {
    setSideButton(!sideButton)
  }
  const [layerName, setLayerName] = useState("none")
  // const { checkLogin, setCheckLogin } = useContext(loginContext)
  const [busRouteData, setBusRouteData] = useState<any>(null)
  const [destination, setDestination] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null)
  const [directionsResponse, setDirectionsResponse] = useState<any>(null)
  const originRef: any = useRef<HTMLInputElement>()
  const destinationRef: any = useRef<HTMLInputElement>()
  const [travelmode, setTravelMode] = useState("WALKING")
  const [busStopData, setBusStopData] = useState(null)
  const mapRef: any = React.useRef();
  const [map, setMap] = useState<any>(null);
  const [traffic, setTraffic] = useState<any>();
  const [center, setCenter] = useState<ILOC>();
  const [startDirectionResponse, setStartDirectionResponse] = useState<any>(null)
  const [endDirectionResponse, setEndDirectionResponse] = useState<any>(null)
  const autocompleteRefDest: any = useRef(null);
  const autocompleteRefOrigin: any = useRef(null);
  const [currentLocation, setCurrentLocation] = useState<ILOC>()
  const [place, setPlace] = useState<any>();
  const [markerPoints, setMarkerPoints] = useState([])
  const [infoWindowPoints, setInfoWindowPoints] = useState<any>([])
  const startDirectionRendererRef: any = useRef(null);
  // const endDirectionRendererRef: any = useRef(null);
  const directionsRendererRef: any = useRef(null);
  const { isLoaded, loadError }: any = useLoadScript({
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY as string,
    libraries: libraries
  });

  const mapContainerStyle = {
    height: '90vh',
    width: '100%',

  };
  useEffect(() => {
    axios.get(`${Utils.API_URL}/busroutes`)
      .then((res) => setBusRouteData(res.data.result))
  }, [])

  useEffect(() => {
    if (router.pathname == "/TrafficLight") {
      setLayerName("traffic")
    }
    else setLayerName("none")
  }, [router.pathname])
  useEffect(() => {
    axios
      .get(`${Utils.API_URL}/busstops`)
      .then((res) => setBusStopData(res.data.result));
  }, []);

  async function calculateRoute(param: any): Promise<any> {
    if (destinationRef?.current?.value === "") {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const result: any = await directionsService.route({
      origin: originRef?.current?.value ? originRef.current.value : currentLocation,
      destination: destinationRef?.current?.value || "",
      travelMode: param ? param : travelmode,
      provideRouteAlternatives: true
    })
    setDirectionsResponse(result)
  }

  // const [directions, setDirections] = useState(null);
  // const handleDirectionsLoad = (directions:any) => {
  //   setDirections(directions);
  // };
  // const handleDirectionsUnmount = () => {
  //   if (directionsRendererRef.current) {
  //     directionsRendererRef.current.setDirections(null);
  //   }
  // };
  function clearRoute(): any {
    setDirectionsResponse(null)
    originRef.current.value = "",
      destinationRef.current.value = ""
    setOrigin(null)
    setDestination(null)
    setStartDirectionResponse(null)
    setEndDirectionResponse(null)
    console.log(startDirectionResponse);
    console.log(endDirectionResponse);
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      console.log(directionsRendererRef.current);

    }

    setMarkerPoints([])
    setInfoWindowPoints([])

  }

  function changeTravelMode(param: string): any {
    setTravelMode(param)
    calculateRoute(param)
  }



  const onMapClick = async (event: any): Promise<void> => {
    const lat: any = await event.latLng.lat();
    const lng: any = await event.latLng.lng();
    setCenter({ lat, lng })
  };

  const handleMapLoad = useCallback((map: any): void => {
    mapRef.current = map;
    setMap(map);
    setTraffic(new window.google.maps.TrafficLayer());
  }, []);

  const handleLayerEffect = useCallback(() => {
    switch (layerName) {
      case "traffic":
        if (map && !traffic) {
          setTraffic(new window.google.maps.TrafficLayer());
        } else if (traffic) {
          traffic.setMap(map);
        }
        break;
      case "none":
        if (traffic) {
          traffic.setMap(null);
        }
        break;
      default:
        break;
    }
  }, [layerName, map, traffic]);

  useEffect(() => {
    handleLayerEffect();
  }, [handleLayerEffect]);



  useEffect(() => {
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(
        async (position): Promise<any> => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_GOOGLE_API_KEY}`
          );
          const data = await response.json();

          if (data.status === 'OK') {
            setPlace(data.geometry.location)
            await place && console.log("place", place);
          } else {
            return "error"
          }
        },
        (): any => null,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [isLoaded]);

  const handleDestination = (): any => {
    const place: any = autocompleteRefDest?.current?.getPlace();
    setDestination(place.geometry.location);
  };

  const handleOrigin = (): any => {
    const place: any = autocompleteRefOrigin?.current?.getPlace();
    setOrigin(place.geometry.location)
  }

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Error loading maps</p>;


  return (

    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation}
        zoom={14}
        onClick={onMapClick}
        onLoad={handleMapLoad}
      >
        {/* {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)} */}
        {currentLocation && (<Marker position={{ lat: currentLocation.lat, lng: currentLocation.lng, }} />)}
        {currentLocation && (<InfoWindow position={currentLocation}><h1>Current Location = {place}</h1></InfoWindow>)}
        {center && (<Marker position={{ lat: center.lat, lng: center.lng }} />)}
        {destination && (<Marker
          icon={{
            url: "/marker-icon.png",
            scaledSize: new window.google.maps.Size(25, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 25),
          }}
          position={destination}
        />)}
        {origin && (<Marker
          icon={{
            url: "/marker-icon.png",
            scaledSize: new window.google.maps.Size(25, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 25),
          }} position={origin}
        />)}
        {startDirectionResponse ? (
          <DirectionsRenderer

            directions={startDirectionResponse}
            ref={startDirectionRendererRef}
            options={{
              map: map,
              polylineOptions: {
                strokeColor: "#0000FF",
                strokeOpacity: 0.7,
                strokeWeight: 4,
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      scale: 4,
                    },
                    offset: "0",
                    repeat: "20px",
                  },
                ],
              },
              suppressMarkers: true,
            }}
          />
        ) : null}

        {endDirectionResponse ? (
          <DirectionsRenderer
            directions={endDirectionResponse}
            ref={directionsRendererRef}
            options={{
              map: map,
              polylineOptions: {
                strokeColor: "#0000FF",
                strokeOpacity: 0.7,
                strokeWeight: 4,
                icons: [
                  {
                    icon: {
                      path: "M 0,-1 0,1",
                      strokeOpacity: 1,
                      scale: 4,
                    },
                    offset: "0",
                    repeat: "20px",
                  },
                ],
              },
              suppressMarkers: true,
            }}
          />
        ) : null}

        {directionsResponse ? (
          <DirectionsRenderer

            ref={directionsRendererRef}
            directions={directionsResponse}
            options={{
              map: map,
              polylineOptions: {
                strokeColor: "#FF0000",
              },
              suppressMarkers: true,
            }}
          />
        ) : null}
        {markerPoints.length > 0 && markerPoints.map((e, i) => (
          <Marker key={i} position={e}>
            <InfoWindow position={e}><div>{infoWindowPoints[i].stopName}</div></InfoWindow>
          </Marker>
        ))}
      </GoogleMap>
      <div className="absolute" style={{ top: 0, left: 0 }}>
        <button type="button" onClick={menuButton} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {router.pathname == "/page1" ? (<h1>Direction</h1>) : (<h1>Search friends</h1>)}
        </button>
      </div>
      <SideMenu sideButton={sideButton}
        setSideButton={setSideButton}
        place={place}
        autocompleteRefOrigin={autocompleteRefOrigin}
        autocompleteRefDest={autocompleteRefDest}
        handleOrigin={handleOrigin}
        handleDestination={handleDestination}
        originRef={originRef}
        destinationRef={destinationRef}
        clearRoute={clearRoute}
        changeTravelMode={changeTravelMode}
        calculateRoute={calculateRoute}
        busStopData={busStopData}
        busRouteData={busRouteData}
        map={map}
        origin={origin}
        destination={destination}
        currentLocation={currentLocation}
        setMarkerPoints={setMarkerPoints}
        setInfoWindowPoints={setInfoWindowPoints}
        infoWindowPoints={infoWindowPoints}
        directionsResponse={directionsResponse}
        setDirectionsResponse={setDirectionsResponse}
        startDirectionResponse={startDirectionResponse}
        setStartDirectionResponse={setStartDirectionResponse}
        endDirectionResponse={endDirectionResponse}
        setEndDirectionResponse={setEndDirectionResponse}
      />
    </div>
  );
};

export default Map;
