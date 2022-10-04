const translations = require("../../../pages/_data/i18n.js");
const config = require("../../../config/index.js");

/**
 * Template functions
 *
 * https://www.11ty.dev/docs/filters/
 */
module.exports = {
  /**
   * Return a language specific url.
   *
   * Usage example: {{ page | relativePath }}
   * @param {*} page
   * @returns
   */
  relativePath: (page, locale) => {
    let currentPath = `${page.url}`; // Relative to base dir, localized path, with folder + /index.html.

    // Remove /home/ path slug from filePathStem variable
    if (page.fileSlug === "home") {
      currentPath = "/";
      if (locale !== "en") {
        currentPath = `/${locale}/`;
      }
    }

    // Return a path with localization and index.html
    return currentPath;
  },

  /**
   * Determine if the current page locale matches the selected language
   *
   * @param {*} page - 11ty page object
   * @param {*} lang - language target
   * @param {*} locale - current page setting in renderer
   * @returns boolean (is the page active)
   */
  langPathActive: (page, lang, locale) => {
    if (lang === locale) {
      return false;
    }
    return true;
  },
  /**
   * Use a key and the current locale to return a microcopy string in the appropriate language.
   *
   * Custom i18n translation filter - loads data from our i18n.js file
   * Ideal flow: All language based microcopy is managed in Airtable based & approved language strings are exported to JSON format.
   * Currently includes language string overrides for EN, ES.
   * Spreadsheet includes location in component (_includes/*.njk) — Site Header, Statewide Header, etc.
   *
   * Usage example: {{ 'Key' | i18n(locale) }}
   *
   * @param {*} key - key in a dataset
   * @param {*} locale - an 11ty variable
   * @returns string
   */
  i18n: (key, locale) => {
    try {
      if (key && locale && translations[key] && translations[key][locale]) {
        return translations[key][locale];
      }
      if (key && locale && translations[key] && translations[key].en) {
        console.error(
          "Missing translation",
          "Key:",
          key,
          "Locale:",
          locale,
          "  Please register translated string in pages/_data/i18n.js. Returning English string."
        );
        return translations[key].en;
      }
      if (key && locale && !translations[key]) {
        console.error(
          "Missing translation",
          "Key:",
          key,
          "Locale:",
          locale,
          "  Please register string in pages/_data/i18n.js. Returning key."
        );
        return key;
      }
      console.error(
        "Missing translation",
        "Key:",
        key,
        "Locale:",
        locale,
        "  Please register string in pages/_data/i18n.js. Failing quietly in UI."
      );
      // Fail quietly.
      return "";
    } catch (error) {
      console.error(
        "Missing translation",
        "Key:",
        key,
        "Locale:",
        locale,
        "  Please register string in pages/_data/i18n.js. Failing quietly in UI."
      );
      // Fail quietly.
      return "";
    }
  },
};
