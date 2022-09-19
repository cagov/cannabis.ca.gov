import * as d3 from "d3";
import { xml } from "d3-fetch";
import {
  getCountyColorPlaceLevel,
  getPlaceColorPlaceLevel,
} from "./processData.js";
import { chartTooltipPlace, getPlaceTooltipData } from "./placeTooltip.js";
import "../../index.css";
import { chartLegendPlace } from "./legend.js";
import tooltipPlacement from "./tooltipPlacement.js";
// import { updateHistory } from "./updateHistory.js";
import { scaleCounty } from "./scaleCounty.js";

/**
 * Render SVG based interactive places (city) map using d3
 */
export default function drawPlaceMap({
  data = null,
  mapElement = null,
  jurisdiction = "Place",
  tooltipElement = null,
  legendElement = null,
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
  svgFiles = null,
}) {
  try {
    //   /* Data processing */
    const { dataPlaces, messages, selectedPlace, selectedCounty } = data;
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
    // if (data.showCounties === true) {
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

        // let geoid = el.attr("data-geoid");
        // console.log("island", island, geoid);
        // console.log(name, data.selectedCounty);
        if (name === data.selectedCounty) {
          // @NOTE removed island DEBUGGING
          el.attr("fill", () => getCountyColorPlaceLevel(data, {
              name,
              island,
              selectedCounty: data.selectedCounty,
            }))
            .attr("stroke-width", 0.2)
            .attr("stroke-opacity", 1)
            .attr("stroke", "#FFFFFF")
            .attr("fill-opacity", 0.25);

          // el.remove(); // Remove all the islands to rebuild just county islands at scale.

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

    /* PLACES */
    xml(svgFiles.places).then((places) => {
      const group = d3.select(`${mapElement  } [data-name="places-boundaries"]`);

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
          // console.log(props);

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
            .attr("aria-label", (d, i) => 
              // console.log(currentPlace);
              // @TODO @DEBUG
               "Label"
            )
            .attr("fill-opacity", (d) => {
              if (
                data.dataPlaces[currentPlace].GEOID ===
                data.selectedPlace.GEOID
              ) {
                return 1;
              } 
                return 0.25;
              
            })
            .attr("class", (d) => {
              if (
                data.dataPlaces[currentPlace].GEOID ===
                data.selectedPlace.GEOID
              ) {
                return "selected";
              } 
                return "";
              
            });
        } else {
          el.remove();
        }
      });
    });

    // Update the legend
    document.querySelector(legendElement).innerHTML = chartLegendPlace(
      data,
      {}
    );
  } catch (error) {
    console.error("Error rendering cagov-place-map:", error);
  }
}
