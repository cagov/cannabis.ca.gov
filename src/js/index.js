// Main build file for the JavaScript static site generation bundle.
// Design system components
import '@cagov/ds-accordion';
import '@cagov/ds-back-to-top';
import '@cagov/ds-page-navigation'; // Doesn't display
import '@cagov/ds-dropdown-menu';
// import '@cagov/ds-feedback';
import '@cagov/ds-feedback/dist/index.js';
import '@cagov/ds-google-translate';
// import '@cagov/ds-icons';
// import '@cagov/ds-link-icon';
// import '@cagov/ds-link-icon/src/index.js'; // New version is broken
import '../components/ds-link-icon/src/index.js'; // New version is broken
import '@cagov/ds-page-alert';
// import '@cagov/ds-page-alert/src/index.js';
// import '@cagov/ds-pagination';
// import '@cagov/ds-statewide-header';
import '@cagov/ds-statewide-header/src/index.js';


// CSS-only?
// import '@cagov/ds-button-grid';

// import '@cagov/ds-regulatory-outline';
// import '@cagov/ds-site-footer';
// import '@cagov/ds-site-header';
// import '@cagov/ds-site-navigation';
// import '@cagov/ds-skip-to-content';
// import '@cagov/ds-statewide-footer';
// import '@cagov/ds-step-list';
// import '@cagov/ds-table';

// // Site modifications
import { controlPages } from '../components/pagination/control.js'
// import { controlPages } from '@cagov/ds-pagination';
import './google-analytics.js';
import setupAnalytics from './setup-analytics.js';


console.log("hey?");
// Custom components
// Data viz: where-cannabis-business-is-legal-in-california
// import './charts/cannabis-local-ordinances/src/index.js'; // Can we do this instead?
import './charts/cannabis-local-ordinances/build/bundle.js';


window.onload = (event) => {
  setupAnalytics();
};
controlPages();




