const config = require("../../config/index.js");

/**
 * A "Data Directory File" - https://www.11ty.dev/docs/data-computed/
 * 
 * Values will be available to the templates {{ value }}
 * 
 * This file must be named {foldername}.11tydata.js
 * This file must be located in the content rendering folder, at the top level
 * It is automatically loaded in the 11th data cascade
 * 
 * Localization notes:
 * * Markdown pages with frontmatter loaded will load the .md file first for that language.
 * * The site settings are organized by language
 * * If a language site configuration is not set, the default is English.
 * * Social media images sometimes contain text, and can also be localized.

 */

/**
 * This is used to build a relative path for the 11ty folder system
 * @param {*} url
 * @returns
 */
 const getRelativePath = (url) => {
  try {    
      config.build.replace_urls.forEach((domain) => {
        url = url.replace(domain, "");
        return false;
      });
      return new URL(url).pathname;
  } catch {
    return url;
  }
};

module.exports = {
  eleventyComputed: {
    permalink: (article) =>  getRelativePath(article.data?.wordpress_url),
    parentId: (article) => article.data.parent,
    title: (article) => article.data.title,
    category: (article) => article.data?.categories[0],
  },
};
