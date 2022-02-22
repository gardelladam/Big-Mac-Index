import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import { axisBottom } from 'd3-axis';
function BarChart({ data }) {
  const ref = useD3(
    (svg) => {
      const height = 350;
      const width = 1900;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
 //data = data.filter(function(d){return d.iso_a3 === "NOR";})

 var format = d3.timeFormat("%Y-%b");
var mindate = d3.min(data, (d) => d.date);
var maxdate =  d3.max(data, (d) => d.date);
console.log(mindate);
console.log(maxdate);
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.date))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([-1, 1])
        .rangeRound([height - margin.bottom, margin.top]);

        const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .style("font-size", "11px")
        .call(
          axisBottom(x)
            // Use the player names from the data
            .tickFormat(format)
            // Remove outer tick mark

        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "black")
          .style("font-size", "16px")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("fill", function (d) {
          console.log(d.USD_raw);
          if(d.USD_raw > 0){
            return "steelblue";
          }
          else{
            return "red";
          }
         })
        .attr("x", (d) => x(d.date))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(Math.max(0, d.USD_raw)))
        .attr("height", (d) => Math.abs(y1(d.USD_raw) - y1(0)));
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 350,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;