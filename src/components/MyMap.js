import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../Data/countries.json";
import "leaflet/dist/leaflet.css";
import * as d3 from 'd3';


class MyMap extends Component {
  state = { color: "#ffff00", data1: []};

  colors = ["green", "blue", "yellow", "orange", "grey"];
  EU_countries = ["AUT","BEL", "CYP", "EST", "FIN", "FRA", "DEU", "GRC", "IRL", "ITA", "LVA", "LTU", "LUX", "MLT", "NLD", "PRT", "SVK", "SVN", "ESP"];

  EU_zone = this.props.data.filter(function(d){return d.iso_a3 === "EUZ";})

  componentDidMount() {
    console.log(this.EU_zone);

  }

  countryStyle = {
    fillColor: "grey",
    fillOpacity: 1,
    color: "black",
    weight: 1,
  };

  setIso = (parameter) => (event) => {
    if(this.EU_countries.includes(parameter)){
      this.props.parentCallback("EUZ");
    }
    else{
    this.props.parentCallback(parameter);
    }
  };


  onEachCountry = (country, layer) => {
    
    const countryName = country.properties.ADMIN;
    const countryCode = country.properties.ISO_A3;
    //console.log(countryName);
    layer.bindPopup(countryName);

    if(this.EU_countries.includes(countryCode)){
      console.log(this.EU_zone[0].USD_raw);
      if(this.EU_zone[0].USD_raw > 0){
        layer.options.fillColor = "green";
        layer.options.fillOpacity = this.EU_zone[0].USD_raw;
      }
      else if(this.EU_zone[0].USD_raw < 0){
          layer.options.fillColor = "red";
          layer.options.fillOpacity = this.EU_zone[0].USD_raw;
        }
      
    }
    else{

    for(var i = 0; i < this.props.data.length; i ++){
      if(this.props.data[i].iso_a3 === countryCode){
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
          layer.options.color = "#1936F6";
           layer.options.weight = 3;
        }
        
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
        <MapContainer  style={{ width: "134vh", height: "52vh", background: "transparent"}} zoom={2} zoomControl={false} dragging={!this.state.smallScreen} doubleClickZoom={false} center={[20, 10]}>
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