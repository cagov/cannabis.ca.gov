import countyList from "../../../static/assets/data/countyList.json";
import dataPlaces from "../../../static/assets/data/draft-cannabis-local-ordinances-interactive.2022-01-22.json";
import mapMessages from "../../../static/assets/data/mapMessages.json";
import config from "../../../static/assets/data/cannabisLocalOrdinances.json";
import template from "./template.js";
import drawStatewideMap from "./drawStatewideMap.js";
import drawCountyMap from "./drawCountyMap.js";
import drawPlaceMap from "./drawPlaceMap.js";
import { precalculateActivitiesData } from "./processData.js";
import {
  updateHistory,
  updateMapJurisdictionDisplayFromHash,
  updateDisplaysFromInteraction,
} from "./updateHistory.js";

class CannabisLocalOrdinances extends window.HTMLElement {
  // Set up static variables that are specific to this component.
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
  constructor() {
    super();
    // Optional state object to use for persisting data across interactions.
    this.state = {};
    this.config = config;
    this.jurisdiction = "Statewide";
    this.activites = "All cannabis business";
    this.containerElement = "cagov-map-table";
    this.mapElement = ".map-container .map-detail";
    this.tooltipElement = ".map-container .tooltips";
    this.legendElement = ".map-legend";
    this.toggleCountiesEl = document.querySelector(
      '.toggle-button [data-target="toggle-counties"]'
    );
    this.togglePlacesEl = document.querySelector(
      '.toggle-button [data-target="toggle-cities"]'
    );
  }

