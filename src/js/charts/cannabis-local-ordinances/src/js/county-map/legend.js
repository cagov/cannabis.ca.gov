/**
 * Build County tooltip HTML
 * @param {object} data
 * @param {object} props
 * @param {string} tooltipElement
 * @returns {string} - HTML markup
 */
function chartLegendStatewide(data, props) {
  let allowed = data.messages.LegendStatewide.allowed;
  let prohibited = data.messages.LegendStatewide.prohibited;
  let labelAllowed = data.messages.LegendStatewide.labelAllowed;
  let labelProhibited = data.messages.LegendStatewide.labelProhibited;
  if (data.activities !== "Any cannabis business") {
    allowed = data.messages.LegendStatewideActivity.allowed;
    prohibited = data.messages.LegendStatewideActivity.prohibited;
    labelAllowed = data.messages.LegendStatewideActivity.labelAllowed;
    labelProhibited = data.messages.LegendStatewideActivity.labelProhibited;
  }

  let percentages = getActivityPercentagesStatewide(data, props);

  let allowedLabel = insertValueIntoSpanTag(
    allowed,
    percentages.allowedPercentage,
    "data-status"
  );
  let prohibitedLabel = insertValueIntoSpanTag(
    prohibited,
    percentages.prohibitedPercentage,
    "data-status"
  );

  let labelAllowedProcessed = insertValueIntoSpanTag(
    labelAllowed,
    data.activities.toLowerCase(),
    "data-activity"
  );

  let labelProhibitedProcessed = insertValueIntoSpanTag(
    labelProhibited,
    data.activities.toLowerCase(),
    "data-activity"
  );

  let content = `<div class="cagov-map-legend legend-container">
          
          <div class="status">
            <div class="icon">${allowedIcon()}</div>
            <div class="status-label">
              <div>${allowedLabel}</div>
            </div> 
          </div>

          <div class="legend-label">${labelAllowedProcessed}</div>
          
          <div class="status">
            <div class="icon">${prohibitedIcon()}</div>
            <div class="status-label">
              <div>${prohibitedLabel}</div>
            </div>     
          </div>
          
          <div class="legend-label">${labelProhibitedProcessed}</div>

      </div>`;
  return content;
}

