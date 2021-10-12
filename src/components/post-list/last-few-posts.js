const fs = require("fs");

/**
 * Checks for a match between two sets of categories.
 * @param {string[]} componentCategories 
 * @param {string[]} postCategories 
 * @returns {boolean} True if a category match is found, otherwise false.
 */
const categoryMatchBetween = (componentCategories, postCategories) => {
  let unsluggedCategories = componentCategories.map(category => category.replace('-', ' '))
  let intersection = postCategories.filter(category => unsluggedCategories.includes(category.toLowerCase()));
  return (intersection.length > 0);
}

module.exports = (categoryString) => {
  let componentCategories = categoryString.split(',');

  let wordPressArray = [];
  let files = fs.readdirSync('pages/wordpress/posts/');
  files.forEach((file) => {
    if(file.indexOf('.json') > -1) {
      let loc = "pages/wordpress/posts/" + file;
      let parsedInfo = JSON.parse(fs.readFileSync(loc, "utf8"));
      if(parsedInfo.data.type==="post" && categoryMatchBetween(componentCategories, parsedInfo.data.categories)) {
        wordPressArray.push(parsedInfo)  
      }
    }
  });
  return wordPressArray.sort((a,b) => {
    return new Date(a.data.date).getTime() - new Date(b.data.date).getTime();
  }).slice(Math.max(wordPressArray.length - 5, 0)).reverse();
};
