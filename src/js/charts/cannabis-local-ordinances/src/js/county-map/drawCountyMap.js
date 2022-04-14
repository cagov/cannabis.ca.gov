import * as d3 from "d3";
import { xml } from "d3-fetch";
import {
  getCountyColorPlaceLevel,
  getPlaceColorPlaceLevel,
} from "./processData.js";
import { chartTooltipPlace, getPlaceTooltipData } from "./placeTooltip.js";
import "./../../index.css";
import { chartLegendCounty } from "./legend.js";
import tooltipPlacement from "./tooltipPlacement.js";
// import { updateHistory } from "./updateHistory.js";
import { scaleCounty } from "./scaleCounty.js";

/**
 * Render SVG based interactive county map using d3
 */
export default function drawCountyMap({
  data = null,
  mapElement = null,
  jurisdiction = "County",
  tooltipElement = null,
  legendElement = null,
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
  svgFiles = null,
}) {
  try {
    /* Data processing */
    var { dataPlaces, messages, selectedCounty } = data;
    var rawWidth = 800;
    var rawHeight = 923;

    // Clean up existing SVGs
    d3.select(mapElement).select("svg").remove();

    if (
      document.querySelector(
        mapElement + ' svg[data-layer-name="map-layer-container"]'
      ) === null
    ) {
      const svg = d3
        .select(mapElement)
        .append("svg")
        .attr("viewBox", [0, 0, 800, 923])
        .attr("data-layer-name", "interactive-map-container")
        .append("g")
        .attr("data-layer-name", "interactive-map")
        .attr("cursor", "pointer")
        .attr("width", "800")
        .attr("height", "923");
      svg.append("g").attr("data-name", "land-boundaries");
      svg.append("g").attr("data-name", "county-boundaries");
      svg.append("g").attr("data-name", "places-boundaries");
    } else {
      d3.select(mapElement + " [data-name] g").remove();
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

    xml(svgFiles.county).then((counties) => {
      const countiesGroup = d3.select(
        mapElement + ' [data-name="county-boundaries"]'
      );
      countiesGroup.node().append(counties.documentElement);
      let countyPaths = countiesGroup.selectAll("g path");
      let islandPaths = countiesGroup.selectAll("g path[data-island]");

      data.selectedCountyIslands = [];
      islandPaths.each(function (p, j) {
        let el = d3.select(this);
        let name = el.attr("data-county_nam"); // California County Boundaries (2019)
        let island = el.attr("data-island"); // Island values from California county boundaries
        if (name === data.selectedCounty) {
          data.selectedCountyIslands.push(el);
        }
      });

      countyPaths.each(function (p, j) {
        let el = d3.select(this);

        // let name = el.attr("data-name"); // TIGER2016
        let name = el.attr("data-county_nam"); // California County Boundaries (2019)
        let island = el.attr("data-island"); // Island values from California county boundaries

        // let geoid = el.attr("data-geoid");
        // console.log("island", island, geoid);
        if (name === data.selectedCounty) {
          el.attr("fill", () => {
            return getCountyColorPlaceLevel(data, {
              name,
              island,
              selectedCounty,
            });
          })
            .attr("stroke-width", 0.2)
            .attr("stroke-opacity", 1)
            .attr("stroke", "#FFFFFF");
          // el.remove(); // Remove all the islands to rebuild just county islands at scale.

          if (data.showCounties === false) {
            el.style("visible", "hidden");
          }

          if (island !== null) {
            el.style("visible", "hidden");
            // el.remove();
          } else {
            scaleCounty(
              el,
              data,
              selectedCounty,
              rawWidth,
              rawHeight,
              mapElement
            );
          }
        } else {
          // Not the selected county
          // el.remove();
          el.attr("opacity", 0.05);
        }
      });
    });

    if (data.showPlaces === true) {
      /* PLACES */
      xml(svgFiles.places).then((places) => {
        const group = d3.select(
          mapElement + ' [data-name="places-boundaries"]'
        );
        group.node().append(places.documentElement);
        let paths = group.selectAll("g path");

        paths.each(function (p, j) {
          let el = d3.select(this);
          let name = el.attr("data-name");
          let geoid = el.attr("data-geoid");
          let currentPlace = Object.keys(data.dataPlaces).filter((place) => {
            let item = data.dataPlaces[place];
            if (
              parseInt(geoid) === item["GEOID"] &&
              item.County === data.selectedCounty &&
              place !== "default"
            ) {
              return place;
            }
          });

          if (currentPlace !== null && currentPlace.length > 0) {
            let placeColor = getPlaceColorPlaceLevel(data, { name, geoid });
            let props = getPlaceTooltipData(data, { name, geoid });

            el.attr("stroke-width", 0.2)
              .attr("stroke-opacity", 1)
              .attr(
                "stroke",
                placeColor !== "transparent" ? "#FFF" : "transparent"
              );

            el.attr("fill", () => {
              let placeColor = getPlaceColorPlaceLevel(data, { name, geoid });
              return placeColor;
            })
              .attr("tabindex", "0")
              .attr("aria-label", (d, i) => {
                // console.log(currentPlace);
                // @TODO @DEBUG
                return "Label";
              })
              .on("click", function (event, d) {
                d3.select(this).attr("fill-opacity", "0.8");
                let shapes = [el];
                let tooltipPosition = tooltipPlacement(
                  {
                    rawWidth,
                    rawHeight,
                  },
                  el
                );
                tooltip.html(chartTooltipPlace(data, props, { name, geoid }));
                data.setUpTooltipUIListeners(data);
                return tooltip
                  .transition()
                  .duration(0)
                  .style("left", tooltipPosition.x + "px")
                  .style("top", tooltipPosition.y + "px")
                  .style("visibility", "visible");
              })
              .on("dblclick", function (event, d) {
                d3.select(this).attr("fill-opacity", "1");
                return tooltip
                  .transition()
                  .delay(0)
                  .style("visibility", "hidden");
              });
          } else {
            el.remove();
          }
        });
      });
    }

    // Update the legend
    document.querySelector(legendElement).innerHTML = chartLegendCounty(
      data,
      {}
    );
  } catch (error) {
    console.error("Error rendering cannabis-local-ordinances:", error);
  }
}
