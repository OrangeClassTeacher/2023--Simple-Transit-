import { GoogleMap, useLoadScript, InfoWindow, Autocomplete, DirectionsRenderer, Marker } from "@react-google-maps/api";
import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import { Context } from "../utils/Context";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

const libraries = ["places"];


const Map = () => {
  const router = useRouter()
  const [layerName, setLayerName] = useState("none")

  useEffect(() => {
    if (router.pathname == "/TrafficLight") {
      setLayerName("traffic")
    }
    else setLayerName("none")
  }, [router.pathname])
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null)
  const { selectedPlace, setSelectedPlace } = useContext(Context)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const originRef = useRef<HTMLInputElement>()
  const destinationRef = useRef<HTMLInputElement>()

  const [travelmode, setTravelMode] = useState("TRANSIT")

  const [busStopData, setBusStopData] = useState(null)
  const [closestBusStop, setClosestBusStop] = useState(null)
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/busstops")
      .then((res) => setBusStopData(res.data.result));
  }, []);

  async function calculateRoute(param) {
    if (destinationRef.current.value === "") {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const result = await directionsService.route({
      origin: originRef.current.value ? originRef.current.value : currentLocation,
      destination: destinationRef.current.value,
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

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };




  const [center, setCenter] = useState(null)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY as string,
    libraries: libraries
  });


  const onMapClick = async (event: any) => {
    const { latLng } = event;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCenter({ lat, lng });

    const service = new google.maps.places.PlacesService(mapRef.current);
    const request = {
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

  const mapRef = React.useRef();
  const [map, setMap] = useState({});
  const [traffic, setTraffic] = useState(null);

  const handleMapLoad = useCallback((map: any) => {
    mapRef.current = map;
    setMap(map);
    setTraffic(new window.google.maps.TrafficLayer());
  }, []);


  // const handleLayer = useCallback((layer) => {
  //   switch (layer) {
  //     case 'traffic':
  //       traffic.setMap(map);
  //       break;
  //     case 'none':
  //       traffic.setMap(null);
  //       break;
  //     default:
  //       break;
  //   }
  //   setTraffic(traffic);
  // }, [map, traffic]);
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


  const [currentLocation, setCurrentLocation] = useState(null)
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("position", position);

          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          findClosestBusStop({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_GOOGLE_API_KEY}`
          );
          const data = await response.json();
          console.log("data:", data);

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

  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
      2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }


  function findClosestBusStop(a) {
    let closestDistance = Infinity;
    let closestStop = null;


    busStopData && busStopData.forEach((stop) => {
      const stopLat = stop.busStopCoord[0];
      const stopLng = stop.busStopCoord[1];
      const distance = getDistance(
        a.lat,
        a.lng,
        stopLat,
        stopLng
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestStop = stop;
      }
    });

    setClosestBusStop(closestStop);
    console.log("closestbusstop:", closestBusStop);

  }

  const autocompleteRefDest = useRef(null);
  const autocompleteRefOrigin = useRef(null)
  const handleDestination = () => {
    const place = autocompleteRefDest.current.getPlace();
    console.log(place);

    setDestination(place.geometry.location);
    console.log("destination:", destination);

  };
  const handleOrigin = () => {
    const place = autocompleteRefOrigin.current.getPlace();
    setOrigin(place.geometry.location)
  }

  if (loadError) return <p>Error loading maps</p>;

  if (!isLoaded) return <p>Error loading maps</p>;


  return (

    <div>

      {/* <button onClick={() => handleLayer(selectedLayer)}>Traffic</button>

      <button onClick={() => handleLayer(selectedLayer)}>None</button> */}
      {/* {loadError &&} */}
      {!isLoaded && <p>Loading Maps</p>}
      {isLoaded && (<>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={currentLocation}
          zoom={14}
          onClick={onMapClick}
          onLoad={handleMapLoad}


        >
          {directionsResponse &&
            (<DirectionsRenderer directions={directionsResponse} />)}
          {currentLocation && (
            <Marker
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
            />
          )
          }
          {currentLocation && (
            <InfoWindow
              position={currentLocation}
            // visible={true}
            >
              <h1>Current Location = {place}</h1>
            </InfoWindow>
          )}

          {closestBusStop && (<Marker
            position={{
              lat: closestBusStop.busStopCoord[0],
              lng: closestBusStop.busStopCoord[1]
            }}
          />
          )}
          {/* 
          {closestBusStop && (<InfoWindow
            position={closestBusStop}
          >closestBusStop</InfoWindow>
          )} */}
          {center &&
            (<Marker
              position={{
                lat: center.lat,
                lng: center.lng
              }}
            />
            )}
          {destination &&
            (<Marker
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
        </GoogleMap>
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
      </>
      )}
      {/* <button onClick={() => findClosestBusStop(currentLocation)}>Closest busstop</button> */}
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
      <button onClick={() => changeTravelMode("TRANSIT")}>
        <Image
          src="/bus-icon.jpg"
          alt=""
          width={50}
          height={50}
        />
      </button>
      <button onClick={() => calculateRoute()}>
        Calculate route
      </button>
      <button onClick={() => clearRoute()}>
        Clear routes
      </button>
    </div>


  );
};

export default Map;
