const { EleventyI18nPlugin } = require("@11ty/eleventy");
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const cagovBuildSystem = require("@cagov/11ty-build-system");
const config = require("./config/index.js");
const {
  copyFolderRecursiveSync,
} = require("./src/js/eleventy/sync-static-content.js");
const {
  renderPostLists,
  renderWordpressPostTitleDate,
  setDefaultAttributes,
} = require("./src/js/eleventy/post-list/render.js");
const { renderEventLists } = require("./src/js/eleventy/event-list/render.js");
const {
  pagePath,
  relativePath,
  i18n,
} = require("./src/js/eleventy/filters.js");

module.exports = function eleventyBuild(eleventyConfig) {
  eleventyConfig.htmlTemplateEngine = "njk";

  // Copy content from static bundle to gitignored folder in 11ty directory for local processing
  eleventyConfig.setUseGitIgnore(false);
  copyFolderRecursiveSync(
    config.staticContentPaths.posts,
    config.build.eleventy_content
  );

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

  // Register ca.gov 11ty build system.
  eleventyConfig.addPlugin(cagovBuildSystem, {
    processors: {
      sass: {
        watch: ["src/css/**", "src/components/**"],
        output: "dist/index.css",
        options: {
          file: "src/css/index.scss",
          includePaths: ["./src/css"],
        },
      },
      esbuild: {
        watch: ["src/js/**", "src/js/**/*"],
        options: {
          entryPoints: ["src/js/index.js"],
          bundle: true,
          minify: true,
          outfile: "dist/site.js",
        },
      },
    },
  });

  eleventyConfig.setBrowserSyncConfig({
    notify: true,
    watch: true,
  });
  
  // https://www.11ty.dev/docs/plugins/i18n/ canary version docs
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    // any valid BCP 47-compatible language tag is supported
    defaultLanguage: "en",
  });

  // 11ty filters:
  eleventyConfig.addFilter(
    "cssmin",
    (code) => new CleanCSS({}).minify(code).styles
  );
  eleventyConfig.addFilter("i18n", i18n);
  eleventyConfig.addFilter("pagePath", pagePath);
  eleventyConfig.addFilter("relativePath", relativePath);

  // Used in announcements.njk
  eleventyConfig.addFilter("displayPostInfo", (item) => 
    renderWordpressPostTitleDate(item.data, setDefaultAttributes())
  );

  eleventyConfig.addTransform("htmlTransforms", (html, outputPath) => {
    // !outputPath || // Do we really need this??
    if (outputPath.endsWith(".html")) {
      // Render post-list components
      if (html.includes("cagov-post-list")) {
        html = renderPostLists(html);
      }

      // Render posts with event web component
      if (html.includes("cagov-event-post-list")) {
        html = renderEventLists(html);
      }

      // Remove WP auto-lazy images for the homepage banner.
      if (html.includes('<img loading="lazy" class="cagov-featured-image"')) {
        html = html.replace(
          '<img loading="lazy" class="cagov-featured-image"',
          '<img class="cagov-featured-image"'
        );
      }

      config.build.replace_urls.forEach((rootPath) => {
        if (html !== undefined && html.includes(rootPath)) {
          html = html.replace(
            new RegExp(rootPath, "g"),
            config.build.canonical_site_url
          );
        }
        return false;
      });

      config.build.media_replace_urls.forEach((mediaPath) => {
        if (html !== undefined && html.includes(mediaPath)) {
          html = html.replace(
            new RegExp(mediaPath, "g"),
            `/${config.build.docs_media}/`
          );
        }
        return false;
      });

      // Make local media files relative
      // if (html !== undefined && html.includes(`${config.build.canonical_site_url}/${config.build.upload_folder}/`)) {
      //   html = html.replace(
      //     new RegExp(`${config.build.canonical_site_url}/${config.build.upload_folder}/`, "g"),
      //         `/${config.build.docs_media}/`
      //       );
      // }

      // if (html !== undefined && html.includes(`${config.build.canonical_site_url}/${config.build.upload_folder_flywheel}/`)) {
      //   html = html.replace(
      //     new RegExp(`${config.build.canonical_site_url}/${config.build.upload_folder_flywheel}/`, "g"),
      //         `/${config.build.docs_media}/`
      //       );
      // }

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
  // 11ty copy assets
  eleventyConfig.addPassthroughCopy({ "src/assets/": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css/fonts/": "fonts" }); // Required location by cagov code
  eleventyConfig.addPassthroughCopy({
    [config.staticContentPaths.media]: config.build.docs_media,
  });
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
