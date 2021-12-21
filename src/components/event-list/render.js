const cheerio = require("cheerio");
const { getEventsByCategory } = require("./get-posts");

/**
 * Given an object of attributes for initializing the post-list component, set any missing default values.
 * @param {Object} attributes An object of cagov-post-list attributes. These attributes would usually be supplied
 *                            from the cagov-post-list component elements's 'data-' attributes, or dataset.
 * @returns {Object} The same attributes object, now hydrated with defaults for any missing values.
 */
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
    field: "custom_post_date", // YYYY-MM-DD
  };

  return { ...defaults, ...attributes };
};

/**
 * Renders a list of posts into HTML.
 * @param {Object[]} posts A list of data objects corresponding to posts, as found in the wordpress/posts folder as JSON.
 * @param {Object} attributes An object of cagov-post-list attributes.
 * @returns {string} A string of rendered HTML.
 */
const applyEventsTemplate = (posts, attributes) => {
  let innerContent;
  if (posts !== undefined && posts !== null && posts.length > 0) {
    if (attributes.type === "wordpress") {
      renderedEvents = posts.map((post) =>
        renderWordpressPostTitleDate(post.data, attributes)
      );
      innerContent = `
        <div class="post-list-items">
          ${renderedEvents.join("")}
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

/**
 * Renders a single post into HTML.
 * @param {Object} post A data object corresponding to a post, as found in the wordpress/posts folder as JSON.
 * @param {Object} attributes An object of cagov-post-list attributes.
 * @returns A string of rendered HTML.
 */
const renderWordpressPostTitleDate = (
  {
    title = null,
    link = null,
    date = null, // "2021-05-23T18:19:58"
    // modified = null,
    // content = null,
    excerpt = null, // @TODO shorten / optional
    // author = null, // 1
    // featured_media = null, // 0
    categories = null,
    format = null,
    meta = null,
    custom_post_date = null,
  },
  attributes
) => {
  // WOOOO!!!! WE GET TO USE THIS NOW!! https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString Bye IE!
  //www.w3schools.com/jsref/jsref_tolocalestring.asp
  
  let itemDate = date;

  if (custom_post_date && custom_post_date !== "") {
    itemDate = custom_post_date;
  }

  // Hack to fix GMT collision - something different on renderer. @BUG @ISSUE
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }


  let dateFormatted = new Date(itemDate).toLocaleDateString("en-us", {
    // weekday: false,
    month: "long",
    year: "numeric",
    day: "numeric",
    // hour: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
    // timeZone: 'America/Los_Angeles',
    // timeZoneName: 'short'
  });

  let getExcerpt =
    attributes.showExcerpt === "true" || attributes.showExcerpt === true
      ? `<div class="excerpt">${excerpt}</div>`
      : ``;
  let getDate =
    attributes.showPublishedDate === "true" ||
    attributes.showPublishedDate === true
      ? `<div class="date">${dateFormatted}</div>`
      : ``;

  let formattedTitle;

  if (format === "link" && meta && meta.hasOwnProperty("custom_post_link") && meta.custom_post_link !== "") {
    formattedTitle = `<a href="${meta.custom_post_link}">${title}</a>`;
  } 
  else if (format !== "link") {
    formattedTitle = link ? `<a href="${link.split("pantheonsite.io")[1]}">${title}</a>` : `<span>${title}</span>`;
  }
  else {
    formattedTitle = `<span>${title}</span>`;
  }

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
      <div class="post-list-item status">
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
          ${formattedTitle}
        </div>
        ${getDate}
        ${getExcerpt}
      </div>
    `;
  }

  return `
    <div class="post-list-item">
      ${category_type}
      <div class="link-title">
        ${formattedTitle}
      </div>
      ${getDate}
      ${getExcerpt}
    </div>
  `;
};

/**
 * Finds any cagov-post-list components within a given html string, then pre-renders them based on 11ty data/content.
 * @param {string} html A string of HTML.
 * @returns {string} A modified HTML string with cagov-post-list components pre-rendered.
 */
const renderEventLists = function (html) {
  const postLists = html.matchAll(
    /<cagov-post-list\s*[^>]*?\s*>[\s\S]*?<\/cagov-post-list>/gm
  );

  let result = html;

  for (postList of postLists) {
    let { 0: originalMarkup, index } = postList;
    /*
    @DOCS: https://www.npmjs.com/package/cheerio - "Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript. This makes Cheerio much, much faster than other solutions. If your use case requires any of this functionality, you should consider projects like Puppeteer or JSDom." @ISSUE
    */
    let $ = cheerio.load(originalMarkup, null, false);
    let postListElement = $("cagov-post-list").get(0);
    // @NOTE this is a good local utility candidate
    let postListAttributes = Object.keys(postListElement.attribs).reduce(
      (obj, attr) => {
        let camelCasedKey = attr
          .replace("data-", "")
          .replace(/-([a-z])/g, (g) => g[1].toUpperCase());

        obj[camelCasedKey] = postListElement.attribs[attr];
        return obj;
      },
      {}
    );

    let processedAttributes = setDefaultAttributes(postListAttributes);

    let recentEvents = getEventsByCategory(
      postListAttributes.category,
      parseInt(postListAttributes.count),
      "custom_post_date" // @TODO link in WP html & pull from processedAttributes @ISSUE
    );

    let modifiedMarkup = applyEventsTemplate(
      recentEvents, 
      processedAttributes
    );

    $("cagov-post-list").append(modifiedMarkup).attr("data-rendered", "true");

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = { renderEventLists };
