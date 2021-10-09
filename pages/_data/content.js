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
      "docs/" +
      extractMeta.cleanUrl(item.data.data.wordpress_url) +
      "index.html";
  }

  if (item.data.data) {
    if (item.data.data.type === "post") {
      pressPosts.push(pressMeta(item));
    }
  }
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
      "docs/" +
      extractMeta.cleanUrl(item.data.data.wordpress_url) +
      "index.html";
  }

  if (item.data.data) {
    if (item.data.data.type === "post") {
      pressPosts.push(pressMeta(item));
    }
  }
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
      "docs/" +
      extractMeta.cleanUrl(item.data.data.wordpress_url) +
      "index.html";
  }

  if (item.data.data) {
    if (item.data.data.type === "post") {
      pressPosts.push(pressMeta(item));
    }
  }
};

const processMeta = (item) => {
  item.url = item.outputPath;
  item.data.page.url = item.url;

  //content pulled in from JSON
  const jsonData = item.data.data;
  item.data.layout = "layouts/index";
  item.data.title = jsonData.title;
  item.data.publishdate = jsonData.date.split("T")[0]; //new Date(jsonData.modified_gmt)
  item.data.meta = jsonData.excerpt;
  item.data.description = jsonData.excerpt;

  item.data.description = extractMeta.getHeadTags(jsonData, "page_description");
  if (!item.data.social) {
    item.data.social = {};
  }
  item.data.social.site_title = extractMeta.getHeadTags(jsonData, "site_title");
  item.data.social.site_description = extractMeta.getHeadTags(
    jsonData,
    "site_description"
  );
  item.data.social.image = extractMeta.getHeadTags(jsonData, "image");
  item.data.social.twitter_title = extractMeta.getHeadTags(
    jsonData,
    "twitter_title"
  );
  item.data.social.og_meta = extractMeta.getOGMetatags(jsonData);

  item.data.lead = jsonData.excerpt;
  item.data.author = jsonData.author;
  item.data.templatestring = extractMeta.chooseTemplate(jsonData);
  item.data.category = jsonData.category;
  item.data.id = jsonData.id;
  item.data.parentid = jsonData.parent;

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

exports.processMeta = processMeta;