const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
  
  eleventyConfig.addCollection("manualcontent", function(collection) {
    let output = [];
    collection.getAll().forEach(item => {
      item.data.title = 'Hi'; //item.data.wordpress.dataset.data.title;
      // item.data.layout = "layouts/page.njk";
      if(item.data.wordpress.dataset) {
        item.data.title = item.data.wordpress.dataset.data.title;
        // item.data.layout = 'layouts/dood.njk'; //item.data.wordpress.dataset.data.layout;
      }
      output.push(item);
    });

    return output;
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "src/templates",
      output: "docs",
    }
  };
}