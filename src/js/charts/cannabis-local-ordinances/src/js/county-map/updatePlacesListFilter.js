// Lets change everything to cagov-combobox-places.

const updatePlacesListFilter = (data) => {
  // Update places filter settings

  const vars = {
    setPlaceFilterEl: document.querySelector("#lb1 li"),
    setPlaceFilterOptionsEl: document.querySelector(
      '.filter[data-filter-type="places"] li'
    ),
    thisUpdateOptionCountyEl: document.querySelector(
      `.filter[data-filter-type="places"] li[value="${data.selectedCounty}"]`
    ),
    updateOptionStatewideEl: document.querySelector(
      `.filter[data-filter-type="places"] li[value=""]`
    ),
    updateOptionPlaceEl: document.querySelector(
      `.filter[data-filter-type="places"] li[data-geoid="${data.geoid}"]`
    ),
  };

  // Clear existing options
  if (vars.setPlaceFilterOptionsEl !== null) {
    let value = vars.setPlaceFilterEl.dataset.value;

    if (data.jurisdiction === "County") {
      if (vars.updateOptionCountyEl !== null) {
        vars.updateOptionCountyEl = vars.thisUpdateOptionCountyEl;

        let jurisdiction =
          vars.updateOptionCountyEl.getAttribute("data-jurisdiction");
        if (jurisdiction === "County" && value !== data.selectedCounty) {
          if (updateOptionCountyEl !== null) {
            vars.setPlaceFilterOptionsEl.selected = false; // Unset anything selected.
            updateOptionCountyEl.selected = true;
          }
        }
      }
    } else if (data.jurisdiction === "Place") {
      if (vars.updateOptionPlaceEl !== null) {
        let jurisdiction =
          vars.updateOptionPlaceEl.getAttribute("data-jurisdiction");
        let optionGeoid = vars.updateOptionPlaceEl.getAttribute("data-geoid");

        if (
          vars.updateOptionPlaceEl !== null &&
          data.geoid !== null &&
          optionGeoid !== data.geoid
        ) {
          vars.setPlaceFilterEl.selected = false; // Unset anything selected.
          vars.updateOptionPlaceEl.selected = true;
        }
      }
    } else if (data.jurisdiction === "Statewide") {
      if (vars.updateOptionStatewideEl !== null) {
        vars.setPlaceFilterEl.selected = false;
        updateOptionStatewideEl.selected = true;
      }
    }
  }
};

export default updatePlacesListFilter;
