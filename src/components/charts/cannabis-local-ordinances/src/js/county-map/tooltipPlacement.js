import * as d3 from "d3";

const tooltipPlacement = (options, shapes) => {
  const legendStatewide = document.querySelector(
    "cagov-map-table[data-jurisdiction=Statewide] .map-legend"
  );
  const legendCounty = document.querySelector(
    "cagov-map-table[data-jurisdiction=County] .map-legend"
  );
  if (legendStatewide !== null) {
    const legendBBox = legendStatewide.getBoundingClientRect();
    if (window.innerWidth < 720) {
      const mapDimensions = getMapDimensions(options);
      const shapeDimensions = getShapeDimensions(options, shapes);

      const quadrant = getPositionQuadrant(mapDimensions, shapeDimensions);
      return calculatePositionOverShape(
        mapDimensions,
        shapeDimensions,
        quadrant
      );
    } 
      return {
        x: legendBBox.left + window.scrollX - 32,
        y: legendBBox.top + window.scrollY,
      };
    
  } if (legendCounty !== null) {
    const legendBBox = legendCounty.getBoundingClientRect();
    if (window.innerWidth < 720) {
      const mapDimensions = getMapDimensions(options);
      const shapeDimensions = getShapeDimensions(options, shapes);

      const quadrant = getPositionQuadrant(mapDimensions, shapeDimensions);
      return calculatePositionOverShape(
        mapDimensions,
        shapeDimensions,
        quadrant
      );
    } 
      return {
        x: legendBBox.left + window.scrollX - 90,
        y: legendBBox.top + window.scrollY,
      };
    
  }

  const mapDimensions = getMapDimensions(options);
  const shapeDimensions = getShapeDimensions(options, shapes);

  // let quadrant = getPositionQuadrant(mapDimensions, shapeDimensions);
  // return calculateQuadrantPositions(mapDimensions, shapeDimensions, quadrant);
};

const getMapDimensions = (options) => {
  const mapWidth = parseInt(
    d3
      .select("[data-layer-name=interactive-map-container]")
      .style("width")
      .replace("px", "")
  );
  const mapHeight = parseInt(
    d3
      .select("[data-layer-name=interactive-map-container]")
      .style("height")
      .replace("px", "")
  );

  const mapTop = parseInt(
    d3
      .select("svg[data-layer-name=interactive-map-container]")
      .node()
      .getBoundingClientRect().top
  );
  const mapBottom = parseInt(
    d3
      .select("svg[data-layer-name=interactive-map-container]")
      .node()
      .getBoundingClientRect().bottom
  );
  const parentBBox = document
    .querySelector("cagov-map-table .interactive-map-container")
    .getBoundingClientRect();

  const mapScale = mapHeight / options.rawHeight;
  const mapCenterWidth = mapWidth / 2;
  const mapCenterHeight = mapHeight / 2;
  return {
    mapScale,
    mapTop,
    mapBottom,
    mapCenterWidth,
    mapCenterHeight,
    parentBBox, // Change to center X Y
  };
};

const getShapeDimensions = (options, shapes) => {
  const bboxes = [];
  shapes.each(function (p, j) {
    const el = d3.select(this);
    const bbox = el.node().getBBox();
    bboxes.push(bbox);
  });

  const item = bboxes[0];
  return {
    shapeX: item.x,
    shapeY: item.y,
    shapeWidth: item.width,
    shapeHeight: item.height,
  };
};

/**
 * Figure out where in the map the shape is located, reposition tooltip based on upper and lower left and right quadrants.
 * @param {*} m
 * @param {*} s
 * @returns
 */
const getPositionQuadrant = (m, s) => {
  // Get quadrant
  let quadrant = 0;
  if (s.shapeX < m.mapCenterWidth && s.shapeY < m.mapCenterHeight) {
    quadrant = 0; // upper left
  } else if (s.shapeX >= m.mapCenterWidth && s.shapeY < m.mapCenterHeight) {
    quadrant = 1; // upper right
  } else if (s.shapeX < m.mapCenterWidth && s.shapeY >= m.mapCenterHeight) {
    quadrant = 2; // lower left
  } else if (s.shapeX >= m.mapCenterWidth && s.shapeY >= m.mapCenterHeight) {
    quadrant = 3; // lower right
  }

  return quadrant;
};

/**
 * Decide how to position the tooltip based on which quadrant we are in.
 * @param {*} m
 * @param {*} s
 * @param {*} quadrant
 * @returns
 */
const calculateQuadrantPositions = (m, s, quadrant) => {
  let tooltipX = s.shapeX;
  let tooltipY = s.shapeY;

  const bufferX = 60;
  let bufferY = 180;

  if (quadrant === 0) {
    // console.log("q0");
    bufferY = 10;
    tooltipX = s.shapeX + s.shapeWidth + bufferX;
    tooltipY = s.shapeY + s.shapeHeight + bufferY;
  } else if (quadrant === 1) {
    // console.log("q1");
    tooltipX = s.shapeX - s.shapeWidth - bufferX;
    tooltipY = s.shapeY + s.shapeHeight + bufferY;
  } else if (quadrant === 2) {
    // console.log("q2");
    tooltipX = s.shapeX + s.shapeWidth + bufferX;
    tooltipY = s.shapeY + s.shapeHeight - bufferY;
  } else if (quadrant === 3) {
    // console.log("q3");
    tooltipX = s.shapeX - s.shapeWidth - bufferX;
    tooltipY = s.shapeY - s.shapeHeight - bufferY;
  }

  const narrowBreakpoint = 720;
  // If in narrow screens, always be located in the same place.
  if (window.innerWidth < narrowBreakpoint) {
    tooltipX = 32;
    tooltipY = m.mapHeight + 310;
  }

  return {
    x: m.parentBBox.left + tooltipX + window.scrollX,
    y: m.parentBBox.top + tooltipY + window.scrollY,
  };
};

const calculatePositionOverShape = (m, s, quadrant) => {
  const tooltipX = s.shapeX;
  const tooltipY = s.shapeY;

  // console.log("CPS");
  return {
    x: m.parentBBox.left + window.scrollX,
    y: m.parentBBox.top + window.scrollY,
  };
};

export default tooltipPlacement;
