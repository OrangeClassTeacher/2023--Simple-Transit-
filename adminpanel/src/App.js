import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Utils from "./utils/utils";
import { GoogleMap, useLoadScript, Polyline } from '@react-google-maps/api';
const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY

function App() {
  const [data, setData] = useState([]);
  const [selectedBusStops, setSelectedBusStops] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState([]);

  const [routeName, setRouteName] = useState("")
  const [routeId, setRouteId] = useState("")

  useEffect(() => {
    axios
      .get(`${Utils.API_URL}/busstops`)
      .then((res) => setData(res.data.result));
  }, []);

  function onSelect(e) {
    setSelectedBusStops([...selectedBusStops, e.target.value]);


  }

  function addRoute() {
    axios.get(`${Utils.API_URL}/busstops`).then((res) => {
      const allStops = res.data.result;
      const filteredStops = allStops
        .filter((stop) => selectedBusStops.includes(stop.busStopName))
        .sort((a, b) => {
          const indexA = selectedBusStops.indexOf(a.busStopName);
          const indexB = selectedBusStops.indexOf(b.busStopName);
          return indexA - indexB;
        });
      const newArr = []
      setRoutes(filteredStops);
      routes.map((e) => newArr.push({
        lat: e.busStopCoord[0],
        lng: e.busStopCoord[1]
      }))
      setRoute(newArr)
      console.log(route);
      console.log(routes);
    });
  }

  function onAdd() {
    axios
      .post(`${Utils.API_URL}/busroutes/create`, {
        busRouteName: routeName,
        busStopDetails: routes,
        busRouteId: routeId,
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
    googleMapsApiKey: GOOGLE_MAP_API_KEY
  });
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';



  return (
    <div className="App">
      <input placeholder="Чиглэлийн дугаар" value={routeName} onChange={(e) => setRouteName(e.target.value)} />
      <input placeholder="Чиглэлийн нэр" value={routeId} onChange={(e) => setRouteId(e.target.value)} />
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
      <button onClick={() => addRoute()}>Чиглэлийг газрын зураг дээр хараx</button>
      <button onClick={() => onAdd()}>Чиглэлийг нэмэx</button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
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
