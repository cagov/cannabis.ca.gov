/**
 * Set path for interaction state.
 * @param {*} props
 */
const updateHistory = (props) => {
  // console.log(props);
  // console.log("u");
  // let path = props.anchor + props.paramString;
  // console.log(path);
  // window.history.pushState(props, props.title, path);
  // console.log(window.location);
  // window.location.hash = path; // TEMPORARILY DISABLED, Future feature.
};

const updateMapJurisdictionDisplayFromHash = (hash, data) => {};

const getParamKeys = (hash, data) => {
  let paramKeys = {};
  let splitHash = hash.split("?");
  let anchor = splitHash[0];
  paramKeys.anchor = anchor;
  if (splitHash[1] !== undefined) {
    let params = splitHash[1].split("&");
    if (params.length > 0) {
      Object.keys(params).map((param) => {
        let splitParam = params[param].split("=");
        if (splitParam[1] !== null) {
          paramKeys[splitParam[0]] = splitParam[1];
        }
      });
    }
  }
  return paramKeys;
};

const setDataFromHash = (paramKeys, data) => {
  let county = null;
  let jurisdiction = "Statewide"; // Next jurisdiction to set
  let place = null;
  let geoid = null;
  let activities = null;

  // Set activity data
  if (paramKeys["activity"] !== undefined && paramKeys["activity"] !== null) {
    data.activities = paramKeys["activity"];
  }

  // Set places filter data
  if (paramKeys.anchor === "#county-view") {
    jurisdiction = "County";
    data.jurisdiction = "County";
    if (paramKeys["County"] !== undefined && paramKeys["County"] !== null) {
      data.selectedCounty = decodeURI(paramKeys["County"]);
    }
  } else if (paramKeys.anchor === "#city-view") {
    jurisdiction = "Place";
    data.jurisdiction = "Place";
    if (paramKeys["Place"] !== undefined && paramKeys["Place"] !== null) {
      data.selectedPlace = paramKeys["Place"];
    }
    if (paramKeys["geoid"] !== undefined && paramKeys["geoid"] !== null) {
      data.geoid = paramKeys["geoid"];
    }
  } else if (paramKeys.anchor === "" || paramKeys.anchor === "#") {
    data.jurisdiction = "Statewide";
  }
};

/** Set filters after interaction */
const updateDisplaysFromInteraction = (data) => {
  updateActivityFilter(data);
};

const updateActivityFilter = (data) => {
  // Update acvitiy filter settings.
  var setActivityFilterEl = document.querySelector(
    ".filter-activity select option:checked"
  );
  let activityValue = setActivityFilterEl.value;

  var updateOptionActivity = document.querySelector(
    `.filter-activity select option[value="${data.activities}"]`
  );
  if (updateOptionActivity !== null) {
    setActivityFilterEl.selected = false;
    updateOptionActivity.selected = true;
  }
};

export {
  updateHistory,
  updateMapJurisdictionDisplayFromHash,
  updateDisplaysFromInteraction,
};
