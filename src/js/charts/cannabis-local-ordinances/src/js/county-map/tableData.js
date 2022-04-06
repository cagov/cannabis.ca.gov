
class CaGovTableData extends window.HTMLElement {
  // Set up static variables that are specific to this component.
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
  constructor() {
    super();
    // Optional state object to use for persisting data across interactions.
    this.state = {};

    this.domElement = ".map-container .map-detail";
    this.mapLevel = "Statewide";
    this.jurisdiction = null;
    this.tooltipElement = ".map-container .tooltips";

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
    document.querySelector("cagov-table-data").redraw();
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
    this.redraw();
  }

  setCityToggle(e, data) {
    data.showPlaces = e.currentTarget.checked; // If checked
    this.redraw();
  }

  setPlace(e, data) {
    if (e.target.value !== null && e.target.value !== "") {
      // console.log("County", e.target.value);
      this.selectedCounty = e.target.value;
      data.selectedCounty = e.target.value;
      data.showPlace = e.target.value; // If checked
      this.mapLevel = "County";
      this.redraw();
    } else {
      // console.log("Statewide", e.target.value);
      this.selectedCounty = null;
      data.selectedCounty = null;
      data.showPlace = false;
      this.mapLevel = "Statewide";
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
      messages: {
        
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

if (!customElements.get("cagov-table-data")) {
  window.customElements.define("cagov-table-data", CaGovTableData);
}
