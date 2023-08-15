const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const UglifyJS = require("uglify-js");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("src/assets/**");
  eleventyConfig.addPassthroughCopy("src/favicon");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("404.html");
  eleventyConfig.addPassthroughCopy("bundle.js");

  eleventyConfig.addCollection("boardMemberItem", (collection) => {
    const boardMembers = collection
      .getFilteredByGlob("src/pages/board-members/*.md")
      .sort((a, b) => {
        return Number(a.data.order) - Number(b.data.order);
      });
    return boardMembers;
  });

  eleventyConfig.addCollection("orgItem", function (collection) {
    return collection
      .getFilteredByGlob("src/pages/organizations/*.md")
      .sort(function (a, b) {
        let nameA = a.data.organizationName.toUpperCase();
        let nameB = b.data.organizationName.toUpperCase();
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
  });

  const md = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
  });

  eleventyConfig.addFilter("markdownify", (markdownString) =>
    md.render(markdownString)
  );


  const { DateTime } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("dd-MM-yy");
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  return {
    templateFormats: ["md", "liquid"],

    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    dataTemplateEngine: "liquid",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