function chartLegendCounty(data, props, renderMode) {
  let messages = data.messages.LegendCounty;
  if (data.activities !== "Any cannabis business") {
    messages = data.messages.LegendCountyActivity;
  } 

  let {
    allowed,
    prohibited,
    singleAllowed,
    singleProhibited,
    unincorporatedAllowed,
    unincorporatedProhibited,
    allAllowedNoPlaces,
    allProhibitedNoPlaces,
    allPlacesAllCountyAllowed,
    allPlacesAllCountyProhibited,
  } = messages;

  let countyData = getBusinessTypeStatsCounty(data, props, renderMode);
  
  let countyLabel, currentCounty;

  if (renderMode === "legend") {
    countyLabel = data.countyList[data.selectedCounty].label;
    currentCounty = data.dataPlaces[countyLabel];
  } else {
    countyLabel = data.countyList[props.name].label;
    currentCounty = data.dataPlaces[countyLabel];
  }
  
  let isAllowed = null;

  if (currentCounty["Are all CCA activites prohibited?"] === "Yes") {
    isAllowed = false;
  } else {
    isAllowed = true;
  }

  let unincorporatedLabel = "";
  let showAllowed = true;
  let showProhibited = true;
  let showUnincorporated = true;

  console.log(countyData);
  if (countyData.allowed > 1 && countyData.prohibited > 1) {
    console.log("a 1", allowed);
    showAllowed = true;
    showProhibited = true;
  } else if (countyData.allowed === 1 && countyData.prohibited > 1) {
    console.log("a 1");
    allowed = singleAllowed;
    showAllowed = true;
    showProhibited = true;
  } else if (countyData.allowed > 1 && countyData.prohibited === 1) {
    console.log("a 1");
    prohibited = singleProhibited;
    showAllowed = true;
    showProhibited = true;
  } else if (countyData.allowed === 0 && countyData.prohibited > 1) {
    console.log("c 4");
    allowed = "";
    showAllowed = false;
    showProhibited = true;
  } else if (countyData.allowed === 0 && countyData.prohibited === 1) {
    console.log("c 10");
    allowed = "";
    prohibited = singleProhibited;
    showAllowed = false;
    showProhibited = true;
  } else if (countyData.allowed === 1 && countyData.prohibited === 0) {
    console.log("c 11");
    allowed = singleAllowed;
    prohibited = "";
    showAllowed = true;
    showProhibited = false;
  } else if (countyData.allowed === 1 && countyData.prohibited === 1) {
    console.log("c 12");
    allowed = singleAllowed;
    prohibited = singleProhibited;
    showAllowed = true;
    showProhibited = true;
  } else if (countyData.allowed > 1 && countyData.prohibited === 0) {
    console.log("a 2");
    prohibited = "";
    showAllowed = true;
    showProhibited = false;
  } else if (countyData.allowed === 0 && countyData.prohibited === 0) {
    console.log("c 6");
    if (isAllowed) {
      console.log("c 7");
      allowed = allAllowedNoPlaces;
      prohibited = "";
      showProhibited = false;
      showUnincorporated = false;
    } else {
      console.log("c 8");
      allowed = "";
      prohibited = allProhibitedNoPlaces;
      showUnincorporated = false;
      showAllowed = false;
    }
  }

  
  let allowedLabel = insertValueIntoSpanTag(
    allowed,
    countyData.allowed,
    "data-status"
  );

  let prohibitedLabel = insertValueIntoSpanTag(
    prohibited,
    countyData.prohibited,
    "data-status"
  );

  allowedLabel = insertValueIntoSpanTag(
    allowedLabel,
    data.activities,
    "data-activity"
  );

  prohibitedLabel = insertValueIntoSpanTag(
    prohibitedLabel,
    data.activities,
    "data-activity"
  );

  allowedLabel = insertValueIntoSpanTag(
    allowedLabel,
    data.activities.toLowerCase(),
    "data-activity-lc"
  );

  prohibitedLabel = insertValueIntoSpanTag(
    prohibitedLabel,
    data.activities.toLowerCase(),
    "data-activity-lc"
  );

  if (isAllowed) {
    unincorporatedLabel = insertValueIntoSpanTag(
      unincorporatedAllowed,
      data.activities,
      "data-activity"
    );

    unincorporatedLabel = `<div class="status">
    <div class="icon">${allowedIcon()}</div>
    <div class="status-label">
      <div>${unincorporatedLabel}</div>
    </div>`;

  } else {
    unincorporatedLabel = insertValueIntoSpanTag(
      unincorporatedProhibited,
      data.activities,
      "data-activity"
    );

    unincorporatedLabel = `<div class="status">
    <div class="icon">${prohibitedIcon()}</div>
    <div class="status-label">
      <div>${unincorporatedLabel}</div>
    </div>`;
  }

  let statusMessageAllowed = `<div class="status">
    <div class="icon">${allowedIcon()}</div>
    <div class="status-label">
    <div>${allowedLabel}</div>
    </div> 
    </div>`;

  let statusMessageProhibited = `<div class="status">
    <div class="icon">${prohibitedIcon()}</div>
    <div class="status-label">
      <div>${prohibitedLabel}</div>
    </div>`;

  let content = `<div class="cagov-map-legend legend-container">
          ${showAllowed ? statusMessageAllowed : ""}
          ${showProhibited ? statusMessageProhibited : ""}
        </div>
        ${showUnincorporated ? unincorporatedLabel : ""}
      </div>`;
  return content;
}

function chartLegendPlace(data, props) {
  let messages = data.messages.LegendPlace;
  if (data.activities !== "Any cannabis business") {
    messages = data.messages.LegendPlaceActivity;
  } 

  let allowed = messages.allowed;
  let prohibited = messages.prohibited;
  
  let isAllowed = getActivityPercentagesPlace(data, props);

  let allowedLabel = insertValueIntoSpanTag(
    allowed,
    data.activities,
    "data-status"
  );

  let prohibitedLabel = insertValueIntoSpanTag(
    prohibited,
    data.activities,
    "data-status"
  );

  let contentAllowed = `<div class="cagov-map-legend legend-container">
          <div class="status">
            <div class="icon">${allowedIcon()}</div>
            <div>
              <div>${allowedLabel}</div>
            </div> 
          </div>
      </div>`;
  let contentProhibited = `<div class="cagov-map-legend legend-container">
      <div class="status">
          <div class="icon">${prohibitedIcon()}</div>
          <div>
            <div>${prohibitedLabel}</div>
          </div> 
        </div>
  </div>`;

  let content = "";

  if (isAllowed === true) {
    content = contentAllowed;
  } else if (isAllowed === false) {
    content = contentProhibited;
  }
  return content;
}

