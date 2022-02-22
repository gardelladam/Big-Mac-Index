import React, { Component, useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import d3 from 'react-d3-library';
import styled from 'styled-components';

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

function ToggleSlider() {
  const dates = ["2001-04", "2001-05", "2005-05", "2005-08", "2006-02", "2008-06"];
  const [value,onChange] = useState(0);

  return(
  <div className="slider-parent">
  <input type="range" min={0} max={dates.length-1} value={value}
     onChange={({ target: { value: radius } }) => {
                onChange(radius);
              }}
  />
  <div className="buble"> 
  {dates[value]}
  </div>
</div>);
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

export class Interface extends Component{

render() {
  return (
        <div className = "Context" fluid = {"true"}>
              <div className = "Row">
                <div className = "Map">
                1
                </div>
                <div className = "Dashboard">
                  2
                  <ToggleGroupedButtons/> 
                  <ToggleDropDown/>
                  <ToggleSlider/>
                  {/* <MyForm/> */}
                </div>
              </div>
              <div className = "BarChart">
                    3
              </div>
        </div>
  );
}}
