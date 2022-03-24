import * as d3 from "d3";
import { xml } from "d3-fetch";
import { getCountyColorPlaceLevel, getCountyColor, getPlaceColor } from "./processData.js";
import { chartTooltipPlce, getPlaceTooltipData } from "./placeTooltip.js";
import "./../../index.css";

/**
 * Render SVG based interactive county map using d3
 */
export default function drawCountyMap({
  data = null,
  domElement = null,
  mapLevel = "County",
  jurisdiction = null,
  tooltipElement = null,
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
}) {
  
  try {
    /* Data processing */
    var { dataPlaces, messages, selectedCounty } = data;
    console.log("County map", jurisdiction, selectedCounty, mapLevel);

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
        .attr("data-layer-name", "map-layers-container")
        .append("g")
        .attr("data-layer-name", "map-layers")
        .attr("width", "800")
        .attr("height", "923");
      svg.append("g").attr("data-name", "land-boundaries");
      svg.append("g").attr("data-name", "county-boundaries");
      svg.append("g").attr("data-name", "places-boundaries");
      // svg.append("g").attr("data-name", "county-strokes");
    } else {
      d3.select(domElement + " [data-name] g").remove();
    }
    let tooltip = d3
    .select(tooltipElement);

    /* Tooltip container */
    if (d3
      .select(tooltipElement + " div") === null) {
        tooltip = d3
        .select(tooltipElement)
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("");
      }
     

    // California Counties Boundaries - has more recognizable coastline and island fills.
    // if (data.showCounties === true) {
    xml("/assets/data/cnty19_1.svg").then((counties) => {
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
          

            return getCountyColorPlaceLevel(data, { name, island, selectedCounty });
       
        })
          .attr("stroke-width", 1)
          .attr("stroke-opacity", 0.5)
          .attr("stroke", "#FFFFFF");
      });
    });
  

    // County stroke lines and tooltips (interactions, includes islands belonging to different counties.)
    // xml("/assets/data/ca_counties_tiger2016.svg").then((counties) => {
    //   const countiesGroup = d3.select(
    //     domElement + ' [data-name="county-strokes"]'
    //   );

    //   countiesGroup.node().append(counties.documentElement);

    //   let countyPaths = countiesGroup.selectAll("g path");

    //   countyPaths.each(function (p, j) {
    //     let el = d3.select(this);
    //     // let name = el.attr("data-name"); // TIGER2016
    //     let name = el.attr("data-name"); // California County Boundaries (2019)
    //     let island = el.attr("data-island"); // Island values from californoia county boundaries
    //     let geoid = el.attr("data-geoid");
    //     let props = getPlaceTooltipData(data, { name, island, geoid });

    //     el.attr("stroke-width", 1)
    //       .attr("stroke-opacity", 1)
    //       .attr("stroke", "#FFFFFF")
    //       .attr("fill", "transparent")
    //       .attr("tabindex", "0")
    //       .attr("aria-label", (d, i) => {
    //         return "Label";
    //       })
    //       .on("mouseover focus", function (event, d) {
    //         d3.select(this).attr("fill", "#fcfcfc").attr("fill-opacity", "0.2");
    //         tooltip.html(chartTooltipPlace(data, props));

    //         return tooltip
    //           .transition()
    //           .duration(0)
    //           .style("visibility", "visible");
    //       })
    //       .on("mousemove", function (event, d) {
    //         let mapWidth = parseInt(
    //           d3
    //             .select("[data-layer-name=map-layers-container]")
    //             .style("width")
    //             .replace("px", "")
    //         );
    //         let mapHeight = parseInt(
    //           d3
    //             .select("[data-layer-name=map-layers-container]")
    //             .style("height")
    //             .replace("px", "")
    //         );

    //         // console.log("m wh", mapWidth, mapHeight);
    //         let mapTop = parseInt(
    //           d3
    //             .select("svg[data-layer-name=map-layers-container]")
    //             .node()
    //             .getBoundingClientRect().top
    //         );
    //         let mapBottom = parseInt(
    //           d3
    //             .select("svg[data-layer-name=map-layers-container]")
    //             .node()
    //             .getBoundingClientRect().bottom
    //         );

    //         // console.log(mapTop, mapBottom);

    //         let mapScale = mapHeight / 900;

    //         // console.log(this.getBoundingClientRect());

    //         let countyX = parseInt(this.getBoundingClientRect().x);
    //         let countyY = parseInt(this.getBoundingClientRect().y);

    //         let countyWidth = parseInt(this.getBoundingClientRect().width);
    //         let countyHeight = parseInt(this.getBoundingClientRect().height);

    //         // console.log("m wh s", mapWidth, mapHeight, mapScale);
    //         // console.log("c wh", countyWidth, countyHeight);
    //         // console.log("c xy", countyX, countyY);

    //         // let tooltipWidth = 310;
    //         // let tooltipHeight = 180;

    //         let mapCenterWidth = mapWidth / 2;
    //         let mapCenterHeight = mapHeight / 2;
    //         // Get quadrant
    //         let quadrant = 0;
    //         if (countyX < mapCenterWidth && countyY < mapCenterHeight) {
    //           quadrant = 0; // upper left
    //         } else if (countyX >= mapCenterWidth && countyY < mapCenterHeight) {
    //           quadrant = 1; // upper right
    //         } else if (countyX < mapCenterWidth && countyY >= mapCenterHeight) {
    //           quadrant = 2; // lower left
    //         } else if (
    //           countyX >= mapCenterWidth &&
    //           countyY >= mapCenterHeight
    //         ) {
    //           quadrant = 3; // lower right
    //         }

    //         let tooltipX = countyX;
    //         let tooltipY = countyY;

    //         let bufferX = 10;
    //         let bufferY = 10;

    //         if (quadrant === 0) {
    //           // console.log("q0");
    //           tooltipX = countyX + countyWidth +  bufferX;
    //           tooltipY = countyY + countyHeight + bufferY;
    //         } else if (quadrant === 1) {
    //           // console.log("q1");
    //           tooltipX = countyX - countyWidth - bufferX;
    //           tooltipY = countyY + countyHeight + bufferY;
    //         } else if (quadrant === 2) {
    //           // console.log("q2");
    //           tooltipX = countyX + countyWidth +  bufferX;
    //           tooltipY = countyY - 80;
    //         } else if (quadrant === 3) {
    //           // console.log("q3");

    //           tooltipX = countyX - countyWidth - 180;
    //           tooltipY = countyY - 80;
    //         }

    //         if (window.innerWidth < 600) {
    //           tooltipX = 10;
    //           tooltipY = mapHeight + 310;
    //         }

    //         return tooltip
    //           .style("left", tooltipX + "px")
    //           .style("top", tooltipY + "px");
    //       })
    //       .on("mouseout focusout", function (d) {
    //         d3.select(this).attr("fill", "transparent");

    //         return tooltip
    //           .transition()
    //           .delay(500)
    //           .style("visibility", "hidden");
    //       });
    //   });
    // });
  // }

    /* PLACES */
  //   if (data.showCities === true) {
  //   xml("/assets/data/tl_2016_06_place.svg").then((places) => {
  //     const group = d3.select(domElement + ' [data-name="places-boundaries"]');

  //     group.node().append(places.documentElement);
  //     let paths = group.selectAll("g path");

  //     paths.each(function (p, j) {
  //       let el = d3.select(this);
  //       let name = el.attr("data-name");
  //       let geoid = el.attr("data-geoid");
  //       let placeColor = getPlaceColor(data, { name, geoid });
  //       el.attr("stroke-width", 0.2)
  //         .attr("stroke-opacity", 0.4)
  //         .attr(
  //           "stroke",
  //           placeColor !== "transparent" ? "#FFF" : "transparent"
  //         );

  //       el.attr("fill", () => {
  //         let placeColor = getPlaceColor(data, { name, geoid });
  //         return placeColor;
  //       });
  //     });
  //   });
  // }
  } catch (error) {
    console.error("Error rendering cagov-county-map:", error);
  }
  
}
