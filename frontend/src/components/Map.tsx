import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React from "react";


export default function Map() {
  const mapContainerStyle = {
    height: '100vh',
    width: '100%',
  };

  const center = {
    lat: 47.90771,
    lng: 106.88324,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY as string
  });
  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading Maps</p>;


  return (<div>

    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
    />

  </div>)
}