import './App.css';
import * as d3 from 'd3';
import * as React from "react";
import importedData from './Data/big-mac-full-index.csv'

import BarChart from './BarChart.js';
import MyMap from './components/MyMap.js';

function App() {

    const [data, setData] = React.useState([]);
    const [barchartData, setbarchartData] = React.useState([]);
    const [loadingbar, setLoadingbar] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [dates, setDates] = React.useState([]);
    
    

  const handleCallback = (childData) =>{
        setLoadingbar(true);

          setbarchartData(data.filter(function(d){return d.iso_a3 === childData;}));
          console.log(data.filter(function(d){return d.iso_a3 === childData;}));
        
        
        setLoadingbar(false);
  }

   React.useEffect(() => { 
    var parseTime = d3.timeParse('%Y-%m-%d');
    d3.csv(importedData).then((d) => {
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
        : <MyMap data = {data} parentCallback = {handleCallback}/>
      }
      {loadingbar || barchartData.length === 0
        ? <div/>
        :  <BarChart data = {barchartData}/>
      }
    </div>)
}

export default App;
