import updatePlacesListFilter from './updatePlacesListFilter.js';
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

const updateMapJurisdictionDisplayFromHash = (hash, data) => {
  // console.log("update hash", hash, data);
  // if (hash !== undefined && hash.length > 0) {
  //   let paramKeys = getParamKeys(hash, data);
  //   console.log("paramKeys", paramKeys);
  //   setDataFromHash(paramKeys, data);
  //   updateDisplaysFromInteraction(data);
  // }
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
        if (splitParam[1] !== null) {
          paramKeys[splitParam[0]] = splitParam[1];
        }
      });
    }
  }
  // console.log("paramKeys", paramKeys);
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
  updatePlacesListFilter(data)
  // @todo Deprecate updatePlacesFilter() once previous function is testedand verified.
  // updatePlacesFilter(data);
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

const updatePlacesFilter = (data) => {
  // Update places filter settings
  // Clear existing options
  var setPlaceFilterEl = document.querySelector(
    '.filter[data-filter-type="places"]'
  );
  var setPlaceFilterOptionsEl = document.querySelector(
    '.filter[data-filter-type="places"] select option'
  );

  if (setPlaceFilterOptionsEl !== null) {
    let value = setPlaceFilterEl.value;
    if (data.jurisdiction === "County") {
      if (updateOptionCountyEl !== null) {
        var updateOptionCountyEl = document.querySelector(
          `.filter[data-filter-type="places"] select option[value="${data.selectedCounty}"]`
        );
        let jurisdiction =
          updateOptionCountyEl.getAttribute("data-jurisdiction");
        if (jurisdiction === "County" && value !== data.selectedCounty) {
          if (updateOptionCountyEl !== null) {
            setPlaceFilterOptionsEl.selected = false; // Unset anything selected.
            updateOptionCountyEl.selected = true;
            // const e = new CustomEvent("change", {
            //   detail: { el: updateOptionCountyEl, hash: true },
            // });

            // setPlaceFilterEl.dispatchEvent(e);
          }
        }
      }
    } else if (data.jurisdiction === "Place") {
      var updateOptionPlaceEl = document.querySelector(
        `.filter[data-filter-type="places"] select option[data-geoid="${data.geoid}"]`
      );

      if (updateOptionPlaceEl !== null) {
        let jurisdiction =
          updateOptionPlaceEl.getAttribute("data-jurisdiction");
        let optionGeoid = updateOptionPlaceEl.getAttribute("data-geoid");

        if (
          updateOptionPlaceEl !== null &&
          data.geoid !== null &&
          optionGeoid !== data.geoid
        ) {
          setPlaceFilterEl.selected = false; // Unset anything selected.
          updateOptionPlaceEl.selected = true;
        }
      }
    } else if (data.jurisdiction === "Statewide") {
      // @TODO confirm
      var updateOptionStatewideEl = document.querySelector(
        `.filter[data-filter-type="places"] select option[value=""]`
      );

      if (updateOptionStatewideEl !== null) {
        setPlaceFilterEl.selected = false;
        updateOptionStatewideEl.selected = true;
      }
    }
  }
};

export { updateHistory, updateMapJurisdictionDisplayFromHash, updateDisplaysFromInteraction };
