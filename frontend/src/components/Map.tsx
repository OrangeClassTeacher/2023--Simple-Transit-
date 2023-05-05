import { GoogleMap, useLoadScript, InfoWindow, Autocomplete, DirectionsRenderer, TrafficLayer } from "@react-google-maps/api";
import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import { Context } from "../utils/Context";




const Map = ({ layerName }) => {

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
      travelMode: google.maps.TravelMode.DRIVING,
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




  const center = {
    lat: 47.90771,
    lng: 106.88324,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY as string,
    libraries: ["places"],
  });


  const onMapClick = async (event: any) => {
    const { latLng } = event;
    const service = new google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: latLng,
      radius: 10,
    };
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
    setTraffic(traffic); // update the state of traffic
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
  return (

    <div>

      {/* <button onClick={() => handleLayer(selectedLayer)}>Traffic</button>

      <button onClick={() => handleLayer(selectedLayer)}>None</button> */}
      {loadError && <p>Error loading maps</p>}
      {!isLoaded && <p>Loading Maps</p>}
      {isLoaded && (<>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onClick={onMapClick}
          onLoad={handleMapLoad}


        >
          {directionsResponse &&
            (<DirectionsRenderer directions={directionsResponse} />)}

        </GoogleMap>
        <Autocomplete>
          <input type="text" placeholder="origin" ref={originRef} />
        </Autocomplete>
        <Autocomplete>
          <input type="text" placeholder="destination" ref={destinationRef} />
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
