import template from "./template.js";
import drawCountyMap from "./drawCountyMap.js";
import getTranslations from "./get-translations-list.js";
import getScreenResizeCharts from "./get-window-size.js";
import { getActivities, getActivitiesDataSchema } from "./processData.js";

// import * as landArea from "./../../../static/data/landArea.json"; // Deprecating
// import * as ca from "./../../../static/data/ca.json"; // Deprecating
// import * as counties from "./../../../static/data/counties.json"; // Deprecating
import * as countyList from "./../../../static/data/countyList.json";
import * as dataPlaces from "./../../../static/data/draft-cannabis-legal-access.2022-01-22.json";
// import * as places from "./../../../static/data/CA_Places_TIGER2016.json"; // Deprecating

class CaGovCountyMap extends window.HTMLElement {
  // Set up static variables that are specific to this component.
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
  constructor() {
    super();
    // Optional state object to use for persisting data across interactions.
    this.state = {};
    // Establish chart variables and settings.
    this.chartOptions = {
      screens: {
        desktop: {
          width: 1500,
          height: 1500,
          // width: 876,
          // height: 604,
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

  redraw() {
    // Listen for responsive resize event and get the settings for the responsive chart sizes.
    getScreenResizeCharts(this);
    this.updateScreenOptions();

    // Clear previous SVG.
    if (document.querySelector(".map-container .map-detail") !== null) {
      document.querySelector(".map-container .map-detail").innerHTML = "";
    }
    // Generate the map.
    this.svg = drawCountyMap({
      translations: this.translationsStrings,
      data: this.localData,
      domElement: ".map-container .map-detail",
      tooltipElement: ".map-container .tooltips",
      chartOptions: this.chartOptions,
      chartBreakpointValues: this.chartBreakpointValues,
      screenDisplayType: this.screenDisplayType,
    });
  }

  setActivity(e, data) {
    data.activities = e.target.value;
    this.redraw();
  }

  render() {
    let data = {
      dataPlaces: Object.assign({}, dataPlaces),
      countyList: Object.assign({}, countyList),
      activities: "All activities",
      messages: {
        "StatewideAllActivities": {
          all: "Cities and counties that allow at least 1 type of cannabis business activity",
          city: "Cities that allow at least 1 type of cannabis business activity",
          county: "Counties that allow at least 1 type of cannabis business activity",
          prohibited: "Prohibit: <span data-status=\"percentage-prohibited\"></span>",
          allowed: "Allow: <span data-status=\"percentage-allowed\"></span>",      
          detailsCTA: "<em>Click to view details about this county</em>",
        },
        "StatewideActivity": {
          all: "Cities and counties that allow <span data-status=\"activity\"></span>",
          city: "Cities that allow <span data-status=\"activity\"></span>",
          county: "Counties that allow <span data-status=\"activity\"></span>",
          prohibited: "Prohibit: <span data-status=\"percentage-prohibited\"></span>",
          allowed: "Allow: <span data-status=\"percentage-allowed\"></span>",      
          detailsCTA: "<em>Click to view details about this county</em>",
        },
        "CountyAllActivities": {
          all: "County and cities that allow at least 1 type of cannabis business activity",
          city: "Cities that allow <span data-status=\"activity\"></span>",
          prohibited: "At least 1 type of cannabis business activity is allowed",
          allowed: "No cannabis business activity allowed",  
          detailsCTA: "<em>Click to view details about this county</em>",
        },
        "CountyActivity": {
          all: "County and cities that allow at least 1 type of cannabis business activity",
          city: "Cities that allow <span data-status=\"activity\"></span>",
          prohibited: "<span data-status=\"percentage-prohibited\"></span> prohibited",
          allowed: "<span data-status=\"percentage-allowed\"></span> allowed",      
          detailsCTA: "<em>Details about this city</em>",
        },
      }
    };

    var select = document.querySelector(".filter-activity select");
    select.addEventListener("change", (e) => this.setActivity(e, data));

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
