const fs = require("fs");

module.exports = function () {
  return new Promise((resolve, reject) => {
    let idObject = {};
    fs.readdir("./src/templates/wordpress/pages/", (err, files) => {
        console.log("files", files);
      files.forEach((file) => {
        if (file.indexOf(".json") > -1) {
          let fileData = JSON.parse(fs.readFileSync("./src/templates/wordpress/pages/" + file, "utf8"));
          idObject[fileData.data.id] = fileData.data.title
        }
      });

      fs.readdir("./src/templates/wordpress/posts/", (err, files) => {
        files.forEach((file) => {
          if (file.indexOf(".json") > -1) {
            let fileData = JSON.parse(fs.readFileSync("./src/templates/wordpress/posts/" + file, "utf8"));
            idObject[fileData.data.id] = fileData.data.title
          }
        });
        resolve(idObject);
      });
    });
  });
};