const fs = require("fs");

/**
 * @DOCS
 * @returns
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    let idObject = {};
    fs.readdir("pages/wordpress/pages/", (err, files) => {
      files.forEach((file) => {
        if (file.indexOf(".json") > -1) {
          // @TODO this should come from odi-publishing.json @ISSUE
          let fileData = JSON.parse(
            fs.readFileSync("pages/wordpress/pages/" + file, "utf8")
          );
          // Create id object
          // @DOCS what is this for?
          idObject[fileData.data.id] = fileData.data.title;
        }
      });

      fs.readdir("pages/wordpress/posts/", (err, files) => {
        files.forEach((file) => {
          if (file.indexOf(".json") > -1) {
            // @TODO this should come from odi-publishing.json @ISSUE
            let fileData = JSON.parse(
              fs.readFileSync("pages/wordpress/posts/" + file, "utf8")
            );
            // Create id object
          // @DOCS what is this for?
            idObject[fileData.data.id] = fileData.data.title;
          }
        });
        resolve(idObject);
      });
    });
  });
};
