/**
 * News List web component
 * Supported endpoints: Wordpress v2
 * Wordpress Dependencies: window.wp.moment, cagov-pagination
 */
 class CAGovPostList extends window.HTMLElement {
  connectedCallback() {
    let siteUrl = window.location.origin;
    this.endpoint = this.dataset.endpoint || `${siteUrl}/wp-json/wp/v2`;
    this.order = this.dataset.order || "desc";
    this.count = this.dataset.count || "10";
    this.category = this.dataset.category || "announcements,press-releases";
    this.showExcerpt = this.dataset.showExcerpt || true;
    this.noResults = this.dataset.noResults || "No results found";
    this.showPublishedDate = this.dataset.showPublishedDate || true;
    this.showPagination = this.dataset.showPagination === "true" ? true : false;
    this.filter = this.dataset.filter ? this.dataset.filter : "none"; // Accepts types of filtering
    this.readMore = this.dataset.readMore || "";
    this.type = this.dataset.type || "wordpress";
    this.currentPage = 1;
    this.categoryMap = {};
    if (this.type === "wordpress") {
      this.getWordpressPosts();
    }
  }

  getWordpressPosts() {
    window.fetch(`/press/${this.currentPage}`)
    .then((response) => response.text())
    .then(
      function (html) {
        this.innerHTML = html;
        if (this.querySelector("cagov-pagination") !== null) {
          this.querySelector("cagov-pagination").addEventListener(
            "paginationClick",
            function (event) {
              if (event.detail) {
                this.currentPage = event.detail;
                this.getWordpressPosts();
              }
            }.bind(this),
            false
          );
        }
      }.bind(this)
    )
    .catch((error) => {
      console.error(error);
      this.renderNoPosts();
    });
  }
  
  renderNoPosts() {
    this.innerHTML = `<div class="post-list-no-results">${this.noResults}</div>`;
  }

}

if (customElements.get("cagov-post-list") === undefined) {
  window.customElements.define("cagov-post-list", CAGovPostList);
}
