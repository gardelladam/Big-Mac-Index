import React from "react";
import { select } from "d3";
import * as d3 from "d3-geo";

function Map({ mapData }) {
  const rn = React.useRef(null);

  React.useEffect(() => {
    renderMap();
  }, [mapData]);
  console.log(mapData);
  const renderMap = () => {
    const node = rn.current;
    const width = node.width.animVal.value;
    const height = node.height.animVal.value;

    const projection = () => {
      return d3
        .geoMercator()
        .scale(150)
        .translate([width / 2, height / 2]);
    };
    select(node)
      .append("g")
      .classed("countries", true);
    const countries = select("g")
      .selectAll("path")
      .data(mapData);

    countries
      .enter()
      .append("path")
      .classed("country", true)
      .attr("stroke", "red")
      .attr("strokeWidth", 0.75)
      .each(function(d, i) {
        select(this).attr("d", d3.geoPath().projection(projection())(d));
      });
  };

  return <svg width={1000} height={500} ref={rn} />;
}

export default Map;
