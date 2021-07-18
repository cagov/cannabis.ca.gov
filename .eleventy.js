const CleanCSS = require("clean-css");
let pressList = require('./src/templates/_includes/layouts/templates/press-list.js');
let lastFewPosts = require('./src/templates/_data/last-few-posts.js');

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });

  eleventyConfig.setBrowserSyncConfig({
    watch:true,
    notify:true,
 });
 
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addCollection("press", function(collection) {
    let pressPosts = [];
    collection.getAll().forEach(item => {
      if(item.data.wordpress.dataset) {
        if(item.data.wordpress.dataset.data.type === "post") {
          pressPosts.push(item);
        }
      }
    });
    return pressPosts.sort((a,b) => {
      return a.data.date > b.data.date;
    });
  });
  
  eleventyConfig.addFilter("postlist", function(html) {
    let myRe = /<cagov-post-list\s*.*>\s*.*<\/cagov-post-list>/gs;
    let myArray = myRe.exec(html);
    let lastPosts = lastFewPosts();
    let postHTML = pressList(lastPosts);
    if(myArray) {
      return html.replace(myArray[0],postHTML);
    }
    return html;    
  });

  eleventyConfig.addFilter("dateFormat", function(dateString) {
    return dateString;
    console.log(dateString)
    return new Date(dateString).toLocaleString().split(',')[0];
  });

  eleventyConfig.addCollection("manualcontent", function(collection) {
    let output = [];
    collection.getAll().forEach(item => {
      if(item.data.wordpress.dataset) {
        item.data.title = item.data.wordpress.dataset.data.title;
        item.data.templatestring = item.data.wordpress.dataset.data.template;
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