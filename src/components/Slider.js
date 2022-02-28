import React, {} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@material-ui/core/Slider';
import debounce from 'lodash.debounce';

function ToggleSlider(props) {



    const [value, setValue] = React.useState(30);
    const handleChange = (event, newValue) => {
      setValue(newValue);
      props.callback(props.dates[newValue]);
      //console.log(data.filter(function(d){return d.date.getTime() === parseTime(dates[value]).getTime()}));
      //setData(data.filter(function(d){return d.date.getTime() === parseTime(dates[value]).getTime()}));
    };


    
    return(
    <div className="slider-parent">
     <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
    <div className="buble"> 
    {props.dates[value]}
    </div>
  </div>);
  }
export default ToggleSlider;