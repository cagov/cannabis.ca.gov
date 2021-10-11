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
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";

    // item = processMeta(item);
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
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";
    item = processMeta(item);
  }
  return item;
};

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
    item.outputPath =
      "docs/" + cleanUrl(item.data.data.wordpress_url) + "index.html";
    item = processMeta(item);
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
const processMeta = (contentItem) => {
  let item = contentItem;
  item.url = item.outputPath;
  item.data.page.url = item.url;

  //content pulled in from JSON
  const jsonData = item.data.data;
  item.data.layout = "layouts/index";
  item.data.title = jsonData.title;
  item.data.publishdate = jsonData.date.split("T")[0]; //new Date(jsonData.modified_gmt)
  item.data.meta = jsonData.excerpt;
  item.data.description = jsonData.excerpt;

  item.data.description = getHeadTags(jsonData, "page_description");
  if (!item.data.social) {
    item.data.social = {};
  }
  item.data.social.site_title = getHeadTags(jsonData, "site_title");
  item.data.social.site_description = getHeadTags(jsonData, "site_description");
  item.data.social.image = getHeadTags(jsonData, "image");
  item.data.social.twitter_title = getHeadTags(jsonData, "twitter_title");
  item.data.social.og_meta = getOGMetatags(jsonData);

  item.data.lead = jsonData.excerpt;
  item.data.author = jsonData.author;
  item.data.page_layout_name = chooseTemplate(jsonData);
  item.data.category = jsonData.category;
  item.data.id = jsonData.id;
  item.data.parent_id = jsonData.parent;

  if (jsonData.media) {
    const featuredMedia = jsonData.media.find((x) => x.featured);
    if (featuredMedia) {
      item.data.previewimage = "/wp-content/uploads/" + featuredMedia.path;
    }

    jsonData.media
      .filter((x) => x.source_url_match)
      .forEach((m) => {
        // replaceContent(item,new RegExp(m.source_url,'g'),'/'+wordpressImagePath+'/'+m.path);
        // item.template.frontMatter.content = item.template.frontMatter.content.replace(new RegExp(m.source_url,'g'),'/media/'+m.path);
      });
  }

  // @TODO Modify the wordpress asset links here opportunistically because we are already looping through tempaltes with njk transformed into HTML
  item.template.frontMatter.content = item.template.frontMatter.content.replace(
    new RegExp("http://cannabis.ca.gov/", "g"),
    "/"
  );
  item.template.frontMatter.content = item.template.frontMatter.content.replace(
    new RegExp("https://cannabis.ca.gov/", "g"),
    "/"
  );

  return item;
};

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
