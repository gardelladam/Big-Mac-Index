import React, {useState, Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../Data/countries.json";
import "leaflet/dist/leaflet.css";
import * as d3 from 'd3';
import Legend from "./Legend.js"



function getColor(d) {
    return d > 1    ? '#053061' :
        d > 0.7    ? '#2166ac' :
        d > 0.5    ? '#4393c3' :
        d > 0.3    ? '#92c5de' :
        d > 0.1    ? '#d1e5f0' :
        d > 0.01    ? '#f7f7f7' :
        d > -0.01   ? '#f7f7f7' :
        d > -0.1   ? '#f7f7f7' :     
        d > -0.3   ? '#fddbc7' :
        d > -0.5   ? '#f4a582' :
        d > -0.7   ? '#d6604d' :
        d > -1   ? '#b2182b' :
                     '#67001f';
                    
}

function renderCountries(countryGeoJson,data,callback,index) {
  
  const EU_countries = ["AUT","BEL", "CYP", "EST", "FIN", "FRA", "DEU", "GRC", "IRL", "ITA", "LVA", "LTU", "LUX", "MLT", "NLD", "PRT", "SVK", "SVN", "ESP"];

  var parseTime = d3.timeParse('%Y');
  const EU_countries2 = [
    { year: 1998, name: "AUT" },
    { year: 1998, name: "BEL" },
    { year: 2008, name: "CYP" },
    { year: 2011, name: "EST" },
    { year: 1998, name: "FIN" },
    { year: 1998, name: "FRA" },
    { year: 1998, name: "DEU" },
    { year: 2001, name: "GRC" },
    { year: 1998, name: "IRL" },
    { year: 1998, name: "ITA" },
    { year: 2014, name: "LVA" },
    { year: 2015, name: "LTU" },
    { year: 1998, name: "LUX" },
    { year: 2008, name: "MLT" },
    { year: 1998, name: "NLD" },
    { year: 1998, name: "PRT" },
    { year: 2009, name: "SVK" },
    { year: 2007, name: "SVN" },
    { year: 1998, name: "ESP" },
  ];

  let EU_zone = data.filter(function(d){return d.iso_a3 === "EUZ";})
  const setIso = (parameter) => (event) => {
    if(EU_countries.includes(parameter)){
     callback("EUZ");
    }
    else{
    callback(parameter);
    }
  };
  const onEachCountry = (country, layer) => {
    const countryCode = country.properties.ISO_A3;
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName + EU_zone[0][index]);
    layer.on({
      click: setIso(countryCode),
    });
  };

  return countryGeoJson.map(country => {
    let countryStyle = {
      fillColor: "grey",
      fillOpacity: 1,
      color: "black",
      weight: 1,
    };
    const countryCode = country.properties.ISO_A3;
    if(EU_countries.includes(countryCode)){
     var test = EU_countries2.find((a) => {
       return a.name === countryCode;
      });
      if(parseTime(test.year) < EU_zone[0]["date"])
      {
        countryStyle = {
          fillColor: getColor(EU_zone[0][index]),
          fillOpacity: 1,
          color: "black",
          weight: 1,
        };
      }
      
    }
    else{
    for(var i = 0; i < data.length; i ++){
      if(data[i].iso_a3 === countryCode){
      
          countryStyle = {
            fillColor:getColor(data[i][index]),
            fillOpacity: 1,
            color: "black",
            weight: 1,
          };   
      }
    } 
  }
    return (
      <GeoJSON key={country.properties.ADMIN}  style={countryStyle}
      data={country}
      onEachFeature={onEachCountry}

       />
    );
  });
}
const MyMap = (props) => {
  const [map, setMap] = useState(null);
   
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{props.dataParentToChild}</h1>
        <MapContainer  style={{ width: "134vh", height: "52vh", background: "transparent"}} zoom={2} zoomControl={false} doubleClickZoom={false} center={[20, 10]} whenCreated={setMap}>
        { renderCountries( mapData.features,props.data,props.parentCallback,props.index) }
         <Legend map={map} />

        </MapContainer>
        
      </div>
    );
  
}

export default MyMap;