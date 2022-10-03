// Main build file for the JavaScript static site generation bundle.

// Design system components
import "@cagov/ds-accordion";
import "@cagov/ds-back-to-top";
import "@cagov/ds-link-grid";
import "@cagov/ds-page-alert";
// import '@cagov/ds-page-feedback/src/index.js';
import '@cagov/ds-link-icon/dist/index.js';
import "@cagov/ds-page-navigation";
import "@cagov/ds-pagination";
import "@cagov/ds-site-navigation";

// Custom components
import "../components/ds-page-feedback/src/index.js"; // For drafting microcopy update.
import "../components/scrollable-card/src/js/behavior.js"; // For drafting microcopy update.

// Site modifications
import { controlPages } from "./pagination.js";

import "./analytics/google-analytics.js";
import setupAnalytics from "./analytics/setup-analytics.js";

window.onload = (event) => {
  setupAnalytics();
};

controlPages(); // Update pagination behavior
