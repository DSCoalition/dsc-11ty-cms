const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const UglifyJS = require("uglify-js");
const htmlmin = require("html-minifier");
const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const metagen = require('eleventy-plugin-metagen');

module.exports = function(eleventyConfig) {
  // Plugins and Passthrough Copies
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(metagen);

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

  eleventyConfig.addCollection("membershipItems", collection => {
    return collection
      .getFilteredByGlob("src/pages/membership/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title));
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

  eleventyConfig.addShortcode("membershipItem", function(content, title) {
    return `<div class="membership-item-container" onclick="this.children[1].style.display === 'none' ? this.children[1].style.display = 'block' : this.children[1].style.display = 'none'">
    <div class="membership-item-title">${markdownLib.render(title)}</div>
    <div class="membership-item-content">${markdownLib.render(content)}</div>
    </div>`
});

eleventyConfig.addShortcode("getIcon", (item) => {
  const icons = new Map([
    ['businessCenterRounded', '<img style="background: #5569B0; border-radius: 100%; width: 48px; height: 48px;" src="/assets/icons/membership/BusinessCenterRounded.png" alt="business buddy" />'],
    ['campaignRounded', '<img style="background: #5569B0; border-radius: 100%; width: 48px; height: 48px;" src="/assets/icons/membership/CampaignRounded.png" alt="business buddy" />'],
    ['menuBookRounded', '<img style="background: #5569B0; border-radius: 100%; width: 48px; height: 48px;" src="/assets/icons/membership/MenuBookRounded.png" alt="business buddy" />'],
    ['peopleAltRounded', '<img style="background: #5569B0; border-radius: 100%; width: 48px; height: 48px;" src="src/assets/icons/membership/PeopleAltRounded.png" alt="business buddy" />'],
    ['savingsRounded', '<img style="background: #5569B0; border-radius: 100%; width: 48px; height: 48px;" src="/src/assets/icons/membership/SavingsRounded.png" alt="business buddy" />']
  ]);

  return markdownLib.render(icons[item.data.icon]);
})

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
