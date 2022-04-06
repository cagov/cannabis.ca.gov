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
  }

  /**
   * Remove any window events on removing this component.
   */
  disconnectedCallback() {
   
  }

  // Display content & layout dimensions.
  handleChartResize(e) {
   
  }

  render() {
    
  }
}

if (!customElements.get("cagov-autocomplete")) {
  window.customElements.define("cagov-autocomplete", CaGovAutocomplete);
}
