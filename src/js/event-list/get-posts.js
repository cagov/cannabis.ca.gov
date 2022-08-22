const fs = require("fs");
const config = require("../../../config");

/**
 * Checks for a match between two sets of categories.
 * @param {string[]} componentCategories An array of categories requested by the cagov-post-list component.
 * @param {string[]} postCategories An array of categories corresponding to a given post.
 * @returns {boolean} True if a category match is found, otherwise false.
 */
const categoryMatchBetween = (componentCategories, postCategories) => {
  let unsluggedCategories = componentCategories.map((category) =>
    category.replace("-", " ")
  );
  let intersection = postCategories.filter((category) =>
    unsluggedCategories.includes(category.toLowerCase())
  );
  return intersection.length > 0;
};

/**
 * Finds a list of posts from the wordpress/posts folder, based on a given category.
 * @param {string} categoryString A comma-separated list of categories as supplied in the cagov-post-list element data attributes.
 * @param {number} count The number of posts to return.
 * @returns {Object[]} A list of data objects corresponding to posts, as found in the wordpress/posts folder as JSON.
 */
const getEventsByCategory = (categoryString, count = 5) => {
  let componentCategories = categoryString
    .split(",")
    .map((c) => c.toLowerCase());

  let wordPressArray = [];
  let files = fs.readdirSync(config.staticContentPaths.posts);
  files.forEach((file) => {
    if (file.indexOf(".json") > -1) {
      let loc = config.staticContentPaths.posts + file;
      let parsedInfo = JSON.parse(fs.readFileSync(loc, "utf8"));
      if (
        parsedInfo.data.type === "post" &&
        categoryMatchBetween(componentCategories, parsedInfo.data.categories)
      ) {
        wordPressArray.push(parsedInfo);
      }
    }
  });
  
  let postsToReturn = wordPressArray
    .sort((a, b) => {
      try {
        let aDate = a.data.event.startDate;
        let bDate = b.data.event.startDate;
        return new Date(aDate) - new Date(bDate);
      } catch (error) {
        console.error("missing date value");
        return 0; // Trying no difference to skip sort values.
      }
    })
    .slice(-count)
    .reverse();

  //console.log(returnPosts.map(f => `${f.data.title}: ${f.data.custom_post_date}, ${f.data.date}`));
  return postsToReturn;
};

module.exports = { getEventsByCategory };
