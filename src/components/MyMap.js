import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../Data/countries.json";
import "leaflet/dist/leaflet.css";
import * as d3 from 'd3';




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
      if(EU_zone[0][index] > 0){
        countryStyle = {
          fillColor: "green",
          fillOpacity: EU_zone[0][index],
          color: "black",
          weight: 1,
        };
      }
      else if(EU_zone[0][index] < 0){
        countryStyle = {
          fillColor: "red",
          fillOpacity: -EU_zone[0][index],
          color: "black",
          weight: 1,
        };
        }
      }
      
    }
    else{
    for(var i = 0; i < data.length; i ++){
      if(data[i].iso_a3 === countryCode){
        if(data[i][index] > 0){
          countryStyle = {
            fillColor: "green",
            fillOpacity: data[i][index],
            color: "black",
            weight: 1,
          };
        }
        else if(data[i][index] < 0){
          countryStyle = {
            fillColor: "red",
            fillOpacity: -data[i][index],
            color: "black",
            weight: 1,
          };
        }
        
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
class MyMap extends Component {

  constructor(props){
    super(props);
    this.state = {
        data4: this.props.data,
        name: this.props.dataParentToChild
    }
}

componentWillReceiveProps(nextProps) {
  this.setState({ data: nextProps.data,   name: nextProps.dataParentToChild });  
}
  state = { color: "#ffff00", data1: []};
  colors = ["green", "blue", "yellow", "orange", "grey"];

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>{this.props.dataParentToChild}</h1>
        <MapContainer  style={{ wyearth: "134vh", height: "52vh", background: "transparent"}} zoom={2} zoomControl={false} dragging={!this.state.smallScreen} doubleClickZoom={false} center={[20, 10]}>
        { renderCountries( mapData.features,this.props.data,this.props.parentCallback,this.props.index) }
        </MapContainer>
        
      </div>
    );
  }
}

export default MyMap;