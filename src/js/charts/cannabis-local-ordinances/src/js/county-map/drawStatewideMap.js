import * as d3 from "d3";
import { svg } from "d3-fetch";
import { getCountyColor, getPlaceColor } from "./processData.js";
import { chartTooltipCounty, getCountyTooltipData } from "./countyTooltip.js";
import "./../../index.css";
import { chartLegendStatewide } from "./legend.js";
import tooltipPlacement from "./tooltipPlacement.js";
import { updateHistory } from "./updateHistory.js";
/**
 * Render SVG based interactive county map using d3
 */
export default function drawStatewideMap({
  data = null,
  domElement = null,
  tooltipElement = null,
  legendElement = null,
  mapLevel = "Statewide",
  jurisdiction = null,
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
  svgFiles = null
}) {
  // console.log("Statewide map", jurisdiction, mapLevel);
  try {
    /* Data processing */
    var { dataPlaces, messages } = data;

    var rawWidth = 800;
    var rawHeight = 923;

    // Clean up existing SVGs
    d3.select(domElement).select("svg").remove();

    if (
      document.querySelector(
        domElement + ' svg[data-layer-name="map-layer-container"]'
      ) === null
    ) {
      const svg = d3
        .select(domElement)
        .append("svg")
        .attr("viewBox", [0, 0, 800, 923])
        .attr("data-layer-name", "interactive-map-container")
        .append("g")
        .attr("data-layer-name", "interactive-map")
        .attr("width", "800")
        .attr("height", "923")
        ;

      let mapHeight = parseInt(
        d3.select("[data-layer-name=interactive-map-container]").style("height")
      );
      // console.log(mapTop, mapBottom);
      // console.log("mapHeight", mapHeight);
      let mapScale = mapHeight / 900;
      d3.select("[data-layer-name=interactive-map-container]")

        .attr("width", rawWidth * mapScale)
        .attr("height", rawHeight * mapScale);

      svg.append("g").attr("data-name", "land-boundaries");
      svg.append("g").attr("data-name", "county-boundaries");
      svg.append("g").attr("data-name", "places-boundaries");
      svg.append("g").attr("data-name", "county-strokes");
    } else {
      d3.select(domElement + " [data-name] g").remove();
    }
    let tooltip = d3.select(tooltipElement);

    /* Tooltip container */
    if (d3.select(tooltipElement + " div") === null) {
      tooltip = d3
        .select(tooltipElement)
        .append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden")
        .text("");
    }

    // California Counties Boundaries - has more recognizable coastline and island fills.
    if (data.showCounties === true) {
      svg(svgFiles.county)
      .then((counties) => {
        const countiesGroup = d3.select(
          domElement + ' [data-name="county-boundaries"]'
        );

        countiesGroup.node().append(counties.documentElement);
        let countyPaths = countiesGroup.selectAll("g path");

        countyPaths.each(function (p, j) {
          let el = d3.select(this);
          // let name = el.attr("data-name"); // TIGER2016
          let name = el.attr("data-county_nam"); // California County Boundaries (2019)
          let island = el.attr("data-island"); // Island values from californoia county boundaries
          // let geoid = el.attr("data-geoid");
          el.attr("fill", () => {
            return getCountyColor(data, { name, island });
          })
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.5)
            .attr("stroke", "#FFFFFF");
        });
      })
      .catch((error) => console.warn(error));

      // County stroke lines and tooltips (interactions, includes islands belonging to different counties.)
      svg(svgFiles.countyOutlines)
      .then((counties) => {
       
        const countiesGroup = d3.select(
          domElement + ' [data-name="county-strokes"]'
        );

        countiesGroup.node().append(counties.documentElement);

        let countyPaths = countiesGroup.selectAll("g path");

        Object.keys(data.countyList).map((county) => {
          data.countyList[county].shapes = [];
          data.countyList[county].shapes = countiesGroup.selectAll(
            `g path[data-name="${county}"]`
          );
        });

        countyPaths.each(function (p, j) {
          let el = d3.select(this);
          let name = el.attr("data-name"); // California County Boundaries (2019)
          let island = el.attr("data-island"); // Island values from californoia county boundaries
          let geoid = el.attr("data-geoid");
          let props = getCountyTooltipData(data, { name, island, geoid });
          tooltip.attr("data-toggle","false");
          el.attr("stroke-width", 1)
            .attr("stroke-opacity", 1)
            .attr("stroke", "#FFFFFF")
            .attr("fill", "transparent")
            .attr("tabindex", "0")
            .attr("aria-label", (d, i) => {
              return "Label";
            })
            .on("click", function (event, d) {
              // if (tooltip.attr("data-toggle") !== "true") {
                d3.select(this)
                .attr("fill", "#fcfcfc")
                .attr("fill-opacity", "0.2");
                tooltip.html(chartTooltipCounty(data, props));
                

                let shapes = data.countyList[name].shapes;
                let tooltipPosition = tooltipPlacement(
                  {
                    rawWidth,
                    rawHeight,
                  },
                  shapes
                );
                tooltip.attr("data-toggle","false");
                data.setupTooltipUIListeners(data);
                return tooltip
                  .transition()
                  .duration(0)
                  .style("left", tooltipPosition.x + "px")
                  .style("top", tooltipPosition.y + "px")
                  .style("visibility", "visible");
              // } else {
              //   d3.select(this).attr("fill", "transparent");
              //   tooltip.attr("data-toggle", "true");
              //   return tooltip
              //     .transition()
              //     .delay(200)
              //     .style("visibility", "hidden");
              // }
            })
            .on("dblclick", function (d) {
              d3.select(this).attr("fill", "transparent");
              return tooltip
                .transition()
                .delay(200)
                .style("visibility", "hidden");
            });
        });
      })
      .catch((error) => console.warn(error));
    }

    /* PLACES */
    if (data.showPlaces === true) {
      svg(svgFiles.places)
      .then((places) => {
        const group = d3.select(
          domElement + ' [data-name="places-boundaries"]'
        );

        group.node().append(places.documentElement);
        let paths = group.selectAll("g path");

        paths.each(function (p, j) {
          let el = d3.select(this);
          let name = el.attr("data-name");
          let geoid = el.attr("data-geoid");
          let placeColor = getPlaceColor(data, { name, geoid });
          el.attr("stroke-width", 0.2)
            .attr("stroke-opacity", 0.4)
            .attr(
              "stroke",
              placeColor !== "transparent" ? "#FFF" : "transparent"
            );

          el.attr("fill", () => {
            let placeColor = getPlaceColor(data, { name, geoid });
            return placeColor;
          });
        });
      })
      .catch((error) => console.warn(error));
    }

    // Update the legend
    document.querySelector(legendElement).innerHTML = chartLegendStatewide(
      data,
      {}
    );
  } catch (error) {
    console.error("Error rendering cannabis-local-ordinances:", error);
  }
}
