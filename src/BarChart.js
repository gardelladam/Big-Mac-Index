import './App.css';
import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import { axisBottom } from 'd3-axis';
import { select, mouse } from 'd3-selection';
import d3Tip from "d3-tip";

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-tip/0.7.1/d3-tip.min.js"></script>
function getColor(d) {
  return d > 1    ? '#053061' :
  d > 0.7    ? '#2166ac' :
  d > 0.5    ? '#4393c3' :
  d > 0.3    ? '#92c5de' :
  d > 0.1    ? '#d1e5f0' :
  d > 0.0001    ? '#E0E9ED' :
  d > -0.1   ? '#fff0e8' :     
  d > -0.3   ? '#fddbc7' :
  d > -0.5   ? '#f4a582' :
  d > -0.7   ? '#d6604d' :
  d > -1   ? '#b2182b' :
               '#67001f';
                  
}
function BarChart({ data,index,currentDate }) {
  const ref = useD3(
    (svg) => {
      const height = 350;
      const width = 1900;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
 //data = data.filter(function(d){return d.iso_a3 === "NOR";})

console.log(index);
var format = d3.timeFormat("%Y-%b");
var mindate = d3.min(data, (d) => d.date);
var maxdate =  d3.max(data, (d) => d.date);
var minproc = d3.min(data, (d) => +d[index]);
var maxproc =  d3.max(data, (d) => +d[index]);
var currentColor;
var currentVal;
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.date))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([minproc < 0 ? minproc*100-5:0 , maxproc > 0 ? maxproc*100+5:0])
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

        var tip = d3Tip()
        .attr('class', 'd3-tip')
        .offset([-50, 0])
        .html(function(d) {
          return  "<strong>Value:</strong> <span style='color:white'>" + (currentVal*100).toFixed(2)+ " %"  + "</span>";
        })

        svg.call(tip);

      function sMouseOver(d) {
        d3.select(this).style("fill", function (d) {
          currentVal = d[index];
          return d[index] > 0 ? "darkblue" : "darkred";
         });
        tip.show(d, this)
      };

      function sMouseOut(d) {
        // currentColor = currentColor == "darkred" ? "red" : "steelblue";
        d3.select(this).style("fill", function (d) {
          return  getColor(d[index])
         });
        tip.hide(d, this)	  
      };

      svg
        .select(".plot-area")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("style",function (d) {
          return d.date.getTime() === currentDate.getTime() ?  "outline: 2px solid black;" : ""
         })
        .attr("fill", function (d) {
          return getColor(d[index])
         })
        .attr("x", (d) => x(d.date))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(Math.max(0, d[index]*100)))
        .attr("height", (d) => Math.abs(y1(d[index]*100) - y1(0)))
        .on('mouseover', sMouseOver)
        .on('mouseout', sMouseOut)
        // .on("mouseover", function(d) {
        //   d3.select(this).attr("r", 10).style("fill", "darkred"); 
        //   tip.show(d, this)
        // })                  
        // .on("mouseout", function(d) {
        //   d3.select(this).attr("r", 10).style("fill", "red"); 
        //   tip.hide(d, this)
        // });
        //Change the bar color back to the original color on mouseout events
    },
    [data.length,index,currentDate]
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