import template from "./template.js";
import drawStatewideMap from "./drawStatewideMap.js";
import drawCountyMap from "./drawCountyMap.js";
import drawPlaceMap from "./drawPlaceMap.js";
import getTranslations from "./get-translations-list.js";
import getScreenResizeCharts from "./get-window-size.js";
import { getActivities, getActivitiesDataSchema } from "./processData.js";
import * as countyList from "../../../static/assets/data/countyList.json";
import * as dataPlaces from "../../../static/assets/data/draft-cannabis-local-ordinances-interactive.2022-01-22.json";
import * as mapMessages from "../../../static/assets/data/mapMessages.json";

class CaGovCountyMap extends window.HTMLElement {
  // Set up static variables that are specific to this component.
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
  constructor() {
    super();
    // Optional state object to use for persisting data across interactions.
    this.state = {};
    this.mapLevel = "Statewide";
    this.jurisdiction = null;
    this.domElement = ".map-container .map-detail";
    this.tooltipElement = ".map-container .tooltips";
    this.legendElement = ".map-legend";
    this.toggleCountiesEl = document.querySelector(
      '.toggle-button [data-target="toggle-counties"]'
    );
    this.togglePlacesEl = document.querySelector(
      '.toggle-button [data-target="toggle-cities"]'
    );
    // Establish chart variables and settings.
    this.chartOptions = {
      screens: {
        desktop: {
          // width: 1500,
          // height: 1500,
          width: 876,
          height: 604,
        },
        tablet: {
          width: 876,
          height: 604,
        },
        mobile: {
          width: 876,
          height: 604,
        },
        retina: {
          width: 876,
          height: 604,
        },
      },
    };
  }

  /**
   * Run when component is first loaded. Pull any data from the environment.
   */
  connectedCallback() {
    window.addEventListener("resize", (e) => {
      // console.log("resize");
      // this.handleChartResize(e);
    });

    // Get translations from web component markup.
    this.translationsStrings = getTranslations(this);

    // Render the chart for the first time.
    this.render();
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {
    window.removeEventListener("resize", this.handleChartResize);
  }

  // Display content & layout dimensions.
  handleChartResize(e) {
    getScreenResizeCharts(this);
    this.updateScreenOptions(e);
    // Trigger component redraw (any component on this page with this name) this makes sense for window resize events, but if you want more individualized redraws will need to
    document.querySelector("cagov-county-map").redraw();
  }

  updateScreenOptions(e) {
    this.screenDisplayType = window.charts
      ? window.charts.displayType
      : "desktop";
    this.chartBreakpointValues =
      this.chartOptions.screens[
        this.screenDisplayType ? this.screenDisplayType : "desktop"
      ];
  }

  setActivity(e, data) {
    data.activities = e.target.value;
    this.redraw();
  }

  setCountyToggle(e, data) {
    data.showCounties = e.currentTarget.checked; // If checked
    if (data.showPlaces === false && data.showCounties === false){
      data.showPlaces = true;
      this.togglePlacesEl.checked = true;
    }
    this.redraw();
  }

  setPlaceToggle(e, data) {
    data.showPlaces = e.currentTarget.checked; // If checked
    if (data.showCounties === false && data.showPlaces === false){
      data.showCounties = true;
      this.toggleCountiesEl.checked = true;
    }
    this.redraw();
  }

  setBreadcrumb(data, level, county, geoid) {
    let stateEl = document.querySelector(`cagov-map-table .map-header .breadcrumb-item[data-level="state"]`);
    let countyEl = document.querySelector(`cagov-map-table .map-header .breadcrumb-item[data-level="county"]`);
    let countyLink = document.querySelector(`cagov-map-table .map-header .breadcrumb-item[data-level="county"] a`);
    let placeEl = document.querySelector(`cagov-map-table .map-header .breadcrumb-item[data-level="place"]`);
    let placeLink = document.querySelector(`cagov-map-table .map-header .breadcrumb-item[data-level="place"] span.place-label`);

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
      stateEl = 
      countyEl.classList.add('hidden');
      placeEl.classList.add('hidden');
    } else if (level === "county") {
      countyLink.innerHTML = countyData;
      countyLink.setAttribute("href", "#" + county);
      countyEl.classList.remove('hidden');
    } else if (level === "place") {
      if (geoid !== null) {
        let placeData = this.getCurrentPlaceByGeoid(data, geoid);
        placeLink.setAttribute("href", "#" + placeData["CA Places Key"].toLowerCase().replace(" ", "-"));
        placeLink.innerHTML = placeData["CA Places Key"];
        countyLink.innerHTML = placeData["County label"];
        countyLink.setAttribute("href", "#" + placeData["County"].toLowerCase().replace(" ", "-"));
      }
      countyEl.classList.remove('hidden');
      placeEl.classList.remove('hidden');
    }
    return true;
  }


