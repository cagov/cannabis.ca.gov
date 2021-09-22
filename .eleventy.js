const CleanCSS = require("clean-css");
let pressList = require('./pages/_includes/layouts/templates/press-list.js');
let lastFewPosts = require('./pages/_data/last-few-posts.js');
const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 
 */
module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "media" });
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
        item.outputPath = 'docs' + cleanUrl(item.data.data.wordpress_url) + 'index.html';

        item.url = item.outputPath;
        item.data.page.url = item.url;

        //content pulled in from JSON
        const jsonData = item.data.data;
        item.data.layout = "layouts/index";
        item.data.title = jsonData.title;
        item.data.publishdate = jsonData.date.split('T')[0]; //new Date(jsonData.modified_gmt)
        item.data.meta = jsonData.excerpt;
        item.data.description = jsonData.excerpt;

        item.data.description = getHeadTags(jsonData, "page_description");
        if(!item.data.social) { item.data.social = {}; }
        item.data.social.site_title = getHeadTags(jsonData, "site_title");
        item.data.social.site_description = getHeadTags(jsonData, "site_description");
        item.data.social.image = getHeadTags(jsonData, "image");
        item.data.social.twitter_title = getHeadTags(jsonData, "twitter_title");
        item.data.social.og_meta = getOGMetatags(jsonData);

        item.data.lead = jsonData.excerpt;
        item.data.author = jsonData.author;
        item.data.templatestring = chooseTemplate(jsonData);
        item.data.category = jsonData.category;
        item.data.id = jsonData.id;
        item.data.parentid = jsonData.parent;

        if(jsonData.media) {
          const featuredMedia = jsonData.media.find(x=>x.featured);
          if(featuredMedia) {
            item.data.previewimage = '/media/'+featuredMedia.path;
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
      item.template.frontMatter.content = item.template.frontMatter.content.replace('http://cannabis.ca.gov/wp-content/uploads/','/media/');
      item.template.frontMatter.content = item.template.frontMatter.content.replace('https://cannabis.ca.gov/wp-content/uploads/','/media/');
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

function cleanUrl(url) {
  if(url) {
    if (url.indexOf(".pantheonsite.io/") > -1) {
      return url.split(".pantheonsite.io/")[1];
    }
    if(url.indexOf('cannabis.ca.gov') > -1) {
      return url.split('cannabis.ca.gov')[1]
    }  
  }
  return url;
}
/**
 * Get the njk template that corresponds to settings from the API
 * @param {*} data
 * @returns
 */
function chooseTemplate(data) {
  // Get value set in API for headless design system
  let template;
  if(data.design_system_fields) {
    template = data.design_system_fields.template;
  }
  if(data.wordpress_url === 'https://cannabis.ca.gov/') {
    return "landing"
  }
  if(data.wordpress_url === 'https://cannabis.ca.gov/serp/') {
    return "search"
  }
  if(data.template?.indexOf('template-page-single-column') > -1) {
    return "template-page-single-column"
  }

  // Handle errors
  if (template === undefined || template === null) {
    if (data.type === "post") {
      return "post";
    } else if (data.type === "page") {
      return "page";
    }
    return "page";
  }
  // Return template set by editor
  return template;
}

function getOGMetatags(data) {
  if(!data.og_meta) {
    return "";
  }
  let og_meta = data.og_meta.og_rendered;
  return og_meta;
}

function getHeadTags(data, field) {
  if (field === "page_title") {
    try {
      if (data.og_meta._genesis_title !== "") {
        return data.og_meta._genesis_title;
      } else if (data.og_meta._open_graph_title !== "") {
        return data.og_meta._genesis_title;
      } else {
        return data.title;
      }
    } catch (error) {
      // console.error("No site, page or post title found.")
    }
    return "Department of Cannabis Control";
  }
  if (field === "twitter_title") {
    try {
      if (data.og_meta._twitter_title !== "") {
        return data.og_meta._twitter_title;
      } else {
        return data.title;
      }
    } catch (error) {
      // console.error("No twitter title found.")
    }
    return "Department of Cannabis Control";
  }
  if (field === "site_title") {
    try {
        return data.site_settings.site_name;
    } catch (error) {
      // console.error("No site, page or post title found.")
    }
    return "Department of Cannabis Control";
  }
  if (field === "page_description") {
    try {
      if (data.og_meta._genesis_description !== "") {
        return data.og_meta._genesis_description[0];
      } else if (data.og_meta._open_graph_description !== "") {
        return data.og_meta._open_graph_description[0];
      } else {
        return data.site_settings.site_description;
      }
    } catch (error) {
      // console.error("No site, page or post description found.")
    }
  }
  if (field === "site_description") {
    try {
        return data.site_settings.site_description;
    } catch (error) {
      // console.error("No site, page or post description found.")
    }
    return "";
  }
  if (field === "image") {
    try {
        return {
          url: data.og_meta._social_image_url,
          width: 1200, // Need to expose variable from API
          height: 630 // Need to expose variable from API
        };
    } catch (error) {
      // console.error("No social image found.")
    }
    return {
      url: 'https://headless.cannabis.ca.gov/media/sites/2/2021/07/cropped-Cannabis_horizontal_social-1.png',
      width: 1200, // Need to expose variable from API
      height: 630 // Need to expose variable from API
    };
  }
  return false;
}