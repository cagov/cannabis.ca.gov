export class Option {
  constructor(id, place) {
    this.id = id;
    this.place = place;
    this.geoAttr =
      this.place.geoid != null ? `data-geoid="${this.place.geoid}"` : "";
    this.jurisAttr = `data-jurisdiction="${  this.place.dataJurisdiction  }"`;
    this.valAttr = `data-value="${  this.place.value  }"`;
  }

  html() {
    return `<li data-index=${this.id} role="option" ${this.valAttr} ${this.jurisAttr} ${this.geoAttr}>${this.place.name}</li>\n`;
  }
}
