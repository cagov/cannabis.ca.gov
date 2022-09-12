const { getPostsByCategory } = require("./../../src/js/eleventy/post-list/get-posts");

/**
 * Get all posts based on categories
 * @returns 
 */
module.exports = () => {
  const allPosts = getPostsByCategory(
    "announcements,press-releases", // Hard code categories - Not this wasn't support to be hard coded.
    5000,
    "custom_post_date"
  );

  return allPosts.posts;
}