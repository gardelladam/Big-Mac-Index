import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../Data/countries.json";
import "leaflet/dist/leaflet.css";
import * as d3 from 'd3';


class MyMap extends Component {
  state = { color: "#ffff00", data1: []};

  colors = ["green", "blue", "yellow", "orange", "grey"];

  componentDidMount() {

  }

  countryStyle = {
    fillColor: "grey",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  setIso = (parameter) => (event) => {
    this.props.parentCallback(parameter);
  };


  onEachCountry = (country, layer) => {
    
    const countryName = country.properties.ADMIN;
    const countryCode = country.properties.ISO_A3;
    //console.log(countryName);
    layer.bindPopup(countryName);

    for(var i = 0; i < this.props.data.length; i ++){
      if(this.props.data[i].iso_a3 == countryCode){
        if(this.props.data[i].USD_raw > 0){
          layer.options.fillColor = "green";
          layer.options.fillOpacity = this.props.data[i].USD_raw;
        }
        else if(this.props.data[i].USD_raw < 0){
          layer.options.fillColor = "red";
          layer.options.fillOpacity = -this.props.data[i].USD_raw;
        }
        else{
         
          layer.options.fillOpacity = 0;
        }
        
      }
    } 

    //layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * this.colors.length);
    // layer.options.fillColor = this.colors[colorIndex]; //0

    layer.on({
  
      click: this.setIso(countryCode),
    });
  };


  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>My Map</h1>
        <MapContainer  style={{ width: "150vh", height: "80vh" }} zoom={2} zoomControl={false} dragging={!this.state.smallScreen} doubleClickZoom={false} center={[20, 10]}>
          <GeoJSON
            style={this.countryStyle}
            data={mapData.features}
            onEachFeature={this.onEachCountry}
          />
        </MapContainer>
        
      </div>
    );
  }
}

export default MyMap;