import template from "./template.js";
import drawStatewideMap from "./drawStatewideMap.js";
import drawCountyMap from "./drawCountyMap.js";
import getTranslations from "./get-translations-list.js";
import getScreenResizeCharts from "./get-window-size.js";
import { getActivities, getActivitiesDataSchema } from "./processData.js";
import * as countyList from "../../../static/assets/data/countyList.json";
import * as dataPlaces from "../../../static/assets/data/draft-cannabis-legal-access-interactive.2022-01-22.json";

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
    // cagov-map-table .map-header .breadcrumb .breadcrumb-item[data-level="county"]
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

    // @TODO convert to utility
    // @TODO Finish breadcrumb label for city
    let placeData = Object.keys(data.dataPlaces).filter((p) => {
      let item = dataPlaces[p];
      if (
        geoid === item["GEOID"] &&
        item["Jurisdiction Type"] === "City" &&
        place !== "default"
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
      // placeLink.innerHTML = "";
      console.log(countyLink);
      countyLink.setAttribute("href", "#" + county);
      // placeLink.setAttribute("href", "#" + place);
      countyEl.classList.remove('hidden');
      // placeEl.classList.add('hidden');
    } else if (level === "place") {
      // countyLink.innerHTML = county;
      // placeLink.innerHTML = place;
      // countyLink.setAttribute("href", "#" + county);
      // placeLink.setAttribute("href", "#" + place);
      // countyEl.classList.remove('hidden');
      // placeEl.classList.remove('hidden');
    }
    return true;
  }

  setCityToggle(e, data) {
    data.showCities = e.currentTarget.checked; // If checked
    this.redraw();
  }

  setPlace(e, data) {
    if (e.target.value !== null && e.target.value !== "") {
      this.selectedCounty = e.target.value;
      data.selectedCounty = e.target.value;
      data.showPlace = e.target.value; // If checked
      this.mapLevel = "County";
      this.setBreadcrumb(data, "county", this.selectedCounty);
      this.redraw();
    } else {
      this.selectedCounty = null;
      data.selectedCounty = null;
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
      showCities: true,
      messages: {
        LegendStatewide: {
          allowed: "<strong>Allow:</strong><span data-status=\"percentage-allowed\"></span>% of cities and counties allow at least one cannabis business activity",
          prohibited: "<strong>Prohibit:</strong><span data-status=\"percentage-prohibited\"></span>% of cities and counties prohibit all cannabis business activities",
        },
        StatewideAllActivities: {
          all: "Cities and counties that allow at least 1 type of cannabis business activity",
          city: "Cities that allow at least 1 type of cannabis business activity",
          county:
            "Counties that allow at least 1 type of cannabis business activity",
          prohibited:
            'Prohibit: <span data-status="percentage-prohibited"></span>',
          allowed: 'Allow: <span data-status="percentage-allowed"></span>',
          detailsCTA: "<em>Click to view details about this county</em>",
        },
        StatewideActivity: {
          all: 'Cities and counties that allow <strong><span data-status="activity"></span></strong>',
          city: 'Cities that allow <span data-status="activity"></span>',
          county:
            'Counties that allow <strong><span data-status="activity"></span></strong>',
          prohibited:
            'Prohibit: <span data-status="percentage-prohibited"></span>',
          allowed: 'Allow: <span data-status="percentage-allowed"></span>',
          detailsCTA: "<em>Click to view details about this county</em>",
        },
        CountyAllActivities: {
          all: "County and cities that allow at least 1 type of cannabis business activity",
          city: 'Cities that allow <strong><span data-status="activity"></span></strong>',
          prohibited: "Prohibited",
          allowed:
            "At least 1 type of cannabis business activity is allowed",
          prohibitedLegend:
            'Prohibit: <span data-status="percentage-prohibited"></span>',
          allowedLegend: 'Allow: <span data-status="percentage-allowed"></span>',
          detailsCTA: "<em>Details about this city</em>",
        },
        CountyActivity: {
          all: "County and cities that allow at least 1 type of cannabis business activity",
          city: 'Cities that allow <strong><span data-status="activity"></span></strong>',
          prohibited: "Prohibited",
          allowed: 'Allowed',
          detailsCTA: "<em>Details about this city</em>",
        },
      },
    };

    var selectActivities = document.querySelector(".filter-activity select");
    selectActivities.addEventListener("change", (e) =>
      this.setActivity(e, data)
    );

    var toggleCounties = document.querySelector(
      '.toggle-button [data-target="toggle-counties"]'
    );
    toggleCounties.addEventListener("change", (e) =>
      this.setCountyToggle(e, data)
    );

    var toggleCities = document.querySelector(
      '.toggle-button [data-target="toggle-cities"]'
    );
    toggleCities.addEventListener("change", (e) => this.setCityToggle(e, data));

    var setPlace = document.querySelector('.filter[data-filter-type="places"]');
    setPlace.addEventListener("change", (e) => this.setPlace(e, data));

    getActivities(data); // development
    // Get activities by GEOID (for accuracy)
    getActivities(data, true);

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
