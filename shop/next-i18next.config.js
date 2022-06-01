const path = require("path");

module.exports = {
  i18n: {
    locales: ["en","fr"],
    defaultLocale: "fr",
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
};
