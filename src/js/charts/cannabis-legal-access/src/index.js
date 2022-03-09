// import dataLayers from "./data-layers.js";
import "./js/county-map/index.js";

// Promise.all([
//   // d3.json("geometries.geojson"),
//   d3.csv("./data/draft-cannabis-legal-access.2022-01-22.csv")
// ])
// .then(showData);

// console.log("Cannabis Legal Activity 12");
// console.log("test" , dataLayers);

// var width = 800;
// var height = 930;

// dataLayers.map((layer) => {
//   d3.xml(layer.src)
//   .then(data => {
//     d3.selectAll("#county-map .svg-layer-container")
//       .node()
//       .enter()
//       .append(data.documentElement) // TODO flip the order of dataLayers
//       .attr("preserveAspectRatio", "xMinYMin meet")
//       .attr("alt", layer.alt || "")
//       .attr("width", layer.width || width)
//       .attr("height", layer.height || height)
//       .attr("viewBox", "0 0 " + width + " " + height);
//   });
// });


// function showData([data, temp]) {
//   // var projection = d3.geoMercator()
//   //     //projection.center([-96, 40])
//   //     .scale(250)
//   // var path1 = d3.geoPath()
//   //     .projection(projection);
//   // var path = d3.geoPath()
//   //     .projection(projection);
//   // let maxValue = d3.max(temp, d => +d.CL)
//   // let minValue = d3.min(temp, d => +d.CL)
//   // let size = d3.scaleLinear()
//   //     .domain([minValue, maxValue])
//   //     .range([5, 60]);


//   nodes = temp.map(function(d) {
//       return {
//           Cropland1: +d.Cropland,
//           Cropland: +d.CL,
//           collided: false,
//           x: projection([+d.Longitude, +d.Latitude])[0],
//           y: projection([+d.Longitude, +d.Latitude])[1],
//           h: 1.414 * +d.CL / 10,
//           w: 1.414 * +d.CL / 10,
//           h1: 1.414 * +d.HL,
//           w1: 1.414 * +d.HL,
//           Country: d.Country,
//           nodeWidth: size(+d.CL),
//           nodeHeight: size(+d.CL),
//           radiusStep: (+d.CL / 40),
//           Habitat: +d.HL,
//           Habitat1: +d.Habitat
//       }

//   });
// }

// function showInput() {
//   let tooltip = d3.select('body')
//       .append('div')
//       .attr('id', 'tooltip')
//       .style("position", "absolute")
//       .style('visibility', 'hidden')
//       .style('width', 100)
//       .style('height', 100)
//       .style("background-color", "white")
//       .style("border", "solid")
//       .style("border-width", "1px")
//       .style("border-radius", "5px")
//       .style("padding", "10px");



//   var rect2 = svg.selectAll("#rect2")
//       .data(nodes)
//       .enter()
//       .append("rect")
//       .attr("id", "rect2")
//       //.attr("x", d => d.x)
//       //.attr("y", d => d.y)
//       .attr("height", function(d) {
//           console.log("rect2: " + d.h)
//           return d.h1;
//       })
//       .attr("width", d => d.w1)
//       .attr("fill", "grey")
//       .attr("stroke", function(d) {
//           if (d.Cropland1 < 0) {
//               return "green"
//           } else {
//               return "red"
//           }
//       })
//       .style("stroke-opacity", 1)
//       .attr("stroke-width", d => d.Cropland / 18)
//       .style("opacity", 1)
//       .attr("transform", "translate(200, 350) rotate(0)")
//       .on("mouseover", (d) => {
//           tooltip.transition()
//               .style("visibility", "visible")

//           tooltip.text(d.Country + "," + d.Cropland)
//       })
//       .on("mousemove", function() {
//           //positioning the tooltip near the bubble 
//           return tooltip.style("top", (event.pageY - 2) + "px").style("left", (event.pageX - 2) + "px");
//       })
//       .on("mouseout", (item) => {
//           tooltip.transition()
//               .style("visibility", "hidden")
//       })
//     }






