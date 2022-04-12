import * as d3 from "d3";

/**
 * Scale SVG based on bounding box for county
 * @param {*} el 
 * @param {*} data 
 * @param {*} county 
 * @param {*} rawWidth of SVG
 * @param {*} rawHeight of SVG
 * @param {*} domElement 
 * @param {*} island 
 */
const scaleCounty = (el, data, county, rawWidth, rawHeight, domElement, island = null ) => {
  // Get county scale of the current element
  // Some counties have extra elements, so d3 iterator doesn't capture them.
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

  console.log("data.selectedCountyIslands", data.selectedCountyIslands);

  // (TRY) to calculate max bounds
  data.selectedCountyIslands.forEach((keyEl) => {
    var bbox = keyEl.node().getBBox();
    var box = keyEl.node().getBoundingClientRect(); // Wait was this a box for?
    var left = box.left + scrollLeft;
    var top = box.top + scrollTop;
    bbox.left = left;
    bbox.top = top;

    console.log("bbox", bbox, bbox.left);

    maxBBox.x = bbox.x > maxBBox.x ? bbox.x : maxBBox.x; 
    maxBBox.y = bbox.y > maxBBox.y ? bbox.y : maxBBox.y; 
    maxBBox.width = bbox.width > maxBBox.width ? bbox.width : maxBBox.width; 
    maxBBox.height = bbox.height > maxBBox.height ? bbox.height : maxBBox.height; 
    maxBBox.top = top > maxBBox.top ? top : maxBBox.top; 
    maxBBox.left = left > maxBBox.left ? left : maxBBox.left; 

    console.log("maxBBox", maxBBox, maxBBox.left);
  });

  // This sets the primary bounding box.
  // var dx = bbox.width - bbox.x,
  //   dy = bbox.height - bbox.y,
  //   x = (bbox.x + (bbox.x + bbox.width)) / 2,
  //   y = (bbox.y + (bbox.y + bbox.height)) / 2,
  //   scale = Math.min(rawHeight / bbox.height, rawWidth / bbox.width),
  //   translate = [(rawWidth / 2 - scale * x), ((rawHeight / 2) - (scale * y) )];

  
  var dx = maxBBox.width - maxBBox.x,
  dy = maxBBox.height - maxBBox.y,
  x = (maxBBox.x + (maxBBox.x + maxBBox.width)) / 2,
  y = (maxBBox.y + (maxBBox.y + maxBBox.height)) / 2,
  scale = Math.min(rawHeight / maxBBox.height, rawWidth / maxBBox.width),
  translate = [(rawWidth / 2 - scale * x), ((rawHeight / 2) - (scale * y) )];

  data.selectedShapeData = {
    bbox,
    maxBBox,
    dx,
    dy,
    scale,
    x,
    y,
    translate,
  };

  // let aspectRatio = bbox.height/bbox.width;
  // let aspectRatio = maxBBox.height/maxBBox.width;
  // console.log(aspectRatio);
  let aspectRatio = 1;

  console.log(bbox);

  // d3.select("[data-layer-name=interactive-map-container]")
  // .attr("viewBox",  `0,${rawHeight*aspectRatio / 2 - 100},${rawWidth},${rawHeight*aspectRatio}`);

  d3.select("[data-layer-name=interactive-map-container]")
  .attr("viewBox",  `0,${bbox.height / 2},${bbox.width},${bbox.height*aspectRatio}`);


  console.log("data.selectedShapeData", data.selectedShapeData);
  // Scale the county and places containerer
  const countiesGroup = d3.select(
    domElement + ' [data-name="county-boundaries"]'
  );
  countiesGroup.attr(
    "transform",
    "translate(" +
      data.selectedShapeData.translate +
      ")scale(" +
      data.selectedShapeData.scale +
      ")"
  );

  const placesGroup = d3.select(
    domElement + ' [data-name="places-boundaries"]'
  );
  placesGroup.attr(
    "transform",
    "translate(" +
      data.selectedShapeData.translate +
      ")scale(" +
      data.selectedShapeData.scale +
      ")"
  );
};

export { scaleCounty };
