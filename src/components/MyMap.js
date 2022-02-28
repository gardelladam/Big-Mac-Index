import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../Data/countries.json";
import "leaflet/dist/leaflet.css";
import * as d3 from 'd3';




function renderCountries(countryGeoJson,data,callback,index) {
  const EU_countries = ["AUT","BEL", "CYP", "EST", "FIN", "FRA", "DEU", "GRC", "IRL", "ITA", "LVA", "LTU", "LUX", "MLT", "NLD", "PRT", "SVK", "SVN", "ESP"];
  console.log(data);
  let EU_zone = data.filter(function(d){return d.iso_a3 === "EUZ";})
  console.log(index);
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
      console.log(EU_zone[0][index])
      if(EU_zone[0][index] > 0){

        console.log(index);
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
        <MapContainer  style={{ width: "134vh", height: "52vh", background: "transparent"}} zoom={2} zoomControl={false} dragging={!this.state.smallScreen} doubleClickZoom={false} center={[20, 10]}>
        { renderCountries( mapData.features,this.props.data,this.props.parentCallback,this.props.index) }
        </MapContainer>
        
      </div>
    );
  }
}

export default MyMap;