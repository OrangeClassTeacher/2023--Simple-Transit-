import { GoogleMap, useLoadScript, InfoWindow, Autocomplete, DirectionsRenderer, Marker } from "@react-google-maps/api";
import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import { Context } from "../utils/Context";

const libraries = ["places"];


const Map = ({ layerName }) => {
  const [destination, setDestination] = useState(null);
  const { selectedPlace, setSelectedPlace } = useContext(Context)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const originRef = useRef<HTMLInputElement>()
  const destinationRef = useRef<HTMLInputElement>()

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const result = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.TRANSIT,
      provideRouteAlternatives: true
    })
    setDirectionsResponse(result)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    originRef.current.value = "",
      destinationRef.current.value = ""
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
    setDestination
    const service = new google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: latLng,
      radius: 10,
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
      const place = results[1];
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


  const handleLayer = useCallback((layer) => {
    switch (layer) {
      case 'traffic':
        traffic.setMap(map);
        break;
      case 'none':
        traffic.setMap(null);
        break;
      default:
        break;
    }
    setTraffic(traffic);
  }, [map, traffic]);
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
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          );
          const data = await response.json();

          if (data.status === 'OK') {
            setPlace(data.results[0].formatted_address);
          }
        },
        () => null,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }, [isLoaded]);

  const autocompleteRef = useRef(null);
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    setDestination(place.geometry.location);
  };


  return (

    <div>

      {/* <button onClick={() => handleLayer(selectedLayer)}>Traffic</button>

      <button onClick={() => handleLayer(selectedLayer)}>None</button> */}
      {loadError && <p>Error loading maps</p>}
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
          )}
          {center &&
            (<Marker
              position={{
                lat: center.lat,
                lng: center.lng
              }}
            />
            )}

        </GoogleMap>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input style={{ zIndex: "10" }} type="text" placeholder="" ref={originRef} />
        </Autocomplete>
        <Autocomplete>
          <input style={{ zIndex: "1" }} type="text" placeholder="destination" ref={destinationRef} />
        </Autocomplete>
      </>
      )}


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
