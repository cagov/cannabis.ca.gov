const updatePlacesListHistory = (data) => {
  // Update places filter settings

  const vars = {
    setPlaceFilterEl: document.querySelector('.filter[data-filter-type="places"]'),
    setPlaceFilterOptionsEl: document.querySelector('.filter[data-filter-type="places"] select option'),
    thisUpdateOptionCountyEl: document.querySelector( `.filter[data-filter-type="places"] select option[value="${data.selectedCounty}"]`),
    updateOptionStatewideEl: document.querySelector(`.filter[data-filter-type="places"] select option[value=""]`)
  }

  // Clear existing options
  if (vars.setPlaceFilterOptionsEl !== null) {
    let value = vars.setPlaceFilterEl.value;
    if (data.jurisdiction === "County") {
      if (updateOptionCountyEl !== null) {

        var updateOptionCountyEl = vars.thisUpdateOptionCountyEl

        let jurisdiction =
          updateOptionCountyEl.getAttribute("data-jurisdiction");
        if (jurisdiction === "County" && value !== data.selectedCounty) {
          if (updateOptionCountyEl !== null) {
            vars.setPlaceFilterOptionsEl.selected = false; // Unset anything selected.
            updateOptionCountyEl.selected = true;
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
          vars.setPlaceFilterEl.selected = false; // Unset anything selected.
          updateOptionPlaceEl.selected = true;
        }
      }
    } else if (data.jurisdiction === "Statewide") {
      var updateOptionStatewideEl = document.querySelector(
        `.filter[data-filter-type="places"] select option[value=""]`
      );

      if (updateOptionStatewideEl !== null) {
        vars.setPlaceFilterEl.selected = false;
        updateOptionStatewideEl.selected = true;
      }
    }
  }
};

export default updatePlacesListHistory ;
