import { xml } from "d3-fetch";
import mapMessages from "../../../static/assets/data/mapMessages.json";

class CAGovTableData extends window.HTMLElement {
  // Set up static variables that are specific to this component.
  // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks
  constructor() {
    super();
    // Optional state object to use for persisting data across interactions.
    this.state = {};
  }

  /**
   * Run when component is first loaded. Pull any data from the environment.
   */
  connectedCallback() {
    this.mapContainer = this.dataset.mapContainer;
    let mapContainer = document.querySelector(this.mapContainer);
    let dataPlaces = mapContainer.localData.dataPlaces;

    let tableData = this.buildTable(dataPlaces);
    this.innerHTML = tableData;
    this.updateTable(mapContainer.localData);
  }

  /** Create HTML for table */
  buildTable(data) {
    let fields = [
      "CA Places Key",
      "Place",
      "GEOID",
      "County",
      "County label",
      "Jurisdiction Type",
      "Retail: Storefront",
      "Retail: Non-Storefront",
      "Distribution",
      "Testing",
      "Manufacturing",
      "Cultivation",
      "Are all CCA activites prohibited?",
      "Is all retail prohibited?",
      "CCA Prohibited by County",
    ];
    return this.htmlTable(fields, data);
  }

  /**
   * Create HTML markup
   * @NOTE - Planning to restructure this to use field names as keys, will be easier to work with.
   * @param {*} fields 
   * @param {*} data 
   * @returns 
   */
  htmlTable(fields, data) {
    if (
      fields !== undefined &&
      fields !== null &&
      fields.length > 0 &&
      Object.keys(data).length > 0
    ) {
      let tableData = [];
      Object.keys(data).map((dataKey) => {
        let rowData = {};
        // rowData["Place"] = dataKey;
        Object.keys(fields).map((fieldKey) => {
          rowData[fieldKey] = data[dataKey][fields[fieldKey]];
          // rowData[fields[fieldKey]] = data[dataKey][fields[fieldKey]];
        });
        tableData.push(rowData);
      });
      // Get the data for the table rows.
      let tableRows = tableData.slice(0, tableData.length);
      let thValues = Object.keys(fields).map((key) => {
        if (key !== "0" && key !== "2" && key !== "3" && key !== "5") {
          let fieldLabel = fields[key];

          if (fields[key] === "Distribution") {
            fieldLabel = "Distribution";
          } else if (fields[key] === "Retail: Storefront") {
            fieldLabel = "Retail (storefront)";
          } else if (fields[key] === "Retail: Non-Storefront") {
            fieldLabel = "Retail (delivery)";
          } else if (fields[key] === "Manufacturing") {
            fieldLabel = "Manufacturing";
          } else if (fields[key] === "Place") {
            fieldLabel = mapMessages["CountyColumnLabel"] || "Counties";
          }
          return `<th d="${key}">${fieldLabel}</th>`;
        }
      });
      // Build rows
      let rows = tableRows.map((row) => {
        // console.log(row);
        let tdValues = Object.keys(row).map((rowValue) => {
          if (
            rowValue !== "0" &&
            rowValue !== "2" &&
            rowValue !== "3" &&
            rowValue !== "5"
          ) {
            let rowValueKey = "";
            let rowValueLabel = row[rowValue];

            if (row[rowValue] === "Prohibited") {
              rowValueKey = "0";
            } else if (row[rowValue] === "Limited") {
              rowValueKey = "1";
            } else if (row[rowValue] === "Limited-Medical Only") {
              rowValueKey = "2";
            } else if (row[rowValue] === "Allowed") {
              rowValueKey = "3";
            }

            if (rowValueKey !== "") {
              return `<td d="${rowValue}" l="${rowValueKey}">${rowValueLabel}</td>`;
            }
            if (rowValue === "1" && row[5] === "City") {
              // console.log(row);
              rowValueLabel = row[0];
              return `<td d="${rowValue}">${rowValueLabel}</td>`;
            } else if (rowValue === "1" && row[5] === "County") {
              rowValueLabel = row[4];
              return `<td d="${rowValue}">${rowValueLabel}</td>`;
            }

            return `<td d="${rowValue}">${rowValueLabel}</td>`;
          }
        });
        return `<tr data-geoid="${row[2]}" 
        k="${row[0]}" 
        j="${row[5]}" 
        c="${row[3]}">${tdValues.join("")}</tr>`;
      });
      let tableMarkup = `
        <table>
           <thead>
              ${thValues.join("")}
           </thead>
           <tbody>
              ${rows.join("")}
            </tbody>
        </table>
        `;
        // console.log(tableMarkup);
      return tableMarkup;
    }
  }

  /**
   * Change which UI elements are displayed
   * @param {*} data 
   * @returns 
   */
  updateTable(data) {
    let jurisdiction = data.jurisdiction;
    let geoid = data.geoid;
    
    let tableSelector = "cagov-table-data table";
    let tableElement = document.querySelector(tableSelector);
    let tableElements = document.querySelectorAll(`${tableSelector} tbody tr`);
    Object.keys(tableElements).map((index) => {
      if (tableElements[index] !== null) {
        tableElements[index].classList.add("hidden");
        tableElements[index].classList.remove("county-row");
      }
    });

    if (jurisdiction === "Statewide") {
      tableElements = document.querySelectorAll(
        `${tableSelector} tbody tr`
      );
      Object.keys(tableElements).map((index) =>
        tableElements[index].classList.remove("hidden")
      );
      if (tableElement !== null) {
        tableElement.classList.remove("Place", "County");
        tableElement.classList.add(jurisdiction);
      }
    } else if (jurisdiction === "County") {
      let query = `${tableSelector} tr[c="${data.selectedPlaceValue}"]`; // Everything in the county.
      tableElements = document.querySelectorAll(query);
      Object.keys(tableElements).map((index) => {
        tableElements[index].classList.remove("hidden");
        if (index === "0" && tableElements[index] !== null) {
          tableElements[index].classList.add("county-row");
          tableElements[index].querySelector("td:first-child").innerHTML =
            data.messages.TableLabelCountyWide;
        }
      });
      if (tableElement !== null) {
        tableElement.classList.remove("Statewide", "Place");
        tableElement.classList.add(jurisdiction);
      }
    } else if (jurisdiction === "Place") {
      if (geoid !== null) {
        // console.log(data);
        let countyQuery = `${tableSelector} tr[c="${data.selectedCounty}"][data-geoid="null"]`;
        let countyElements = document.querySelectorAll(countyQuery);
        let query = `${tableSelector} tr[data-geoid="${geoid}"]`; // Everything in the county.
        tableElements = document.querySelectorAll(query);

        Object.keys(countyElements).map((index) => {
          countyElements[index].classList.remove("hidden");
          if (index === "0" && countyElements[index] !== null) {
            countyElements[index].classList.add("county-row");
          }
        });
        Object.keys(tableElements).map((index) => {
          tableElements[index].classList.remove("hidden");
          if (index === "0" && tableElements[index] !== null) {
            // tableElements[index].classList.add("county-row");
          }
        });
      }
      if (tableElement !== null) {
        tableElement.classList.remove("Statewide", "County");
        tableElement.classList.add(jurisdiction);
      }
    }
    return true;
  }

  // /**
  //  * Remove any window events on removing this component.
  //  */
  // disconnectedCallback() {}
}

if (!customElements.get("cagov-table-data")) {
  window.customElements.define("cagov-table-data", CAGovTableData);
}
