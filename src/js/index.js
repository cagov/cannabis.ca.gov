// Main build file for the JavaScript static site generation bundle.
import '@cagov/ds-accordion';
import '@cagov/ds-back-to-top/src/index.js';
import '@cagov/ds-content-navigation';
import '@cagov/ds-dropdown-menu';
import '@cagov/ds-feedback/dist/index.js';
import '@cagov/ds-google-translate';
// import '@cagov/ds-link-icon/src/index.js';
import '@cagov/ds-minus';
import '@cagov/ds-pagination';
// import '@cagov/ds-pdf-icon/src/index.js';
import '@cagov/ds-plus';
import '@cagov/ds-statewide-header/src/index.js';
import '../components/menu/index.js';
import '../components/page-alert/index.js';
// import '../components/post-list/index.js';
// import '../components/event-list/index.js';
import './google-analytics.js';
import setupAnalytics from './setup-analytics.js';

window.onload = (event) => {
  setupAnalytics();
};




