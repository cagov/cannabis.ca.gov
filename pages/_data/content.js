/**
 *
 * @param {*} item
 * @param {*} folderNames
 */
exports.processContentPost = (item, folderNames) => {
  if (
    item.inputPath.includes(folderNames[0]) ||
    item.inputPath.includes(folderNames[1])
  ) {
    let args = siteSettings();

    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";
      item = processMeta({contentItem : item, ...args});
  }
  return item;
};

/**
 *
 * @param {*} item
 * @param {*} folderNames
 */
exports.processContentPage = (item, folderNames) => {
  if (
    item.inputPath.includes(folderNames[0]) ||
    item.inputPath.includes(folderNames[1])
  ) {
    let args = siteSettings();
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";
    item = processMeta({contentItem : item, ...args});
  }
  return item;
};


const siteSettings = () => {
  // @TODO get from config odi-publishing.json
  return {
    layoutFolder : "layouts/index",
    site_url : "https://cannabis.ca.gov",
    page_social_image_url : "https://cannabis.ca.gov/wp-content/uploads/sites/2/2021/07/cropped-Cannabis_horizontal_social-1.png",
    page_social_image_alt : "Department of Cannabis Control",
    page_social_image_width : 1200,
    page_social_image_height : 630,
    upload_folder : '/wp-content/uploads/',
    replaceUrls : ["http://cannabis.ca.gov/", "https://cannabis.ca.gov/"],
    editor_url : "https://dev-cagov-dcc.pantheonsite.io",
    production_url : "https://cannabis.ca.gov"
  };
}

/**
 *
 * @param {*} item
 * @param {*} folderNames
 */
exports.processContentEvent = (item, folderNames) => {
  if (
    item.inputPath.includes(folderNames[0]) ||
    item.inputPath.includes(folderNames[1])
  ) {
    let args = siteSettings();
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";
    item = processMeta({contentItem : item, ...args});
  }
  return item;
};

/**
 * @ISSUE Do we really need this? 
 * @param {*} data 
 * @returns 
 */
const getOGMetatags = function (data) {
  if(!data.og_meta) {
    return "";
  }
  let og_meta = data.og_meta.og_rendered;
  return og_meta;
}

/**
 *
 * @param {*} item
 * @returns
 */
const processMeta = ({
  contentItem, 
  layoutFolder = "layouts/index",
  site_url = "https://cannabis.ca.gov",
  page_social_image_url = "https://cannabis.ca.gov/wp-content/uploads/sites/2/2021/07/cropped-Cannabis_horizontal_social-1.png",
  page_social_image_alt = "Department of Cannabis Control",
  page_social_image_width = 1200,
  page_social_image_height = 630,
  upload_folder = '/wp-content/uploads/',
  replaceUrls = ["http://cannabis.ca.gov/", "https://cannabis.ca.gov/"],
  editor_url = "https://dev-cagov-dcc.pantheonsite.io",
  production_url = "https://cannabis.ca.gov"
}) => {
  let item = contentItem;

  item.url = item.outputPath;
  item.data.page.url = item.url;

  //content pulled in from JSON
  const jsonData = item.data.data;
  item.data.layout = layoutFolder;
  item.data.title = jsonData.title;
  item.data.publishdate = jsonData.date.split('T')[0]; //new Date(jsonData.modified_gmt)
  item.data.meta = getHeadTags(jsonData, "excerpt");
  item.data.excerpt = getHeadTags(jsonData, "excerpt");
  item.data.description = getHeadTags(jsonData, "excerpt");
  if(!item.data.og_meta) { item.data.og_meta = {}; }

  let default_og_meta = {
    site_name: "Department of Cannabis Control",
    site_description: getHeadTags(jsonData, "excerpt"), // This should have been excerpt raw, not rendered.
    site_url: site_url,
    canonical_url: jsonData.wordpress_url, // @ISSUE check
    page_title: jsonData.title,
    page_description: getHeadTags(jsonData, "excerpt"),
    page_social_image_url: page_social_image_url,
    page_social_image_width: page_social_image_width,
    page_social_image_height: page_social_image_height,
    page_social_image_alt: page_social_image_alt,
    meta_title: jsonData.title,
    meta_description: getHeadTags(jsonData, "excerpt"),
    meta_canonical_url: jsonData.wordpress_url,
    open_graph_title: jsonData.title,
    open_graph_description: getHeadTags(jsonData, "excerpt"),
    twitter_title: jsonData.title,
    twitter_description: getHeadTags(jsonData, "excerpt")
  };

  item.data.og_meta = default_og_meta;
  if (jsonData.og_meta !== undefined && jsonData.og_meta.editor !== undefined) {
    Object.keys(jsonData.og_meta).map(meta => {
        if (jsonData.og_meta[meta] !== "") {
          item.data.og_meta[meta] = jsonData.og_meta[meta];
        }
    });
  }

  item.data.description = item.data.og_meta.page_description;

  item.data.lead = jsonData.excerpt;
  item.data.author = jsonData.author;
  item.data.templatestring = chooseTemplate(jsonData);
  item.data.category = jsonData.category;
  item.data.id = jsonData.id;
  item.data.parentid = jsonData.parent;

  if(jsonData.media) {
    const featuredMedia = jsonData.media.find(x=>x.featured);
    if(featuredMedia) {
      item.data.previewimage = uploadFolder + featuredMedia.path;
    }

    jsonData.media.filter(x=>x.source_url_match).forEach(m=>{
      // replaceContent(item,new RegExp(m.source_url,'g'),'/'+wordpressImagePath+'/'+m.path);
      // item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp(m.source_url,'g'),'/media/'+m.path);
    });
  }

  // @TODO Modify the wordpress asset links here opportunistically because we are already looping through templates with njk transformed into HTML
  // @TODO iterate over replaceUrls, quick hack here
  item.template.frontMatter.content = replaceUrl(item.template.frontMatter.content, replaceUrls[0], "/");
  item.template.frontMatter.content = replaceUrl(item.template.frontMatter.content, replaceUrls[1], "/");

  return item;
};

