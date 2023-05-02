import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";

const libraries = ["places"];

const Map = () => {
  const mapContainerStyle = {
    height: '600px',
    width: '100%',
  };

  const center = {
    lat: 47.90771,
    lng: 106.88324,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY as string,
    libraries,
  });

  const [selectedPlace, setSelectedPlace] = useState("");

  const onMapClick = async (event) => {
    const { latLng } = event;
    const service = new google.maps.places.PlacesService(mapRef.current);
    const request = {
      location: latLng,
      radius: 10,
    };
    const results = await new Promise((resolve, reject) => {
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
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  return (
    <div>
      {loadError && <p>Error loading maps</p>}
      {!isLoaded && <p>Loading Maps</p>}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >

        </GoogleMap>
      )}
      <input readOnly={true} type="text" value={selectedPlace} />
    </div>
  );
};

export default Map;
