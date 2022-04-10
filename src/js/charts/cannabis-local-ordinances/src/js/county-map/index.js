import template from "./template.js";
import drawStatewideMap from "./drawStatewideMap.js";
import drawCountyMap from "./drawCountyMap.js";
import drawPlaceMap from "./drawPlaceMap.js";
import getTranslations from "./get-translations-list.js";
import getScreenResizeCharts from "./get-window-size.js";
import { getActivities } from "./processData.js";
import countyList from "../../../static/assets/data/countyList.json";
import dataPlaces from "../../../static/assets/data/draft-cannabis-local-ordinances-interactive.2022-01-22.json";
import mapMessages from "../../../static/assets/data/mapMessages.json";
import { updateHistory } from "./updateHistory.js";

class CannabisLocalOrdinances extends window.HTMLElement {
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
  }

  /**
   * Run when component is first loaded. Pull any data from the environment.
   */
  connectedCallback() {
    // Get translations from web component markup.
    this.translationsStrings = getTranslations(this);

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
    // Render the chart for the first time.
    this.render();
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {
   
  }

  updateMapLevelFromHash(hash, data) {
    console.log("update hash", hash);
    /// @TODO Throttle
    let county = null;
    let level = "statewide";
    let place = null;
    let geoid = null;


    let splitHash = hash.split("?");
    let params = splitHash[1].split("&");
    let paramKeys = {};
    if (params.length > 0) {
      Object.keys(params).map((param) => {
        let splitParam = params[param].split("=");

        paramKeys[splitParam[0]] = splitParam[1];
      });
    }

    if (splitHash[0] === "#county-view") {
      level = "county";
      if (params !== undefined) {
        if (paramKeys["county"] !== undefined && paramKeys["county"] !== null) {
          county = paramKeys["county"];
        }
      }
    } else if (splitHash[0] === "#city-view") {
      if (params !== undefined) {
        if (paramKeys["city"] !== undefined && paramKeys["city"] !== null) {
          place = paramKeys["city"];
        }

        if (paramKeys["geoid"] !== undefined && paramKeys["geoid"] !== null) {
          geoid = paramKeys["geoid"];

          if (geoid !== undefined && geoid !== null) {
            console.log("GEO", geoid, data);
            // let currentPlace = this.getCurrentPlaceByGeoid(data, geoid);
            // if (currentPlace !== undefined && currentPlace !== null) {
            //   place = currentPlace["CA Places Key"];
            //   county = currentPlace["County label"];
            // }
          }
        }
      }
      level = "place";
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
    } else if (
      level === "place"
    ) {
      // console.log("d", data, "l", level, "c", county, "p", place, "g", geoid);

      var updateOptionPlace = document.querySelector(
        `.filter[data-filter-type="places"] select option[data-geoid="${geoid}"]`
      );

      if (updateOptionPlace !== null && geoid !== null &&
        optionGeoid !== geoid) {
        // console.log("update select filter", setPlaceFilterEl);
        setPlaceFilterEl.selected = false;
        updateOptionPlace.selected = true;
             console.log(updateOptionPlace);
      }
    }
  }

  setActivity(e, data) {
    data.activities = e.target.value;
    this.redraw();
  }

  setCountyToggle(e, data) {
    data.showCounties = e.currentTarget.checked; // If checked
    if (data.showPlaces === false && data.showCounties === false) {
      data.showPlaces = true;
      this.togglePlacesEl.checked = true;
    }
    this.redraw();
  }

  setPlaceToggle(e, data) {
    data.showPlaces = e.currentTarget.checked; // If checked
    if (data.showCounties === false && data.showPlaces === false) {
      data.showCounties = true;
      this.toggleCountiesEl.checked = true;
    }
    this.redraw();
  }

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
        countyLink.setAttribute("href", "#" + county);
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
            "#" + placeData["County"].toLowerCase().replace(/ /g, "-")
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

  setPlace(e, data) {
    let containerElement = document.querySelector("cagov-map-table");
    let tableContainerElement = document.querySelector(this.tableContainer);
    console.log(e.target);
    if (e.target.value !== null && e.target.value !== "") {
      this.selectedPlaceValue = e.target.value;
      let selectedIndex = e.target.selectedIndex;
      let selectedEl = e.target.options[selectedIndex];
      let jurisdiction = selectedEl.getAttribute("data-jurisdiction");
      data.geoid = null;
      this.geoid = null;
      if (jurisdiction === "County") {
        this.selectedCounty = e.target.value;
        data.selectedCounty = e.target.value;
        this.selectedPlace = null;
        data.selectedPlace = null;
        data.selectedPlace = e.target.value; // If checked
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
        data.selectedPlace = e.target.value; // If checked
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
      data.selectedPlace = false;
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

  setupHashListener() {
    window.addEventListener('hashchange', () => this.updateMapLevelFromHash(location.hash, this.localData), false);
    this.updateMapLevelFromHash(location.hash, this.localData)
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
      messages: mapMessages,
    };

    var selectActivities = document.querySelector(".filter-activity select");
    selectActivities.addEventListener("change", (e) =>
      this.setActivity(e, data)
    );

    this.toggleCountiesEl.addEventListener("change", (e) =>
      this.setCountyToggle(e, data)
    );
    this.togglePlacesEl.addEventListener("change", (e) =>
      this.setPlaceToggle(e, data)
    );

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

if (!customElements.get("cannabis-local-ordinances")) {
  window.customElements.define(
    "cannabis-local-ordinances",
    CannabisLocalOrdinances
  );
}
