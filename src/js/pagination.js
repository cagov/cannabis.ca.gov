const writePostsHTML = function writePostsHTML(page) {
  fetch(`/about-us/announcements/${page - 1}`)
    .then((response) => response.text())
    .then((text) => {
      document.querySelector(".post-list-results").innerHTML = text;
    });
};

const controlPages = function controlPages() {
  if (document.querySelector("cagov-pagination")) {
    document.querySelector("cagov-pagination").addEventListener(
      "paginationClick",
      (e) => {
        writePostsHTML(e.detail);
        window.history.replaceState(
          { page: 3 },
          `${document.title} page ${e.detail}`,
          `?page=${e.detail}`
        );
      },
      false
    );

    const urlParams = new URLSearchParams(window.location.search);
    if (parseInt(urlParams.get("page"), 10) > 0) {
      writePostsHTML(urlParams.get("page"));
    }
  }
};

export { controlPages };
