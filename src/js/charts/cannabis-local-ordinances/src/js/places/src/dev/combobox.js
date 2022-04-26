import { Option } from "./option.js";

// path
import path from "path";
import { fileURLToPath } from "url";

// __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// fs.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
// end fs.

export class ComboBox {
  constructor() {
    this.placesFileName = path.join(__dirname, "../data/places.json");
    this.templateFileName = "template.html";
    this.templateHMTL = "";
  }

  makeTemplate(html) {
    fs.writeFile(this.templateFileName, html, (error) => {
      if (error) {
        return console.log(error);
      }
      return "";
    });
  }

  create() {
    fs.readFile(this.placesFileName, (err, data) => {
      // Catch error.
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }

      const places = JSON.parse(data);
      this.templateHMTL += `<div class="cagov-places"><div class="combobox-list">
      <label for="cb1-input">Enter a city or county</label>
      <div class="group">
        <input
          id="cb1-input"
          class="cb_edit"
          type="text"
          role="combobox"
          aria-autocomplete="both"
          aria-expanded="false"
          aria-haspopup="true"
          aria-owns="lb1"
        />
        <button id="cb1-button" aria-label="Open" tabindex="-1">▽</button>
      </div>
      <ul id="lb1" role="listbox" aria-label="States">`;

      for (const [id, value] of Object.entries(places)) {
        const option = new Option(id, value);
        this.templateHMTL += option.html();
      }
      this.templateHMTL += `</ul></div></div>`;

      this.makeTemplate(this.templateHMTL);
    });
  }
}
