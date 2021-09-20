const moment = require('moment-timezone');
const CleanCSS = require("clean-css");

// let pressList = require('./src/templates/_includes/layouts/templates/press-list.js');
// let last3Posts = require('./src/templates/_data/last3.js');

const wordpressEditor = "https://dev-cannabis-ca-gov.pantheonsite.io";
const wordpressEditorApi = "https://dev-cannabis-ca-gov.pantheonsite.io";
const wordpressEditorMediaFiles = "https://dev-cannabis-ca-gov.pantheonsite.io";
// const SITE_DOMAIN = process.env.SITE_DOMAIN !== undefined ? process.env.SITE_DOMAIN : "";
const SITE_DOMAIN = ""; // Relative links only for local images in display.
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "http://staging.drought.ca.gov.s3-website-us-west-1.amazonaws.com/media/";
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://d24fehwpk146d4.cloudfront.net/media/";
const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://development.cannabis.ca.gov/media/";
// const DEFAULT_SITE_DOMAIN_OG_TAGS = "https://live-drought-ca-gov.pantheonsite.io/wp-content/uploads/"; // Test with original image (not cached)

const replacementPaths = {
  media: {
    src: "https://dev-cannabis-ca-gov.pantheonsite.io/wp-content/uploads/",
    target: "/media/",
    targetPermalink: `${SITE_DOMAIN}/media/`,
    targetPermalinkOGTags: `${DEFAULT_SITE_DOMAIN_OG_TAGS}`,
    targetPermalinkTest: "https://github.com/cagov/cannabis.ca.gov/raw/development/wordpress/media/"
  },
};


module.exports = function(eleventyConfig) {

  eleventyConfig.setBrowserSyncConfig({
    watch:true,
    notify:true,
 });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });


  // eleventyConfig.addCollection("press", function(collection) {
  //   let output = [];
  //   collection.getAll().forEach(item => {
  //     if(item.data.wordpress.dataset) {
  //       if(item.data.type == "post") {
  //         output.push(item);
  //       }
  //     }
  //   });
  //   return output.sort((a,b) => {
  //     return a.data.date > b.data.date;
  //   });
  // });
  
  // eleventyConfig.addFilter("postlist", function(html) {
  //   let myRe = /<cagov-post-list\s*.*>\s*.*<\/cagov-post-list>/gs;
  //   let myArray = myRe.exec(html);
  //   let lastPosts = last3Posts();
  //   let postHTML = pressList(lastPosts);
  //   if(myArray) {
  //     return html.replace(myArray[0],postHTML);
  //   }
  //   return html;    
  // });

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


  // New stuff
  const { addPreviewModeToEleventy } = require("@cagov/11ty-serverless-preview-mode");
  addPreviewModeToEleventy(eleventyConfig);


  const wordpressImagePath = 'img/wordpress';

  eleventyConfig.addPassthroughCopy({ "wordpress/media":wordpressImagePath });

  eleventyConfig.addFilter("dateformat", function(dateIn) {
    return moment(dateIn).tz('America/Los_Angeles').format('M/D/YYYY');
  });


  //Process wordpress posts
  eleventyConfig.addCollection("wordpressposts", function(collection) {
    const FolderName = 'wordpress-posts';
    let output = [];
    
    collection.getAll().forEach(item => {
        if(item.inputPath.includes(FolderName)) {
          item.outputPath = item.outputPath.replace(`/${FolderName}`,'');;
          item.url = item.url.replace(`/${FolderName}`,'');
          item.data.page.url = item.url;

          //content pulled in from JSON
          const jsonData = item.data.data;
          item.data.layout = "page";
          item.data.tags = ['news'];
          item.data.title = jsonData.title;
          item.data.publishdate = jsonData.date.split('T')[0]; //new Date(jsonData.modified_gmt)
          item.data.meta = jsonData.excerpt;
          item.data.description = jsonData.excerpt;
          item.data.lead = jsonData.excerpt;
          item.data.author = jsonData.author;

          if(jsonData.media) {
            const featuredMedia = jsonData.media.find(x=>x.featured);
            if(featuredMedia) {
              item.data.previewimage = wordpressImagePath+'/'+featuredMedia.path;
            }

            jsonData.media.filter(x=>x.source_url_match).forEach(m=>{
              replaceContent(item,new RegExp(m.source_url,'g'),'/'+wordpressImagePath+'/'+m.path);
            });
          }
        };
    });

    return output;
  });


    // eleventyConfig.addCollection("manualcontent", function(collection) {
  //   let output = [];
  //   collection.getAll().forEach(item => {
  //     if(item.data.wordpress.dataset) {
  //       // Set up fields for passing into template
  //       item.data.title = item.data.wordpress.dataset.data.title;
  //       item.data.templatestring = item.data.wordpress.dataset.data.template;
  //       item.data.page_meta = item.data.wordpress.dataset.data.page_meta;
  //       item.data.category = item.data.wordpress.dataset.data.category;
  //       item.data.id = item.data.wordpress.dataset.data.id;

  //       let mediaString = new RegExp('\\' + replacementPaths.media.src, 'g');
  //       item.data.wordpress.content = item.data.wordpress.content.replace(mediaString,replacementPaths.media.targetPermalink);
  //       try {
  //         item.data.page_meta.image.url[0] = item.data.page_meta.image.url[0] !== "" ? item.data.page_meta.image.url[0].replace(mediaString,replacementPaths.media.targetPermalinkOGTags) : "";
  //       } catch (error) {
  //         // console.error(error);
  //       }
       
  //     }
  //     output.push(item);
  //   });

  //   return output;
  // });

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
 
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "dist/*": "/" });


  eleventyConfig.addCollection("mySort", function(collection) {
    let posts = [];
    collection.getAll().forEach( (item) => {
      if(item.data.tags && item.data.tags[0] == 'news') {
        posts.push(item);
      }
    })
    return posts.sort(function(a, b) {
      return new Date(a.data.publishdate) - new Date(b.data.publishdate);
    }).reverse();
  });

  // end new stuff
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