import './App.css';
import * as d3 from 'd3';
import * as React from "react";
import importedData from './Data/big-mac-full-index.csv'
import Interface from './Interface.js';
import BarChart from './BarChart.js';
import MyMap from './components/MyMap.js';

function App() {

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dates, setDates] = React.useState([]);
  
  React.useEffect(() => { 
    var parseTime = d3.timeParse('%Y-%m-%d');
    d3.csv(importedData).then((d) => {
      setDates(Array.from(new Set(d.map((d) => d.date))))
      d.forEach(function (d) {
        d.date = parseTime(d.date);	
      });
      setData(d);
      setLoading(false);
    });
  }, []);

  return (
 <div>
    {loading
        ? <div/>
        : <Interface data={data} dates={dates}/>
      }
 </div>

    )
}

export default App;
