import styles from "./css/index.css";

export class CaGovPlaces extends window.HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="combobox-list">
    <label for="cb1-input"> State </label>
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
    <ul id="lb1" role="listbox" aria-label="States">
      <li id="lb1-al" role="option">Alabama</li>
      <li id="lb1-ak" role="option">Alaska</li>
      <li id="lb1-as" role="option">American Samoa</li>
      <li id="lb1-az" role="option">Arizona</li>
      <li id="lb1-ar" role="option">Arkansas</li>
      <li id="lb1-ca" role="option">California</li>
      <li id="lb1-co" role="option">Colorado</li>
      <li id="lb1-ct" role="option">Connecticut</li>
      <li id="lb1-de" role="option">Delaware</li>
      <li id="lb1-dc" role="option">District of Columbia</li>
      <li id="lb1-fl" role="option">Florida</li>
      <li id="lb1-ga" role="option">Georgia</li>
      <li id="lb1-gm" role="option">Guam</li>
      <li id="lb1-hi" role="option">Hawaii</li>
      <li id="lb1-id" role="option">Idaho</li>
      <li id="lb1-il" role="option">Illinois</li>
      <li id="lb1-in" role="option">Indiana</li>
      <li id="lb1-ia" role="option">Iowa</li>
      <li id="lb1-ks" role="option">Kansas</li>
      <li id="lb1-ky" role="option">Kentucky</li>
      <li id="lb1-la" role="option">Louisiana</li>
      <li id="lb1-me" role="option">Maine</li>
      <li id="lb1-md" role="option">Maryland</li>
      <li id="lb1-ma" role="option">Massachusetts</li>
      <li id="lb1-mi" role="option">Michigan</li>
      <li id="lb1-mn" role="option">Minnesota</li>
      <li id="lb1-ms" role="option">Mississippi</li>
      <li id="lb1-mo" role="option">Missouri</li>
      <li id="lb1-mt" role="option">Montana</li>
      <li id="lb1-ne" role="option">Nebraska</li>
      <li id="lb1-nv" role="option">Nevada</li>
      <li id="lb1-nh" role="option">New Hampshire</li>
      <li id="lb1-nj" role="option">New Jersey</li>
      <li id="lb1-nm" role="option">New Mexico</li>
      <li id="lb1-ny" role="option">New York</li>
      <li id="lb1-nc" role="option">North Carolina</li>
      <li id="lb1-nd" role="option">North Dakota</li>
      <li id="lb1-mp" role="option">Northern Marianas Islands</li>
      <li id="lb1-oh" role="option">Ohio</li>
      <li id="lb1-ok" role="option">Oklahoma</li>
      <li id="lb1-or" role="option">Oregon</li>
      <li id="lb1-pa" role="option">Pennsylvania</li>
      <li id="lb1-pr" role="option">Puerto Rico</li>
      <li id="lb1-ri" role="option">Rhode Island</li>
      <li id="lb1-sc" role="option">South Carolina</li>
      <li id="lb1-sd" role="option">South Dakota</li>
      <li id="lb1-tn" role="option">Tennessee</li>
      <li id="lb1-tx" role="option">Texas</li>
      <li id="lb1-ut" role="option">Utah</li>
      <li id="lb1-ve" role="option">Vermont</li>
      <li id="lb1-va" role="option">Virginia</li>
      <li id="lb1-vi" role="option">Virgin Islands</li>
      <li id="lb1-wa" role="option">Washington</li>
      <li id="lb1-wv" role="option">West Virginia</li>
      <li id="lb1-wi" role="option">Wisconsin</li>
      <li id="lb1-wy" role="option">Wyoming</li>
    </ul>
  </div>
`;
  }
}

window.customElements.define("cagov-places", CaGovPlaces);

const style = document.createElement("style");
style.textContent = styles;
document.querySelector("head").appendChild(style);
