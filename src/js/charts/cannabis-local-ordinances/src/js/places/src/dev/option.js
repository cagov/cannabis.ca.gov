export class Option {
  constructor(place) {
    this.place = place;
    this.geoAttr =
      this.place.geoid != null ? `place-geoid="${this.place.geoid}"` : "";
    this.jurisAttr = 'data-jurisdiction="' + this.place.dataJurisdiction + '"';
    this.valAttr = 'value="' + this.place.value + '"';
  }

  html() {
    return `<li ${this.valAttr} ${this.jurisAttr} ${this.geoAttr}>${this.place.name}</li>`;
  }
}
