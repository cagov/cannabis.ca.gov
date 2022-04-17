const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const cagovBuildSystem = require("@cagov/11ty-build-system");
const config = require("./odi-publishing/config.js");

const { renderPostLists } = require("./src/components/post-list/render");
const { renderEventLists } = require("./src/components/event-list/render");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(cagovBuildSystem, {
    sass: {
      watch: ["src/css/**/*", "src/components/**/*.scss"],
      output: "dist/index.css",
      options: {
        file: "src/css/sass/index.scss",
        includePaths: ["./src/css/sass"],
      },
    },
    rollup: {
      watch: ["src/js/**/*", "src/components/**/*.js"],
      file: "src/js/rollup.config.js",
    },
  });

  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    notify: true,
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Change the domain on a URL.
  // Good candidate for 11ty-build-system.
  eleventyConfig.addFilter("changeDomain", function (url, domain) {
    try {
      let host = config.build.canonical_url.split("//");
      let u = new URL(url, host[1]);
      u.host = domain;
      u.protocol = host[0] + "//";
      return u.href;
    } catch {
      return url;
    }
  });

  // Replace Wordpress Media paths.
  // Use this explicitly when a full URL is needed, such as within meta tags.
  // Doing so will ensure the domain doesn't get nuked by the HTML transformation below.
  eleventyConfig.addFilter("changeWpMediaPath", function (path) {
    return path.replace(
      new RegExp(`/${config.build.upload_folder}`, "g"),
      "/media/"
    );
  });

  eleventyConfig.addTransform("htmlTransforms", function (html, outputPath) {
    //outputPath === false means serverless templates
    if (!outputPath || outputPath.endsWith(".html")) {
      // Render post-lists
      if (html.includes("cagov-post-list")) {
        html = renderPostLists(html);
      }

      if (html.includes("cagov-event-post-list")) {
        html = renderEventLists(html);
      }
      // Replace Wordpress media paths with correct 11ty output path.
      // html = html.replace(new RegExp(`http.+?/${config.build.upload_folder}`, 'g'), "/media/");

      // Minify HTML.
      html = htmlmin.minify(html, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return html;
  });

  eleventyConfig.addPassthroughCopy({ "src/wordpress-media": "/wp-uploads" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/css/svg": "css/svg" });
  eleventyConfig.addPassthroughCopy({ "dist/*": "/" });

  // Preview support for any branch
  const {
    addPreviewModeToEleventy,
  } = require("@cagov/11ty-serverless-preview-mode");


  /**
   * @type {import('@cagov/11ty-serverless-preview-mode').WordpressSettingCallback}
   */
  const itemSetterCallback = (item, jsonData) => {
    //Customize for your templates
    item.data.layout = "page.njk";
    // item.data.tags = ["do-not-crawl"];
    // item.data.addtositemap = false;
    // item.data.title = jsonData.title.rendered;
    // item.data.publishdate = jsonData.date.split("T")[0]; //new Date(jsonData.modified_gmt)
    // item.data.meta = jsonData.excerpt.rendered
    //   .replace(/<p>/g, "")
    //   .replace(/<\/p>/g, "");

    // item.data.author = "State of California";

    // item.template.frontMatter.content += jsonData.content.rendered;
  };

  addPreviewModeToEleventy(eleventyConfig, itemSetterCallback);

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "src/templates",
      output: "docs",
      layouts: "_includes/layouts",
    },
  };
};
