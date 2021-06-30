// read all the files in the wordpress directory
// combine them into an array
// the contents of each named file is combined into an object with the html as the content value
const fs = require('fs');

module.exports = function() {
  return new Promise((resolve, reject) => {
    let wordPressArray = [];
    fs.readdir('wordpress/pages/', (err, files) => {
      let newObj = {};
      files.forEach(file => {
        if(file.indexOf('.html') > -1) {
          newObj = {};
          newObj.filename = file.replace('.html','');
          newObj.content = fs.readFileSync('wordpress/pages/'+file,'utf8');
        }
        if(file.indexOf('.json') > -1) {
          newObj.filename = file.replace('.json','');
          let fileData = JSON.parse(fs.readFileSync('wordpress/pages/'+file,'utf8'));
          newObj.dataset = fileData;
          newObj.dataset.data.wordpress_url = cleanUrl(fileData.data.wordpress_url);
          newObj.dataset.data.template = chooseLayout(fileData.data.template);
          console.log('hi '+ newObj.dataset.data.template);
          wordPressArray.push(newObj);
        }
      });
      resolve(wordPressArray);  
    });
  });
};

function cleanUrl (url) {
  let pageUrl =  url.replace('https://dev-cagov-dcc.pantheonsite.io','').replace('https://staginginye.prod3.sites.ca.gov/','');
  return pageUrl;
}
function chooseLayout(templateLoc) {
  if(templateLoc && templateLoc.indexOf('/includes/templates/template-page.php') > -1) {
    return 'layouts/page.njk'
  }
  return 'layouts/home.njk'
}