const fs = require("fs");

module.exports = function (count = 5, fieldDate = "date") {
  let wordPressArray = [];
  let files = fs.readdirSync("pages/wordpress/posts/");
  files.forEach((file) => {
    if (file.indexOf(".json") > -1) {
      let loc = "pages/wordpress/posts/" + file;
      let parsedInfo = JSON.parse(fs.readFileSync(loc, "utf8"));
      if (parsedInfo.data.type === "post") {
        wordPressArray.push(parsedInfo);
      }
    }
  });

  // @TODO @DATABINDING
  return wordPressArray
    .sort((a, b) => {
      // return new Date(a.data[fieldDate]).getTime() - new Date(b.data[fieldDate]).getTime();
      return new Date(a.data[fieldDate]) - new Date(b.data[fieldDate]); // @TODO look up new date (without time)
    })
    .slice(Math.max(wordPressArray.length - count, 0))
    .reverse();
};
