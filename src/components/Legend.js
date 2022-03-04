import L from "leaflet";
import { useEffect } from "react";
//import getColor from "./MyMap.js"
import './Legend.css'



function getColor(d) {
  return d > 1    ? '#053061' :
  d > 0.7    ? '#2166ac' :
  d > 0.5    ? '#4393c3' :
  d > 0.3    ? '#92c5de' :
  d > 0.1    ? '#d1e5f0' :
  d > 0.001    ? '#f7f7f7' :
  d > -0.1   ? '#fff0e8'  :     
  d > -0.3   ? '#fddbc7' :
  d > -0.5   ? '#f4a582' :
  d > -0.7   ? '#d6604d' :
  d > -1   ? '#b2182b' :
               '#67001f';
                    
}


function Legend({ map }) {

 
  useEffect(() => {
    if (map) {
      var legend = L.control({ position: "bottomright" });
      

      legend.onAdd = () => {
        var div = L.DomUtil.create("div", "info legend"),
        grades = [-10,-1,-0.7, -0.5, -0.3, -0.1,0, 0.1, 0.3, 0.5, 0.7,1],
        
        labels = [];
        var newElement2 = document.createElement('div');
        newElement2.className = "selected"
        newElement2.innerHTML = '<s></s> Selected Currency';
        div.appendChild(newElement2);
        for (var i = 0; i < grades.length; i++) {
        var newElement = document.createElement('div');
        console.log(grades.length);
        newElement.innerHTML =
            '<i style="background:' + getColor(grades[i]+0.002) + '"></i> ' + (grades[i] == -10 ? 'less than ' + grades[i+1]*100+"%" + '<br>'  :
             + grades[i]*100+"%"  + (grades[i] === 0 && grades[i+1] === 0?'':(i  !== grades.length-1? ' ' + 'to'  + ' ' + grades[i + 1]*100+"%" + '<br>' : ' and over')));
             div.appendChild(newElement);
      }

        return div;
      };

      legend.addTo(map);
    }
  }, [map]); 
  return null;
}

export default Legend;