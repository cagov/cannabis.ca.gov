import * as d3 from "d3";





const scaleCounty = (el, data, county, rawWidth, rawHeight, domElement, island = null ) => {
  // Get county scale
  var bbox = el.node().getBBox();

  // get all bboxes includeing for islands

  var dx = bbox.width - bbox.x,
    dy = bbox.height - bbox.y,
    x = (bbox.x + (bbox.x + bbox.width)) / 2,
    y = (bbox.y + (bbox.y + bbox.height)) / 2,
    scale = Math.min(rawHeight / bbox.height, rawWidth / bbox.width) - 3,
    translate = [(rawWidth / 2 - scale * x), (rawHeight / 2 - scale * y)];

  data.selectedShapeData = {
    bbox,
    dx,
    dy,
    scale,
    x,
    y,
    translate,
  };

  // d3.select(domElement).attr("viewbox", "0 0 100 100");

  d3.select("[data-layer-name=interactive-map-container]")
  // .attr("viewBox", "0 412 800 923 ")
  // .attr("height", rawHeight)
  ;


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
