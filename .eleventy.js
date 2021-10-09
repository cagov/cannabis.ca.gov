const CleanCSS = require("clean-css"); // Q: What does this do?
const getRecentPosts = require("./pages/_data/recent-posts.js"); // Q: What does this do?
const postList = require("./pages/_data/post-list.js"); // Get templated post-list
const eventList = require("./pages/_data/event-list.js"); // Get templated post-list

const {
  processContentPage,
  processContentPost,
  processContentEvent,
} = require("./pages/_data/content.js"); // Content type processors
// @DOCS 11ty reference
/**
 * Create 11ty build configuration settings
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });

  // @Q: Why are we doing this re-write?
  // @DOCS Let's explain our logic a little for everyone using the code.
  eleventyConfig.addPassthroughCopy({
    "wordpress/media": "wp-content/uploads",
  });
  eleventyConfig.addPassthroughCopy({ "dist/index.css.map": "/index.css.map" }); // @Q Does this order matter?

  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    notify: true,
  });

  // Make CSS smaller
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  /* Content type collections */
  // Process content, update data.
  eleventyConfig.addCollection("pages", function (collection) {
    let posts = [];
    // @TODO @DOCS odi-publishing.json settings
    let folderNames = ["/pages/wordpress/pages"];

    collection.getAll().forEach((item) => {
      item = processContentPage(item, folderNames);

      if (item.data.data) {
        if (item.data.data.type === "page") {
          posts.push(item);
        }
      }
    });

    // posts.sort((a,b) => {
    //   return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
    // });
    return posts;
  });

  // Process content, update data.
  eleventyConfig.addCollection("posts", function (collection) {
    let posts = [];
    // @TODO @DOCS odi-publishing.json settings
    let folderNames = ["/pages/wordpress/posts"];

    collection.getAll().forEach((item) => {
      item = processContentPost(item, folderNames);

      if (item.data.data) {
        if (item.data.data.type === "post") {
          posts.push(item);
        }
      }
      // @TODO correct the sort field - YYYY-MM-DD custom_post_date (requires DB sync)
      // pressPosts.sort((a,b) => {
      //   return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
      // });
    });

    //   console.log("posts", posts);
    return posts;
  });

  // @TODO
  //   pressPosts.sort((a, b) => {
  //     return (
  //       new Date(b.data.data.date).getTime() -
  //       new Date(a.data.data.date).getTime()
  //     );
  //   });

  // Process content, update data.
  // eleventyConfig.addCollection("events", function (collection) {
  //   let posts = [];
  //   // @TODO @DOCS odi-publishing.json settings
  //   let folderNames = ["/wordpress/posts"];

  //   collection.getAll().forEach((item) => {
  //     // @IDEA processContentEvent.sort
  //     // @NOTE startTimeUtC is the field
  //     item = processContentEvent(item, folderNames);

  //     if (item.data.data) {
  //       if (
  //         item.data.data.type === "post" ||
  //         // && category is Event
  //         item.data.data.type === "event"
  //       ) {
  //         posts.push(item);
  //       }
  //     }
  //   });

  //   return posts;
  // });

  eleventyConfig.addFilter("postlist", function (html) {
    let myRe = /<cagov-post-list\s*.*>\s*.*<\/cagov-post-list>/gs;
    let myArray = myRe.exec(html);
    let lastPosts = getRecentPosts();
    let postListHTML = postList(lastPosts);
    if (myArray) {
      return html.replace(myArray[0], postListHTML);
    }
    return html;
  });

  eleventyConfig.addFilter("eventlist", function (html) {
    let myRe = /<cagov-event-post-list\s*.*>\s*.*<\/cagov-event-post-list>/gs;
    let myArray = myRe.exec(html);
    let recentPosts = getRecentEvents({
      count: 5,
      fieldDate: "custom_post_date",
    });
    let eventtListHTML = eventList(recentPosts);
    if (myArray) {
      return html.replace(myArray[0], eventListHTML);
    }
    return html;
  });

  // @Q How is this used?
  // eleventyConfig.addFilter("dateFormat", function (dateString) {
  //   let d = new Date(dateString);
  //   return `${monthStrings[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  // });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "pages",
      output: "docs",
    },
  };
};
