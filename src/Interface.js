import React, { Component, useState,useCallback, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import * as d3 from 'd3';
import importedData from './Data/big-mac-full-index.csv'
import Slider from '@material-ui/core/Slider';
import BarChart from './BarChart.js';
import MyMap from './components/MyMap.js';
import ToggleSlider from './components/Slider.js';
import debounce from 'lodash.debounce';

const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
const ButtonToggle = styled(Button)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;


function ToggleGroupedButtons() {
  const type_index = ['Raw index', 'Adjusted index'];
  const [active, setActive] = useState(type_index[0]);
  return (
    <ButtonGroup>
      {type_index.map(type => (
        <ButtonToggle
          key={type}
          active={active === type}
          onClick = {() => setActive(type)}
        > 
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  );
}

function ToggleDropDown() {
  const type_currency = ['HKG', 'US', 'Euro', 'Yen'];
  return (
    <form> 
      <select id = "myList">
      {type_currency.map(type => (
        <option
          key = {type}
          value = {type}
          onClick={() => console.log(type)}
        >
          {type}
        </option>
      ))}
      </select>  
    </form> );
}



// function MyForm() {
//   return (
//     <form>
//         <input type="text" 
//         placeholder='Search for country'
//         // value={country}
//         // onChange={(e) => setName(e.target.value)}
//         />
//     </form>
//   )
// }

function Interface(props){

    const [barchartData, setbarchartData] = React.useState([]);
    const [loadingbar, setLoadingbar] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [mapData, setMapData] = React.useState([]);
    
    const handleCallbackSlider = (childData) =>
    {
      setLoading(true);
      var parseTime = d3.timeParse('%Y-%m-%d');
      console.log(props.data.filter(function(d){return d.date.getTime() === parseTime(childData).getTime()}));
      setMapData(props.data.filter(function(d){return d.date.getTime() === parseTime(childData).getTime()}));
      setLoading(false);
     }

  const handleCallback = (childData) =>{
        setLoadingbar(true);
        setbarchartData(props.data.filter(function(d){return d.iso_a3 === childData;}));
        //console.log(props.Setdata.filter(function(d){return d.iso_a3 === childData;}));
        setLoadingbar(false);
  }

   React.useEffect(() => { 
    d3.csv(importedData).then((d) => {
      setMapData(d);
      setLoading(false);
    });
    
  }, []);






  return (
        <div className = "Context" fluid = {"true"}>
              <div className = "Row">
                <div className = "Map">
                {loading
        ? <div/>
        : <MyMap data = {mapData} parentCallback = {handleCallback}/>
      }
                </div>
                <div className = "Dashboard">
                  2
                  <ToggleGroupedButtons/> 
                  <ToggleDropDown/>
                  <ToggleSlider dates={props.dates} callback={handleCallbackSlider}/>
                  {/* <MyForm/> */}
                </div>
              </div>
              <div className = "BarChart">
              {loadingbar || barchartData.length === 0
        ? <div/>
        :  <BarChart data = {barchartData}/>
      }
              </div>
        </div>
  );
}
export default Interface;
