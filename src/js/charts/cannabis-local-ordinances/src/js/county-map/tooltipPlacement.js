import * as d3 from "d3";

const tooltipPlacement = (options, shapes) => {
  let mapDimensions = getMapDimensions(options);
  let shapeDimensions = getShapeDimensions(options, shapes);

  let quadrant = getPositionQuadrant(mapDimensions, shapeDimensions);
  return calculateQuadrantPositions(mapDimensions, shapeDimensions, quadrant);
};

const getMapDimensions = (options) => {
  let mapWidth = parseInt(
    d3
      .select("[data-layer-name=interactive-map-container]")
      .style("width")
      .replace("px", "")
  );
  let mapHeight = parseInt(
    d3
      .select("[data-layer-name=interactive-map-container]")
      .style("height")
      .replace("px", "")
  );

  //   // console.log("m wh", mapWidth, mapHeight);
  let mapTop = parseInt(
    d3
      .select("svg[data-layer-name=interactive-map-container]")
      .node()
      .getBoundingClientRect().top
  );
  let mapBottom = parseInt(
    d3
      .select("svg[data-layer-name=interactive-map-container]")
      .node()
      .getBoundingClientRect().bottom
  );
  let parentBBox = document
    .querySelector("cagov-map-table .interactive-map-container")
    .getBoundingClientRect(); 
  //   console.log(mapTop, mapBottom);

  //   console.log("parentBBox", parentBBox);

  let mapScale = mapHeight / options.rawHeight;

  //   console.log("m wh s", mapWidth, mapHeight, mapScale);
  let mapCenterWidth = mapWidth / 2;
  let mapCenterHeight = mapHeight / 2;
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
  let bboxes = [];
  shapes.each(function (p, j) {
    let el = d3.select(this);
    let bbox = el.node().getBBox();
    bboxes.push(bbox);
  });

  let item = bboxes[0];
  return {
    shapeX: item.x,
    shapeY: item.y,
    shapeWidth: item.width,
    shapeHeight: item.height,
  };
};

const getTooltipDimensions = () => {
  return {
    w: 320,
    h: 180,
  };
};

const getPositionQuadrant = (m, s) => {
  //   // Get quadrant
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

const calculateQuadrantPositions = (m, s, quadrant) => {
  let tooltipX = s.shapeX;
  let tooltipY = s.shapeY;

  let bufferX = 60;
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

  // if (window.innerWidth < 600) {
  //   tooltipX = 10;
  //   tooltipY = m.mapHeight + 310;
  // }

  return {
    x: m.parentBBox.left + tooltipX + window.scrollX,
    y: m.parentBBox.top + tooltipY + window.scrollY,
  };
};

export default tooltipPlacement;
