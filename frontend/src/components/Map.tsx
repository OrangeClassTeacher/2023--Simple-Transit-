import { GoogleMap ,useLoadScript} from "@react-google-maps/api";
import React from "react";


export default function Map(){
    const mapContainerStyle = {
        height: '400px',
        width: '100%',
      };
    
      const center = {
        lat: 47.90771,
        lng: 106.88324,
      };
      const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY as string
      });
      if (loadError) return 'Error loading maps';
      if (!isLoaded) return 'Loading Maps';


      return (<div>
     
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
            />
 
      </div>)
}
