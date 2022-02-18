import './App.css';
import * as d3 from 'd3';
import * as React from "react";
import importedData from './Data/big-mac-full-index.csv'

import MyMap from './components/MyMap.js';

function App() {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    

    //console.log(mapData);
  const handleCallback = (childData) =>{
  
        console.log(childData);
        //data = data.filter(function(d){return d.iso_a3 === childData;})
        
  }

   React.useEffect(() => { 

    d3.csv(importedData).then((d) => {
      setData(d);
      setLoading(false);
    });
    
  }, []);

  if(loading){
     return <div>Loading your position...</div>
  }
  return (<MyMap data = {data} parentCallback = {handleCallback}/>)
  
}

export default App;
