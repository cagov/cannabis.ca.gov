const fs = require("fs");
const config = require("./../../../../config");
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
const getPostsByCategory = (categoryString, count = 5, field = "custom_post_date") => {
  let componentCategories = categoryString
    .split(",")
    .map((c) => c.toLowerCase());

  let wordPressArray = [];
  let files = fs.readdirSync(config.build.eleventy_posts);
  files.forEach((file) => {
    if (file.indexOf(".json") > -1) {
      let loc = config.build.eleventy_posts + "/" + file;
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
      let aDate = a.data[field] ? a.data[field] : a.data.date;
      let bDate = b.data[field] ? b.data[field] : b.data.date;
      return new Date(aDate) - new Date(bDate);
    })
    .slice(-count)
    .reverse();

  //console.log(returnPosts.map(f => `${f.data.title}: ${f.data.custom_post_date}, ${f.data.date}`));
  return { 'total': wordPressArray.length, 'posts': postsToReturn };
};

module.exports = { getPostsByCategory };
