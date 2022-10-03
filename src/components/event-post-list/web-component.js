/**
 * Event post List web component
 * Supported endpoints: Wordpress v2
 * Wordpress Dependencies: window.wp.moment, cagov-pagination
 */
class CAGovEventPostList extends window.HTMLElement {
  connectedCallback() {
    const siteUrl = window.location.origin;
    this.endpoint = this.dataset.endpoint || `${siteUrl}/wp-json/wp/v2`;
    this.order = this.dataset.order || "asc";
    this.count = this.dataset.count || "3";
    this.category = this.dataset.category || "events";
    this.showExcerpt = this.dataset.showExcerpt || true;
    this.noResults = this.dataset.noResults || "No results found";
    this.showPublishedDate = this.dataset.showPublishedDate || true;
    this.showPagination = this.dataset.showPagination === "true";
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
    if (this.endpoint !== undefined) {
      if (this.category.indexOf(",") > -1) {
        this.category = this.category.split(",");
      } else {
        this.category = [this.category];
      }

      const categoryEndpoint = `${this.endpoint}/categories?slug=${this.category}`;
      // console.log("category endpoint", categoryEndpoint, this.dataset);

      // Get data
      window
        .fetch(categoryEndpoint)
        .then((response) => response.json())
        .then(
          (data) => {
            // Category has no data.
            if (data.length === 0) {
              return this.renderNoPosts();
            }
            let itemCount = 0;
            data.map((item) => {
              itemCount += item.count;
            });

            const categoryIds = data.map((item) => {
              this.categoryMap[item.id] = item;
              return item.id;
            });

            let postsEndpoint = `${this.endpoint}/posts?`;

            if (categoryIds !== undefined && categoryIds.length > 0) {
              postsEndpoint += `categories=${categoryIds.join(",")}`;
            }
            if (this.count) {
              postsEndpoint += `&per_page=${this.count}`;
            }
            if (this.order) {
              postsEndpoint += `&order=${this.order}`;
              postsEndpoint += `&orderBy=event.startDateTimeUTC`;
            }
            if (this.currentPage) {
              postsEndpoint += `&page=${this.currentPage}`;
            }

            // @TODO add some filters
            if (this.filter === "today-or-after") {
              // Get current date
              // Add and register metabox data & expose it to endpoint
              // Filter by this value if it's found/set compared to today.
              const today = new Date();
              today.setMonth(today.getMonth() - 2);
              postsEndpoint += `&after=${today.toISOString()}`;
            } else if (this.filter === "before-yesterday") {
              // Get current date
              // Add and register metabox data & expose it to endpoint
              // Filter by this value if it's found/set compared to today.
              //
            }
            window
              .fetch(postsEndpoint)
              .then((response) => response.json())
              .then(
                (posts) => {
                  if (posts !== undefined) {
                    // Set posts content.
                    // Set posts content.
                    if (!this.querySelector(".event-post-list-results")) {
                      this.innerHTML = `<div class="event-post-list-results"></div>`;
                      if (this.showPagination === true) {
                        this.innerHTML = `<div class="event-post-list-results"></div><cagov-pagination data-current-page="${
                          this.currentPage
                        }" data-total-pages="${parseInt(
                          itemCount / this.count
                        )}"></cagov-pagination>`;
                      }
                      // write the received content into the page along with parent HTML elements and the pagination under the pageable items, also apply the listener to pagination events. This version of content writing only happens on the first page load
                      this.querySelector(".event-post-list-results").innerHTML =
                        this.template(posts, "wordpress", itemCount);
                      if (this.showPagination === true) {
                        // this is set the first time pagination element is written
                        this.querySelector("cagov-pagination").addEventListener(
                          "paginationClick",
                          (event) => {
                            if (event.detail) {
                              this.currentPage = event.detail;
                              this.getWordpressPosts();
                            }
                          },
                          false
                        );
                      }
                    } else {
                      // write the received content into the page, this happens when a visitor clicks to retrieve a subsequent paged set of items
                      this.querySelector(".event-post-list-results").innerHTML =
                        this.template(posts, "wordpress", itemCount);
                    }
                    is.querySelector(".event-post-list-results").innerHTML =
                      this.template(posts, "wordpress", itemCount);
                    if (this.querySelector("cagov-pagination") !== null) {
                      this.querySelector("cagov-pagination").addEventListener(
                        "paginationClick",
                        (event) => {
                          if (event.detail) {
                            this.currentPage = event.detail;
                            this.getWordpressPosts();
                          }
                        },
                        false
                      );
                    }
                  }
                }
              )
              .catch((error) => {
                console.error(error);
                this.renderNoPosts();
              });
          }
        )
        .catch((error) => {
          console.error(error);
          this.renderNoPosts();
        });
    }
  }

  template(posts, type) {
    if (posts !== undefined && posts !== null && posts.length > 0) {
      if (type === "wordpress") {
        const renderedPosts = posts.map((post) => this.renderWordpressPostTitleDate(post));
        return `<div class="event-post-list-items">${renderedPosts.join(
          ""
        )}</div>${this.readMore}`;
      }
    } else {
      return `<div class="no-results">${this.noResults}</div>`;
    }
    return null;
  }

  renderNoPosts() {
    this.innerHTML = `<div class="event-post-list-no-results">${this.noResults}</div>`;
  }

  /**
   * Render wordpress post with title and date
   * @param {*} param0
   * @returns
   */
  renderWordpressPostTitleDate({
    title = null,
    link = null,
    date = null, // "2021-05-23T18:19:58"
    // content = null,
    excerpt = null, // @TODO shorten / optional
    // author = null, // 1
    // featured_media = null, // 0
    categories = null,
  }) {
    let dateFormatted;
    if (date !== null && window.moment !== undefined) {
      dateFormatted = moment(date).format("MMMM DD, YYYY");
    }

    const getExcerpt =
      this.showExcerpt === "true"
        ? `<div class="excerpt"><p>${excerpt.rendered}</p></div>`
        : ``;
    const getDate =
      this.showPublishedDate === "true"
        ? `<div class="date">${dateFormatted}</div>`
        : ``;

    let category_type = "";
    const showCategoryType = false;
    // Disabled but can enable when we have a default style.
    if (
      showCategoryType &&
      categories !== null &&
      Object.keys(this.categoryMap).length > 1
    ) {
      const categoryItem = this.categoryMap[[categories[0]]]; // Use first category. There should only be one set.
      if (categoryItem.name !== undefined && categoryItem.name !== null) {
        category_type = `<div class="category-type">${categoryItem.name}</div>`;
      }
    }
    return `<div class="event-post-list-item">
                ${category_type}
                <div class="link-title"><a href="${link}">
                    ${title.rendered}
                </a></div>
                ${getExcerpt}
                ${getDate}
            </div>
            `;
  }
}

if (customElements.get("cagov-event-post-list") === undefined) {
  window.customElements.define("cagov-event-post-list", CAGovEventPostList);
}
