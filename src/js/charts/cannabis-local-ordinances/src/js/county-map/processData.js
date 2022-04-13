function getCountyColorPlaceLevel(data, props) {
  return getCountyColor(data, props, "County");
}
function getCountyColor(data, props, jurisdiction = null) {
  // Shared data object
  let { dataPlaces } = data;
  let { name, island } = props;

  data.prohibitedStatusColors = {
    Yes: "#CF5028", // Orange
    No: "#2F4C2C", // Green
  };

  // name - Name of current county from GIS data.
  // Get county data object from dataTables.
  let currentCountyPlaceName = Object.keys(dataPlaces).filter((place) => {
    let item = dataPlaces[place];
    if (
      name === item.County &&
      item["Jurisdiction Type"] === "County" &&
      place !== "default"
    ) {
      return place;
    }
  });
  
  let values = dataPlaces[currentCountyPlaceName];
  let mode = data.activities;

  try {
    if (values !== undefined && jurisdiction === null) {
      let activityStatusColors = getActivityStatusColor(
        data,
        mode,
        values,
        "County"
      );
      return activityStatusColors;
    } else if (values !== undefined && jurisdiction !== null) {
      let activityStatusColors = getActivityStatusColor(
        data,
        mode,
        values,
        "County"
      );
      
      if (data.selectedCounty === values["County"]) {
        return activityStatusColors;
      } else {
        return "transparent";
      }
    } else {
      // console.log("CC found");
      // @QUESTION when is this run? (probably percentages or tooltips, I forget)
      // Get county and look up prohibition
      let placeData = dataPlaces[currentCountyPlaceName];
      let prohibitionStatus = placeData["CCA Prohibited by County"];
      return data.prohibitedStatusColors[prohibitionStatus];
    }
  } catch (error) {
    console.error("error", error, name);
  }
}

function getPlaceColorPlaceLevel(data, props) {
  return getPlaceColor(data, props, "County");
}

function getPlaceColor(data, props, jurisdiction = null) {
  // Shared data object
  let { dataPlaces } = data;
  let { name, geoid } = props;

  data.prohibitedStatusColors = {
    Yes: "#CF5028",
    No: "#2F4C2C",
  };

  let values = data.dataPlaces[name];

  let mode = data.activities;

  try {
    if (values !== undefined) {
      return getActivityStatusColor(data, mode, values, "City");
    } else {
      // Get county and look up prohibition
      return "transparent";
    }
  } catch (error) {
    console.error("error", error, name);
  }
  return "transparent";
}

/**
 * Get status color at county level or place level
 * @param {*} data 
 * @param {*} mode 
 * @param {*} values 
 * @param {*} renderMode
 * @returns {*} string - single Hex value
 */
