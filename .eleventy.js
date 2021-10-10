const CleanCSS = require("clean-css"); // CSS optimizer
const getRecentPosts = require("./pages/_data/recent-posts.js"); // Q: Do we have to do this?
const postList = require("./pages/_data/post-list.js"); // Get templated post-list
const eventList = require("./pages/_data/event-list.js"); // Get templated post-list

// Get static site build configurations and setting (@TODO: for current branch.)
const odiPublishing = require("./odi-publishing/config.js");
const config = odiPublishing.getConfig();

const {
  processContentPage,
  processContentPost,
  processContentEvent,
} = require("./pages/_data/wordpress-content.js"); // Content data processors for WordPress API. 

// [11ty](https://www.11ty.dev/docs/)
/**
 * Create 11ty build [configuration settings](https://www.11ty.dev/docs/config/)
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  // Build configurations
  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    notify: true,
  });
  
  // https://www.11ty.dev/docs/copy/#manual-passthrough-file-copy-(faster)
  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });
  eleventyConfig.addPassthroughCopy({
    [config.build.media]: config.build.upload_folder, // Copy local wordpress media file to original relative path
  });

  eleventyConfig.addPassthroughCopy({ "dist/index.css.map": "/index.css.map" });

  // Make CSS smaller
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  /* Content type collections */
  // Process content, update data cache
  eleventyConfig.addCollection("pages", function (collection) {
    let items = [];
    // Folders to process
    let localFolder = config.build.pages;
    // Build array of processed content data items.
    collection.getAll().forEach((item) => {
      item = processContentPage(item, localFolder, false);
      if (item.data.data) {
        if (item.data.data.type === "page") {
          items.push(item);
        }
      }
    });
    // @TODO convert to a sort function.
    // items.sort((a,b) => {
    //   return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
    // });
    return items;
  });

  // Process content, update data.
  eleventyConfig.addCollection("posts", function (collection) {
    let items = [];
    // Folders to process
    let localFolder = config.build.posts;
    // Build array of processed content data items.
    collection.getAll().forEach((item) => {
      item = processContentPost(item, localFolder);
      if (item.data.data) {
        if (item.data.data.type === "post") {
          items.push(item);
        }
      }
    });
    return items;
  });

  // Process content, update data.
  // eleventyConfig.addCollection("events", function (collection) {
  //   let posts = [];
  //   // Folders to process
  //   let localFolder = config.build.posts;

  //   collection.getAll().forEach((item) => {
  //     // @IDEA processContentEvent.sort
  //     // @NOTE startTimeUtC is the field
  //     item = processContentEvent(item, localFolder);

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

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: config.build.input,
      output: config.build.output,
    },
  };
};


// Junk
  // @Q How is this used?
  // eleventyConfig.addFilter("dateFormat", function (dateString) {
  //   let d = new Date(dateString);
  //   return `${monthStrings[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  // });

    // @TODO correct the sort field - YYYY-MM-DD custom_post_date (requires DB sync)
  // pressPosts.sort((a,b) => {
  //   return new Date(b.data.data.date).getTime() - new Date(a.data.data.date).getTime();
  // });