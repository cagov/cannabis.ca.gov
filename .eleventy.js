const { renderPostLists } = require("./src/components/post-list-headless/render.js");
const CleanCSS = require("clean-css");
const cagovBuildSystem = require('@cagov/11ty-build-system');

const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig 
 */
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(cagovBuildSystem, {
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
    rollup: {
      watch: [
        'src/js/**/*',
        'src/components/**/*.js'
      ],
      file: 'src/js/rollup.config.js'
    }
  });

  eleventyConfig.addPassthroughCopy({ "./src/css/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "./src/rootcopy/*": "/" });
  eleventyConfig.addPassthroughCopy({ "wordpress/media": "wp-content/uploads" });
  eleventyConfig.addPassthroughCopy({ "dist/index.css.map": "/index.css.map" });
  
  eleventyConfig.setBrowserSyncConfig({
    watch:true,
    notify:true,
  });
 
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addTransform("renderPostLists", function (html, outputPath) {
    //outputPath === false means serverless templates
    if (!outputPath || outputPath.endsWith(".html")) {
      if (html.includes("cagov-post-list")) {
        html = renderPostLists(html);
      }
    }
    return html;
  });

  eleventyConfig.addFilter("dateFormat", function(dateString) {
    let d = new Date(dateString);
    return `${monthStrings[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  });

  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "md",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      input: "pages",
      output: "docs",
      layouts: "_includes/layouts"
    }
  };
}
