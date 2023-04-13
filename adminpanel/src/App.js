import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:9000/api/busstops")
      .then(res => setData(res.data.result))
  }, [])

  return (
    <div className="App">
      {
        data.map((e, i) => {
          return <ul>
            Bus Routes <button>ADD</button>
            <li>
              {e.busstopId}-{e.busstopName}
            </li>
          </ul>
        })
      }
    </div>
  );
}

export default App;
