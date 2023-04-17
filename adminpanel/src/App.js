import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function App() {

  const [data, setData] = useState([])
  const [route, setRoute] = useState([])
  useEffect(() => {
    axios.get("http://localhost:9000/api/busstops")
      .then(res => setData(res.data.result))
  }, [])


  function onSelect(e) {
    const newArr = route
    newArr.push(e.target.value)
    setRoute(newArr)
    console.log(newArr);
  }
  return (
    <div className="App">
      Чиглэл нэмэх <button>ADD</button>
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

        {route ?
          route.map((e, i) => {
            return <li key={i}>{e}</li>
          }) : {

          }
        }


      </ul>


    </div>
  );
}

export default App;
