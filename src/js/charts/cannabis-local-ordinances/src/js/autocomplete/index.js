import comboBox from "./combo-box.js";

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

  setupAutoComplete(fieldSelector, fieldName, autocompleteDataList) {
    let component = this;
    // @TODO Add docs ref
    const awesompleteSettings = {
      autoFirst: true,
      minChars: 0,
      maxItems: 20,
      filter: function (text, input) {
        return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
      },
      item: function (text, input) {
        return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
      },
      data: function (item, input) {
        // console.log(item);
        if (item.value !== undefined) {
          return { label: item.label, value: item.id };
        } else {
          return item;
        }
      },
      replace: function (text) {
        let before = this.input.value.match(/^.+,\s*|/)[0];
        let finalval = before + text;
        component.changeLocationInput(finalval);
        // component.layoutCards();
      },
      sort: (a, b) => {
        return autocompleteDataList.indexOf(a.label) <
          autocompleteDataList.indexOf(b.label)
          ? -1
          : 1;
      },
      list: autocompleteDataList,
    }
    this.awesompleteSettings = awesompleteSettings;
  }

  render() {
    const autocompleteElement = new Awesomplete(
      this.fieldSelector,
      this.awesompleteSettings
    );

    document
      .querySelector("#awesomplete_list_1")
      .setAttribute("aria-label", this.fieldLabel);

    
    
    document
      .querySelector(fieldSelector)
      .addEventListener("focus", function () {
        window.cagovAutoComplete.evaluate();
        addAutocompleteSectionSeparator("#awesomplete_list_1 li", countyTiers);
      });

    document.querySelector(fieldSelector).addEventListener("input", (event) => {
      // const inputText = event.target.value; // What was this for? 
      window.autocompleteElement.evaluate();
    });

    window.cagovAutoComplete.autocompleteElement = autocompleteElement;
  }
}

if (!customElements.get("cagov-autocomplete")) {
  window.customElements.define("cagov-autocomplete", CaGovAutocomplete);
  if (window.cagovAutoComplete === undefined) {
    window.cagovAutoComplete = {}; // @TODO make appendable, supports one autocomplete list.
  }
}
