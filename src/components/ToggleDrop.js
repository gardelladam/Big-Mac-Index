import React from 'react';

function ToggleDropDown(props) {
    const type_currency = ['US dollar', 'British Pound', 'Euro', 'Japanese Yen','Chinese Yuan'];
    function parseSelected(event) {
        props.callback(event.target.value);
        return;
      }
    return (
      <form> 
        <select id = "myList" onChange={parseSelected}>
        {type_currency.map(type => (
          <option
            key = {type}
            value = {type}
          >
            {type}
          </option>
        ))}
        </select>  
      </form> );
  }
  export default ToggleDropDown