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
      this.templateHMTL += `<!-- Start cagov-places -->
      <div class="cagov-places">
        <div class="combobox-list">
          <label class="filter-label" for="cb1-input">Enter a city or county</label>
          <div class="combobox-places--input-group">
            <input id="cb1-input" class="cb_edit" type="text" role="combobox" aria-autocomplete="both" aria-expanded="false" aria-haspopup="true" aria-owns="lb1"  placeholder="Enter a city or county"/>
            <button class="combobox-places--button" aria-label="clear">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M543.467 92.801c-260.669 0-471.998 211.329-471.998 471.998s211.329 471.998 471.998 471.998 471.998-211.329 471.998-471.998S804.136 92.801 543.467 92.801zm218.692 297.8L586.764 565.996l155.193 173.003c12.272 12.272 12.272 32.222 0 44.494s-32.222 12.272-44.494 0L542.27 610.49 369.267 783.493c-12.272 12.272-32.222 12.272-44.494 0s-12.272-32.222 0-44.494l175.395-175.395-155.193-173.003c-12.272-12.272-12.272-32.222 0-44.494s32.222-12.272 44.494 0L544.662 519.11l173.003-173.003c12.272-12.272 32.222-12.272 44.494 0s12.272 32.222 0 44.494z"/></svg>
            </button>     
          </div>
          <ul id="lb1" role="listbox" aria-label="States">`;

      for (const [id, value] of Object.entries(places)) {
        const option = new Option(id, value);
        this.templateHMTL += option.html();
      }
      this.templateHMTL += `</ul>
        </div>
      </div>
      <!-- End cagov-places -->`;

      this.makeTemplate(this.templateHMTL);
    });
  }
}