function insertValueIntoSpanTag(string, value, prop) {
  var parser = new DOMParser();
  var el = parser.parseFromString(string, "text/html");
  let span = el.querySelector("span[" + prop + "]");
  if (span !== null) {
    span.innerHTML = value;
    return el.querySelector("body").innerHTML;
  }
  return string;
}

/**
 *
 * @param {*} data - data object
 * @returns {object} Percentage allowed 0 - 100
 */
function getActivityPercentagesStatewide(data) {
  let countValues = {
    allowed: 0,
    prohibited: 0,
  };
  let currentCountyPlaceName = Object.keys(data.dataPlaces).filter((place) => {
    let item = data.dataPlaces[place];
    let mode = data.activities;
    if (mode === "Any cannabis business") {
      if (item["Are all CCA activites prohibited?"] === "Yes") {
        countValues.prohibited = countValues.prohibited + 1;
      } else if (item["Are all CCA activites prohibited?"] === "No") {
        countValues.allowed = countValues.allowed + 1;
      }
    } else if (mode === "Retail") {
      if (item["Is all retail prohibited?"] === "Yes") {
        countValues.prohibited = countValues.prohibited + 1;
      } else if (item["Is all retail prohibited?"] === "No") {
        countValues.allowed = countValues.allowed + 1;
      }
    } else {
      if (item[mode] === "Prohibited") {
        countValues.prohibited = countValues.prohibited + 1;
      } else if (item[mode] !== "Prohibited") {
        countValues.allowed = countValues.allowed + 1;
      }
    }
  });
  countValues.count = countValues.prohibited + countValues.allowed;
  countValues.allowedPercentage = formatPercent(
    countValues.allowed / countValues.count
  );
  countValues.prohibitedPercentage = formatPercent(
    countValues.prohibited / countValues.count
  );

  return countValues;
}

/**
 *
 * @param {*} data - data object
 * @returns {object} Percentage allowed 0 - 100
 */
function getBusinessTypeStatsCounty(data, props, renderMode) {

  let countValues = {
    allowed: 0,
    prohibited: 0,
    countyAllowed: 0,
    countyProhibited: 0,
    count: 0,
    allowedPercentage: 0,
    prohibitedPercentage: 0,
  };

  // console.log(data, props, renderMode);
  let item, placeData, countyLabel, countyData;
  let mode = data.activities;

  if (renderMode === "tooltip") {
    // console.log( data.countyList, props);
    item = data.countyList[props.name].activities;
    placeData = data.dataPlaces[props["County label"]];
    countyData = data.dataPlaces[props["County label"]];
  } else {
    item = data.countyList[data.selectedPlaceValue].activities;
    placeData = data.dataPlaces[data.selectedPlaceValue];
    countyLabel = data.countyList[data.selectedPlaceValue].label;
    countyData = data.dataPlaces[countyLabel];
  }

  // @TODO Discount the uninc place from these counts.
  try {
    if (mode === "Any cannabis business") {
      countValues.prohibited = item["Are all CCA activites prohibited?"]["Yes"].length;
      countValues.allowed = item["Are all CCA activites prohibited?"]["No"].length;
      if (countyData["Are all CCA activites prohibited?"] === "No" ) {
        countValues.countyAllowed = 1;
      } else if (countyData["Are all CCA activites prohibited?"] === "Yes" ) {
        countValues.countyProhibited = 1;
      }
    } else if (mode === "Retail") {
      console.log("retail");

      countValues.prohibited = item["Is all retail prohibited?"]["Yes"].length;
      countValues.allowed = item["Is all retail prohibited?"]["No"].length;
      if (countyData["Is all retail prohibited?"] === "No" ) {
        countValues.countyAllowed = 1;
      } else if (countyData["Is all retail prohibited?"] === "Yes" ) {
        countValues.countyProhibited = 1;
      }

    } else {
      
      // if (item[mode] === "Prohibited") {
        countValues.prohibited = item[mode]["Prohibited"].length;
      // } else if (item[mode] !== "Prohibited") {
        countValues.allowed = item[mode]["Allowed"].length + item[mode]["Limited"].length + item[mode]["Limited-Medical Only"].length;
      // }

      if (countyData[mode] !== "Prohibited") {
        countValues.countyAllowed = 1;
      } else {
        countValues.countyProhibited = 1;
      }
    }

    countValues.count = countValues.prohibited + countValues.allowed;

    if (countyData) {

    }

    countValues.allowedPercentage = formatPercent(
      countValues.allowed / countValues.count
    );

    countValues.prohibitedPercentage = formatPercent(
      countValues.prohibited / countValues.count
    );
    // console.log(countValues);
  } catch (error) {
    console.error(error);
  }

  return countValues;
}

