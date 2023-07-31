const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const UglifyJS = require("uglify-js");
const htmlmin = require("html-minifier");


module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy("src/admin")
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("404.html");


  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("dd-MM-yy");
  });

    // Minify JS
    eleventyConfig.addFilter("jsmin", function(code) {
      let minified = UglifyJS.minify(code);
      if (minified.error) {
        console.log("UglifyJS error: ", minified.error);
        return code;
      }
      return minified.code;
    });

    // Minify HTML output
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath.indexOf(".html") > -1) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
      return content;
    });

  return {
    templateFormats: ["md", "njk", "liquid"],

    pathPrefix: "/",

    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: 'src', output: '_site'
     }
  };
};
