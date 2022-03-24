function getCountyColor(data, props) {
  // Shared data object
  let { dataPlaces } = data;
  let { name } = props;

  data.prohibitedStatusColors = {
    Yes: "#C0633B", // Orange
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
    if (values !== undefined) {
      return getActivityStatusColors(
        data,
        mode,
        values,
        currentCountyPlaceName
      );
    } else {
      // Get county and look up prohibition
      let placeData = dataPlaces[currentCountyPlaceName];
      let prohibitionStatus = placeData["CCA Prohibited by County"];
      return data.prohibitedStatusColors[prohibitionStatus];
    }
  } catch (error) {
    console.error("error", error, name);
  }
}

function getPlaceColor(data, props) {
  // Shared data object
  let { dataPlaces } = data;
  let { name, geoid } = props;

  data.prohibitedStatusColors = {
    Yes: "#C0633B",
    No: "#2F4C2C",
  };

  let values = data.dataPlaces[name];

  let mode = data.activities;

  try {
    if (values !== undefined) {
      return getActivityStatusColors(data, mode, values);
    } else {
      // Get county and look up prohibition
      // console.log("undefined", name);
      return "transparent";
    }
  } catch (error) {
    console.error("error", error, name);
  }
}

function getActivityStatusColors(
  data,
  mode,
  values,
  currentCountyPlaceName = null
) {
  switch (mode) {
    case "All activities":
      if (currentCountyPlaceName !== null) {
        let placeData = data.dataPlaces[currentCountyPlaceName];
        let prohibitionStatus = placeData["CCA Prohibited by County"];
        return data.prohibitedStatusColors[prohibitionStatus];
      }
      return getAllActivities(data, mode, values);
    case "Retail":
      if (getRetailAllowed(data, mode, values)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Distributor":
      if (getDistributorAllowed(data, mode, values)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Manufacturer":
      if (getManufacturerAllowed(data, mode, values)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Testing":
      if (getTestingAllowed(data, mode, values)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    case "Cultivation":
      if (getCultivationAllowed(data, mode, values)) {
        return data.prohibitedStatusColors["No"]; // Allowed
      } else {
        return data.prohibitedStatusColors["Yes"]; // Prohibited
      }
    default:
      break;
  }
}

function getAllActivities(data, mode, values) {
  // If anything is allowed
  // if (
  //   getRetailAllowed(values) ||
  //   getManufacturerAllowed(values) ||
  //   getCultivationAllowed(values) ||
  //   getDistributorAllowed(values) ||
  //   getTestingAllowed(values)
  // ) {
  //   return data.prohibitedStatusColors["No"]; // Allowed
  // } else {
  //   return data.prohibitedStatusColors["Yes"]; // Prohibited
  // }
  return data.prohibitedStatusColors[values["Are all CCA activites prohibited?"]];
  // Is all retail prohibited?
  // Are all CCA activites prohibited?
}

function getRetailAllowed(data, mode, values) {
  // if (
  //   values["Retail: Storefront"] === "Allowed" ||
  //   values["Retail: Non-Storefront"] === "Allowed" ||
  //   values["Retail: Storefront"] === "Limited-Medical Only" ||
  //   values["Retail: Non-Storefront"] === "Limited-Medical Only" ||
  //   values["Retail: Storefront"] === "Limited" ||
  //   values["Retail: Non-Storefront"] === "Limited"
  // ) {
  //   return true;
  // } else if (
  //   values["Retail: Storefront"] === "Prohibited" ||
  //   values["Retail: Non-Storefront"] === "Prohibited"
  // ) {
  //   return false;
  // } else {
  //   return null;
  // }
  
  let value = values["Is all retail prohibited?"]; 
  if (
    value === "Yes"
  ) {
    return true;
  } else if (value === "No") {
    return false;
  } else {
    return null;
  }
}

function getDistributorAllowed(data, mode, values) {
  let value = values["Distributor"];

  console.log("D", value, values["County label"]);
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

function getManufacturerAllowed(data, mode, values) {
  let value = values["Manufacturer"];
  console.log("M", value, values["County label"]);
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

function getCultivationAllowed(data, mode, values) {
  
  let value = values["Cultivation"];
  console.log("C", value, values["County label"]);
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

function getTestingAllowed(data, mode, values) {
  
  let value = values["Testing"];
  console.log("T", value, values["County label"]);
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

function getCountyByGEOID(data, { geoid, name }) {
  let countyData = Object.keys(data.dataPlaces).filter((place) => {
    if (
      data.dataPlaces[place]["GEOID"] === geoid &&
      data.dataPlaces[place]["NAME"] === name
    ) {
      return data.dataPlaces[place];
    }
  });
  return countyData;
}

function getDataByCounty(data, { name }) {
  let countyData = Object.keys(data.countyList).filter((county) => {
    if (name === county) {
      return data.countyList[county];
    }
  });
  return countyData;
}

function getActivities(data, getID = false) {
  let { dataPlaces, countyList } = data;

  if (getID === false) {
    Object.keys(countyList).map((county) => {
      let allPlacesInCounty = Object.keys(dataPlaces).map((place) => {
        if (place !== "default" && dataPlaces[place]["County"] === county) {
          if (countyList[county].activities === undefined) {
            countyList[county].activities = Object.assign(
              {},
              getActivitiesDataSchema()
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
              getActivitiesDataSchema()
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
    activities["Distributor"][item["Distributor"]].push(placeLabel);
    activities["Manufacturer"][item["Manufacturer"]].push(placeLabel);
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
      Distributor: Object.assign({}, activities["Distributor"]),
      Manufacturer: Object.assign({}, activities["Manufacturer"]),
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

function getActivitiesDataSchema() {
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
    Distributor: {
      Allowed: [],
      Limited: [],
      "Limited-Medical Only": [],
      Prohibited: [],
    },
    Manufacturer: {
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

export {
  getCountyColor,
  getActivities,
  getActivitiesDataSchema,
  getPlaceColor,
};
