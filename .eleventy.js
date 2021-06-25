// const pluginRss = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
  eleventyConfig.htmlTemplateEngine = "njk";

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "src/templates",
      output: "_site",
    }
  };
}