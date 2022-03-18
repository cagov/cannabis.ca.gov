import * as d3 from "d3";
import { xml } from "d3-fetch";
import { getCountyColor, getPlaceColor } from "./processData.js";
import { chartTooltipCounty, getCountyTooltipData } from "./countyTooltip.js";
import "./../../index.css";

/**
 * Render SVG based interactive county map using d3
 */
export default function drawCountyMap({
  data = null,
  domElement = null,
  tooltipElement = null,
  chartOptions = null,
  chartBreakpointValues = null,
  screenDisplayType = null,
}) {
  try {
    /* Data processing */
    var { dataPlaces } = data;

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
      svg.append("g").attr("data-name", "county-strokes");
    } else {
      d3.select(domElement + " [data-name] g").remove();
    }

    // xml("/data/CA_Counties_TIGER2016.svg").then((counties) => {
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
        let geoid = el.attr("data-geoid");
        el.attr("fill", () => {
          return getCountyColor(data, { name, island });
        })
          .attr("stroke-width", 1)
          .attr("stroke-opacity", 0.5)
          .attr("stroke", "#FFFFFF");
      });
    });

    // County stroke lines and tooltips
    xml("/assets/data/cnty19_1.svg").then((counties) => {
      const countiesGroup = d3.select(
        domElement + ' [data-name="county-strokes"]'
      );

      countiesGroup.node().append(counties.documentElement);

      let countyPaths = countiesGroup.selectAll("g path");

      countyPaths.each(function (p, j) {
        let el = d3.select(this);
        // let name = el.attr("data-name"); // TIGER2016
        let name = el.attr("data-county_nam"); // California County Boundaries (2019)
        let island = el.attr("data-island"); // Island values from californoia county boundaries
        let geoid = el.attr("data-geoid");
        let props = getCountyTooltipData(data, { name, island, geoid });

        el.attr("stroke-width", 1)
          .attr("stroke-opacity", 1)
          .attr("stroke", "#FFFFFF")
          .attr("fill", "transparent")
          .attr("tabindex", "0")
          .attr("aria-label", (d, i) => {
            return "Label";
          })
          .on("mouseover focus", function (event, d) {
            d3.select(this)
            .attr("fill", "#fcfcfc")
            .attr("fill-opacity", "0.2")
            ;

            tooltip.html(chartTooltipCounty(data, props, tooltipElement));
            return tooltip
              .transition()
              .duration(0)
              .style("visibility", "visible");
          })
          .on("mousemove", function (event, d) {
            // console.log(this);
            console.log(this.getBoundingClientRect());

            let mapWidth = parseInt(
              d3
                .select("[data-layer-name=map-layers-container]")
                .style("width")
                .replace("px", "")
            );
            let mapHeight = parseInt(
              d3
                .select("[data-layer-name=map-layers-container]")
                .style("height")
                .replace("px", "")
            );

            let mapScale = mapHeight / 900;

            let tooltipX =
              (parseInt(this.getBoundingClientRect().x) +
                parseInt(this.getBoundingClientRect().width)) *
                mapScale;

            let countyX = parseInt(this.getBoundingClientRect().x);
            let countyWidth = parseInt(this.getBoundingClientRect().width);

            if (countyX + countyWidth > mapWidth - countyWidth) {
              tooltipX = mapWidth - countyWidth;
            }

            let countyY = parseInt(this.getBoundingClientRect().y)
            let tooltipY = countyY;
            let countyHeight = parseInt(this.getBoundingClientRect().height);
     
            if (countyY + countyHeight > mapHeight - countyHeight) {
              tooltipY = mapHeight - countyHeight; 
                // mapHeight * 0.5 + (parseInt(this.getBoundingClientRect().y) / 2) - (mapHeight * 0.3);
            }

            return tooltip
              .style("top", tooltipY + "px")
              .style("left", tooltipX + "px");
          })
          .on("mouseout", function (d) {
            d3.select(this)
            .attr("fill", "transparent");
            return tooltip
              .transition()
              .delay(500)
              .style("visibility", "hidden");
          });
      });
    });

    /* PLACES */
    xml("/assets/data/tl_2016_06_place.svg").then((places) => {
      const group = d3.select(domElement + ' [data-name="places-boundaries"]');

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
            placeColor !== "transparent" ? "#000" : "transparent"
          );

        el.attr("fill", () => {
          let placeColor = getPlaceColor(data, { name, geoid });
          return placeColor;
        });
      });
    });

    /* LAND */
    // xml("/assets/data/california-land.svg").then((land) => {
    //   const group = d3.select(domElement + ' [data-name="land-boundaries"]');

    //   group.node().append(land.documentElement);
    //   let paths = group.selectAll("g path");

    //   paths.each(function (p, j) {
    //     let el = d3.select(this); // This is a black and white land later intended to be used with screen color mode.
    //   });

    //   // .attr("fill-opacity", 1);
    //   // attr('mask', 'url(#mask)')
    // });

    /* Tooltip container */
    let tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .text("");
  } catch (error) {
    console.error("Error rendering cagov-county-map:", error);
  }
}
