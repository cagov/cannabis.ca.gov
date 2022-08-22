import * as d3 from "d3";

/**
 * Scale SVG based on bounding box for a set of shapes
 * @param {*} el
 * @param {*} data
 * @param {*} county
 * @param {*} rawWidth of SVG
 * @param {*} rawHeight of SVG
 * @param {*} mapElement
 * @param {*} scaleLayer
 * @param {*} island
 * @param {*} shapes Array of SVG shape elements
 * @param {*} viewBox Width, Height and translation values of scaled SVG container
 */
const scaleCounty = (
  el,
  data,
  county,
  rawWidth,
  rawHeight,
  mapElement,
  scaleLayer = "svg [data-layer-name=interactive-map]",
  island = null,
  shapes = "selectedCountyIslands",
  viewBox = "0,250,500,500"
) => {
  // Get county scale of the current element
  var bbox = el.node().getBBox();
  var viewportElement = document.documentElement;
  var box = el.node().getBoundingClientRect();
  var scrollLeft = viewportElement.scrollLeft;
  var scrollTop = viewportElement.scrollTop;
  var x = box.left + scrollLeft;
  var y = box.top + scrollTop;

  let maxBBox = {
    x: bbox.x,
    y: bbox.y,
    width: bbox.width,
    height: bbox.height,
    top: y,
    left: x,
  };

  // Calculate max bounds for any shape in list of related shapes.
  data[shapes].forEach((keyEl) => {
    var bbox = keyEl.node().getBBox();
    var box = keyEl.node().getBoundingClientRect(); // Wait was this a box for?
    var left = box.left + scrollLeft;
    var top = box.top + scrollTop;
    bbox.left = left;
    bbox.top = top;
    maxBBox.x = bbox.x > maxBBox.x ? bbox.x : maxBBox.x;
    maxBBox.y = bbox.y > maxBBox.y ? bbox.y : maxBBox.y;
    maxBBox.width = bbox.width > maxBBox.width ? bbox.width : maxBBox.width;
    maxBBox.height =
      bbox.height > maxBBox.height ? bbox.height : maxBBox.height;
    maxBBox.top = top > maxBBox.top ? top : maxBBox.top;
    maxBBox.left = left > maxBBox.left ? left : maxBBox.left;
  });

  // console.log(maxBBox);
  // Figure out what scale this shape is at and where it's located.
  var dx = bbox.width - bbox.x,
    dy = bbox.height - bbox.y,
    x = (bbox.x + (bbox.x + bbox.width)) / 2,
    y = (bbox.y + (bbox.y + bbox.height)) / 2,
    scale = Math.min(260 / maxBBox.width, 260 / maxBBox.height) ,
    translate = [rawWidth / 2 - scale * x - 150, rawHeight / 2 - scale * y];

  let aspectRatio = maxBBox.height / maxBBox.width;

  data.selectedShapeData = {
    bbox,
    maxBBox,
    dx,
    dy,
    scale,
    x,
    y,
    translate,
    viewBox,
    aspectRatio,
    scaleLayer,
    mapElement: data.self.mapElement
  };
  // console.log(data.selectedShapeData);
  updateSVGContainer(data, scaleLayer);
};

/**
 * Re-draw scaled SVG container.
 * @param {*} data 
 * @param {*} scaleLayer 
 */
const updateSVGContainer = (data) => {
  d3.select("[data-layer-name=interactive-map-container]").attr(
    "viewBox",
    `${data.selectedShapeData.viewBox}`
  );
  // Scale the container
  const containerEl = d3.select(
    data.selectedShapeData.mapElement + " " + data.selectedShapeData.scaleLayer
  );
  containerEl.attr(
    "transform",
    "translate(" +
      data.selectedShapeData.translate +
      ")scale(" +
      data.selectedShapeData.scale +
      ")"
  );
};

export { scaleCounty };
