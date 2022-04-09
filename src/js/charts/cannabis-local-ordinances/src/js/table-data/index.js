import { xml } from "d3-fetch";

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
    this.source = this.dataset.source;
    
    // xml(this.source, {'mode': 'no-cors'}).then((tableData) => {
    //   console.log("td", tableData);
    // });
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {}
}

if (!customElements.get("cagov-table-data")) {
  window.customElements.define("cagov-table-data", CAGovTableData);
}
