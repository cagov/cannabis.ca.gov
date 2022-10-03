function getCountyColorPlaceLevel(data, props) {
  return getCountyColor(data, props, "County");
}
function getCountyColor(data, props, jurisdiction = null) {
  // Shared data object
  const { dataPlaces } = data;
  const { name, island } = props;

  data.mapStatusColors = {
    Yes: "#CF5028", // Orange
    No: "#2F4C2C", // Green
  };

  // name - Name of current county from GIS data.
  // Get county data object from dataTables.
  const currentCountyPlaceName = Object.keys(dataPlaces).filter((place) => {
    const item = dataPlaces[place];
    if (
      name === item.County &&
      item["Jurisdiction Type"] === "County" &&
      place !== "default"
    ) {
      return place;
    }
  });

  const values = dataPlaces[currentCountyPlaceName];
  const mode = data.activities;

  try {
    if (values !== undefined && jurisdiction === null) {
      const activityStatusColors = getActivityStatusColor(
        data,
        mode,
        values,
        "County"
      );
      return activityStatusColors;
    } if (values !== undefined && jurisdiction !== null) {
      const activityStatusColors = getActivityStatusColor(
        data,
        mode,
        values,
        "County"
      );

      if (data.selectedCounty === values.County) {
        return activityStatusColors;
      } 
        return "transparent";
      
    } 
      // console.log("CC found");
      // @QUESTION when is this run? (probably percentages or tooltips, I forget)
      // Get county and look up prohibition
      const placeData = dataPlaces[currentCountyPlaceName];
      const prohibitionStatus = placeData["CCA Prohibited by County"];
      return data.mapStatusColors[prohibitionStatus];
    
  } catch (error) {
    console.error("error", error, name);
  }
}

function getPlaceColorPlaceLevel(data, props) {
  return getPlaceColor(data, props, "County");
}

function getPlaceColor(data, props, jurisdiction = null) {
  // Shared data object
  const { dataPlaces } = data;
  const { name, geoid } = props;

  data.mapStatusColors = {
    Yes: "#CF5028",
    No: "#2F4C2C",
  };

  const currentPlace = Object.keys(dataPlaces).filter((place) => {
    const item = dataPlaces[place];
    if (
      geoid === item.GEOID &&
      item["Jurisdiction Type"] === "City" &&
      place !== "default"
    ) {
      return place;
    }
  });

  const values = data.dataPlaces[currentPlace]; // Angels vs Angels Camp Place label

  const mode = data.activities;

  try {
    if (values !== undefined) {
      return getActivityStatusColor(data, mode, values, "City");
    } 
      // Get county and look up prohibition
      return "transparent";
    
  } catch (error) {
    console.error("error", error, name);
  }
  return "transparent";
}

/**
 * Get status color for jurisdiction
 * @param {*} data
 * @param {*} mode
 * @param {*} values
 * @param {*} renderMode
 * @returns {*} string - single Hex value
 */
