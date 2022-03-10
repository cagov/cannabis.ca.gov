import * as d3 from "d3";

/**
- [ ] Update tooltip
- [ ] Add places
*/

/**
 * Render SVG based interactive county map using d3
 */
export default function drawCountyMap({
  data = null,
  domElement = null,
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
}) {
  try {
    var countyStatuses = data.countystatus;
    var { landArea, ca, counties, places } = data;

    // function zoom (s) {
    //   s.call(d3.zoom()
    // -- invalid, no event
    //     // .on("zoom", () => s.select("#map-layers").attr("transform", d3.event.transform))
    //     .scaleExtent([1, 18])
    //     .translateExtent([[0, 0], [width, height]]))
    // }

    var projection = d3
      .geoConicConformal()
      .parallels([37 + 4 / 60, 38 + 26 / 60])
      .rotate([120 + 30 / 60], 0)
      .fitSize(
        [chartBreakpointValues.width, chartBreakpointValues.height],
        landArea
      );

    var path = d3.geoPath(projection);
    var boundaryFilter = (a, b) => a !== b;

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

    const g = svg.append("g").attr("id", "map-layers");

    // "land" from merged counties
    const land = g
      .append("g")
      .attr("id", "land")
      .append("path")
      .datum(landArea)
      .attr("fill", "white")
      .attr("stroke-width", 0.2)
      .attr("stroke", "white")
      .attr("stroke-line-join", "round")
      .attr("d", path);

    // County boundaries
    const countiesGroup = g.append("g").attr("id", "county-boundaries");
    const placesGroup = g.append("g").attr("id", "places-boundaries");
    // County status colors
    const countyStatusColors = [
      "2F4C2C",
      "C0633B",
    ];

    const placeStatusColors = [
      "2F4C2C",
      "C0633B",
    ];

    countiesGroup
      .selectAll(".county")
      .data(counties.features)
      .enter()
      .append("path")
      .attr("stroke-width", 0.5)
      .attr("stroke", "white")
      .attr("d", path)
      .attr('fill', (d) => {
        let countyStatus = '';
        countyStatuses.forEach(status => {
          if(status.county.toLowerCase() === d.properties.NAME.toLowerCase()) {
            countyStatus = status["Overall Status"];
          }
        });
        if(countyStatus) {
          return "#" + countyStatusColors[countyStatus];
        } else {
          return 'gray';
        }
      })
      .on("mouseover", function (event, d) {
        tooltip.html(`<div class="county-tooltip">
          <h3>${d.properties.NAME}</h2>
        </div>`);
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function () {
        return tooltip
          .style("top", parseInt(this.getBoundingClientRect().y) - 10 + "px")
          .style("left", parseInt(this.getBoundingClientRect().x) + 10 + "px");
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

      placesGroup
      .selectAll(".places")
      .data(places.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr('fill', (d) => {
        let placeStatus = '';
        placeStatuses.forEach(status => {
          if(status.place.toLowerCase() === d.properties.NAME.toLowerCase()) {
            placeStatus = status["Overall Status"];
          }
        });
        if(placeStatus) {
          return "#" + placeStatusColors[placeStatus];
        } else {
          return 'gray';
        }
      })
      .on("mouseover", function (event, d) {
        tooltip.html(`<div class="county-tooltip">
          <h3>${d.properties.NAME}</h2>
        </div>`);
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function () {
        return tooltip
          .style("top", parseInt(this.getBoundingClientRect().y) - 10 + "px")
          .style("left", parseInt(this.getBoundingClientRect().x) + 10 + "px");
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    // Tooltip
    // NOTE: Original was a simple label, not styled as a tooltip.
    let tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .text("a simple tooltip");

    // Labels
    const labelsGroup = g.append("g").attr("id", "labels");

  } catch (error) {
    console.error("Error rendering cagov-county-map:", error);
  }
}
