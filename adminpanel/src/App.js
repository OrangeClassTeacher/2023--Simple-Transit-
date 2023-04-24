import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { GoogleMap, Marker, useLoadScript, Polyline } from '@react-google-maps/api';


function App() {
  const [data, setData] = useState([]);
  const [selectedBusStops, setSelectedBusStops] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/busstops")
      .then((res) => setData(res.data.result));
  }, []);

  function onSelect(e) {
    setSelectedBusStops([...selectedBusStops, e.target.value]);


  }

  function addRoute() {
    axios.get("http://localhost:9000/api/busstops").then((res) => {
      const allStops = res.data.result;
      const filteredStops = allStops.filter((route) =>
        selectedBusStops.includes(route.busStopName)
      );
      setRoutes(filteredStops);

      console.log(routes);
    });
  }

  function onAdd() {
    axios
      .post("http://localhost:9000/api/busroutes/create", {
        busRouteName: "",
        busStopDetails: routes,
        busRouteId: "",
      })
      .then((res) => {
        console.log(res);
      });
  }

  // const libraries = ['places'];

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  const center = {
    lat: 47.90771,
    lng: 106.88324,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAhjl1X_pQkIAeTUWlWv4cKKUDqgyxDCQE'
  });
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';



  return (
    <div className="App">
      <input placeholder="Чиглэлийн дугаар" />
      <input placeholder="Чиглэлийн нэр" />
      Чиглэлийн буудлуудыг сонгоx
      <select onChange={(e) => onSelect(e)}>
        {data.map((e, i) => {
          return (
            <option value={e.busStopName} key={i}>
              {e.busStopName}
            </option>
          );
        })}
      </select>
      <ul>
        {selectedBusStops.map((e, i) => {
          return <li key={i}>{e}</li>;
        })}
      </ul>
      <button onClick={() => addRoute()}>Чиглэл шалгаx</button>
      <button onClick={() => onAdd()}>Чиглэлийг нэмэx</button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
      >
        {route.length > 0 && (
          <Polyline path={route} options={{ strokeColor: '#FF0000' }} />
        )}
      </GoogleMap>
    </div>
  );
}

export default App;
