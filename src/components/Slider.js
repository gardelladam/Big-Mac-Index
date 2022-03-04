import React, {} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@material-ui/core/Slider';
import debounce from 'lodash.debounce';
import { withStyles, makeStyles } from "@material-ui/core/styles";


const IOSSlider = withStyles({
  root: {
    color: '#52af77',
    height: 12,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 12,
    borderRadius: 4,
  },
  rail: {
    height: 12,
    borderRadius: 4,
  },
  mark: {
    backgroundColor: '#fff',
    height: 12,
    width: 2,
  },
 })(Slider);

function ToggleSlider(props) {



    const [value, setValue] = React.useState(30);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleOnChangeCommited = (event, newValue) => {
      props.callback(props.dates[newValue].date);
    };

    
    return(
    <div className="slider-parent">
     <IOSSlider size="large" value={value} min={0} max={props.dates.length-1} marks={true} onChangeCommitted={handleOnChangeCommited} onChange={handleChange} aria-labelledby="continuous-slider"/>
    <div className="Row"> 
    <strong>Date of data:&nbsp;</strong> <p>{props.dates[value].date}</p>
    </div>
  </div>);
  }
export default ToggleSlider;