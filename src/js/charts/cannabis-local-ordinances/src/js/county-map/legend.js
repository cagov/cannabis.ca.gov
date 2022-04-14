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
    data.activities,
    "data-activity"
  );

  let labelProhibitedProcessed = insertValueIntoSpanTag(
    labelProhibited,
    data.activities,
    "data-activity"
  );

  let content = `<div class="cagov-map-legend legend-container">
          <div class="legend-label">${labelAllowedProcessed}</div>
          <div class="status">
            <div class="icon">${allowedIcon()}</div>
            <div class="status-label">
              <div>${allowedLabel}</div>
            </div> 
          </div>
          <div class="legend-label">${labelProhibitedProcessed}</div>
          <div class="status">
          <div class="icon">${prohibitedIcon()}</div>
          <div class="status-label">
            <div>${prohibitedLabel}</div>
          </div> 
        </div>
      </div>`;
  return content;
}

function chartLegendCounty(data, props) {
  let countyData = getActivityPercentagesCounty(data, props);
  let isAllowed = null;
  console.log("cd", countyData);
  if (countyData.allowed > 1) {
    isAllowed = true;
  } else {
    isAllowed = false;
  }

  let percentages = getActivityPercentagesCounty(data, props);
  // @TODO tomorrow
  // Get if county is
  // Get numbers of cities (new function)

  let messages = data.messages.LegendCounty;

  if (data.activities !== "Any cannabis business") {
    messages = data.messages.LegendCountyActivity;
  }

  let {
    labelAllowed,
    labelProhibited,
    allowed,
    prohibited,
    unincorporatedAllowed,
    unincorporatedProhibited,
    allowedNoResults,
    prohibitedNoResults
  } = messages;
  
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
    data.activities.toLowerCase(),
      "data-activity"
    );
  prohibitedLabel = insertValueIntoSpanTag(
    prohibitedLabel,
    data.activities.toLowerCase(),
      "data-activity"
  );

  let countyLabel = "";
  let unincorporatedLabel = "";
  if (isAllowed) {
    countyLabel = insertValueIntoSpanTag(
      labelAllowed,
      data.activities,
      "data-activity"
    );
    unincorporatedLabel = insertValueIntoSpanTag(
      unincorporatedAllowed,
      data.activities,
      "data-activity"
    );
  } else {
    countyLabel = insertValueIntoSpanTag(
      labelProhibited,
      data.activities,
      "data-activity"
    );

    unincorporatedLabel = insertValueIntoSpanTag(
      unincorporatedProhibited,
      data.activities,
      "data-activity"
    );
    
    
  }

  let content = `<div class="cagov-map-legend legend-container">
          <div class="legend-label">${countyLabel}</div>
          <div class="status">
            <div class="icon">${allowedIcon()}</div>
            <div class="status-label">
              <div>${allowedLabel}</div>
            </div> 
          </div>
          <div class="status">
          <div class="icon">${prohibitedIcon()}</div>
          <div class="status-label">
            <div>${prohibitedLabel}</div>
          </div> 
          
        </div>
        <div>${unincorporatedLabel}</div>
      </div>`;
  return content;
}

function chartLegendPlace(data, props) {
  let allowed = data.messages.LegendPlace.allowed;
  let prohibited = data.messages.LegendPlace.prohibited;
  let isAllowed = getActivityPercentagesPlace(data, props);

  if (data.activities !== "Any cannabis business") {
    allowed = data.messages.LegendPlaceActivity.allowed;
    prohibited = data.messages.LegendPlaceActivity.prohibited;
  }

  // let message = countyStatusTooltipMessage(data, props);
  let message = "State";

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
function getActivityPercentagesCounty(data) {
  let countValues = {
    allowed: 0,
    prohibited: 0,
    count: 0,
    allowedPercentage: 0,
    prohibitedPercentage: 0,
  };
  let item = data.countyList[data.selectedPlaceValue].activities;
  let mode = data.activities;
  // console.log("mode", mode, item);
  try {
    if (mode === "Any cannabis business") {
      countValues.prohibited =
        item["Are all CCA activites prohibited?"]["Yes"].length;
      countValues.allowed =
        item["Are all CCA activites prohibited?"]["No"].length;
    } else if (mode === "Retail") {
      countValues.prohibited = item["Is all retail prohibited?"]["Yes"].length;
      countValues.allowed = item["Is all retail prohibited?"]["No"].length;
    } else {
      if (item[mode] === "Prohibited") {
        countValues.prohibited = item[mode]["Prohibited"].length;
      } else if (item[mode] !== "Prohibited") {
        countValues.allowed =
          item[mode]["Allowed"].length +
          item[mode]["Limited"].length +
          item[mode]["Limited-Medical Only"].length;
      }
    }

    countValues.count = countValues.prohibited + countValues.allowed;
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
