const CleanCSS = require("clean-css");
let postsCollection = require('./src/build/posts.js');
let lastFewPosts = require('./pages/_data/last-few-posts.js');
let extractMeta = require('./src/build/extract-meta.js');

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 
 */
module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });
  
  // @TODO: Why are we doing this re-write. Let's explain our logic a little for everyone using the code:
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "wp-content/uploads" });
  eleventyConfig.addPassthroughCopy({ "dist/index.css.map": "/index.css.map" });
  
  eleventyConfig.setBrowserSyncConfig({
    watch:true,
    notify:true,
 });
 
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("dateFormat", function(dateString) {
    let d = new Date(dateString);
    return `${monthStrings[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "pages",
      output: "docs",
    }
  };
}