const replaceUrl = function(content, match, replacement) {
  return string.replace(
    new RegExp(replacement, "g"),
    replacement
  );
}


/**
 *
 * @param {*} url
 * @returns
 */
const cleanUrl = function (url) {
  if (url) {
    // @DOCS odi-publishing.json
    if (url.indexOf(".pantheonsite.io/") > -1) {
      return url.split(".pantheonsite.io/")[1];
    }
    if (url.indexOf("cannabis.ca.gov") > -1) {
      return url.split("cannabis.ca.gov")[1];
    }
  }
  return url;
};

/**
 * Get the njk template that corresponds to settings from the API
 * @param {*} data
 * @returns
 */
const chooseTemplate = function (data) {
  // Get value set in API for headless design system
  let template;
  if (data.design_system_fields) {
    template = data.design_system_fields.template;
  }
  if (data.wordpress_url === "https://cannabis.ca.gov/") {
    return "landing";
  }
  if (data.wordpress_url === "https://cannabis.ca.gov/serp/") {
    return "search";
  }
  if (data.template?.indexOf("single-column") > -1) {
    return "single-column";
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
};

/**
 *
 * @param {*} data
 * @param {*} field
 * @returns
 */
const getHeadTags = function (data, field) {
  if (field === "excerpt") {
    const content = data.excerpt.replace(/(<([^>]+)>)/gi, "");
    return content;
  }

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
    return "Department of Cannabis Control";
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
    return "Department of Cannabis Control";
  }
  if (field === "site_title") {
    try {
      return data.site_settings.site_name;
    } catch (error) {
      // console.error("No site, page or post title found.")
    }
    return "Department of Cannabis Control";
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
    return "";
  }
  if (field === "image") {
    try {
      return {
        url: data.og_meta._social_image_url,
        width: 1200, // Need to expose variable from API
        height: 630, // Need to expose variable from API
      };
    } catch (error) {
      // console.error("No social image found.")
    }
    return {
      url: "https://headless.cannabis.ca.gov/media/sites/2/2021/07/cropped-Cannabis_horizontal_social-1.png",
      width: 1200, // Need to expose variable from API
      height: 630, // Need to expose variable from API
    };
  }
  return false;
};

exports.getHeadTags = getHeadTags;
exports.chooseTemplate = chooseTemplate;
exports.cleanUrl = cleanUrl;
exports.processMeta = processMeta;
