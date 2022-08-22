const config = require("./config");

const getUrlPath = (url) => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};

const getTemplate = (article) => {
  let template = "page";

  template = article.data?.type; // page or post from WP

  if (article.data?.design_system_fields?.template) {
    template = article.data?.design_system_fields?.template.replace("template-", "").replace("page-", ""); // Remove extra template- prefix that comes from some instances of WP. (The desired template values will be without the prefix.)

    if (template === "single-press-release") {
      return "press-release";
    }
    
    if (template === "single-event") {
      return "event";
    }

    if (template === "searchpage") {
      return "search";
    }

    if (template === "single") {
      return "single-column";
    }
  }

  return template;
}

module.exports = {
  eleventyComputed: {
    permalink: article => getUrlPath(article.data?.wordpress_url),
    layout: article => getTemplate(article),
    parentid: article => article.data.parent,
    title: article => article.data.title,
    category: article => article.data?.categories[0],
    site_name: config.data.name,
    gov_name: "CA.GOV", // @TODO abstract
    gov_url: "https:\/\/ca.gov", // @TODO abstract
    // Below, mimic the structure of Wordpress article data files (pages/posts).
    // Use the value in the article data JSON if available, otherwise set default.
    data: {
      // ascii: config.build.ascii || "",
      og_meta: {
        site_url: config.og_meta.site_url,
        canonical_url: article => 
          article.data?.wordpress_url,
        page_title: article => 
          article.data.og_meta?.page_title 
          || config.og_meta.site_name,
        twitter_title: article => 
          article.data.og_meta?.twitter_title 
          || config.og_meta.site_name,
        open_graph_title: article => 
          article.data.og_meta?.open_graph_title 
          || config.og_meta.site_name,
        site_title: article => 
          article.data.og_meta?.site_name 
          || config.og_meta.site_name,
        site_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.site_description 
          || config.og_meta.site_description,
        page_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.page_description 
          || config.og_meta.site_description,
        open_graph_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.open_graph_description 
          || config.og_meta.site_description,
        twitter_description: article => 
          article.data?.excerpt 
          || article.data.og_meta?.twitter_description 
          || config.og_meta.site_description,
        page_social_image_url: article =>
          article.data.og_meta?.page_social_image_url 
          || config.og_meta.page_social_image_url,
        page_social_image_width: article => 
          article.data.og_meta?.page_social_image_width 
          || config.og_meta.page_social_image_width,
        page_social_image_height: article => 
          article.data.og_meta?.page_social_image_height 
          || config.og_meta.page_social_image_height,
        page_social_image_alt: article => 
          article.data.og_meta?.page_social_image_alt 
          || config.og_meta.page_social_image_alt,
        keywords: config.build.keywords || ""
      },
      build: {
        favicon: config.build.favicon
      }
    }
  }
};