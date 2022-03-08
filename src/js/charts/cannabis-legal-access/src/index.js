import dataLayers from "./data-layers.js";

console.log("Cannabis Legal Activity 12");
console.log("test" , dataLayers);

var width = 800;
var height = 930;

dataLayers.map((layer) => {
  console.log(layer.src);
  // src, layerName, width, height

  // d3.xml(layer.src)
  // .then(data => {
  //   d3.select("#county-map .svg-layer-container").node().append(data.documentElement)
  //     .attr("width", layer.width || width)
  //     .attr("height", layer.height || height)
  // });
});