/**
 *
 * @param {*} data - data object
 * @returns {object} Percentage allowed 0 - 100
 */
function getActivityPercentagesPlace(data) {
  let countValues = {
    allowed: 0,
    prohibited: 0,
  };
  let item = data.selectedPlace; //data.dataPlaces[data.selectedPlace];
  let mode = data.activities;
  // console.log(mode, item);
  if (item !== undefined) {
    if (mode === "Any cannabis business") {
      if (item["Are all CCA activites prohibited?"] === "Yes") {
        return false;
      } else if (item["Are all CCA activites prohibited?"] === "No") {
        return true;
      }
    } else if (mode === "Retail") {
      if (item["Is all retail prohibited?"] === "Yes") {
        return false;
      } else if (item["Is all retail prohibited?"] === "No") {
        return true;
      }
    } else {
      if (item[mode] === "Prohibited") {
        // console.log("f", mode);
        return false;
      } else if (item[mode] !== "Prohibited") {
        //  console.log("t", mode);
        return true;
      }
    }
  }
  return null;
}

/**
 * Convert float to percentage
 * @param {float} value
 * @returns {string} Percentage value
 */
function formatPercent(value) {
  // console.log(value);
  // @TODO Check if is a number
  if (isNaN(value)) {
    return "0";
  }
  value = (value * 100).toFixed(0) + "%";
  return value;
}

function allowedIcon() {
  return `<svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.061 4.375C5.64104 4.375 0.436035 9.58 0.436035 16C0.436035 22.42 5.64104 27.625 12.061 27.625C18.481 27.625 23.686 22.42 23.686 16C23.686 9.58 18.481 4.375 12.061 4.375ZM17.446 12.784L11.878 21.295C11.877 21.296 11.874 21.298 11.874 21.299C11.845 21.343 11.829 21.392 11.793 21.433C11.742 21.488 11.677 21.517 11.619 21.559C11.604 21.569 11.59 21.581 11.574 21.591C11.484 21.648 11.391 21.685 11.289 21.71C11.256 21.719 11.225 21.727 11.19 21.733C11.107 21.745 11.029 21.745 10.946 21.736C10.888 21.732 10.833 21.724 10.776 21.71C10.718 21.694 10.664 21.669 10.609 21.643C10.563 21.621 10.513 21.615 10.47 21.588C10.438 21.568 10.421 21.536 10.393 21.511C10.381 21.501 10.367 21.498 10.355 21.488L7.11304 18.49C6.70004 18.108 6.67604 17.464 7.05604 17.053C7.43604 16.642 8.08004 16.616 8.49304 16.996L10.84 19.167L15.744 11.67C16.052 11.201 16.681 11.068 17.152 11.375C17.623 11.683 17.755 12.314 17.447 12.783L17.446 12.784Z" fill="#2F4C2C"/>
      </svg>
      `;
}

function prohibitedIcon() {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.738 1.6748C6.62903 1.6748 1.67603 6.6278 1.67603 12.7368C1.67603 18.8458 6.62903 23.7988 12.738 23.7988C18.847 23.7988 23.8 18.8458 23.8 12.7368C23.8 6.6278 18.847 1.6748 12.738 1.6748ZM17.863 8.6548L13.752 12.7658L17.389 16.8208C17.677 17.1088 17.677 17.5758 17.389 17.8638C17.101 18.1518 16.634 18.1518 16.346 17.8638L12.709 13.8088L8.65403 17.8638C8.36603 18.1518 7.89903 18.1518 7.61103 17.8638C7.32303 17.5758 7.32303 17.1088 7.61103 16.8208L11.722 12.7098L8.08503 8.6548C7.79703 8.3668 7.79703 7.89981 8.08503 7.6118C8.37303 7.3238 8.84003 7.3238 9.12803 7.6118L12.765 11.6668L16.82 7.6118C17.108 7.3238 17.575 7.3238 17.863 7.6118C18.151 7.89981 18.151 8.3668 17.863 8.6548Z" fill="#CF5028"/>
      </svg>
      `;
}

export { chartLegendStatewide, chartLegendCounty, chartLegendPlace };
