import * as d3 from "d3";
import { xml } from "d3-fetch";
import {
  getCountyColorPlaceLevel,
  getPlaceColorPlaceLevel,
} from "./processData.js";
import { chartTooltipPlace, getPlaceTooltipData } from "./tooltipPlace.js";
import "../../index.css";
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
  d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
      this.parentNode.appendChild(this);
    });
  };

  try {
    const tooltipContainer = document.querySelector(".tooltip-container");
    if (tooltipContainer !== null) {
      tooltipContainer.setAttribute("style", "visibility:hidden");
    }

    /* Data processing */
    const { dataPlaces, messages, selectedCounty } = data;
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
        .attr("cursor", "pointer")
        .attr("width", "800")
        .attr("height", "923");
      svg.append("g").attr("data-name", "land-boundaries");
      svg.append("g").attr("data-name", "county-boundaries");
      svg.append("g").attr("data-name", "places-boundaries");
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

    // California Counties Boundaries - has more recognizable coastline and island fills.

    xml(svgFiles.county).then((counties) => {
      const countiesGroup = d3.select(
        `${mapElement  } [data-name="county-boundaries"]`
      );
      countiesGroup.node().append(counties.documentElement);
      const countyPaths = countiesGroup.selectAll("g path");
      const islandPaths = countiesGroup.selectAll("g path[data-island]");

      data.selectedCountyIslands = [];
      islandPaths.each(function (p, j) {
        const el = d3.select(this);
        const name = el.attr("data-county_nam"); // California County Boundaries (2019)
        const island = el.attr("data-island"); // Island values from California county boundaries
        if (name === data.selectedCounty) {
          data.selectedCountyIslands.push(el);
        }
      });

      countyPaths.each(function (p, j) {
        const el = d3.select(this);

        // let name = el.attr("data-name"); // TIGER2016
        const name = el.attr("data-county_nam"); // California County Boundaries (2019)
        const island = el.attr("data-island"); // Island values from California county boundaries

        const geoid = el.attr("data-geoid");

        if (name === data.selectedCounty) {
          el.attr("fill", () => getCountyColorPlaceLevel(data, {
              name,
              island,
              selectedCounty,
            }))
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
          `${mapElement  } [data-name="places-boundaries"]`
        );
        group.node().append(places.documentElement);
        const paths = group.selectAll("g path");

        paths.each(function (p, j) {
          const el = d3.select(this);
          const name = el.attr("data-name");
          const geoid = el.attr("data-geoid");
          const currentPlace = Object.keys(data.dataPlaces).filter((place) => {
            const item = data.dataPlaces[place];
            if (
              geoid === item.GEOID &&
              item.County === data.selectedCounty &&
              place !== "default"
            ) {
              return place;
            }
          });

          if (currentPlace !== null && currentPlace.length > 0) {
            const placeColor = getPlaceColorPlaceLevel(data, { name, geoid });
            const props = getPlaceTooltipData(data, { name, geoid });

            el.attr("stroke-width", 0.2)
              .attr("stroke-opacity", 1)
              .attr(
                "stroke",
                placeColor !== "transparent" ? "#FFF" : "transparent"
              );

            el.attr("fill", () => {
              const placeColor = getPlaceColorPlaceLevel(data, { name, geoid });
              return placeColor;
            })
              .attr("tabindex", "0")
              .attr("aria-label", (d, i) => "Label")
              .on("click", function (event, d) {
                const countiesGroup = d3.select(
                  `${mapElement  } [data-name="county-boundaries"]`
                );
                const countyPaths = countiesGroup.selectAll("g path");
                countyPaths.each(function (p, j) {
                  const el = d3.select(this);
                  el.attr("fill-opacity", 0.25);
                });

                paths.each(function (p, j) {
                  d3.select(this)
                    .attr("fill-opacity", 0.25)
                    .attr("stroke-width", "0.2");
                });

                d3.select(this)
                  .attr("fill-opacity", 1)
                  .attr("stroke-width", "0.35");

                d3.select(this).moveToFront();

                const shapes = [el];
                const tooltipPosition = tooltipPlacement(
                  {
                    rawWidth,
                    rawHeight,
                  },
                  el
                );
                tooltip.html(chartTooltipPlace(data, props, { name, geoid }));

                const tooltipContainer =
                  document.querySelector(".tooltip-container");
                tooltipContainer.setAttribute("style", "visibility:visible");
                const closeButton = document.querySelector(
                  ".tooltip-container .close-button"
                );
                if (closeButton !== null) {
                  closeButton.addEventListener("click", (e) => {
                    tooltipContainer.setAttribute("style", "visibility:hidden");
                    paths.each(function (p, j) {
                      d3.select(this)
                        .attr("fill-opacity", "1")
                        .attr("stroke-width", "0.2");
                    });
                    const countiesGroup = d3.select(
                      `${mapElement  } [data-name="county-boundaries"]`
                    );
                    const countyPaths = countiesGroup.selectAll("g path");
                    countyPaths.each(function (p, j) {
                      const el = d3.select(this);
                      el.attr("fill-opacity", 1);
                    });
                  });
                }

                data.setUpTooltipUIListeners(data);
                if (window.innerWidth < 720) {
                  return tooltip
                    .transition()
                    .duration(0)
                    .style("position", "absolute")
                    .style("left", `${tooltipPosition.x  }px`)
                    .style("top", `${tooltipPosition.y  }px`)
                    .style("visibility", "visible");
                }
                return tooltip
                  .transition()
                  .duration(0)
                  .style("left", `${tooltipPosition.x  }px`)
                  .style("top", `${tooltipPosition.y  }px`)
                  .style("visibility", "visible");
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
      {},
      "legend"
    );
  } catch (error) {
    console.error("Error rendering cannabis-local-ordinances:", error);
  }
}
