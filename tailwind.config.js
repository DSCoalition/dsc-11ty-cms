module.exports = {
  content: [
    "./src/_includes/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/pages/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/index.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
  ],
  theme: {
    colors: {
      red: "#ec193f",
      pink: "#d21b67",
      blue: "#394da0",
      purple: "#6f52a1",
      magenta: "#92268e",
      gray: "#444444",
      grayLight: "#777777",
      grayLightest: "#f9f7f6"
    },
    screens: {
      desktop: '992px'
    }
  }
}
