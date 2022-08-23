const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const cagovBuildSystem = require("@cagov/11ty-build-system");
const config = require("./config");
const { copyFolderRecursiveSync } = require("./src/js/sync-static-content");
const {
  renderPostLists,
  renderWordpressPostTitleDate,
} = require("./src/js/post-list/render");
const { renderEventLists } = require("./src/js/event-list/render");

module.exports = function (eleventyConfig) {
  // Copy posts from static bundle to gitignored folder in 11ty directory for local processing
  copyFolderRecursiveSync(
    config.staticContentPaths.posts,
    config.build.eleventy_content
  );

  // Copy pages from static bundle to gitignored folder in 11ty directory for local processing
  copyFolderRecursiveSync(
    config.staticContentPaths.pages,
    config.build.eleventy_content
  );

  copyFolderRecursiveSync(
    config.staticContentPaths.menu,
    config.build.eleventy_content
  );

  copyFolderRecursiveSync(
    config.staticContentPaths.redirects,
    config.build.eleventy_content
  );

  eleventyConfig.addPlugin(cagovBuildSystem, {
    processors: {
      sass: {
        watch: ["src/css/**/*", "src/components/**/*.scss"],
        output: "dist/index.css",
        options: {
          file: "src/css/sass/index.scss",
          includePaths: ["./src/css/sass"],
        },
      },
      esbuild: {
        watch: ["src/js/**/*", "src/components/**/*"],
        options: {
          entryPoints: ["src/js/index.js"],
          bundle: true,
          minify: true,
          format: "esm",
          outfile: "dist/built.js",
          loader: {
            ".css": "text",
            ".html": "text",
          },
        },
      },
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
  eleventyConfig.addFilter("changeDomain", function (url, domain) {
    console.log(url, domain);
    try {
      let host = config.build.canonical_url.split("//"); 
      console.log("host", host);
      let changedUrl = url;
      // There are multiple strings that we may need to replace because of how we merge and work with data. Use them all.
      config.build.replace_urls.map((item) => {
        changedUrl = changedUrl.replace(item, host[0] + "//" + domain);
      });
      return changedUrl;
    } catch {
      return url;
    }
  });

  // Replace Wordpress Media paths.
  // Use this explicitly when a full URL is needed, such as within meta tags.
  // Doing so will ensure the domain doesn't get nuked by the HTML transformations below.
  eleventyConfig.addFilter("changeWpMediaPath", function (path) {
    return path.replace(
      new RegExp(`/${config.build.upload_folder}`, "g"),
      config.build.eleventy_media
    );
  });

  // @DOCS - What's this & why? - CS
  eleventyConfig.addFilter("displayPostInfo", function (item) {
    return renderWordpressPostTitleDate(item.data, {
      showExcerpt: true,
      showPublishDate: true,
    });
  });

  eleventyConfig.addTransform("htmlTransforms", function (html, outputPath) {
    //outputPath === false means serverless templates (@DOCS ? - CS)
    if (!outputPath || outputPath.endsWith(".html")) {
      // Render post-list components
      if (html.includes("cagov-post-list")) {
        html = renderPostLists(html);
      }

      // Render posts with event web component
      if (html.includes("cagov-event-post-list")) {
        html = renderEventLists(html);
      }

      // Minify HTML
      html = htmlmin.minify(html, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return html;
  });

  // Copy media assets folder from static site to built site
  eleventyConfig.addPassthroughCopy({
  [config.staticContentPaths.media]:
      config.build.docs_media,
  });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "dist/*": "/" });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: config.build.eleventy_input,
      output: config.build.eleventy_output,
      layouts: config.build.eleventy_layouts,
    },
  };
};
