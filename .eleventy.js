const CleanCSS = require("clean-css");
let pressList = require('./src/templates/_includes/layouts/templates/press-list.js');
let lastFewPosts = require('./src/templates/_data/last-few-posts.js');
const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    pressPosts.sort((a,b) => {
      return new Date(b.data.wordpress.dataset.data.date).getTime() - new Date(a.data.wordpress.dataset.data.date).getTime();
    });
    return pressPosts;
  });
  
  eleventyConfig.addFilter("postlist", function(html) {
    let myRe = /<cagov-post-list\s*.*>\s*.*<\/cagov-post-list>/gs;
    let myArray = myRe.exec(html);
    let lastPosts = lastFewPosts();
    let postHTML = pressList(lastPosts, monthStrings);
    if(myArray) {
      return html.replace(myArray[0],postHTML);
    }
    return html;    
  });

  eleventyConfig.addFilter("dateFormat", function(dateString) {
    let d = new Date(dateString);
    return `${monthStrings[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  });

  eleventyConfig.addCollection("manualcontent", function(collection) {
    let output = [];
    collection.getAll().forEach(item => {
      if(item.data.wordpress.dataset) {
        item.data.title = item.data.wordpress.dataset.data.title;
        item.data.templatestring = item.data.wordpress.dataset.data.template;
        item.data.page_meta = item.data.wordpress.dataset.data.page_meta;
        item.data.category = item.data.wordpress.dataset.data.category;
        item.data.id = item.data.wordpress.dataset.data.id;
        item.data.parentid = item.data.wordpress.dataset.data.parent;
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