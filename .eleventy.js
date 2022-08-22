const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const cagovBuildSystem = require("@cagov/11ty-build-system");
const config = require("./config/index.js");
const { renderPostLists, renderWordpressPostTitleDate } = require("./src/js/post-list/render");
const { renderEventLists } = require("./src/js/event-list/render");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(cagovBuildSystem, {
    processors: {
      sass: {
        watch: [
          'src/css/**/*',
          'src/components/**/*.scss'
        ],
        output: 'dist/index.css',
        options: {
          file: 'src/css/sass/index.scss',
          includePaths: ['./src/css/sass']
        }
      },
      esbuild: {
        watch: [
          'src/js/**/*',
          'src/components/**/*'
        ],
        options: {
          entryPoints: ['src/js/index.js'],
          bundle: true,
          minify: true,
          format: 'esm',
          outfile: 'dist/built.js',
          loader: { 
            '.css': 'text',
            '.html': 'text'
          }
        }
      }
    }
  });


  eleventyConfig.setBrowserSyncConfig({
    watch: true,
    notify: true,
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Change the domain on a URL.
  // Note Good candidate for 11ty-build-system.
  eleventyConfig.addFilter("changeDomain", function (url, domain) {
    try {
      let host = config.build.canonical_url.split("//"); // Cheat to get https
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
  // Doing so will ensure the domain doesn't get nuked by the HTML transformation below.
  eleventyConfig.addFilter("changeWpMediaPath", function (path) {
    return path.replace(
      new RegExp(`/${config.build.upload_folder}`, "g"),
      "/media/"
    );
  });

  eleventyConfig.addFilter('displayPostInfo', function(item) {
    return renderWordpressPostTitleDate(item.data, { 'showExcerpt': true, 'showPublishDate': true});
  })

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
      
      // Minify HTML.
      html = htmlmin.minify(html, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return html;
  });

  console.log("BBBBB", config.staticContentPaths.media);

  eleventyConfig.addPassthroughCopy({ [config.staticContentPaths.media] : "/wp-uploads" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "dist/*": "/" });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: `${config.staticContentPaths.root}`,
      output: "docs",
      layouts: "_includes/layouts",
    },
  };
};
