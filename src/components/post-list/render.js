const { attr } = require("cheerio/lib/api/attributes");
const fetch = require("node-fetch");

const setDefaultAttributes = (attributes) => {
  let defaults = {
    order: "desc",
    count: "10",
    category: "announcements,press-releases",
    showExcerpt: true,
    noResults: "No results found",
    showPublishedDate: true,
    showPagination: true,
    filter: "none", // Accepts types of filtering
    readMore: "",
    type: "wordpress",
    currentPage: 1,
    categoryMap: {},
  };

  return { ...defaults, ...attributes };
};

const categoryEndpoint = (attributes) => {
  return `${attributes.endpoint}/categories?slug=${attributes.category}`
};

const categoryIds = (categoryApiResponse) => {
  categoryApiResponse.map((item) => {
    this.categoryMap[item.id] = item;
    return item.id;
  });
}

const renderResults = (posts, attributes) => {
  let innerContent;
  if (posts !== undefined && posts !== null && posts.length > 0) {
    if (attributes.type === "wordpress") {
      renderedPosts = posts.map((post) => renderWordpressPostTitleDate(post.data, attributes));
      innerContent = `
        <div class="post-list-items">
          ${renderedPosts.join("")}
        </div>
        ${attributes.readMore}
      `;
    }
  } else {
    innerContent = `
      <div class="no-results">
        ${attributes.noResults}
      </div>
    `;
  }

  return `
    <div class="post-list-results">
      ${innerContent}
    </div>
  `;
};

const renderWordpressPostTitleDate = ({
  title = null,
  link = null,
  date = null, // "2021-05-23T18:19:58"
  // content = null,
  excerpt = null, // @TODO shorten / optional
  // author = null, // 1
  // featured_media = null, // 0
  categories = null,
  format = null,
  meta = null,
}, attributes) => {
  // WOOOO!!!! WE GET TO USE THIS NOW!! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString Bye IE!
  //www.w3schools.com/jsref/jsref_tolocalestring.asp
  let dateFormatted = new Date(date).toLocaleDateString("en-us", {
    // weekday: false,
    month: "short",
    year: "numeric",
    day: "numeric",
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    // timeZone: 'America/Los_Angeles',
    // timeZoneName: 'short'
  });

  let getExcerpt =
    (attributes.showExcerpt === "true" || attributes.showExcerpt === true)
      ? `<div class="excerpt"><p>${excerpt}</p></div>`
      : ``;
  let getDate =
    (attributes.showPublishedDate === "true" || attributes.showPublishedDate === true)
      ? `<div class="date">${dateFormatted}</div>`
      : ``;

  let category_type = "";
  let showCategoryType = false;
  // Disabled but can enable when we have a default style.
  /*
  if (
    showCategoryType &&
    categories !== null &&
    Object.keys(categoryMap).length > 1
  ) {
    let categoryItem = categoryMap[[categories[0]]]; // Use first category. There should only be one set.
    if (categoryItem.name !== undefined && categoryItem.name !== null) {
      category_type = `<div class="category-type">${categoryItem.name}</div>`;
    }
  }
  */

  if (format === "status") {
    return `
      <div class="post-list-item">
        <div class="link-title">
          ${getDate}
        </div>
        ${getExcerpt}
      </div>
    `;
  }

  if (format === "link") {
    return `
      <div class="post-list-item">
        ${category_type}
        <div class="link-title">
          <a href="${link}">
            ${title}
          </a>
        </div>
        ${getExcerpt}
        ${getDate}
      </div>
    `;
  }

  return `
    <div class="post-list-item">
      ${category_type}
      <div class="link-title">
        <a href="${link}">
          ${title}
        </a>
      </div>
      ${getExcerpt}
      ${getDate}
    </div>
  `;
};

const postListServerRender = (postsData, attributes) => {
  return renderResults(postsData, attributes);
};

module.exports = { postListServerRender, setDefaultAttributes };
