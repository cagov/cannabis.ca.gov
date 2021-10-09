const fs = require("fs");
const pageMeta = require("./meta.js");

/**
 * @DOCS 
 * 
 * @returns Array of data from WordPress
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    let wordPressArray = [];
    let fileNameMap = new Map();
    // @TODO @ISSUE these file paths can link to a config setting path for pages & posts so we can move the folders easily.
    fs.readdir("pages/wordpress/pages/", (err, files) => {
      // Process WordPress pages
      files.forEach((file) => {
        let loc = "wordpress/pages/" + file;
        processFile(file, fileNameMap, loc);
      });
      
      // Process WordPress posts data
      fs.readdir("pages/wordpress/posts/", (err, files) => {
        files.forEach((file) => {
          let loc = "wordpress/posts/" + file;
          processFile(file, fileNameMap, loc);
        });
        for (let [key, value] of fileNameMap) {
          wordPressArray.push(value);
        }
        resolve(wordPressArray);
      });
    });
  });
};

/**
 * @DOCS
 * - Notes: frontmatter
 * @param {*} file 
 * @param {*} fileNameMap 
 * @param {*} loc 
 */
function processFile(file, fileNameMap, loc) {
  let fileName = file.split(".")[0];
  let fileDetails = fileNameMap.get(fileName);
  if (!fileDetails) {
    fileDetails = {};
  }
  // Process .html files. Remove .html suffix and read file contents.
  if (file.indexOf(".html") > -1) {
    fileDetails.filename = file.replace(".html", "");
    fileDetails.content = fs.readFileSync(loc, "utf8");
  }

  // Process .json files. Read files and update page metadata.
  if (file.indexOf(".json") > -1) {
    fileDetails.filename = file.replace(".json", "");
    let fileData = JSON.parse(fs.readFileSync(loc, "utf8"));
    // Load up file data.
    fileDetails.dataset = fileData;    
    // Read the template settings and get the correct template for the content type.
    fileDetails.dataset.data.template = choosePageTemplate(fileDetails.dataset.data);
    // Choose the correct data to display for the page meta.
    fileDetails.dataset.data.page_meta = getPageMeta(fileDetails.dataset.data);
    // Extra permalink url (no domain, used in 11ty frontmatter template)
    fileDetails.dataset.data.wordpress_url = cleanUrl(
      fileData.data.wordpress_url
    );
  }
  fileNameMap.set(fileName, fileDetails);
}

/**
 * 
 * @param {*} url 
 * @returns 
 */
function cleanUrl(url) {
  // @TODO Config @DOCS odi-publishing.json
  if (url.indexOf(".pantheonsite.io/") > -1) {
    return url.split(".pantheonsite.io/")[1];
  }
  return url;
}

/**
 * Get the njk template that corresponds to settings from the API
 * @param {*} data
 * @returns name of template
 */
function choosePageTemplate(data) {
  // Get value set in API for headless design system
  let template;
  if(data.design_system_fields) {
      // @TODO @ISSUE should come from odi-publishing.json, will vary by api
    template = data.design_system_fields.template;
  }
  // @TODO @ISSUE should come from odi-publishing.json
  if(data.wordpress_url === 'https://cannabis.ca.gov/') {
    return "landing"
  }

  // Handle errors
  if (template === undefined || template === null) {
    if (data.type === "post") {
      return "post";
    } else if (data.type === "page") {
      return "page";
    }
    return "page";
  }
  // Return template set by editor
  return template;
}
