const fs = require("fs");
const config = require("../../config");
const data = require("../_content/menu/headerMenu.json");

/**
 * Read menu object and build dataset for header menu component.
 *
 * @param {*} url
 * @param {*} title
 * @returns
 */
module.exports = () => data.items.map((item) => ({
      title: item.title,
      url: item.url.replace(config.build.editor_url, ""),
      child_items: item.child_items.map((childItem) => ({
          title: childItem.title,
          url: childItem.url.replace(config.build.editor_url, ""),
        })),
    }));
