import React, { Component, useState,useCallback, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as d3 from 'd3';
import importedData from './Data/big-mac-full-index.csv'
import BarChart from './BarChart.js';
import MyMap from './components/MyMap.js';
import ToggleSlider from './components/Slider.js';
import ToggleGroupedButtons from './components/ToggleButtons.js';
import ToggleDropDown from './components/ToggleDrop.js';
import CountryInfo from './components/CountryInfo.js';

function Interface(props){
  var parseTime = d3.timeParse('%Y-%m-%d');
    const [barchartData, setbarchartData] = React.useState([]);
    const [loadingbar, setLoadingbar] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [mapData, setMapData] = React.useState(props.data.filter(function(k){return k.date.getTime() === parseTime("2019-07-09").getTime()}));
    const [index, setIndex] = React.useState("_raw");
    const [currency, setCurrency] = React.useState("USD");
    const [composite, setComposite] = React.useState("USD_raw");
    const [date, setDate] = React.useState(parseTime("2019-07-09"));
    const handleCallbackSlider = (childData) =>
    {
      var parseTime = d3.timeParse('%Y-%m-%d');
      setMapData(props.data.filter(function(d){return d.date.getTime() === parseTime(childData).getTime()}));
      setDate(parseTime(childData));

     }

     const handleCallbackToggle = (childData) =>
     {
      console.log(childData);
      if(childData === "Raw index")
      {
        setIndex("_raw")
        setComposite(currency+"_raw");
      }
      else{
        setIndex("_adjusted");
        setComposite(currency+"_adjusted");
      }
      }

      const handleCallbackToggleDrop = (childData) =>
      {
       console.log(childData);
       if(childData === "US dollar")
       {
        setCurrency("USD")
        setComposite("USD"+index);
       }
       else if(childData === "British Pound"){
        setCurrency("GBP");
        setComposite("GBP"+index);
       }
       else if(childData === "Euro"){
        setCurrency("EUR");
        setComposite("EUR"+index);
       }else if(childData === "Japanese Yen"){
        setCurrency("JPY");
        setComposite("JPY"+index);
       }else {
        setCurrency("CNY");
        setComposite("CNY"+index);
       }
       }

  const handleCallback = (childData) =>{
        setLoadingbar(true);
        setbarchartData(props.data.filter(function(d){return d.iso_a3 === childData;}));
        setLoadingbar(false);
  }

   React.useEffect(() => { 
      setLoading(false);
  }, []);

  return (
        <div className = "Context" fluid = {"true"}>
              <div className = "Row">
                <div className = "Map">
                {loading
        ? <div/>
        : <MyMap data = {mapData} parentCallback = {handleCallback} index={composite}/>
      }
                </div>
                <div className = "Dashboard">
                  <CountryInfo date={date} country={barchartData} index={composite} currency={currency}/>
                  <div className = "infoBox">
                    <h3>Map controls</h3>
                    <ToggleGroupedButtons callback={handleCallbackToggle}/> 
                    <ToggleDropDown callback={handleCallbackToggleDrop}/>
                    <ToggleSlider dates={props.dates} callback={handleCallbackSlider}/>
                  </div>
                  
                  {/* <MyForm/> */}
                </div>
              </div>
              <div className = "BarChart">
              {loadingbar || barchartData.length === 0
        ? <div/>
        :  <BarChart data = {barchartData} index={composite} currentDate={date}/>
      }
              </div>
        </div>
  );
}
export default Interface;
