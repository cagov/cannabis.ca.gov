import * as d3 from "d3";
import * as landArea from './data/topojson/landArea.json';
import * as countyFeats from './data/topojson/countyFeats.json';
import * as ca from './data/topojson/ca.json';

/**
 * Render SVG based interactive county map using d3
 */
export default function drawCountyMap({
  translations = null,
  data = null,
  domElement = null,
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
}) {
  try {
    // NOTE: Code loaded from Observables example.
    function zoom (s) {
      s.call(d3.zoom()
        // .on("zoom", () => s.select("#map-layers").attr("transform", d3.event.transform))
        .scaleExtent([1, 18])
        .translateExtent([[0, 0], [width, height]]))
    }

    var projection = d3.geoConicConformal()
    .parallels([37 + 4 / 60, 38 + 26 / 60])
    .rotate([120 + 30 / 60], 0)
    .fitSize([chartBreakpointValues.width, chartBreakpointValues.height], landArea);

    var path = d3.geoPath(projection);
    var boundaryFilter = (a, b) => a !== b;
    
    var tiers = data.countystatus;

    const svg = d3
      .select(domElement)
      .append("svg")
      .attr("viewBox", [
        0,
        0,
        chartBreakpointValues.width,
        chartBreakpointValues.height,
      ])
      .append("g");
      
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
      .attr("d", path);
  
    // County boundaries
    const countiesGroup = g.append("g").attr("id", "county-boundaries");
    // Tier colors
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
          return "#" + tierColors[tier];
        } else {
          return 'gray';
        }
      })
      .on('mouseover', function(event, d){
        tooltip.html(`<div class="county-tooltip">
          <h3>${d.properties.NAME}</h2>
        </div>`); return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function(){ 
        return tooltip.style("top", (parseInt(this.getBoundingClientRect().y)-10)+"px").style("left",(parseInt(this.getBoundingClientRect().x)+10)+"px");
      })
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    // Tooltip
    // NOTE: Original was a simple label, not styled as a tooltip.
    let tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .text("a simple tooltip");
  
    // Labels
    const labelsGroup = g.append("g").attr("id", "labels")

  } catch (error) {
    console.error("Error rendering cagov-county-map:", error);
  }
}