function getActivityStatusColor(
  data,
  mode,
  values,
  renderMode = "County"
) {

  switch (mode) {
    case "Any cannabis business":
      return getAllActivities(data, mode, values, renderMode);
    case "Retail":
      // True === Yes it's prohibited
      if (getRetailAllowed(data, mode, values, renderMode)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Distribution":
      if (getDistributionAllowed(data, mode, values, renderMode)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Manufacturing":
      if (getManufacturingAllowed(data, mode, values, renderMode)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Testing":
      if (getTestingAllowed(data, mode, values, renderMode)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Cultivation":
      if (getCultivationAllowed(data, mode, values, renderMode)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    default:
      break;
  }
}

/**
 * 
 * @param {*} data 
 * @param {*} mode 
 * @param {*} values 
 * @returns {*} string - Hex value for coloring map county
 */
function getAllActivities(data, mode, values, renderMode) {
  let prohibitionStatus = values["CCA Prohibited by County"];
  let allActivitiesProhibited = values["Are all CCA activites prohibited?"];
  let status = null;
  if (renderMode === "County") {
    status = prohibitionStatus;
  } else {
    status = allActivitiesProhibited;
  }
  return data.prohibitedStatusColors[status];
}

/**
 * 
 * @param {*} data 
 * @param {*} mode 
 * @param {*} values 
 * @returns {boolean} - If value matches data values (currently Yes No, these could be converted props for rendering CSV to county map automatically (eventually))
 */
function getRetailAllowed(data, mode, values, renderMode) {
  let value = values["Is all retail prohibited?"];
  // Alt use both retail fields, but data at this prop should be correct.
  if (
    value === "No" // No, it's allowed
  ) {
    return true;
  } else if (value === "Yes") {
    return false;
  } else {
    return null;
  }
}

function getDistributionAllowed(data, mode, values, renderMode) {
  let value = values["Distribution"];
  if (
    value === "Allowed" ||
    value === "Limited" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } else if (value === "Prohibited") {
    return false;
  } else {
    return null;
  }
}

function getManufacturingAllowed(data, mode, values, renderMode) {
  let value = values["Manufacturing"];
  if (
    value === "Allowed" ||
    value === "Limited" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } else if (value === "Prohibited") {
    return false;
  } else {
    return null;
  }
}

function getCultivationAllowed(data, mode, values, renderMode) {
  
  let value = values["Cultivation"];
  if (
    value === "Allowed" ||
    value === "Limited" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } else if (value === "Prohibited") {
    return false;
  } else {
    return null;
  }
}

function getTestingAllowed(data, mode, values, renderMode) {
  
  let value = values["Testing"];
  if (
    value === "Allowed" ||
    value === "Limited" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } else if (value === "Prohibited") {
    return false;
  } else {
    return null;
  }
}

function precalculateActivitiesData(data, getID = false) {
  let { dataPlaces, countyList } = data;

  if (getID === false) {
    Object.keys(countyList).map((county) => {
      let allPlacesInCounty = Object.keys(dataPlaces).map((place) => {
        if (place !== "default" && dataPlaces[place]["County"] === county) {
          if (countyList[county].activities === undefined) {
            countyList[county].activities = Object.assign(
              {},
              precalculateActivitiesDataDataSchema()
            );
          }
          if (county !== "default") {
            groupAllowedActivities(
              place,
              countyList[county].activities,
              dataPlaces[place],
              getID
            );
          }
        }
      });
    });
  } else {
    Object.keys(countyList).map((county) => {
      let allPlacesInCounty = Object.keys(dataPlaces).map((place) => {
        if (place !== "default" && dataPlaces[place]["County"] === county) {
          if (countyList[county].activitiesByGEOID === undefined) {
            countyList[county].activitiesByGEOID = Object.assign(
              {},
              precalculateActivitiesDataDataSchema()
            );
          }
          if (county !== "default") {
            groupAllowedActivities(
              place,
              countyList[county].activitiesByGEOID,
              dataPlaces[place],
              getID
            );
          }
        }
      });
    });
  }

  Object.keys(countyList).map((county) => {
    if (county !== "default") {
      // @TODO figure out what in import * for JSON is adding default object
      rollupAllowedActivities(countyList, county);
    }
  });
}

function groupAllowedActivities(place, activities, item, getID) {
  try {
    let placeLabel = place; // item["CA Places Key"];
    if (getID === true) {
      placeLabel = item["GEOID"];
    }

    activities["Are all CCA activites prohibited?"][
      item["Are all CCA activites prohibited?"]
    ].push(placeLabel);

    activities["Is all retail prohibited?"][
      item["Is all retail prohibited?"]
    ].push(placeLabel);

    if (item["CCA Prohibited by County"] === "Yes") {
      activities["CCA Prohibited by County"]["Yes"].push(placeLabel);
      placeLabel = "Unincorporated " + item["County label"]; // @TODO add to translation strings
    } else if (item["CCA Prohibited by County"] === "No") {
      activities["CCA Prohibited by County"]["Yes"].push(placeLabel);
      placeLabel = "Unincorporated " + item["County label"]; // @TODO add to translation strings
    }

    activities["Retail: Storefront"][item["Retail: Storefront"]].push(
      placeLabel
    );
    activities["Retail: Non-Storefront"][item["Retail: Non-Storefront"]].push(
      placeLabel
    );
    activities["Distribution"][item["Distribution"]].push(placeLabel);
    activities["Manufacturing"][item["Manufacturing"]].push(placeLabel);
    activities["Cultivation"][item["Cultivation"]].push(placeLabel);
    activities["Testing"][item["Testing"]].push(placeLabel);

    activities["Cities in County"] = activities["Cities in County"] + 1;
  } catch (error) {
    console.error(error);
  }
}

function rollupAllowedActivities(countyList, county) {
  try {
    let { activities } = countyList[county];
    let data = activities;

    let counts = {
      "Retail: Storefront": Object.assign({}, activities["Retail: Storefront"]),
      "Retail: Non-Storefront": Object.assign(
        {},
        activities["Retail: Non-Storefront"]
      ),
      Distribution: Object.assign({}, activities["Distribution"]),
      Manufacturing: Object.assign({}, activities["Manufacturing"]),
      Cultivation: Object.assign({}, activities["Cultivation"]),
      Testing: Object.assign({}, activities["Testing"]),
      "CCA Prohibited by County": Object.assign(
        {},
        activities["CCA Prohibited by County"]
      ),
      "Are all CCA activites prohibited?": Object.assign(
        {},
        activities["Are all CCA activites prohibited?"]
      ),
      "Is all retail prohibited?": Object.assign(
        {},
        activities["Is all retail prohibited?"]
      ),
    };

    let countsValues = Object.assign({}, counts);

    // Each type of activity
    Object.keys(counts).map((item, index) => {
      // Each activity status
      Object.keys(counts[item]).map((category) => {
        if (
          counts[item] !== undefined &&
          counts[item][category] !== undefined
        ) {
          try {
            let length = counts[item][category].length;
            // countsValues[item][category] = counts[item][category].length;
            countsValues[item][category] = length;
            // console.log("length", counts[item], category, item[category], countsValues[item][category]);
          } catch (e) {
            console.error(e);
          }
        }
      });
    });
    countyList[county].countsValues = countsValues;
  } catch (error) {
    console.error(error);
  }
}

function precalculateActivitiesDataDataSchema() {
  return {
    "Retail: Storefront": {
      Allowed: [],
      Limited: [],
      "Limited-Medical Only": [],
      Prohibited: [],
    },
    "Retail: Non-Storefront": {
      Allowed: [],
      Limited: [],
      "Limited-Medical Only": [],
      Prohibited: [],
    },
    Distribution: {
      Allowed: [],
      Limited: [],
      "Limited-Medical Only": [],
      Prohibited: [],
    },
    Manufacturing: {
      Allowed: [],
      Limited: [],
      "Limited-Medical Only": [],
      Prohibited: [],
    },
    Cultivation: {
      Allowed: [],
      Limited: [],
      "Limited-Medical Only": [],
      Prohibited: [],
    },
    Testing: {
      Allowed: [],
      Limited: [],
      "Limited-Medical Only": [],
      Prohibited: [],
    },
    "Are all CCA activites prohibited?": {
      Yes: [],
      No: [],
    },
    "Is all retail prohibited?": {
      Yes: [],
      No: [],
    },
    "CCA Prohibited by County": {
      Yes: [],
      No: [],
    },
    "Cities in County": 0,
  };
}

// function getCountyByGEOID(data, { geoid, name }) {
//   let countyData = Object.keys(data.dataPlaces).filter((place) => {
//     if (
//       data.dataPlaces[place]["GEOID"] === geoid &&
//       data.dataPlaces[place]["NAME"] === name
//     ) {
//       return data.dataPlaces[place];
//     }
//   });
//   return countyData;
// }

// function getDataByCounty(data, { name }) {
//   let countyData = Object.keys(data.countyList).filter((county) => {
//     if (name === county) {
//       return data.countyList[county];
//     }
//   });
//   return countyData;
// }

export {
  getCountyColor,
  getCountyColorPlaceLevel,
  precalculateActivitiesData,
  precalculateActivitiesDataDataSchema,
  getPlaceColor,
  getPlaceColorPlaceLevel,
};
