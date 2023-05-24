import { ChatContainer } from "@/components/chatContainer";
import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import { GoogleMap, useLoadScript, InfoWindowF, DirectionsRenderer, Marker, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { useRouter } from "next/router";
import SideMenu from "./SideMenu";
import Utils from "@/utils/utils";
import { Context, userContext } from "@/utils/Context";
import Link from 'next/link';


const libraries: any = ["places"];
interface ILOC {
  lat: number,
  lng: number
}

const Map = (): any => {

  const [id, setId]: any = useState(null)
  const [selectChannel, setSelectChannel]: any = useState("global-welcome");
  const [friends, setFriends]: any = useState(null)
  useEffect(() => {
    const userId: any = localStorage.getItem("id")
    setId(userId)
    if (userId) {
      console.log("user", userId);

      axios.post("http://localhost:9000/api/user/getallfriends", { userId: userId })
        .then((res) => {
          const newArr = res.data.ress.map((e: any) => (e._id))
          console.log("newArr", newArr);

          setFriends(newArr)
        })
        .catch((err) => console.log(err)
        )
    }
  }, [])
  const generateChannelName = (user1Id: any, user2Id: any) => {
    const sortedUserIds = [user1Id, user2Id].sort();
    return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
  };
  const channels: any = friends !== null ? friends.map((e: any): any => {
    return generateChannelName(id, e)
  }) : (null)

  const selectChannelFunc = (evt: any, channel: any) => {
    evt.preventDefault();
    setSelectChannel(channel);
  };
  const channelListItems = channels !== null ? channels.map((channel: any) => (
    <li key={channel}>
      <Link
        href={`/channels/${channel}`}
        onClick={(evt) => {
          selectChannelFunc(evt, channel);
        }}
      >
        {channel}
      </Link>
    </li>
  )) : (
    <li>
      Loading
    </li>
  )


  const router = useRouter()
  const [sideButton, setSideButton] = useState<boolean>(false)
  const menuButton = (): any => {
    setSideButton(!sideButton)
  }
  const [layerName, setLayerName] = useState("none")
  const [friendsLocations, setFriendsLocations] = useState([])
  const { setSelectedLocation } = useContext(Context)
  const { user } = useContext(userContext)
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
  const [place, setPlace] = useState<any>(null);
  const [markerPoints, setMarkerPoints] = useState([])
  const [infoWindowPoints, setInfoWindowPoints] = useState<any>([])
  const startDirectionRendererRef: any = useRef(null);
  // const endDirectionRendererRef: any = useRef(null);
  const directionsRendererRef: any = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
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
    console.log(Utils.API_URL);
    axios
      .get(`${Utils.API_URL}/busstops`)


      .then((res) => setBusStopData(res.data.result));
  }, []);
  useEffect(() => {
    if (user._id) {
      axios.post(`${Utils.API_URL}/user/getallfriends`, {
        userId: user._id
      })
        .then((res) => {
          console.log(res.data)
          setFriendsLocations(res.data.ress)
        }
        )
        .catch((err) => console.log(err)
        )
    }
  }, [user._id])

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


  function clearRoute(): any {
    setDirectionsResponse(null)
    originRef.current.value = ""
    destinationRef.current.value = ""
    setOrigin(null)
    setDestination(null)
    setStartDirectionResponse(null)
    setEndDirectionResponse(null)
    console.log(startDirectionResponse);
    console.log(endDirectionResponse);
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
        async (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          const newArr: any = []
          newArr.push(position.coords.latitude, position.coords.longitude)
          setSelectedLocation(newArr)

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_GOOGLE_API_KEY}`
          );
          const data = await response.json();


          if (data.status === 'OK') {
            await setPlace(data.results[0].formatted_address)

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


  const handleMarkerClick = (marker: any, id1: any, id2: any) => {
    setSelectedMarker(marker);
    const newChannel = generateChannelName(id1, id2)
    setSelectChannel(newChannel)
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const renderInfoWindow = (position: any, name: any) => {
    return (
      <InfoWindowF position={position} onCloseClick={handleInfoWindowClose}>
        <div>
          <div className="p-6">
            <h1>{name}</h1>
            <h1>Channel list</h1>
            <div className="flex">
              <div className="w-1/4">{channelListItems}</div>
              <div className="w-3/4 bg-gray-400 w-full">
                <ChatContainer selectChannel={selectChannel} />
              </div>
            </div>
          </div>
        </div>
      </InfoWindowF>
    );
  };




  return (

    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation}
        zoom={14}
        onClick={onMapClick}
        onLoad={handleMapLoad}
      >
        {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}
        {currentLocation && (<Marker position={{ lat: currentLocation.lat, lng: currentLocation.lng, }}>
          <InfoWindowF position={currentLocation}><h1>Current Location = {place}</h1>
          </InfoWindowF></Marker>)}
        \
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
              draggable: false
            }}
          />
        ) : null}
        {friendsLocations.length > 0 && friendsLocations.map((e: any, i: any) =>
        (<MarkerF key={i}
          icon={{
            url: e.image,
            scaledSize: new window.google.maps.Size(25, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 25),
          }}
          position={{ lat: e.location[0], lng: e.location[1] }}
          onClick={() => handleMarkerClick(e, id, e._id)}

        >
          {selectedMarker === e && renderInfoWindow({ lat: e.location[0], lng: e.location[1] }, e.name)}

        </MarkerF>))}
        {/* {directionsResponse ? (
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
        ) : null} */}
        {markerPoints.length > 0 && markerPoints.map((e, i) => (
          <Marker key={i} position={e}>
            <InfoWindowF position={e}><div>{infoWindowPoints[i].stopName}</div></InfoWindowF>
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
