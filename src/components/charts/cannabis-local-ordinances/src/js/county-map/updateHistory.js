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
  const paramKeys = {};
  const splitHash = hash.split("?");
  const anchor = splitHash[0];
  paramKeys.anchor = anchor;
  if (splitHash[1] !== undefined) {
    const params = splitHash[1].split("&");
    if (params.length > 0) {
      Object.keys(params).map((param) => {
        const splitParam = params[param].split("=");
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
  const county = null;
  let jurisdiction = "Statewide"; // Next jurisdiction to set
  const place = null;
  const geoid = null;
  const activities = null;

  // Set activity data
  if (paramKeys.activity !== undefined && paramKeys.activity !== null) {
    data.activities = paramKeys.activity;
  }

  // Set places filter data
  if (paramKeys.anchor === "#county-view") {
    jurisdiction = "County";
    data.jurisdiction = "County";
    if (paramKeys.County !== undefined && paramKeys.County !== null) {
      data.selectedCounty = decodeURI(paramKeys.County);
    }
  } else if (paramKeys.anchor === "#city-view") {
    jurisdiction = "Place";
    data.jurisdiction = "Place";
    if (paramKeys.Place !== undefined && paramKeys.Place !== null) {
      data.selectedPlace = paramKeys.Place;
    }
    if (paramKeys.geoid !== undefined && paramKeys.geoid !== null) {
      data.geoid = paramKeys.geoid;
    }
  } else if (paramKeys.anchor === "" || paramKeys.anchor === "#") {
    data.jurisdiction = "Statewide";
  }
};

/** Set filters after interaction */
const updateDisplaysFromInteraction = (data) => {
  updateActivityFilter(data);
  updatePlacesFilter(data);
};

const updateActivityFilter = (data) => {
  // Update acvitiy filter settings.
  const setActivityFilterEl = document.querySelector(
    ".filter-activity select option:checked"
  );
  const activityValue = setActivityFilterEl.value;

  const updateOptionActivity = document.querySelector(
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
  const setPlaceFilterEl = document.querySelector(
    '.filter[data-filter-type="places"]'
  );
  const setPlaceFilterOptionsEl = document.querySelector(
    '.filter[data-filter-type="places"] select option'
  );

  if (setPlaceFilterOptionsEl !== null) {
    const {value} = setPlaceFilterEl;
    if (data.jurisdiction === "County") {
      if (updateOptionCountyEl !== null) {
        var updateOptionCountyEl = document.querySelector(
          `.filter[data-filter-type="places"] select option[value="${data.selectedCounty}"]`
        );
        const jurisdiction =
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
      const updateOptionPlaceEl = document.querySelector(
        `.filter[data-filter-type="places"] select option[data-geoid="${data.geoid}"]`
      );

      if (updateOptionPlaceEl !== null) {
        const jurisdiction =
          updateOptionPlaceEl.getAttribute("data-jurisdiction");
        const optionGeoid = updateOptionPlaceEl.getAttribute("data-geoid");

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
      const updateOptionStatewideEl = document.querySelector(
        `.filter[data-filter-type="places"] select option[value=""]`
      );

      if (updateOptionStatewideEl !== null) {
        setPlaceFilterEl.selected = false;
        updateOptionStatewideEl.selected = true;
      }
    }
  }
};

export {
  updateHistory,
  updateMapJurisdictionDisplayFromHash,
  updateDisplaysFromInteraction,
};
