// Main build file for the JavaScript static site generation bundle.
// Design system components
import '@cagov/ds-accordion';
import '@cagov/ds-back-to-top';
import '@cagov/ds-page-navigation'; // Doesn't display
import '@cagov/ds-dropdown-menu';
import '@cagov/ds-feedback/dist/index.js';
import '@cagov/ds-google-translate';
import '../components/ds-link-icon/src/index.js'; // New version is broken
import '@cagov/ds-page-alert';
import '@cagov/ds-statewide-header/src/index.js';

// // Site modifications
import { controlPages } from '../components/pagination/control.js'
// import { controlPages } from '@cagov/ds-pagination';
import './google-analytics.js';
import setupAnalytics from './setup-analytics.js';

// Custom components
import './charts/cannabis-local-ordinances/build/bundle.js';

window.onload = (event) => {
  setupAnalytics();
};
controlPages();




