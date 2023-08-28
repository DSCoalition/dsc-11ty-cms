const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const UglifyJS = require("uglify-js");
const htmlmin = require("html-minifier");
const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  // Plugins and Passthrough Copies
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy("src/assets/**");
  eleventyConfig.addPassthroughCopy("src/favicon/**");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("404.html");
  eleventyConfig.addPassthroughCopy("src/scripts/bundle.js");

  // Collections
  eleventyConfig.addCollection("boardMemberItem", collection => {
    const boardMembers = collection
      .getFilteredByGlob("src/pages/board-members/*.md")
      .sort((a, b) => Number(a.data.order) - Number(b.data.order));
    return boardMembers;
  });

  eleventyConfig.addCollection("orgItem", collection => {
    return collection
      .getFilteredByGlob("src/pages/organizations/*.md")
      .sort((a, b) => a.data.organizationName.localeCompare(b.data.organizationName));
  });

  // Markdown Filters and Libraries
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addFilter("markdownify", markdownString =>
    markdownLib.render(markdownString)
  );

  // Date Filters
  eleventyConfig.addFilter("htmlDateString", dateObj =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yy-MM-dd")
  );

  eleventyConfig.addFilter("readableDate", dateObj =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd-MM-yy")
  );

  // Minify Filters
  eleventyConfig.addFilter("jsmin", code => {
    const minified = UglifyJS.minify(code);
    return minified.error ? code : minified.code;
  });

  // HTML Minification Transform
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return content;
  });

  // Configuration
  return {
    templateFormats: ["md", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: ["liquid"],
    dataTemplateEngine: "liquid",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
