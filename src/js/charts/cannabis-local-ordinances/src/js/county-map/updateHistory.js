/**
 * Set path for interaction state.
 * @param {*} props 
 */
const updateHistory = (props) => {
  console.log(props);
  let path = props.anchor + props.paramString;
  console.log(path);
  // window.history.pushState(props, props.title, path);
  console.log(window.location);
  window.location.hash = path;
};

const updateMapLevelFromHash = (hash, data) => {
  console.log("update hash", hash);
  /// @TODO Throttle
  let county = null;
  let level = "statewide";
  let place = null;
  let geoid = null;
  let activities = null;

  if (hash !== undefined && hash.length > 0) {
    let splitHash = hash.split("?");
    if (splitHash[1] !== undefined) {
      let params = splitHash[1].split("&");
      let paramKeys = {};
      if (params.length > 0) {
        Object.keys(params).map((param) => {
          let splitParam = params[param].split("=");
          paramKeys[splitParam[0]] = splitParam[1];
        });
      }

      console.log("paramKeys", paramKeys);

      if (
        paramKeys["activities"] !== undefined &&
        paramKeys["activities"] !== null
      ) {
        activities = paramKeys["activities"];
      }

      if (splitHash[0] === "#county-view") {
        level = "county";
        if (params !== undefined) {
          if (
            paramKeys["county"] !== undefined &&
            paramKeys["county"] !== null
          ) {
            county = paramKeys["county"];
          }
        }
      } else if (splitHash[0] === "#city-view") {
        level = "place";
        if (params !== undefined) {
          if (paramKeys["city"] !== undefined && paramKeys["city"] !== null) {
            place = paramKeys["city"];
          }

          if (paramKeys["geoid"] !== undefined && paramKeys["geoid"] !== null) {
            geoid = paramKeys["geoid"];
          }
        }
      }

      var setPlaceFilterEl = document.querySelector(
        '.filter[data-filter-type="places"] select option:checked'
      );
      let value = setPlaceFilterEl.value;
      let jurisdiction = setPlaceFilterEl.getAttribute("data-jurisdiction");
      let optionGeoid = setPlaceFilterEl.getAttribute("data-geoid");

      if (level === "county") {
        if (jurisdiction === "County" && value !== county) {
          var updateOption = document.querySelector(
            `.filter[data-filter-type="places"] select option[value="${county}"]`
          );
          if (updateOption !== null) {
            setPlaceFilterEl.selected = false;
            updateOption.selected = true;
          }
        }
      } else if (level === "place") {
        var updateOptionPlace = document.querySelector(
          `.filter[data-filter-type="places"] select option[data-geoid="${geoid}"]`
        );

        if (
          updateOptionPlace !== null &&
          geoid !== null &&
          optionGeoid !== geoid
        ) {
          setPlaceFilterEl.selected = false;
          updateOptionPlace.selected = true;
        }
      }
    }
  }
};

export { updateHistory, updateMapLevelFromHash };
