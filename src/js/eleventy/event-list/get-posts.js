const fs = require("fs");
const config = require("../../../../config/index.js");

/**
 * Checks for a match between two sets of categories.
 * @param {string[]} componentCategories An array of categories requested by the cagov-post-list component.
 * @param {string[]} postCategories An array of categories corresponding to a given post.
 * @returns {boolean} True if a category match is found, otherwise false.
 */
const categoryMatchBetween = (componentCategories, postCategories) => {
  const unsluggedCategories = componentCategories.map((category) =>
    category.replace("-", " ")
  );
  const intersection = postCategories.filter((category) =>
    (category != null && unsluggedCategories.includes(category.toLowerCase()))
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
  const componentCategories = categoryString
    .split(",")
    .map((c) => c.toLowerCase());

  const wordPressArray = [];
  const files = fs.readdirSync(config.staticContentPaths.posts);
  files.forEach((file) => {
    if (file.indexOf(".json") > -1) {
      const loc = `${config.staticContentPaths.posts}/${file}`;
      const parsedInfo = JSON.parse(fs.readFileSync(loc, "utf8"));
      if (
        parsedInfo.data.type === "post" &&
        categoryMatchBetween(componentCategories, parsedInfo.data.categories)
      ) {
          wordPressArray.push(parsedInfo);
      }
    }
  });

  // this was unused
  // const postsToReturn = wordPressArray
  //   .sort((a, b) => {
  //     try {
  //       // @TODO TEST EVENTS -
  //       const aDate = a.data.event.startDate;
  //       const bDate = b.data.event.startDate;
  //       return new Date(aDate) - new Date(bDate);
  //     } catch (error) {
  //       console.error("missing date value");
  //       return 0; // Trying no difference to skip sort values.
  //     }
  //   })
  //   .slice(-count)
  //   .reverse();

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() - 3);
    const postsToReturnRecent = wordPressArray
    .filter((a) => {
      try {
        const aDate = new Date(a.data.event.startDate);
        if (aDate > tomorrow) {
          return a;
        }
      } catch (error) {
        console.error("missing date value");
        return a;
      }
      return a;
    });

  return postsToReturnRecent;
};

module.exports = { getEventsByCategory };
