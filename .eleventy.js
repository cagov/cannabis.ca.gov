const CleanCSS = require("clean-css");
import { processContentPage, processContentPost, processContentEvent} from './src/_data/content.js';

// @DOCS 11ty reference
/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });

  // @Q: Why are we doing this re-write? Let's explain our logic a little for everyone using the code.
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
      posts.push(processContentPage(item));
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
      posts.push(processContentPost(item));
    });
  
    // @TODO
    //   pressPosts.sort((a, b) => {
    //     return (
    //       new Date(b.data.data.date).getTime() -
    //       new Date(a.data.data.date).getTime()
    //     );
    //   });
    return posts;
  });
  
  // Process content, update data.
  eleventyConfig.addCollection("events", function (collection) {
    let allContent = [];
    // @TODO @DOCS odi-publishing.json settings
    let folderNames = ["/wordpress/posts"];
  
    collection.getAll().forEach((item) => {
      posts.push(processContentEvent(item));
    });
  
    // @TODO correct the sort field - YYYY-MM-DD custom_post_date (requires DB sync)
    // pressPosts.sort((a,b) => {
    //   return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
    // });
    return posts;
  });

  // @Q How is this used?
  eleventyConfig.addFilter("dateFormat", function (dateString) {
    let d = new Date(dateString);
    return `${monthStrings[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  });

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
