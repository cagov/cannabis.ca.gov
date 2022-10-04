import * as d3 from "d3";
import { svg } from "d3-fetch";
import { getCountyColor, getPlaceColor } from "./processData.js";
import { chartTooltipCounty, getCountyTooltipData } from "./countyTooltip.js";
import "../../index.css";
import { chartLegendStatewide } from "./legend.js";
import tooltipPlacement from "./tooltipPlacement.js";
import { updateHistory } from "./updateHistory.js";
/**
 * Render SVG based interactive county map using d3
 */
export default function drawStatewideMap({
  data = null,
  mapElement = null,
  tooltipElement = null,
  legendElement = null,
  jurisdiction = "Statewide",
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
  svgFiles = null,
}) {
  // console.log("Statewide map", jurisdiction, jurisdiction);
  try {
    /* Data processing */
    const { dataPlaces, messages } = data;

    const rawWidth = 800;
    const rawHeight = 923;

    // Clean up existing SVGs
    d3.select(mapElement).select("svg").remove();

    if (
      document.querySelector(
        `${mapElement  } svg[data-layer-name="map-layer-container"]`
      ) === null
    ) {
      const svg = d3
        .select(mapElement)
        .append("svg")
        .attr("viewBox", [0, 0, 800, 923])
        .attr("data-layer-name", "interactive-map-container")
        .append("g")
        .attr("data-layer-name", "interactive-map")
        .attr("width", "800")
        .attr("height", "923");
      const mapHeight = parseInt(
        d3.select("[data-layer-name=interactive-map-container]").style("height")
      );

      const mapScale = mapHeight / 900;
      d3.select("[data-layer-name=interactive-map-container]")
        .attr("width", rawWidth * mapScale)
        .attr("height", rawHeight * mapScale);

      svg.append("g").attr("data-name", "land-boundaries");
      svg.append("g").attr("data-name", "county-boundaries");
      svg.append("g").attr("data-name", "places-boundaries");
      svg.append("g").attr("data-name", "county-strokes");
    } else {
      d3.select(`${mapElement  } [data-name] g`).remove();
    }
    let tooltip = d3.select(tooltipElement);

    /* Tooltip container */
    if (d3.select(`${tooltipElement  } div`) === null) {
      tooltip = d3
        .select(tooltipElement)
        .append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden")
        .text("");
    }

    // @TODO ADD REDRAW of whole UI on resize
    if (window.innerWidth < 720) {
      tooltip.style("position", "relative");
    } else {
      tooltip.style("position", "absolute").style("zIndex", "2000");
    }

    // California Counties Boundaries - has more recognizable coastline and island fills.
    if (data.showCounties === true) {
      svg(svgFiles.county)
        .then((counties) => {
          const countiesGroup = d3.select(
            `${mapElement  } [data-name="county-boundaries"]`
          );

          countiesGroup.node().append(counties.documentElement);
          const countyPaths = countiesGroup.selectAll("g path");

          countyPaths.each(function (p, j) {
            const el = d3.select(this);
            // let name = el.attr("data-name"); // TIGER2016
            const name = el.attr("data-county_nam"); // California County Boundaries (2019)
            const island = el.attr("data-island"); // Island values from californoia county boundaries
            // let geoid = el.attr("data-geoid");
            el.attr("fill", () => getCountyColor(data, { name, island }))
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
            `${mapElement  } [data-name="county-strokes"]`
          );

          countiesGroup.node().append(counties.documentElement);

          const countyPaths = countiesGroup.selectAll("g path");

          Object.keys(data.countyList).map((county) => {
            data.countyList[county].shapes = [];
            data.countyList[county].shapes = countiesGroup.selectAll(
              `g path[data-name="${county}"]`
            );
          });

          countyPaths.each(function (p, j) {
            const el = d3.select(this);
            const name = el.attr("data-name"); // California County Boundaries (2019)
            const island = el.attr("data-island"); // Island values from californoia county boundaries
            const geoid = el.attr("data-geoid");
            const props = getCountyTooltipData(data, { name, island, geoid });
            tooltip.attr("data-toggle", "false");
            el.attr("stroke-width", 1)
              .attr("stroke-opacity", 1)
              .attr("stroke", "#FFFFFF")
              .attr("fill", "transparent")
              .attr("tabindex", "0")
              .attr("aria-label", (d, i) => "Label")
              .on("click", function (event, d) {
                countyPaths.each(function (p, j) {
                  const el = d3.select(this);
                  d3.select(this).attr("fill", "transparent");
                });
                // if (tooltip.attr("data-toggle") !== "true") {
                d3.select(this)
                  .attr("fill", "#fcfcfc")
                  .attr("fill-opacity", "0.2");
                tooltip.html(chartTooltipCounty(data, props));

                const {shapes} = data.countyList[name];
                const tooltipPosition = tooltipPlacement(
                  {
                    rawWidth,
                    rawHeight,
                  },
                  shapes
                );
                tooltip.attr("data-toggle", "false");
                data.setUpTooltipUIListeners(data);
                return tooltip
                  .transition()
                  .duration(0)
                  .style("left", `${tooltipPosition.x  }px`)
                  .style("top", `${tooltipPosition.y  }px`)
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
            `${mapElement  } [data-name="places-boundaries"]`
          );

          group.node().append(places.documentElement);
          const paths = group.selectAll("g path");

          paths.each(function (p, j) {
            const el = d3.select(this);
            const name = el.attr("data-name");
            const geoid = el.attr("data-geoid");
            const placeColor = getPlaceColor(data, { name, geoid });
            el.attr("stroke-width", 0.2)
              .attr("stroke-opacity", 0.4)
              .attr(
                "stroke",
                placeColor !== "transparent" ? "#FFF" : "transparent"
              );

            el.attr("fill", () => {
              const placeColor = getPlaceColor(data, { name, geoid });
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
