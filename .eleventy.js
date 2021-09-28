const CleanCSS = require("clean-css");
let pressList = require('./pages/_includes/layouts/templates/press-list.js');
let lastFewPosts = require('./pages/_data/last-few-posts.js');
let extractMeta = require('./src/build/extract-meta.js');
const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 
 */
module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "wp-content/uploads" });
  eleventyConfig.addPassthroughCopy({ "dist/index.css.map": "/index.css.map" });
  
  eleventyConfig.setBrowserSyncConfig({
    watch:true,
    notify:true,
 });
 
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addCollection("press", function(collection) {
    let pressPosts = [];
    let folderNames = ['/wordpress/posts','/wordpress/pages'];
    collection.getAll().forEach(item => {

      if(item.inputPath.includes(folderNames[0]) || item.inputPath.includes(folderNames[1])) {
        item.outputPath = 'docs/' + extractMeta.cleanUrl(item.data.data.wordpress_url) + 'index.html';

        item.url = item.outputPath;
        item.data.page.url = item.url;

        //content pulled in from JSON
        const jsonData = item.data.data;
        item.data.layout = "layouts/index";
        item.data.title = jsonData.title;
        item.data.publishdate = jsonData.date.split('T')[0]; //new Date(jsonData.modified_gmt)
        item.data.meta = jsonData.excerpt;
        item.data.description = jsonData.excerpt;

        item.data.description = extractMeta.getHeadTags(jsonData, "page_description");
        if(!item.data.social) { item.data.social = {}; }
        item.data.social.site_title = extractMeta.getHeadTags(jsonData, "site_title");
        item.data.social.site_description = extractMeta.getHeadTags(jsonData, "site_description");
        item.data.social.image = extractMeta.getHeadTags(jsonData, "image");
        item.data.social.twitter_title = extractMeta.getHeadTags(jsonData, "twitter_title");
        item.data.social.og_meta = extractMeta.getOGMetatags(jsonData);

        item.data.lead = jsonData.excerpt;
        item.data.author = jsonData.author;
        item.data.templatestring = extractMeta.chooseTemplate(jsonData);
        item.data.category = jsonData.category;
        item.data.id = jsonData.id;
        item.data.parentid = jsonData.parent;

        if(jsonData.media) {
          const featuredMedia = jsonData.media.find(x=>x.featured);
          if(featuredMedia) {
            item.data.previewimage = '/wp-content/uploads/'+featuredMedia.path;
          }

          jsonData.media.filter(x=>x.source_url_match).forEach(m=>{
            // replaceContent(item,new RegExp(m.source_url,'g'),'/'+wordpressImagePath+'/'+m.path);
            // item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp(m.source_url,'g'),'/media/'+m.path);
          });
        }
      };

      if(item.data.data) {
        if(item.data.data.type === "post") {
          pressPosts.push(item);
        }
      }
      // modify the wordpress asset links here opportunistically because we are already looping through tempaltes with njk transformed into HTML 
      item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp('http://cannabis.ca.gov/','g'),'/');
      item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp('https://cannabis.ca.gov/','g'),'/');
    });
    pressPosts.sort((a,b) => {
      return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
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
