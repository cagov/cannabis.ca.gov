import './index.css';
import dataLayers from "./data-layers.js";

console.log("Cannabis Legal Activity 4");
console.log(dataLayers);

var width = 800;
var height = 930;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

