import template from "./template.js";
import drawCountyMap from "./drawCountyMap.js";
import getTranslations from "./get-translations-list.js";
import getScreenResizeCharts from "./get-window-size.js";
// import rtlOverride from "./rtl-override.js"; // Let's have an example with Arabic & Chinese for the bar charts.
// import { reformatReadableDate } from "./readable-date.js";

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
          width: 600,
          height: 400,
        },
        tablet: {
          width: 600,
          height: 1200,
        },
        mobile: {
          width: 400,
          height: 800,
        },
        retina: {
          width: 600,
          height: 400,
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
        this.handleChartResize(e);
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
    this.updateScreenOptions(e)
    // Trigger component redraw (any component on this page with this name) this makes sense for window resize events, but if you want more individualized redraws will need to 
    document.querySelector("cagov-county-map").redraw();
  }

  updateScreenOptions(e) {
    this.screenDisplayType = window.charts
      ? window.charts.displayType
      : "desktop";
    this.chartBreakpointValues = this.chartOptions.screens[
      this.screenDisplayType ? this.screenDisplayType : "desktop"
    ];
    // console.log(this.screenDisplayType);
  }

  redraw() {
    // Listen for responsive resize event and get the settings for the responsive chart sizes.
    getScreenResizeCharts(this);
    this.updateScreenOptions();

    // Clear previous SVG.
    if (document.querySelector('.map-container') !== null) {
      document.querySelector('.map-container').innerHTML = "";
    }
    // Generate the map.
    this.svg = drawCountyMap({
      translations: this.translationsStrings,
      data: this.localData,
      domElement: ".map-container",
      chartOptions: this.chartOptions,
      chartBreakpointValues: this.chartBreakpointValues,
      screenDisplayType: this.screenDisplayType,
    });
  }

  // Manually triggered method to get or update and render dynamic data and pass into the template.
  render() {
    // Read content of stringified data-json that is inserted into the enclosing tag of the web-component.
    this.localData = JSON.parse(this.dataset.json);
    // Replace the enclosing tag element with contents of template.
    this.innerHTML = template({
      translations: this.translationsStrings,
      localData: this.localData,
    });
    // Draw or redraw the chart.
    this.redraw();
  }
}

window.customElements.define("cagov-covid19-reopening-county-map", CaGovCountyMap);
