const fs = require("fs");

module.exports = function () {
  return new Promise((resolve, reject) => {
    let idObject = {};
    fs.readdir("wordpress/pages/", (err, files) => {
      files.forEach((file) => {
        if (file.indexOf(".json") > -1) {
          let fileData = JSON.parse(fs.readFileSync("wordpress/pages/" + file, "utf8"));
          idObject[fileData.data.id] = fileData.data.title
        }
      });

      fs.readdir("wordpress/posts/", (err, files) => {
        files.forEach((file) => {
          if (file.indexOf(".json") > -1) {
            let fileData = JSON.parse(fs.readFileSync("wordpress/posts/" + file, "utf8"));
            idObject[fileData.data.id] = fileData.data.title
          }
        });
        resolve(idObject);
      });
    });
  });
};