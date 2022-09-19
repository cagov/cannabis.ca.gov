const fs = require("fs");
const config = require("../../config");

/**
 * Build file ids
 * Used in breadcrumbs
 * @returns
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    let idObject = {};
    // Process pages
    fs.readdir(config.build.eleventy_pages, (err, files) => {
      files.forEach((file) => {
        if (file.indexOf(".json") > -1) {
          let fileData = JSON.parse(
            fs.readFileSync(config.build.eleventy_pages + "/" + file, "utf8")
          );
          idObject[fileData.data.id] = fileData.data.title;
        }
      });

      // Process posts
      fs.readdir(config.build.eleventy_posts, (err, files) => {
        files.forEach((file) => {
          if (file.indexOf(".json") > -1) {
            let fileData = JSON.parse(
              fs.readFileSync(config.build.eleventy_posts + "/" + file, "utf8")
            );
            idObject[fileData.data.id] = fileData.data.title;
          }
        });
        resolve(idObject);
      });
    });
  });
};
