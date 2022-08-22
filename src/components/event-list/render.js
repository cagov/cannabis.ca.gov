const cheerio = require("cheerio");
const { getEventsByCategory } = require("./get-posts");
const config = require('../../../config/config.js');
/**
 * Given an object of attributes for initializing the post-list component, set any missing default values.
 * @param {Object} attributes An object of cagov-post-list attributes. These attributes would usually be supplied
 *                            from the cagov-post-list component elements's 'data-' attributes, or dataset.
 * @returns {Object} The same attributes object, now hydrated with defaults for any missing values.
 */
const setDefaultAttributes = (attributes) => {
  let defaults = {
    order: "desc",
    count: "3",
    category: "events",
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
const renderWordpressPostTitleDate = ({
  title = null,
  link = null,
  date = null, // "2021-05-23T18:19:58"
  // content = null,
  excerpt = null, // @TODO shorten / optional
  showExcerpt = "true", // Comes in as a string from API
  // author = null, // 1
  // featured_media = null, // 0
  categories = null,
  event = null,
}) => {
  let getExcerpt =
    showExcerpt === "true"
      ? `<div class="excerpt"><p>${excerpt}</p></div>`
      : ``;

  let category_type = "";
  let showCategoryType = false;
  // Disabled but can enable when we have a default style.
  if (showCategoryType && categories && categories[0]) {
    category_type = `<div class="category-type">${category[0]}</div>`;
  }

  return `<div class="event-post-list-item">
            ${category_type}
            <div class="link-title"><a href="${link.replace(config.build.editor_url, "")}">
                ${title}
            </a></div>
            ${getExcerpt}
          </div>
          `;
};

/**
 * Finds any cagov-post-list components within a given html string, then pre-renders them based on 11ty data/content.
 * @param {string} html A string of HTML.
 * @returns {string} A modified HTML string with cagov-post-list components pre-rendered.
 */
const renderEventLists = (html) => {
  const postLists = html.matchAll(
    /<cagov-event-post-list\s*[^>]*?\s*>[\s\S]*?<\/cagov-event-post-list>/gm
  );

  let result = html;

  for (postList of postLists) {
    let { 0: originalMarkup, index } = postList;
    /*
    @DOCS: https://www.npmjs.com/package/cheerio - "Cheerio parses markup and provides an API for traversing/manipulating the resulting data structure. It does not interpret the result as a web browser does. Specifically, it does not produce a visual rendering, apply CSS, load external resources, or execute JavaScript. This makes Cheerio much, much faster than other solutions. If your use case requires any of this functionality, you should consider projects like Puppeteer or JSDom." @ISSUE
    */
    let $ = cheerio.load(originalMarkup, null, false);
    let postListElement = $("cagov-event-post-list").get(0);
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
      parseInt(postListAttributes.count)
    );

    let modifiedMarkup = applyEventsTemplate(recentEvents, processedAttributes);

    $("cagov-event-post-list")
      .append(modifiedMarkup)
      .attr("data-rendered", "true");

    result = result.replace(originalMarkup, $.html());
  }

  return result;
};

module.exports = { renderEventLists };