  /**
   * Run when component is first loaded. Pull any data from the environment and set up local data store.
   */
  connectedCallback() {
    try {
      this.svgFiles = {
        county:
          this.dataset.county ||
          "https://headless.cannabis.ca.gov/wp-uploads/2022/04/cnty19_1.svg",
        countyOutlines:
          this.dataset.countyOutlines ||
          "https://headless.cannabis.ca.gov/wp-uploads/2022/04/ca_counties_tiger2016.svg",
        places:
          this.dataset.places ||
          "https://headless.cannabis.ca.gov/wp-uploads/2022/04/tl_2016_06_place.svg",
      };

      this.tableContainer = this.dataset.tableContainer;
      var containerElement = document.querySelector(this.containerElement);
      let data = {
        dataPlaces: Object.assign({}, dataPlaces),
        countyList: Object.assign({}, countyList),
        activities: "Any cannabis business", // For activity mode
        jurisdiction: "Statewide", // For data layer mode
        showCounties: true,
        showPlaces: true,
        messages: mapMessages,
        config: config,
        setUpTooltipUIListeners: this.setUpTooltipUIListeners, // Callback
        setMapStateFromTooltip: this.setMapStateFromTooltip,
        self: this, // Refactor this after getting first iteration complete
      };

      this.localData = data;
      // Process calculations data for csv values
      precalculateActivitiesData(this.localData);
      // Get activities by GEOID (for accuracy)
      precalculateActivitiesData(this.localData, true); // Get more data by GEOID
      this.setUpUIListeners();
      containerElement.setAttribute("data-jurisdiction", "Statewide");
      // Render the display for the first time.
      this.render();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {
    // See listeners to figure out what to disconnect.
  }

  /**
   * Listen to hash change events and update display based on URL params.
   */
  setUpHashListener() {
    window.addEventListener(
      "hashchange",
      () => updateMapJurisdictionDisplayFromHash(location.hash, this.localData),
      false
    );
    updateMapJurisdictionDisplayFromHash(location.hash, this.localData);
  }

  /**
   * Take action when html filters are set.
   */
  setUpUIListeners() {
    this.setUpMapDisplayToggleListeners();
    this.setUpFiltersMenuListener();
    this.setUpActivitiesListeners();
    this.setUpPlacesFilterListeners();
    this.setUpBreadcrumbListeners();
    // Run hash check last to make sure data object is complete.
    // this.setUpHashListener(); // Disabled but may keep UI elements for analytics.
  }

  setUpMapDisplayToggleListeners() {
    // Toggle buttons
    this.toggleCountiesEl.addEventListener("change", (e) =>
      this.setCountyToggle(e, this.localData)
    );

    this.togglePlacesEl.addEventListener("change", (e) =>
      this.setPlaceToggle(e, this.localData)
    );
  }

  setUpActivitiesListeners() {
    var selectActivities = document.querySelector(".filter-activity select");
    selectActivities.addEventListener("change", (e) => {
      this.setActivity(e, this.localData);
    });
  }

  setUpPlacesFilterListeners() {
    // Places
    var setPlace = document.querySelector('.filter[data-filter-type="places"]');
    setPlace.addEventListener("change", (e) => {
      // if (e.detail && e.detail.hash === true){
      //   this.setMapStateFromHash(e, this.localData);
      // } else {
      this.setMapState(e, this.localData);
      // }
    });
  }

  setUpBreadcrumbListeners() {
    // Breadcrumb
    var selectCountyBreadcrumb = document.querySelector(
      ".map-breadcrumb .map-breadcrumb-item[data-jurisdiction=County]"
    );
    selectCountyBreadcrumb.addEventListener("click", (e) => {
      this.setMapStateFromBreadcrumb(e, this.localData);
    });

    var selectStateBreadcrumb = document.querySelector(
      ".map-breadcrumb .map-breadcrumb-item[data-jurisdiction=Statewide]"
    );
    selectStateBreadcrumb.addEventListener("click", (e) => {
      this.setMapStateFromBreadcrumb(e, this.localData);
    });
  }

  /**
   * Set up the open/close listener for the filters.
   */
  setUpFiltersMenuListener() {
    const mapTableEl = document.querySelector(this.containerElement);
    const filterMenuToggleEl = mapTableEl.querySelector(
      ".filters-section-toggler"
    );
    if (filterMenuToggleEl !== null) {
      filterMenuToggleEl.addEventListener("click", (e) => {
        mapTableEl.toggleAttribute("data-filters-open");
      });
    }
  }

  /**
   * Function passed to tooltip as callback
   * @param {*} data 
   */
  setUpTooltipUIListeners(data) {
    try {
      var tooltipLinkCounty = document.querySelector("a.loadCounty");
      tooltipLinkCounty.addEventListener("click", (e) => {
        // console.log(e);
        data.setMapStateFromTooltip(e, data);
      });
    } catch (error) {
      // console.log(error);
    }
    try {
      var tooltipLinkPlace = document.querySelector("a.loadPlace");
      tooltipLinkPlace.addEventListener("click", (e) => {
        data.setMapStateFromTooltip(e, data);
      });
    } catch (error) {
      // console.log(error);
    }
  }

  /**
   * Control toggle behavior for counties button
   * @param {*} e
   * @param {*} data
   */
  setCountyToggle(e, data) {
    data.showCounties = e.currentTarget.checked; // If checked
    if (data.showPlaces === false && data.showCounties === false) {
      data.showPlaces = true;
      this.togglePlacesEl.checked = true;
    }
    this.redraw();
  }

  /**
   * Control toggle behavior for place button
   * @param {*} e
   * @param {*} data
   */
  setPlaceToggle(e, data) {
    data.showPlaces = e.currentTarget.checked; // If checked
    if (data.showCounties === false && data.showPlaces === false) {
      data.showCounties = true;
      this.toggleCountiesEl.checked = true;
    }
    this.redraw();
  }

  /**
   * Set activity state and redraw map
   * @param {*} e
   * @param {*} data
   */
  setActivity(e, data) {
    let entry = e.target.value;
    data.activities = entry;
    // if (data.jurisdiction === "County") {
    //   updateHistory({
    //     "data-jurisdiction": "County",
    //     "data-geoid": data.geoid,
    //     "data-county": data.selectedCounty,
    //     title: "County view",
    //     anchor: "#county-view",
    //     paramString: `?county=${data.selectedCounty}&activity=${entry}`,
    //   });
    // } else if (data.jurisdiction === "Place") {
    //   let currentPlace = this.getCurrentPlaceByGeoid(data, data.geoid);
    //   updateHistory({
    //     title: "Place view",
    //     anchor: "#city-view",
    //     paramString: `?city=${currentPlace["CA Places Key"]}&geoid=${data.geoid}&activity=${entry}`,
    //   });
    // } else if (data.jurisdiction === "Statewide") {
    //   updateHistory({
    //     title: "Statewide view",
    //     "data-activity": entry,
    //     anchor: "",
    //     paramString: `?activity=${entry}`,
    //   });
    // }
    this.redraw();
  }

  updateMapState(entry, data) {
    if (entry !== null) {
      let hasActivities =
        data.activities !== undefined &&
        data.activities !== null &&
        data.activities !== "Any cannabis business";

      // let {jurisdiction, geoid} = data;
      // if (jurisdiction === "County") {
      //   updateHistory({
      //     "data-jurisdiction": "County",
      //     "data-geoid": geoid,
      //     "data-county": entry,
      //     title: "County view",
      //     anchor: "#county-view",
      //     paramString: hasActivities
      //       ? `?county=${entry}&activity=${data.activities}`
      //       : `?county=${entry}`,
      //   });
      // } else if (jurisdiction === "Place") {
      //   let currentPlace = this.getCurrentPlaceByGeoid(data, geoid);
      //   updateHistory({
      //     title: "Place view",
      //     anchor: "#city-view",
      //     paramString: hasActivities
      //       ? `?city=${currentPlace["CA Places Key"]}&geoid=${geoid}&activity=${data.activities}`
      //       : `?city=${currentPlace["CA Places Key"]}&geoid=${geoid}`,
      //   });
      // } else {
      //   console.log("else", data.activities, hasActivities);
      //   updateHistory({
      //     title: "Statewide view",
      //     "data-activity": data.activities,
      //     anchor: "",
      //     paramString: hasActivities ? `?activity=${data.activities}` : "",
      //   });
      // }

      this.setData(entry, this.localData);
      this.setDisplays(this.localData);
      updateDisplaysFromInteraction(this.localData);
    }
  }

  setMapState(e, data) {
    let entry = e.target.value;
    let selectedIndex = e.target.selectedIndex;
    let selectedEl = e.target.options[selectedIndex];
    let geoid = selectedEl.getAttribute("data-geoid") || null;
    let jurisdiction = selectedEl.getAttribute("data-jurisdiction");
    this.localData.jurisdiction = jurisdiction;
    this.localData.geoid = geoid;
    this.updateMapState(entry, data);
  }

  setMapStateFromTooltip(e, data) {
    let selectedEl = e.target;
    let county = selectedEl.getAttribute("data-county") || null;
    let geoid = selectedEl.getAttribute("data-geoid") || null;
    let jurisdiction = selectedEl.getAttribute("data-jurisdiction") || null;
    data.jurisdiction = jurisdiction;
    data.selectedCounty = county;
    data.geoid = geoid;
    let placesOptions = document.querySelectorAll(`.filter[data-filter-type="places"] select option`);
    placesOptions.selected = false;

    if (jurisdiction === "County") {
      let countyOption = document.querySelectorAll(`.filter[data-filter-type="places"] select option[data-jurisdiction="County"][value="${county}"]`);
      if (countyOption !== null) { countyOption.selected = true; }
    } else if (jurisdiction === "Place") {
      let placeOption = document.querySelector(`.filter[data-filter-type="places"] select option[data-geoid="${geoid}"]`);
      if (placeOption !== null) {  placeOption.selected = true; }
    }
    if (jurisdiction === "County") {
      data.self.updateMapState(county, data);
    } else if (jurisdiction === "Place") {
      data.self.updateMapState(geoid, data);
    }
  }

  setMapStateFromHash(e, data) {
    let selectedEl = e.detail.el;
    let county = selectedEl.getAttribute("data-county") || null;
    let geoid = selectedEl.getAttribute("data-geoid") || null;
    let jurisdiction = selectedEl.getAttribute("data-jurisdiction") || null;
    data.jurisdiction = jurisdiction;
    data.selectedCounty = county;
    data.geoid = geoid;
    if (jurisdiction === "County") {
      data.self.updateMapState(data.selectedCounty, data);
    } else if (jurisdiction === "Place") {
      data.self.updateMapState(data.geoid, data);
    } else if (jurisdiction === "Statewide") {
      data.self.updateMapState("", data);
    }
  }

  setMapStateFromBreadcrumb(e, data) {
    let selectedEl = e.target;
    let county = selectedEl.getAttribute("data-county") || null;
    let geoid = selectedEl.getAttribute("data-geoid") || null;
    let jurisdiction = selectedEl.getAttribute("data-jurisdiction") || null;
    data.jurisdiction = jurisdiction;
    data.selectedCounty = county;
    data.geoid = geoid;
    if (jurisdiction === "County") {
      data.self.updateMapState(county, data);
    } else if (jurisdiction === "Place") {
      data.self.updateMapState(geoid, data);
    } else if (jurisdiction === "Statewide") {
      data.self.updateMapState("", data);
    }
  }

  /**
   * Update data object with entry based on already set context settings
   * @param {*} entry
   * @param {*} data
   */
  setData(entry, data) {
    let { jurisdiction, geoid } = data;
    if (entry !== undefined && entry !== null && entry !== "") {
      this.selectedPlaceValue = entry;
      if (jurisdiction === "County") {
        this.selectedCounty = entry;
        data.selectedCounty = entry;
        this.selectedPlace = null;
        data.selectedPlace = null;
        data.selectedPlaceValue = entry; // If checked
        this.jurisdiction = "County";
        data.jurisdiction = "County";
      } else if (jurisdiction === "Place") {
        let currentPlace = this.getCurrentPlaceByGeoid(data, data.geoid);
        try {
          this.selectedCounty = currentPlace.County;
          data.selectedCounty = currentPlace.County;
          this.selectedPlace = currentPlace;
          data.selectedPlace = currentPlace;
          data.selectedPlaceValue = entry; // If checked
          this.jurisdiction = "Place";
          data.jurisdiction = "Place";
        } catch (error) {
          // console.log(error);
        }
      } else {
        this.selectedCounty = null;
        data.selectedCounty = null;
        data.selectedPlaceValue = null;
        data.selectedPlace = null;
        this.jurisdiction = "Statewide";
      }
    } else {
      // Set defaults
      // console.log(this, data);
      this.selectedCounty = null;
      data.selectedCounty = null;
      data.selectedPlaceValue = null;
      data.selectedPlace = null;
      this.jurisdiction = "Statewide";
    }
  }

  /**
   * Update visual UI elements for whole interaction
   * @param {} data
   */
  setDisplays(data) {
    let {
      jurisdiction,
      geoid,
      selectedPlace,
      selectedCounty,
      selectedPlaceValue,
    } = data;
    let containerElement = document.querySelector(this.containerElement);
    let tableContainerElement = document.querySelector(
      data.self.tableContainer
    );
    if (jurisdiction === "County") {
      this.setBreadcrumb(data, "County", selectedCounty);
      containerElement.setAttribute("data-jurisdiction", "County");
      tableContainerElement.updateTable(data, "County", selectedCounty);
    } else if (jurisdiction === "Place") {
      this.setBreadcrumb(data, "Place", selectedPlaceValue, geoid);
      containerElement.setAttribute("data-jurisdiction", "Place");
      tableContainerElement.updateTable(
        data,
        "Place",
        selectedPlaceValue,
        geoid
      );
    } else {
      this.setBreadcrumb(data, "Statewide");
      containerElement.setAttribute("data-jurisdiction", "Statewide");
      tableContainerElement.updateTable(data, "Statewide");
    }

    let tooltipContainer = document.querySelector(this.tooltipElement);
    tooltipContainer.setAttribute("style", "visibility:hidden");
    this.redraw();
  }

  /**
   * Update breadcrumb
   * @param {*} data
   * @param {*} jurisdiction
   * @param {*} county
   * @param {*} geoid
   * @returns
   */
  setBreadcrumb(data, jurisdiction, county, geoid) {
    let stateEl = document.querySelector(
      `cagov-map-table .map-header .map-breadcrumb-item[data-jurisdiction="Statewide"]`
    );
    let countyEl = document.querySelector(
      `cagov-map-table .map-header .map-breadcrumb-item[data-jurisdiction="County"]`
    );
    let countyLink = document.querySelector(
      `cagov-map-table .map-header .map-breadcrumb-item[data-jurisdiction="County"] a`
    );
    let placeEl = document.querySelector(
      `cagov-map-table .map-header .map-breadcrumb-item[data-jurisdiction="Place"]`
    );
    let placeLink = document.querySelector(
      `cagov-map-table .map-header .map-breadcrumb-item[data-jurisdiction="Place"] span.place-label`
    );

    if (
      countyEl !== null &&
      placeEl !== null &&
      stateEl !== null &&
      countyLink !== null &&
      placeLink !== null
    ) {
      let countyData = Object.keys(data.dataPlaces).filter((p) => {
        let item = dataPlaces[p];
        if (
          county === item["County"] &&
          item["Jurisdiction Type"] === "County" &&
          p !== "default"
        ) {
          return p;
        }
      });
      if (jurisdiction === "Statewide") {
        stateEl.setAttribute("data-active", "false");
        countyEl.classList.add("hidden");
        placeEl.classList.add("hidden");
        countyLink.setAttribute("data-jurisdiction", "Statewide");
      } else if (jurisdiction === "County") {
        countyLink.innerHTML = countyData;
        countyLink.setAttribute("href", "#county-view?county=" + county);
        countyLink.setAttribute("data-county", county);
        countyLink.setAttribute("data-jurisdiction", "County");
        countyEl.classList.remove("hidden");
        placeEl.classList.add("hidden");
      } else if (jurisdiction === "Place") {
        if (geoid !== undefined && geoid !== null) {
          let placeData = this.getCurrentPlaceByGeoid(data, geoid);
          try {
            placeLink.setAttribute(
              "href",
              "#" + placeData["CA Places Key"].toLowerCase().replace(/ /g, "-")
            );
            placeLink.setAttribute("data-geoid", placeData.GEOID);
            countyLink.setAttribute("data-jurisdiction", "Place");
            placeLink.innerHTML = placeData["CA Places Key"];
            countyLink.innerHTML = placeData["County label"];
            countyLink.setAttribute(
              "href",
              "#city-view?geoid=" + geoid + "&county=" + placeData["County"]
            );
            countyLink.setAttribute(
              "href",
              "#county-view?county=" + placeData["County"]
            );
            countyLink.setAttribute("data-county", placeData["County"]);
            countyLink.setAttribute("data-jurisdiction", "County");
          } catch (error) {
            // console.log(error);
          }
        }
        countyEl.classList.remove("hidden");
        placeEl.classList.remove("hidden");
      }
    }
    return true;
  }

  getCurrentPlaceByGeoid(data, geoid) {
    let currentPlace = Object.keys(data.dataPlaces).filter((place) => {
      let item = data.dataPlaces[place];
      if (parseInt(geoid) === item["GEOID"] && place !== "default") {
        return place;
      }
    });
    return data.dataPlaces[currentPlace];
  }

  redraw() {
    // Clear previous SVG.
    if (document.querySelector(".map-container .map-detail") !== null) {
      document.querySelector(".map-container .map-detail").innerHTML = "";
    }

    // Generate the map.
    if (this.jurisdiction === "Statewide") {
      this.svg = drawStatewideMap({
        translations: this.translationsStrings,
        data: this.localData,
        mapElement: this.mapElement,
        tooltipElement: this.tooltipElement,
        legendElement: this.legendElement,
        jurisdiction: this.jurisdiction,
        chartOptions: this.chartOptions,
        chartBreakpointValues: this.chartBreakpointValues,
        screenDisplayType: this.screenDisplayType,
        svgFiles: this.svgFiles,
      });
    } else if (this.jurisdiction === "County") {
      this.svg = drawCountyMap({
        translations: this.translationsStrings,
        data: this.localData,
        mapElement: this.mapElement,
        tooltipElement: this.tooltipElement,
        legendElement: this.legendElement,
        jurisdiction: this.jurisdiction,
        chartOptions: this.chartOptions,
        chartBreakpointValues: this.chartBreakpointValues,
        screenDisplayType: this.screenDisplayType,
        svgFiles: this.svgFiles,
      });
    } else if (this.jurisdiction === "Place") {
      this.svg = drawPlaceMap({
        translations: this.translationsStrings,
        data: this.localData,
        mapElement: this.mapElement,
        tooltipElement: this.tooltipElement,
        legendElement: this.legendElement,
        jurisdiction: this.jurisdiction,
        chartOptions: this.chartOptions,
        chartBreakpointValues: this.chartBreakpointValues,
        screenDisplayType: this.screenDisplayType,
        svgFiles: this.svgFiles,
      });
    }
  }

  render() {
    // Replace the enclosing tag element with contents of template.
    this.innerHTML = template({});
    // Draw or redraw the chart.
    this.redraw();
  }
}

if (!customElements.get("cannabis-local-ordinances")) {
  window.customElements.define(
    "cannabis-local-ordinances",
    CannabisLocalOrdinances
  );
}
