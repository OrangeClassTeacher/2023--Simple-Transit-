import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function App() {

  const [data, setData] = useState([])
  const [busStop, setBusStop] = useState([])
  const [route,setRoute]=useState([])

  useEffect(() => {
    axios.get("http://localhost:9000/api/busstops")
      .then(res => setData(res.data.result))
  }, [])


  function onSelect(e) {
   
    setBusStop([...busStop, e.target.value])
    
    console.log([...busStop, e.target.value]);

  }

  function addRoute(){
    axios.get("http://localhost:9000/api/busstops")
    .then(res=> setRoute(res.data.result))
    console.log(route);
    setRoute(route.filter((e)=> busStop[0]!==e.busStopName
    ))
    console.log(route);
  }


  function onAdd(){
    axios.post("http://localhost:9000/api/busroutes/create",{
      busRouteName:"",
      busStopDetails:route,
      busRouteId:""
    })
    .then(res=>{
      console.log(res);
    })
  }
  return (
    <div className="App">
      <input placeholder='Чиглэлийн дугаар'/>
      <input placeholder='Чиглэлийн нэр'/>
      Чиглэлийн буудлуудыг сонгоx 
      <select onChange={(e) => onSelect(e)}>
        {
          data.map((e, i) => {
            return <option value={e.busStopName} key={i}>
              {e.busStopName}

            </option>

          })
        }
      </select> 
      <ul> 

        {
 busStop.map((e, i) => {
  return <li key={i}>{(e)}</li>
}) 
        }
         


      </ul>
        <button onClick={()=>addRoute()}>Чиглэл шалгаx</button>
      <button>Чиглэлийг нэмэx</button>
    </div>
  );
}

export default App;
