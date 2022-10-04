/**
 * Page Alert web component
 * Supported endpoints: Wordpress v2
 */
class CAGovPageAlert extends window.HTMLElement {
  connectedCallback() {
    this.type = "wordpress";
    this.message = this.dataset.message || "";
    this.icon = this.dataset.icon || "";

    if (this.type === "wordpress") {
      document.addEventListener("DOMContentLoaded", () => {
        this.template({ message: this.message, icon: this.icon }, "wordpress");
        document
          .querySelector("cagov-page-alert .close-button")
          .addEventListener("click", (e) => {
            document.querySelector("cagov-page-alert").style.display = "none";
          });
      });
    }
  }

  template(data, type) {
    if (data !== undefined && data !== null && data.content !== null) {
      if (type === "wordpress") {
        this.innerHTML = `<div class="cagov-page-alert cagov-stack"><div class="icon"><span class="${this.icon}"></span></div>
        <div class="body">${this.message}</div>
        <div class="close-button"><span class="ca-gov-icon-close-line"></span></div></div>`;
      }
    }

    return null;
  }
}

if (customElements.get("cagov-page-alert") === undefined) {
  window.customElements.define("cagov-page-alert", CAGovPageAlert);
}
