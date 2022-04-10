const updateHistory = (props) => {
  let path = props.anchor + props.paramString;
  // window.history.pushState(props, props.title, path);
  window.location.href = path;
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
    let params = splitHash[1].split("&");
    let paramKeys = {};
    if (params.length > 0) {
      Object.keys(params).map((param) => {
        let splitParam = params[param].split("=");

        paramKeys[splitParam[0]] = splitParam[1];
      });
    }

    if (
      paramKeys["activities"] !== undefined &&
      paramKeys["activities"] !== null
    ) {
      activities = paramKeys["activities"];
    }

    if (splitHash[0] === "#county-view") {
      level = "county";
      if (params !== undefined) {
        if (paramKeys["county"] !== undefined && paramKeys["county"] !== null) {
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
      // console.log("d", data, "l", level, "c", county, "p", place, "g", geoid);
      var updateOptionPlace = document.querySelector(
        `.filter[data-filter-type="places"] select option[data-geoid="${geoid}"]`
      );

      if (
        updateOptionPlace !== null &&
        geoid !== null &&
        optionGeoid !== geoid
      ) {
        // console.log("update select filter", setPlaceFilterEl);
        setPlaceFilterEl.selected = false;
        updateOptionPlace.selected = true;
        // console.log(updateOptionPlace);
      }
    }
  }
};

export { updateHistory, updateMapLevelFromHash };
