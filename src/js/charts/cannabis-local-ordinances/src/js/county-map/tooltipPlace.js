/**
 * Build Place tooltip HTML
 * @param {object} data
 * @param {object} props
 * @param {string} tooltipElement
 * @returns {string} - HTML markup
 */
function chartTooltipPlace(data, props, options) {
  let { name, geoid } = options;
  let message = placeStatusTooltipMessage(data, props, options);
  let currentPlaceData = data.dataPlaces[options.name];
  let currentPlaceName = Object.keys(data.dataPlaces).filter((place) => {
    let item = data.dataPlaces[place];
    if (
      geoid === item["GEOID"]  &&
      item["Jurisdiction Type"] === "City" &&
      place !== "default"
    ) {
      return place;
    }
  });
  // console.log("DP", name, geoid, currentPlaceName, data.dataPlaces,currentPlaceData);
  let tooltipContent = `<div class="cagov-map-tooltip tooltip-container">
          <div class="close-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.43201 17.568C6.74401 17.88 7.25201 17.88 7.56501 17.568L12 13.133L16.435 17.568C16.747 17.88 17.255 17.88 17.568 17.568C17.881 17.256 17.88 16.748 17.568 16.435L13.133 12L17.568 7.565C17.88 7.253 17.88 6.745 17.568 6.432C17.256 6.119 16.748 6.12 16.435 6.432L12 10.867L7.56501 6.432C7.25301 6.12 6.74501 6.12 6.43201 6.432C6.11901 6.744 6.12001 7.252 6.43201 7.565L10.867 12L6.43201 16.435C6.12001 16.747 6.12001 17.255 6.43201 17.568Z" fill="black"/>
          </svg>
          </div>
          <div class="county-tooltip">
            <h3>${currentPlaceName}</h3>
              <div class="tooltip-label">
                ${message}
              </div>
          </div>
        </div>`;
  return tooltipContent;
}

/**
 * Get message for tooltip content.
 * @param {object} data
 * @param {object} props
 * @returns {string} - HTML markup for tooltip content.
 */
function placeStatusTooltipMessage(data, props, options) {
  let { prohibitionStatus } = props;
  let { name, geoid } = options;
  let { activities, showPlaces, showCounties } = data;
  let mode = activities;
  console.log("tooltip");
  let { prohibited, allowed, detailsCTA } =
    getToolTipMessages(data, name, props, "City");

  data.tooltipData = getPlaceTooltipData(data, props);

  let label = "";

  label = insertValueIntoSpanTag(label, mode, "data-status");

  let icon = "";

  if (prohibitionStatus === "Yes") {
    icon = prohibitedIcon();
    label = insertValueIntoSpanTag(prohibited, mode, "data-status");
  } else if (prohibitionStatus === "No") {
    icon = allowedIcon();
    label = insertValueIntoSpanTag(allowed, mode, "data-status");
  }

  let output = `<div>
          <div class="status">
            <div class="icon">${icon}</div>
            <div>
              ${label}
            </div> 
          </div>
          <div>
            <p>
              <a 
              class="loadPlace" 
              data-jurisdiction="Place" 
              data-geoid="${geoid}" 
              href="#city-view?geoid=${geoid}">
                ${detailsCTA}
              </a>
            </p>
          </div>
        </div>`;

  return output;
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
 * Get data used in county tooltip.
 * @param {*} data
 * @param {*} props
 * @returns {object} - object with various data attributes to be used in tooltip template.
 */
function getPlaceTooltipData(data, props) {
  let { dataPlaces, selectedCounty } = data;
  let { name } = props;

  data.mapStatusColors = {
    Yes: "#CF5028", // Orange
    No: "#2F4C2C", // Green
  };
  // console.log("NS", name, selectedCounty, dataPlaces[name]["County"]);
  // Get couny data object from dataTables.
  let currentPlaceName = Object.keys(dataPlaces).filter((place) => {
    let item = dataPlaces[place];

    if (
      name === item["CA Places Key"] &&
      item["Jurisdiction Type"] === "City" &&
      place !== "default"
      // &&
      // item["County"] === selectedCounty
    ) {
      return place;
    }
  });

  // console.log("currentPlaceName", currentPlaceName);
  let placeData = dataPlaces[currentPlaceName];
  try {
    let prohibitionStatus = placeData["Are all CCA activites prohibited?"];

    // let activityPercentages = getActivityPercentages(data, props);

    return {
      name: name,
      "County label": placeData["County label"],
      prohibitionStatus: prohibitionStatus,
      // activityPercentages,
    };
  } catch (error) {
    console.error(error);
  }
}

function getToolTipMessages(data, name, props, jurisdiction) {
  let { messages, activities } = data;
  console.log("jur", jurisdiction);
  let mode = activities;
  if (mode === "Any cannabis business" && jurisdiction === "County") {
    console.log("county");
    return messages["TooltipCountyAllActivities"];
    
  } else if (mode === "Any cannabis business" && jurisdiction === "City") {
    console.log("city");
    return messages["TooltipPlaceAllActivities"];
  } else {
    console.log("else");
    if (jurisdiction === "County") {
      return messages["TooltipCountyActivity"];
    } else if (jurisdiction === "City") {
      return messages["LegendPlaceActivity"];
    }
  }
  return null;
}

/**
 *
 * @param {*} data - data object
 * @param {*} props - local data values for rendering in template
 * @returns {integer} Percentage allowed 0 - 100
 */
function getActivityPercentages(data, props) {
  let { name, geoid } = props;
  let activityCountValues = data.countyList[name].countsValues;
  let mode = data.activities;

  let percentageAllowed, percentageProhibited;
  if (mode === "Any cannabis business") {
    percentageAllowed =
      parseFloat(
        activityCountValues["Are all CCA activites prohibited?"]["No"]
      ) / parseFloat(data.countyList[name].activities["Datasets for County"]);

    percentageProhibited =
      parseFloat(
        activityCountValues["Are all CCA activites prohibited?"]["Yes"]
      ) / parseFloat(data.countyList[name].activities["Datasets for County"]);
  } else if (mode === "Retail") {
    percentageAllowed =
      parseFloat(activityCountValues["Is all retail prohibited?"]["No"]) /
      parseFloat(data.countyList[name].activities["Datasets for County"]);

    percentageProhibited =
      parseFloat(activityCountValues["Is all retail prohibited?"]["Yes"]) /
      parseFloat(data.countyList[name].activities["Datasets for County"]);
  } else {
    let allowedValues =
      activityCountValues[mode]["Allowed"] +
      activityCountValues[mode]["Allowed"] +
      activityCountValues[mode]["Limited-Medical Only"];

    percentageAllowed =
      parseFloat(allowedValues) /
      parseFloat(data.countyList[name].activities["Datasets for County"]);

    percentageProhibited =
      parseFloat(activityCountValues[mode]["Prohibited"]) /
      parseFloat(data.countyList[name].activities["Datasets for County"]);
  }

  return {
    allowed: formatPercent(percentageAllowed),
    prohibited: formatPercent(percentageProhibited),
  };
}
/**
 * Convert float to percentage
 * @param {float} value
 * @returns {string} Percentage value
 */
function formatPercent(value) {
  // @TODO Check if is a number
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

export { chartTooltipPlace, getPlaceTooltipData };
