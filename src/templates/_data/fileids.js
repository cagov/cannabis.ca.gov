const fs = require("fs");
const config = require("./../../../config");

module.exports = function () {
  return new Promise((resolve, reject) => {
    let idObject = {};
    // CHECK: This probably won't work - may need to hard code these values because readdir usually doesn't like variables. (But trying it anyways.)
    fs.readdir(config.staticContentPaths.pages, (err, files) => {
      files.forEach((file) => {
        if (file.indexOf(".json") > -1) {
          let fileData = JSON.parse(
            fs.readFileSync(
              config.staticContentPaths.pages + "/" + file,
              "utf8"
            )
          );
          idObject[fileData.data.id] = fileData.data.title;
        }
      });

      fs.readdir(config.staticContentPaths.posts, (err, files) => {
        files.forEach((file) => {
          if (file.indexOf(".json") > -1) {
            let fileData = JSON.parse(
              fs.readFileSync(
                config.staticContentPaths.posts + "/" + file,
                "utf8"
              )
            );
            idObject[fileData.data.id] = fileData.data.title;
          }
        });
        resolve(idObject);
      });
    });
  });
};
