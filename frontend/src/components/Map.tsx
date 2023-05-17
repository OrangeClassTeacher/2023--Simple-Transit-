import { GoogleMap, useLoadScript, InfoWindow, Autocomplete, DirectionsRenderer, Marker, Polyline } from "@react-google-maps/api";
import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import { Context } from "../utils/Context";
import axios from "axios";
import { useRouter } from "next/router";
import SideMenu from "./SideMenu";
const libraries: any = ["places"];
interface ILOC {
  lat: number,
  lng: number
}

const Map = () => {
  const router = useRouter()
  const [sideButton, setSideButton] = useState<boolean>(false)
  const menuButton = () => {
    setSideButton(!sideButton)
  }
  const [layerName, setLayerName] = useState("none")
  const [busRouteData, setBusRouteData] = useState(null)
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState<any>(null)
  const { selectedPlace, setSelectedPlace } = useContext(Context)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const originRef: any = useRef<HTMLInputElement>()
  const destinationRef: any = useRef<HTMLInputElement>()
  const [travelmode, setTravelMode] = useState("WALKING")
  const [busStopData, setBusStopData] = useState(null)
  const mapRef: any = React.useRef();
  const [map, setMap] = useState({});
  const [traffic, setTraffic] = useState<any>();
  const [center, setCenter] = useState<ILOC>();
  const [startDirectionResponse, setStartDirectionResponse] = useState(null)
  const [endDirectionResponse, setEndDirectionResponse] = useState(null)
  const autocompleteRefDest: any = useRef(null);
  const autocompleteRefOrigin: any = useRef(null);
  const [currentLocation, setCurrentLocation] = useState<ILOC>()
  const [place, setPlace] = useState<any>();
  const [markerPoints, setMarkerPoints] = useState([])
  const [infoWindowPoints, setInfoWindowPoints] = useState([])
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY as string,
    libraries: libraries
  });
  const mapContainerStyle = {
    height: '90vh',
    width: '100%',
    position: "relative"
  };
  useEffect(() => {
    axios.get("http://localhost:9000/api/busroutes")
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
      .get("http://localhost:9000/api/busstops")
      .then((res) => setBusStopData(res.data.result));
  }, []);

  async function calculateRoute(param: any) {
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

  function changeTravelMode(param: string) {
    setTravelMode(param)
    calculateRoute(param)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    originRef.current.value = "",
      destinationRef.current.value = ""
    setOrigin(null)
    setDestination(null)
  }

  const onMapClick = async (event: any) => {
    const { latLng } = event;
    const lat: any = event.latLng.lat();
    const lng: any = event.latLng.lng();
    setCenter({ lat, lng });

    const service = new google.maps.places.PlacesService(mapRef?.current);
    const request: any = {
      location: latLng,
      radius: 500,
      type: ["transit_station", "bus_station"]
    };
    console.log(latLng);

    const results: any = await new Promise((resolve, reject) => {
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });

    if (results && results.length > 0) {
      const place = results[0];
      console.log(results);
      console.log(place);
      setSelectedPlace(place.name);
    }

  };

  const handleMapLoad = useCallback((map: any) => {
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

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_GOOGLE_API_KEY}`
          );
          const data = await response.json();

          if (data.status === 'OK') {
            setPlace(data.results[0].formatted_address);
            await place && console.log("place", place);
          }
        },
        () => null,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [isLoaded]);

  const handleDestination = () => {
    const place: any = autocompleteRefDest?.current?.getPlace();
    setDestination(place.geometry.location);
  };

  const handleOrigin = () => {
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
        {directionsResponse &&
          (<DirectionsRenderer directions={directionsResponse} />)}
        {currentLocation && (<Marker position={{ lat: currentLocation.lat, lng: currentLocation.lng, }} />)}
        {currentLocation && (<InfoWindow position={currentLocation}><h1>Current Location = {place}</h1></InfoWindow>)}
        {/* {array.length > 1 && (<Polyline path={array} options={{ strokeColor: '#FF0000' }} />)} */}
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
          }}

          position={origin}
        />)
        }
        {startDirectionResponse &&
          (<DirectionsRenderer directions={startDirectionResponse} />)}
        {endDirectionResponse &&
          (<DirectionsRenderer directions={endDirectionResponse} />)}
        {markerPoints.length > 0 && markerPoints.map((e, i) => {
          return <Marker
            position={e}
          >

            <InfoWindow
              position={e}
            >
              <div>{infoWindowPoints[i].stopName}</div>
            </InfoWindow>

          </Marker>



        })}



      </GoogleMap>
      <div className="absolute" style={{ top: 0, left: 0 }}>
        <button type="button" onClick={menuButton} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Direction</button>
      </div>
      <SideMenu
        sideButton={sideButton}
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
      />
    </div>
  );
};

export default Map;
