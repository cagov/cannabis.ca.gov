import template from "./template.js";
import drawStatewideMap from "./drawStatewideMap.js";
import drawCountyMap from "./drawCountyMap.js";
import drawPlaceMap from "./drawPlaceMap.js";
// import getTranslations from "./get-translations-list.js";
// import getScreenResizeCharts from "./get-window-size.js";
import { precalculateActivitiesData } from "./processData.js";
import countyList from "../../../static/assets/data/countyList.json";
import dataPlaces from "../../../static/assets/data/draft-cannabis-local-ordinances-interactive.2022-01-22.json";
import mapMessages from "../../../static/assets/data/mapMessages.json";
import { updateHistory, updateMapLevelFromHash } from "./updateHistory.js";

class CannabisLocalOrdinances extends window.HTMLElement {
  // Set up static variables that are specific to this component.
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
  constructor() {
    super();
    // Optional state object to use for persisting data across interactions.
    this.state = {};
    this.mapLevel = "Statewide";
    this.jurisdiction = null;
    this.activites = "All";
    this.domElement = ".map-container .map-detail";
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

    this.setupHashListener();
    this.setupFilterListeners();

    let data = {
      dataPlaces: Object.assign({}, dataPlaces),
      countyList: Object.assign({}, countyList),
      activities: "Any activities", // For activity mode
      jurisdiction: "All", // For data layer mode
      mapLevel: "Statewide", // For map zoom level
      showCounties: true,
      showPlaces: true,
      messages: mapMessages,
    };
    this.localData = data;
    // Process calculations data for csv values
    precalculateActivitiesData(this.localData);
    // Get activities by GEOID (for accuracy)
    precalculateActivitiesData(this.localData, true); // Get more data by GEOID

    // Render the display for the first time.
    this.render();
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {}

  /**
   * Listen to hash change events and update display based on URL params.
   */
  setupHashListener() {
    // window.addEventListener(
    //   "hashchange",
    //   () => updateMapLevelFromHash(location.hash, this.localData),
    //   false
    // );
    // updateMapLevelFromHash(location.hash, this.localData);
  }

  /**
   * Take action when html filters are set.
   */
  setupFilterListeners() {
    // Toggle buttons
    this.toggleCountiesEl.addEventListener("change", (e) =>
      this.setCountyToggle(e, this.localData)
    );

    this.togglePlacesEl.addEventListener("change", (e) =>
      this.setPlaceToggle(e, this.localData)
    );

    var setPlace = document.querySelector('.filter[data-filter-type="places"]');
    setPlace.addEventListener("change", (e) => {
      // console.log(e.target);
      this.setMapState(e, this.localData);
    });

    var selectActivities = document.querySelector(".filter-activity select");
    selectActivities.addEventListener("change", (e) => {
      // console.log(e.target);
      this.setActivity(e, this.localData);
    });
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
    data.activities = e.target.value;
    this.redraw();
  }

  /**
   *
   * @param {*} e
   * @param {*} data
   */
  setMapStateOld(e, data) {
    let containerElement = document.querySelector("cagov-map-table");
    let tableContainerElement = document.querySelector(this.tableContainer);
    // console.log(e.target);
    if (e.target.value !== null && e.target.value !== "") {
      this.selectedPlaceValue = e.target.value;
      let selectedIndex = e.target.selectedIndex;
      let selectedEl = e.target.options[selectedIndex];
      let jurisdiction = selectedEl.getAttribute("data-jurisdiction");
      this.jurisdiction = jurisdiction;
      data.geoid = null;
      this.geoid = null;
      if (jurisdiction === "County") {
        this.selectedCounty = e.target.value;
        data.selectedCounty = e.target.value;
        this.selectedPlace = null;
        data.selectedPlace = null;
        data.selectedPlaceValue = e.target.value; // If checked
        this.mapLevel = "County";
        data.mapLevel = "County";
        this.setBreadcrumb(data, "county", this.selectedCounty);
        tableContainerElement.updateTable(data, "county", this.selectedCounty);
        containerElement.setAttribute("data-map-level", "county");
        updateHistory({
          "data-map-level": "county",
          "data-geoid": this.geoid,
          "data-county": data.selectedCounty,
          title: "County view",
          anchor: "#county-view",
          paramString: `?county=${data.selectedCounty}`,
        });
      } else if (jurisdiction === "Place") {
        let geoid = selectedEl.getAttribute("data-geoid");
        let currentPlace = this.getCurrentPlaceByGeoid(data, geoid);
        this.selectedCounty = currentPlace.County;
        data.selectedCounty = currentPlace.County;
        this.selectedPlace = currentPlace;
        data.selectedPlace = currentPlace;
        data.geoid = geoid;
        this.geoid = geoid;
        data.selectedPlaceValue = e.target.value; // If checked
        this.mapLevel = "Place";
        data.mapLevel = "Place";
        this.setBreadcrumb(data, "place", currentPlace, geoid);
        tableContainerElement.updateTable(data, "place", currentPlace, geoid);
        containerElement.setAttribute("data-map-level", "place");
        updateHistory({
          title: "Place view",
          anchor: "#city-view",
          paramString: `?city=${currentPlace["CA Places Key"]}&geoid=${geoid}`,
        });
      }
      this.redraw();
    } else {
      this.selectedCounty = null;
      data.selectedCounty = null;
      data.selectedPlace = null;
      data.selectedPlaceValue = null;
      this.mapLevel = "Statewide";
      this.setBreadcrumb(data, "state");
      containerElement.setAttribute("data-map-level", "statewide");
      this.redraw();

      updateHistory({
        "data-map-level": "county",
        "data-geoid": geoid,
        "data-county": name,
        title: "County view",
        anchor: "#county-view",
        paramString: `?county=${name}`,
      });
    }
  }

  setMapState(e) {
    
    let selectedIndex = e.target.selectedIndex;
    let selectedEl = e.target.options[selectedIndex];
    let geoid = selectedEl.getAttribute("data-geoid") || null;
    let jurisdiction = selectedEl.getAttribute("data-jurisdiction");
    let entry = e.target.value;
    // console.log(entry);
    this.localData.jurisdiction = jurisdiction;
    this.localData.geoid = geoid;
    this.setData(entry, this.localData);
    this.setDisplays(this.localData);
  }

  setData(entry, data) {
    let { jurisdiction, geoid } = data;
    // console.log("j", jurisdiction, geoid, entry);
    if (entry !== undefined && entry !== null && entry !== "") {
      this.selectedPlaceValue = entry;
      if (jurisdiction === "County") {
        this.selectedCounty = entry;
        data.selectedCounty = entry;
        this.selectedPlace = null;
        data.selectedPlace = null;
        data.selectedPlaceValue = entry; // If checked
        this.mapLevel = "County";
        data.mapLevel = "County";
      } else if (jurisdiction === "Place") {
        let currentPlace = this.getCurrentPlaceByGeoid(data, data.geoid);
        this.selectedCounty = currentPlace.County;
        data.selectedCounty = currentPlace.County;
        this.selectedPlace = currentPlace;
        data.selectedPlace = currentPlace;
        data.selectedPlaceValue = entry; // If checked
        this.mapLevel = "Place";
        data.mapLevel = "Place";
      }
    } else {
      this.selectedCounty = null;
      data.selectedCounty = null;
      data.selectedPlaceValue = null;
      data.selectedPlace = null;
      this.mapLevel = "Statewide";
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
    // console.log(
    //   "displays",
    //   jurisdiction,
    //   geoid,
    //   selectedPlace,
    //   selectedPlaceValue,
    //   selectedCounty
    // );
    let containerElement = document.querySelector("cagov-map-table");
    let tableContainerElement = document.querySelector(this.tableContainer);
    if (jurisdiction === "County") {
      this.setBreadcrumb(data, "county", selectedCounty);
      containerElement.setAttribute("data-map-level", "county");
      tableContainerElement.updateTable(data, "county", selectedCounty);
    } else if (jurisdiction === "Place") {
      this.setBreadcrumb(data, "place", selectedPlaceValue, geoid);
      containerElement.setAttribute("data-map-level", "place");
      tableContainerElement.updateTable(
        data,
        "place",
        selectedPlaceValue,
        geoid
      );
    } else {
      this.setBreadcrumb(data, "state");
      tableContainerElement.updateTable(data, "statewide");
    }

    let tooltipContainer = document.querySelector(this.tooltipElement);
    tooltipContainer.setAttribute("style","visibility:hidden");
    this.redraw();
  }

  /**
   * Update breadcrumb
   * @param {*} data
   * @param {*} level
   * @param {*} county
   * @param {*} geoid
   * @returns
   */
  setBreadcrumb(data, level, county, geoid) {
    let stateEl = document.querySelector(
      `cagov-map-table .map-header .breadcrumb-item[data-level="state"]`
    );
    let countyEl = document.querySelector(
      `cagov-map-table .map-header .breadcrumb-item[data-level="county"]`
    );
    let countyLink = document.querySelector(
      `cagov-map-table .map-header .breadcrumb-item[data-level="county"] a`
    );
    let placeEl = document.querySelector(
      `cagov-map-table .map-header .breadcrumb-item[data-level="place"]`
    );
    let placeLink = document.querySelector(
      `cagov-map-table .map-header .breadcrumb-item[data-level="place"] span.place-label`
    );

    if (
      countyEl !== null &&
      placeEl !== null &&
      stateEl !== null &&
      countyLink !== null &&
      placeLink !== null
    ) {
      // @TODO convert to utility
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

      if (level === "statewide") {
        stateEl = countyEl.classList.add("hidden");
        placeEl.classList.add("hidden");
      } else if (level === "county") {
        countyLink.innerHTML = countyData;
        countyLink.setAttribute("href", "#county-view?county=" + county);
        countyEl.classList.remove("hidden");
      } else if (level === "place") {
        if (geoid !== undefined && geoid !== null) {
          let placeData = this.getCurrentPlaceByGeoid(data, geoid);
          placeLink.setAttribute(
            "href",
            "#" + placeData["CA Places Key"].toLowerCase().replace(/ /g, "-")
          );
          placeLink.innerHTML = placeData["CA Places Key"];
          countyLink.innerHTML = placeData["County label"];
          countyLink.setAttribute(
            "href",
            "#city-view?geoid=" + geoid + "&county=" + placeData["County"]
          );
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
    if (this.mapLevel === "Statewide") {
      this.svg = drawStatewideMap({
        translations: this.translationsStrings,
        data: this.localData,
        domElement: this.domElement,
        tooltipElement: this.tooltipElement,
        legendElement: this.legendElement,
        mapLevel: this.mapLevel,
        jurisdiction: this.jurisdiction,
        chartOptions: this.chartOptions,
        chartBreakpointValues: this.chartBreakpointValues,
        screenDisplayType: this.screenDisplayType,
        svgFiles: this.svgFiles,
      });
    } else if (this.mapLevel === "County") {
      this.svg = drawCountyMap({
        translations: this.translationsStrings,
        data: this.localData,
        domElement: this.domElement,
        tooltipElement: this.tooltipElement,
        legendElement: this.legendElement,
        mapLevel: this.mapLevel,
        jurisdiction: this.jurisdiction,
        chartOptions: this.chartOptions,
        chartBreakpointValues: this.chartBreakpointValues,
        screenDisplayType: this.screenDisplayType,
        svgFiles: this.svgFiles,
      });
    } else if (this.mapLevel === "Place") {
      this.svg = drawPlaceMap({
        translations: this.translationsStrings,
        data: this.localData,
        domElement: this.domElement,
        tooltipElement: this.tooltipElement,
        legendElement: this.legendElement,
        mapLevel: this.mapLevel,
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