  updateTable(data, level, county, geoid) {
    let tableSelector = "cagov-table-data table";
    let tableElement = document.querySelector(tableSelector);
    let tableElements = document.querySelectorAll(`${tableSelector} tbody tr`);
    Object.keys(tableElements).map((index) => {
      tableElements[index].classList.add("hidden");
      tableElements[index].classList.remove("county-row");
    });
    if (level === "statewide") {
      tableElements = document.querySelectorAll(`${tableSelector} tbody tr[j="County"]`);
      Object.keys(tableElements).map((index) => tableElements[index].classList.remove("hidden"));
      tableElement.classList.add(level);
    } else if (level === "county") {
      let query = `${tableSelector} tr[c="${data.showPlace}"]`; // Everything in the county.
      tableElements = document.querySelectorAll(query);
      Object.keys(tableElements).map((index) => {
        tableElements[index].classList.remove("hidden");
        if (index === "0") {
          tableElements[index].classList.add("county-row");
          tableElements[index].querySelector("td:first-child").innerHTML = data.messages.TableLabelCountyWide
        }
      });
      tableElement.classList.add(level);
    } else if (level === "place") {
      if (geoid !== null) {
        let query = `${tableSelector} tr[data-geoid="${geoid}"]`; // Everything in the county.
        tableElements = document.querySelectorAll(query);
        Object.keys(tableElements).map((index) => {
          tableElements[index].classList.remove("hidden");
          if (index === "0") {
            tableElements[index].classList.add("county-row");
          }
        });
      }
      tableElement.classList.add(level);
    }
    return true;
  }

  getCurrentPlaceByGeoid(data, geoid) {
    let currentPlace = Object.keys(data.dataPlaces).filter((place) => {
      let item = data.dataPlaces[place];
      if (
        parseInt(geoid) === item["GEOID"] && 
        place !== "default"
      ) {
        return place;
      }
    });
    return data.dataPlaces[currentPlace];
  }

  setPlace(e, data) {
    if (e.target.value !== null && e.target.value !== "") {
      this.selectedPlaceValue = e.target.value;
      let selectedIndex = e.target.selectedIndex;
      let selectedEl = e.target.options[selectedIndex];
      let jurisdiction = selectedEl.getAttribute("data-jurisdiction");

      if (jurisdiction === "County") {
        this.selectedCounty = e.target.value;
        data.selectedCounty = e.target.value;
        this.selectedPlace = null;
        data.selectedPlace = null;
        data.showPlace = e.target.value; // If checked
        this.mapLevel = "County";
        this.setBreadcrumb(data, "county", this.selectedCounty);
        this.updateTable(data, "county", this.selectedCounty);
      } else if (jurisdiction === "Place") {
        /// use geoid = get Place
        let geoid = selectedEl.getAttribute("data-geoid");
        let currentPlace = this.getCurrentPlaceByGeoid(data, geoid);
        // console.log("currentPlace", currentPlace, currentPlace.County);
        this.selectedCounty = currentPlace.County;
        data.selectedCounty = currentPlace.County;
        this.selectedPlace = currentPlace;
        data.selectedPlace = currentPlace;
        data.showPlace = e.target.value; // If checked
        this.mapLevel = "Place";
        this.setBreadcrumb(data, "place", currentPlace, geoid);
        this.updateTable(data, "place", currentPlace, geoid);
      }
  
      this.redraw();
    } else {
      this.selectedCounty = null;
      data.selectedCounty = null;
      data.selectedPlace = null;
      data.showPlace = false;
      this.mapLevel = "Statewide";
      this.setBreadcrumb(data, "state");
      this.redraw();
    }
  }

  redraw() {
    // Listen for responsive resize event and get the settings for the responsive chart sizes.
    getScreenResizeCharts(this);
    this.updateScreenOptions();

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
      });
    }
  }

  render() {
    let data = {
      dataPlaces: Object.assign({}, dataPlaces),
      countyList: Object.assign({}, countyList),
      activities: "Any activities", // For activity mode
      jurisdiction: "All", // For data layer mode
      mapLevel: "Statewide", // For map zoom level
      showCounties: true,
      showPlaces: true,
      messages: mapMessages
    };

    var selectActivities = document.querySelector(".filter-activity select");
    selectActivities.addEventListener("change", (e) =>
      this.setActivity(e, data)
    );

    this.toggleCountiesEl.addEventListener("change", (e) => this.setCountyToggle(e, data));
    this.togglePlacesEl.addEventListener("change", (e) => this.setPlaceToggle(e, data));

    var setPlace = document.querySelector('.filter[data-filter-type="places"]');
    setPlace.addEventListener("change", (e) => this.setPlace(e, data));

    getActivities(data);
    // Get activities by GEOID (for accuracy)
    getActivities(data, true); // Remember why we have to do this twice (what's the boolean value for? - add docs)

    this.localData = data;
    this.container = this.dataset.container;
    // Replace the enclosing tag element with contents of template.
    this.innerHTML = template({});

    // Draw or redraw the chart.
    this.redraw();
  }
}

if (!customElements.get("cagov-county-map")) {
  window.customElements.define("cagov-county-map", CaGovCountyMap);
}
