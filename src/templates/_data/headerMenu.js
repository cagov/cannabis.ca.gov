const fs = require("fs");
const config = require('../../../config');
console.log("MENU", config.staticContentPaths.menu);
// const data = require(config.staticContentPaths.menu + '/headerMenu.json');


console.log("dirname", __dirname);
/**
 *
 * @param {*} url
 * @param {*} title
 * @returns
 */
module.exports = () => {
    // return data.items.map((item) => {
    //     // console.log(item.url.replace(config.build.editor_url, ""));
    //     return {
    //         title: item.title,
    //         url: item.url.replace(config.build.editor_url, ""),
    //         child_items: item.child_items.map((childItem) => {
    //             // console.log(childItem.url.replace(config.build.editor_url, ""));
    //             return {
    //                 title: childItem.title,
    //                 url: childItem.url.replace(config.build.editor_url, "")
    //             };
    //         })
    //     };
    // });
};

