const fs = require("fs");
const config = require('../../../odi-publishing/config.js');
const data = require('./../wordpress/menu/headerMenu.json');
/**
 *
 * @param {*} url
 * @param {*} title
 * @returns
 */
module.exports = () => {
    return data.items.map((item) => {
        // console.log(item.url.replace(config.build.editor_url, ""));
        return {
            title: item.title,
            url: item.url.replace(config.build.editor_url, ""),
            child_items: item.child_items.map((childItem) => {
                // console.log(childItem.url.replace(config.build.editor_url, ""));
                return {
                    title: childItem.title,
                    url: childItem.url.replace(config.build.editor_url, "")
                };
            })
        };
    });
};

