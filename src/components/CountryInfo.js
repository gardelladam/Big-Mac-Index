import React from 'react';
import * as d3 from 'd3';
import '../App.css';
function CountryInfo(props) {
    var format = d3.timeFormat("%Y-%b");
    const [countrydata, setcountrydata] = React.useState(null);
    
    if (countrydata != null) {
        //console.log(countrydata[props.index]);
        //console.log(countrydata.name);
    }
    React.useEffect(() => { 
        setcountrydata(props.country.find(function(d){return d.date.getTime() === props.date.getTime()}));
    }, [props.country, props.date]);
    return (
        <div className = "infoBox">
            <h3>Country: {countrydata == null
        ?  "No data"
        :  countrydata.name
      }</h3>

    <div className = "Row">  <strong>Raw:&nbsp;</strong> <p>{countrydata == null
        ?  "-"
        :  (countrydata[props.currency+"_raw"]*100).toFixed(2) + "% Compared to "+ props.currency
         
      }</p></div> 

        <div className = "Row">  <strong>Adjusted:&nbsp;</strong> <p>{countrydata == null
        ?  "-"
        :  (countrydata[props.currency+"_adjusted"]*100).toFixed(2) + "% Compared to "+ props.currency
         
      }</p></div> 

<       div className = "Row">  <strong>Local price:&nbsp;</strong> <p>{countrydata == null
        ?  "-"
        : (countrydata.local_price*1).toFixed(2)+" "+countrydata.currency_code
      }</p></div> 

         
        </div>
    );
  }
  export default CountryInfo