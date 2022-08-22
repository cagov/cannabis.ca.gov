const { getPostsByCategory } = require("./../../js/post-list/get-posts");

module.exports = () => {

  const allPosts = getPostsByCategory(
    "announcements,press-releases",
    5000,
    "custom_post_date"
  );

  return allPosts.posts;
}