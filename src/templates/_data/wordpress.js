const fs = require("fs");

module.exports = function () {
  return new Promise((resolve, reject) => {
    let wordPressArray = [];
    let fileNameMap = new Map();
    fs.readdir("wordpress/pages/", (err, files) => {
      files.forEach((file) => {
        let loc = "wordpress/pages/" + file;
        processFile(file, fileNameMap, loc);
      });

      fs.readdir("wordpress/posts/", (err, files) => {
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

function processFile(file, fileNameMap, loc) {
  let fileName = file.split(".")[0];
  let fileDetails = fileNameMap.get(fileName);
  if (!fileDetails) {
    fileDetails = {};
  }
  if (file.indexOf(".html") > -1) {
    fileDetails.filename = file.replace(".html", "");
    fileDetails.content = fs.readFileSync(loc, "utf8");
  }
  if (file.indexOf(".json") > -1) {
    fileDetails.filename = file.replace(".json", "");
    let fileData = JSON.parse(fs.readFileSync(loc, "utf8"));
    fileDetails.dataset = fileData;    
    fileDetails.dataset.data.template = chooseTemplate(fileDetails.dataset.data);

    // Choose the correct data to display for the page meta.
    fileDetails.dataset.data.page_meta = getPageMeta(fileDetails.dataset.data);
    // Extra permalink url (no domain, used in 11ty frontmatter template)
    fileDetails.dataset.data.wordpress_url = cleanUrl(
      fileData.data.wordpress_url
    );
  }
  fileNameMap.set(fileName, fileDetails);
}

function getPageMeta(data) {
  let page_meta = {};
  page_meta.page_title = getHeadTags(data, "page_title");
  page_meta.page_description = getHeadTags(data, "page_description");
  page_meta.site_title = getHeadTags(data, "site_title");
  page_meta.site_description = getHeadTags(data, "site_description");
  page_meta.canonical_url = getHeadTags(data, "canonical_url");
  page_meta.image = getHeadTags(data, "image");
  page_meta.twitter_title = getHeadTags(data, "twitter_title");
  page_meta.og_meta = getOGMetatags(data);
  // console.log("page_meta", page_meta);
  return page_meta;
}

function cleanUrl(url) {
  if (url.indexOf(".pantheonsite.io/") > -1) {
    return url.split(".pantheonsite.io/")[1];
  }
  if(url.indexOf('cannabis.ca.gov') > -1) {
    return url.split('cannabis.ca.gov')[1]
  }
  return url;
}
/**
 * Get the njk template that corresponds to settings from the API
 * @param {*} data
 * @returns
 */
function chooseTemplate(data) {
  // Get value set in API for headless design system
  let template;
  if(data.design_system_fields) {
    template = data.design_system_fields.template;
  }
  if(data.wordpress_url === 'https://cannabis.ca.gov/') {
    return "landing"
  }
  if(data.wordpress_url === 'https://cannabis.ca.gov/serp/') {
    return "search"
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

function getOGMetatags(data) {
  if(!data.og_meta) {
    return "";
  }
  let og_meta = data.og_meta.og_rendered;
  return og_meta;
}

function getHeadTags(data, field) {
  if (field === "page_title") {
    try {
      if (data.og_meta._genesis_title !== "") {
        return data.og_meta._genesis_title;
      } else if (data.og_meta._open_graph_title !== "") {
        return data.og_meta._genesis_title;
      } else {
        return data.title;
      }
    } catch (error) {
      // console.error("No site, page or post title found.")
    }
    return "California drought action";
  }
  if (field === "twitter_title") {
    try {
      if (data.og_meta._twitter_title !== "") {
        return data.og_meta._twitter_title;
      } else {
        return data.title;
      }
    } catch (error) {
      // console.error("No twitter title found.")
    }
    return "California drought action";
  }
  if (field === "site_title") {
    try {
        return data.site_settings.site_name;
    } catch (error) {
      // console.error("No site, page or post title found.")
    }
    return "California drought action";
  }
  if (field === "page_description") {
    try {
      if (data.og_meta._genesis_description !== "") {
        return data.og_meta._genesis_description[0];
      } else if (data.og_meta._open_graph_description !== "") {
        return data.og_meta._open_graph_description[0];
      } else {
        return data.site_settings.site_description;
      }
    } catch (error) {
      // console.error("No site, page or post description found.")
    }
  }
  if (field === "site_description") {
    try {
        return data.site_settings.site_description;
    } catch (error) {
      // console.error("No site, page or post description found.")
    }
  }
  if (field === "canonical_url") {
    let site_url = "https://drought.ca.gov";
    let url_path = cleanUrl(
      data.wordpress_url
    );
    let permalink = `${site_url}/${url_path}` 
    return permalink;
  }
  if (field === "image") {
    try {
        // @TODO get default social media image
        return {
          url: data.og_meta._social_image_url,
          width: 1200, // Need to expose variable from API
          height: 630 // Need to expose variable from API
        };
    } catch (error) {
      // console.error("No social image found.")
    }
    return "California drought action";
  }
  return false;
}

function getCategory(data) {
  if (data.categories && data.categories[0]) {
    return data.categories[0];
  }
  return false;
}