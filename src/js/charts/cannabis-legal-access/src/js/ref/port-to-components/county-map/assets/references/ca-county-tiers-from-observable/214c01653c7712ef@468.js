// https://observablehq.com/@aaronhans/ca-county-tiers@468
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([
    [
      "california_06_counties.json",
      "https://static.observableusercontent.com/files/9a21ca1fb2da8854d3f9b5d077bee487b02c6be6dfa38aecf71203dfbad10cda2b7e15e7beac5d107c2250e9a6ddb98b256ef631afb485026dbeecf9686b6e97"]
    ]);

  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));

  main.variable(observer()).define(["md"], function(md){return(
md`# CA county tiers`
)});

  main.variable(observer("map")).define("map", [
    "d3",
    "DOM",
    "width",
    "height","landArea",
    "path",
    "countyFeats",
    "tiers"
  ], function(d3,DOM,width,height,landArea,path,countyFeats,tiers)
{
  const svg = d3.select(DOM.svg(width, height))
    .style("width", "100%")
    .style("height", "auto")

  // background
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill", 'white')

  // group for all map layers
  const g = svg.append("g").attr("id", "map-layers")
  
  // "land" from merged counties
  const land = g.append("g")
    .attr("id", "land")
    .append("path")
    .datum(landArea)
    .attr("fill", "white")
    .attr("stroke-width", 1.25)
    .attr("stroke", 'white')
    .attr("stroke-line-join", "round")
    .attr("d", path)

  // county boundaries
  const countiesGroup = g.append("g").attr("id", "county-boundaries")
  const tierColors = ["0000cc","e6b735","d97641","c43d53","802f67"];
  
  countiesGroup.selectAll('.county')
    .data(countyFeats.features)
    .enter()
    .append('path')
    .attr("stroke-width", 1.25)
    .attr("stroke", 'white')
    .attr('d', path)
    .attr('fill', (d) => {
      let tier = '';
      tiers.forEach(t => {
        if(t.county.toLowerCase() === d.properties.NAME.toLowerCase()) {
          tier = t["Overall Status"];
        }
      })
      if(tier) {
        return "#"+tierColors[tier];
      } else {
        return 'gray';
      }
    })
    .on('mouseover', function(event, d){
      console.log(d);
      tooltip.html(`<div class="county-tooltip">
        <h3>${d.properties.NAME}</h2>
      </div>`); return tooltip.style("visibility", "visible");
    })
    .on("mousemove", function(){ 
      return tooltip.style("top", (parseInt(this.getBoundingClientRect().y)-10)+"px").style("left",(parseInt(this.getBoundingClientRect().x)+10)+"px");
    })
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
  
  let tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#fff")
    .text("a simple tooltip");

  // labels
  const labelsGroup = g.append("g").attr("id", "labels")

  return svg.node()
}
);
  main.variable(observer("css")).define("css", function()
{
    return document.getElementsByTagName("head")[0].insertAdjacentHTML('beforeend',`<style type="text/css">
    .county-tooltip {
      padding: 10px;
    }`);    
}
);
  main.variable(observer("zoom")).define("zoom", ["d3","width","height"], function(d3,width,height){return(
function zoom (s) {
  s.call(d3.zoom()
    .on("zoom", () => s.select("#map-layers").attr("transform", d3.event.transform))
    .scaleExtent([1, 18])
    .translateExtent([[0, 0], [width, height]]))
}
)});
  main.variable(observer("width")).define("width", function(){return(
parseInt(window.innerWidth * .7)
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
parseInt(width / 3) * 2
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("projection")).define("projection", ["d3","width","height","landArea"], function(d3,width,height,landArea){return(
d3.geoConicConformal()
  .parallels([37 + 4 / 60, 38 + 26 / 60])
  .rotate([120 + 30 / 60], 0)
  .fitSize([width, height], landArea)
)});
  main.variable(observer("boundaryFilter")).define("boundaryFilter", function(){return(
(a, b) => a !== b
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### data`
)});
  main.variable(observer("landArea")).define("landArea", ["topojson","ca"], function(topojson,ca){return(
topojson.merge(ca, ca.objects.cb_2015_california_county_20m.geometries)
)});
  main.variable(observer("countyFeats")).define("countyFeats", ["topojson","ca"], function(topojson,ca){return(
topojson.feature(ca, ca.objects.cb_2015_california_county_20m)
)});
  main.variable(observer("ca")).define("ca", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("california_06_counties.json").json()
)});
  main.variable(observer("tiers")).define("tiers", function(){return(
[{"county":"Alameda","Overall Status":"3"},{"county":"Alpine","Overall Status":"1"},{"county":"Amador","Overall Status":"2"},{"county":"Butte","Overall Status":"3"},{"county":"Calaveras","Overall Status":"2"},{"county":"Colusa","Overall Status":"4"},{"county":"Contra Costa","Overall Status":"3"},{"county":"Del Norte","Overall Status":"2"},{"county":"El Dorado","Overall Status":"2"},{"county":"Fresno","Overall Status":"3"},{"county":"Glenn","Overall Status":"4"},{"county":"Humboldt","Overall Status":"2"},{"county":"Imperial","Overall Status":"4"},{"county":"Inyo","Overall Status":"3"},{"county":"Kern","Overall Status":"4"},{"county":"Kings","Overall Status":"4"},{"county":"Lake","Overall Status":"3"},{"county":"Lassen","Overall Status":"2"},{"county":"Los Angeles","Overall Status":"4"},{"county":"Madera","Overall Status":"4"},{"county":"Marin","Overall Status":"3"},{"county":"Mariposa","Overall Status":"1"},{"county":"Mendocino","Overall Status":"4"},{"county":"Merced","Overall Status":"4"},{"county":"Modoc","Overall Status":"1"},{"county":"Mono","Overall Status":"2"},{"county":"Monterey","Overall Status":"4"},{"county":"Napa","Overall Status":"3"},{"county":"Nevada","Overall Status":"2"},{"county":"Orange","Overall Status":"3"},{"county":"Placer","Overall Status":"3"},{"county":"Plumas","Overall Status":"2"},{"county":"Riverside","Overall Status":"3"},{"county":"Sacramento","Overall Status":"3"},{"county":"San Benito","Overall Status":"4"},{"county":"San Bernardino","Overall Status":"4"},{"county":"San Diego","Overall Status":"3"},{"county":"San Francisco","Overall Status":"2"},{"county":"San Joaquin","Overall Status":"3"},{"county":"San Luis Obispo","Overall Status":"3"},{"county":"San Mateo","Overall Status":"3"},{"county":"Santa Barbara","Overall Status":"3"},{"county":"Santa Clara","Overall Status":"3"},{"county":"Santa Cruz","Overall Status":"3"},{"county":"Shasta","Overall Status":"2"},{"county":"Sierra","Overall Status":"2"},{"county":"Siskiyou","Overall Status":"2"},{"county":"Solano","Overall Status":"3"},{"county":"Sonoma","Overall Status":"4"},{"county":"Stanislaus","Overall Status":"4"},{"county":"Sutter","Overall Status":"4"},{"county":"Tehama","Overall Status":"3"},{"county":"Trinity","Overall Status":"2"},{"county":"Tulare","Overall Status":"4"},{"county":"Tuolumne","Overall Status":"2"},{"county":"Ventura","Overall Status":"4"},{"county":"Yolo","Overall Status":"3"},{"county":"Yuba","Overall Status":"4"}]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### dependencies`
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
