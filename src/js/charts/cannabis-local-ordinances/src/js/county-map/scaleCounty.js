import * as d3 from "d3";





const scaleCounty = (el, data, county, rawWidth, rawHeight, domElement, island = null ) => {
  // Get county scale
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

 
  // console.log("data.selectedCountyIslands", data.selectedCountyIslands);
  data.selectedCountyIslands.forEach((keyEl) => {
    console.log(keyEl);
    var bbox = keyEl.node().getBBox();
    var box = keyEl.node().getBoundingClientRect();
    var left = box.left + scrollLeft;
    var top = box.top + scrollTop;
    console.log(top, left);



    maxBBox.x = bbox.x > maxBBox.x ? bbox.x : maxBBox.x; 
    maxBBox.y = bbox.y > maxBBox.y ? bbox.y : maxBBox.y; 
    maxBBox.width = bbox.width > maxBBox.width ? bbox.width : maxBBox.width; 
    maxBBox.height = bbox.height > maxBBox.height ? bbox.height : maxBBox.height; 
    
    maxBBox.top = top > maxBBox.top ? top : maxBBox.top; 
    maxBBox.left = left > maxBBox.left ? left : maxBBox.left; 
    console.log(bbox, maxBBox);
  });

  var dx = bbox.width - bbox.x,
    dy = bbox.height - bbox.y,
    x = (bbox.x + (bbox.x + bbox.width)) / 2,
    y = (bbox.y + (bbox.y + bbox.height)) / 2,
    scale = Math.min(rawHeight / bbox.height, rawWidth / bbox.width) - 4,
    translate = [(rawWidth / 2 - scale * x), ((rawHeight / 2) - (scale * y) )];

  // var dx = maxBBox.width - maxBBox.x,
  // dy = maxBBox.height - maxBBox.y,
  // x = (maxBBox.x + (maxBBox.x + maxBBox.width)) / 2,
  // y = (maxBBox.y + (maxBBox.y + maxBBox.height)) / 2,
  // scale = Math.min(rawHeight / maxBBox.height, rawWidth / maxBBox.width) - 3,
  // translate = [(rawWidth / 2 - scale * x), ((rawHeight / 2) - (scale * y) )];

  data.selectedShapeData = {
    bbox,
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

  d3.select("[data-layer-name=interactive-map-container]")
  .attr("viewBox",  `0,${rawHeight*aspectRatio / 3 - 200},${rawWidth},${rawHeight*aspectRatio}`);




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
