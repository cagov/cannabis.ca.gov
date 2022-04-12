/**
 * Set path for interaction state.
 * @param {*} props
 */
const updateHistory = (props) => {
  // console.log(props);
  let path = props.anchor + props.paramString;
  // console.log(path);
  // window.history.pushState(props, props.title, path);
  // console.log(window.location);
  window.location.hash = path;
};

const updateMapLevelFromHash = (hash, data) => {
  // console.log("update hash", hash, data);
  if (hash !== undefined && hash.length > 0) {
    let paramKeys = getParamKeys(hash, data);
    console.log("paramKeys", paramKeys);
    setDataFromHash(paramKeys, data);
    // updateDisplaysFromHash(data);
  }
};

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
        paramKeys[splitParam[0]] = splitParam[1];
      });
    }
  }
  console.log("paramKeys", paramKeys);
  return paramKeys;
};

const setDataFromHash = (paramKeys, data) => {
  let county = null;
  let level = "statewide"; // Next level to set
  let place = null;
  let geoid = null;
  let activities = null;

  // Set activity data
  if (paramKeys["activity"] !== undefined && paramKeys["activity"] !== null) {
    data.activities = paramKeys["activity"];
  }

  // Set places filter data
  if (paramKeys.anchor === "#county-view") {
    level = "county";
    if (paramKeys["county"] !== undefined && paramKeys["county"] !== null) {
      data.selectedCounty = paramKeys["county"];
    }
  } else if (paramKeys.anchor === "#city-view") {
    level = "place";
    if (paramKeys["city"] !== undefined && paramKeys["city"] !== null) {
      data.selectedPlace = paramKeys["city"];
    }
    if (paramKeys["geoid"] !== undefined && paramKeys["geoid"] !== null) {
      data.geoid = paramKeys["geoid"];
    }
  }
  console.log("data", data);
};

const updateDisplaysFromHash = () => {
  // updateActivityFilter();
  // updatePlacesFilter();
};

const updateActivityFilter = () => {
  // Update acvitiy filter settings.
  var setActivityFilterEl = document.querySelector(
    ".filter-activity select option:checked"
  );
  let activityValue = setActivityFilterEl.value;

  var updateOptionActivity = document.querySelector(
    `.filter-activity select option[value="${activities}"]`
  );
  if (updateOptionActivity !== null) {
    setActivityFilterEl.selected = false;
    updateOptionActivity.selected = true;
  }
};

const updatePlacesFilter = () => {
  // Update places filter settings
  var setPlaceFilterEl = document.querySelector(
    '.filter[data-filter-type="places"] select option:checked'
  );

  let value = setPlaceFilterEl.value;
  if (level === "county") {
    var updateOptionCountyEl = document.querySelector(
      `.filter[data-filter-type="places"] select option[value="${county}"]`
    );
    let jurisdiction = updateOptionCountyEl.getAttribute("data-jurisdiction");
    let optionGeoid = updateOptionCountyEl.getAttribute("data-geoid");
    if (jurisdiction === "County" && value !== county) {
      if (updateOptionCountyEl !== null) {
        setPlaceFilterEl.selected = false; // Unset anything selected.
        updateOptionCountyEl.selected = true;
      }
    }
  } else if (level === "place") {
    var updateOptionPlaceEl = document.querySelector(
      `.filter[data-filter-type="places"] select option[data-geoid="${geoid}"]`
    );

    let jurisdiction = updateOptionPlaceEl.getAttribute("data-jurisdiction");
    let optionGeoid = updateOptionPlaceEl.getAttribute("data-geoid");

    if (
      updateOptionPlaceEl !== null &&
      geoid !== null &&
      optionGeoid !== geoid
    ) {
      setPlaceFilterEl.selected = false; // Unset anything selected.
      updateOptionPlaceEl.selected = true;
    }
  } else if (level === "statewide") {
    var updateOptionStatewideEl = document.querySelector(
      `.filter[data-filter-type="places"] select option[value=""]`
    );

    if (updateOptionStatewideEl !== null) {
      setPlaceFilterEl.selected = false;
      updateOptionStatewideEl.selected = true;
    }
  }
};

export { updateHistory, updateMapLevelFromHash };