function getActivityStatusColor(data, mode, values, renderMode = "County") {
  switch (mode) {
    case "Any cannabis business":
      return getAllActivities(data, mode, values, renderMode);
    case "Retail":
      // True === Yes it's prohibited
      if (getRetailAllowed(data, mode, values, renderMode)) {
        return data.mapStatusColors.No; // Allowed
      } 
        return data.mapStatusColors.Yes; // Prohibited
      
    case "Distribution":
      if (getDistributionAllowed(data, mode, values, renderMode)) {
        return data.mapStatusColors.No; // Allowed
      } 
        return data.mapStatusColors.Yes; // Prohibited
      
    case "Manufacturing":
      if (getManufacturingAllowed(data, mode, values, renderMode)) {
        return data.mapStatusColors.No; // Allowed
      } 
        return data.mapStatusColors.Yes; // Prohibited
      
    case "Testing":
      if (getTestingAllowed(data, mode, values, renderMode)) {
        return data.mapStatusColors.No; // Allowed
      } 
        return data.mapStatusColors.Yes; // Prohibited
      
    case "Cultivation":
      if (getCultivationAllowed(data, mode, values, renderMode)) {
        return data.mapStatusColors.No; // Allowed
      } 
        return data.mapStatusColors.Yes; // Prohibited
      
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
  const prohibitionStatus = values["CCA Prohibited by County"];
  const allActivitiesProhibited = values["Are all CCA activites prohibited?"];
  let status = null;
  if (renderMode === "County") {
    status = prohibitionStatus;
  } else {
    status = allActivitiesProhibited;
  }
  return data.mapStatusColors[status];
}

/**
 *
 * @param {*} data
 * @param {*} mode
 * @param {*} values
 * @returns {boolean} - If value matches data values (currently Yes No, these could be converted props for rendering CSV to county map automatically (eventually))
 */
function getRetailAllowed(data, mode, values, renderMode) {
  const value = values["Is all retail prohibited?"];
  // Alt use both retail fields, but data at this prop should be correct.
  if (
    value === "No" // No, it's allowed
  ) {
    return true;
  } if (value === "Yes") {
    return false;
  } 
    return null;
  
}

function getDistributionAllowed(data, mode, values, renderMode) {
  const value = values.Distribution;
  if (
    value === "Allowed" ||
    value === "Allowed" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } if (value === "Prohibited") {
    return false;
  } 
    return null;
  
}

function getManufacturingAllowed(data, mode, values, renderMode) {
  const value = values.Manufacturing;
  if (
    value === "Allowed" ||
    value === "Allowed" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } if (value === "Prohibited") {
    return false;
  } 
    return null;
  
}

function getCultivationAllowed(data, mode, values, renderMode) {
  const value = values.Cultivation;
  if (
    value === "Allowed" ||
    value === "Allowed" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } if (value === "Prohibited") {
    return false;
  } 
    return null;
  
}

function getTestingAllowed(data, mode, values, renderMode) {
  const value = values.Testing;
  if (
    value === "Allowed" ||
    value === "Allowed" ||
    value === "Limited-Medical Only"
  ) {
    return true;
  } if (value === "Prohibited") {
    return false;
  } 
    return null;
  
}

function precalculateActivitiesData(data, getID = false) {
  const { dataPlaces, countyList } = data;

  if (getID === false) {
    // Use list of counties to pull all places and the unincorporated county information set.
    Object.keys(countyList).map((county) => {
      const allPlacesInCounty = Object.keys(dataPlaces).map((place) => {
        if (place !== "default" && dataPlaces[place].County === county) {
          if (countyList[county].activities === undefined) {
            countyList[county].activities = {
              
              ...precalculateActivitiesDataSchema()
            };
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
      const allPlacesInCounty = Object.keys(dataPlaces).map((place) => {
        if (place !== "default" && dataPlaces[place].County === county) {
          if (countyList[county].activitiesByGEOID === undefined) {
            countyList[county].activitiesByGEOID = {
              
              ...precalculateActivitiesDataSchema()
            };
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
    // only of places
    let placeLabel = place; // item["CA Places Key"];
    // console.log("item", item);
    activities.county = {};
    if (item["Jurisdiction Type"] === "City") {
      if (getID === true) {
        placeLabel = item.GEOID;
      }

      activities["Are all CCA activites prohibited?"][
        item["Are all CCA activites prohibited?"]
      ].push(placeLabel);

      activities["Is all retail prohibited?"][
        item["Is all retail prohibited?"]
      ].push(placeLabel);

      if (item["CCA Prohibited by County"] === "Yes") {
        activities["CCA Prohibited by County"].Yes.push(placeLabel);
        placeLabel = `Unincorporated ${  item["County label"]}`; // @TODO add to translation strings
      } else if (item["CCA Prohibited by County"] === "No") {
        activities["CCA Prohibited by County"].Yes.push(placeLabel);
        placeLabel = `Unincorporated ${  item["County label"]}`; // @TODO add to translation strings
      }

      activities["Retail: Storefront"][item["Retail: Storefront"]].push(
        placeLabel
      );
      activities["Retail: Non-Storefront"][item["Retail: Non-Storefront"]].push(
        placeLabel
      );
      activities.Distribution[item.Distribution].push(placeLabel);
      activities.Manufacturing[item.Manufacturing].push(placeLabel);
      activities.Cultivation[item.Cultivation].push(placeLabel);
      activities.Testing[item.Testing].push(placeLabel);
      activities["Datasets for County"] += 1;
    } else if (item["Jurisdiction Type"] === "City") {
        if (getID === true) {
          placeLabel = item.GEOID;
        }

        activities.county["Are all CCA activites prohibited?"][
          item["Are all CCA activites prohibited?"]
        ].push(placeLabel);

        activities.county["Is all retail prohibited?"][
          item["Is all retail prohibited?"]
        ].push(placeLabel);

        if (item["CCA Prohibited by County"] === "Yes") {
          activities.county["CCA Prohibited by County"].Yes.push(placeLabel);
          placeLabel = `Unincorporated ${  item["County label"]}`; // @TODO add to translation strings
        } else if (item["CCA Prohibited by County"] === "No") {
          activities.county["CCA Prohibited by County"].Yes.push(placeLabel);
          placeLabel = `Unincorporated ${  item["County label"]}`; // @TODO add to translation strings
        }

        activities.county["Retail: Storefront"][
          item["Retail: Storefront"]
        ].push(placeLabel);
        activities.county["Retail: Non-Storefront"][
          item["Retail: Non-Storefront"]
        ].push(placeLabel);
        activities.county.Distribution[item.Distribution].push(
          placeLabel
        );
        activities.county.Manufacturing[item.Manufacturing].push(
          placeLabel
        );
        activities.county.Cultivation[item.Cultivation].push(placeLabel);
        activities.county.Testing[item.Testing].push(placeLabel);
        activities.county["Datasets for County"] =
          activities["Datasets for County"] + 1;
      }
  } catch (error) {
    console.error(error);
  }
}

function rollupAllowedActivities(countyList, county) {
  try {
    const { activities } = countyList[county];
    const data = activities;

    const counts = {
      "Retail: Storefront": { ...activities["Retail: Storefront"]},
      "Retail: Non-Storefront": {
        
        ...activities["Retail: Non-Storefront"]
      },
      Distribution: { ...activities.Distribution},
      Manufacturing: { ...activities.Manufacturing},
      Cultivation: { ...activities.Cultivation},
      Testing: { ...activities.Testing},
      "CCA Prohibited by County": {
        
        ...activities["CCA Prohibited by County"]
      },
      "Are all CCA activites prohibited?": {
        
        ...activities["Are all CCA activites prohibited?"]
      },
      "Is all retail prohibited?": {
        
        ...activities["Is all retail prohibited?"]
      },
    };

    const countsValues = { ...counts};

    // Each type of activity
    Object.keys(counts).map((item, index) => {
      // Each activity status
      Object.keys(counts[item]).map((category) => {
        if (
          counts[item] !== undefined &&
          counts[item][category] !== undefined
        ) {
          try {
            const {length} = counts[item][category];
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

function precalculateActivitiesDataSchema() {
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
    "Datasets for County": 0,
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
  precalculateActivitiesDataSchema,
  getPlaceColor,
  getPlaceColorPlaceLevel,
};
