import comboBox from "./combo-box.js"; // From USWDS

/**
 - [ ] Review package used
 - [ ] Sample markup
 - [ ] Update UI elements
 - [ ] Write jsdocs
 */


class CaGovAutocomplete extends window.HTMLElement {
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
    // @TODO need markup example & test data.

    // Maybe not needed.
    // this.fieldSelector = this.dataset.fieldSelector;
    // this.fieldLabel = this.dataset.fieldLabel;
    // this.dataSource = this.dataset.autoCompleteDataSource;
    // this.selectCallback = this.dataset.selectCallback;
    // this.parentSelector = this.dataset.parentSelector;
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {
    // Remove listener
    // focus
  }

  render() {
    comboBox.init();
  }
}

if (!customElements.get("cagov-autocomplete")) {
  window.customElements.define("cagov-autocomplete", CaGovAutocomplete);
}
