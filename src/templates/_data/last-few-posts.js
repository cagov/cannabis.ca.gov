const fs = require("fs");
const wordpress = require("./wordpress");

module.exports = function () {
  let wordPressArray = [];
  let files = fs.readdirSync('wordpress/posts/');
  files.forEach((file) => {
    if(file.indexOf('.json') > -1) {
      let loc = "wordpress/posts/" + file;
      let parsedInfo = JSON.parse(fs.readFileSync(loc, "utf8"));
      if(parsedInfo.data.type==="post") {
        wordPressArray.push(parsedInfo)  
      }
    }
  });
  return wordPressArray.sort((a,b) => {
    return new Date(a.data.date).getTime() - new Date(b.data.date).getTime();
  }).slice(Math.max(wordPressArray.length - 5, 0)).reverse();
};
