// Main build file for the JavaScript static site generation bundle.
// Design system components
import '@cagov/ds-accordion';
import '@cagov/ds-back-to-top';
import '@cagov/ds-page-navigation';
import '@cagov/ds-dropdown-menu';
import '@cagov/ds-page-feedback/dist/index.js';
import '@cagov/ds-google-translate';
import '@cagov/ds-link-icon/src/index.js';
import '@cagov/ds-page-alert';
import '@cagov/ds-statewide-header/src/index.js';

// // Site modifications
import { controlPages } from '../components/pagination/control.js';
// import { controlPages } from '@cagov/ds-pagination'; // Not included in the component right now
import './google-analytics.js';
import setupAnalytics from './setup-analytics.js';

// Custom components
// Data viz: where-cannabis-business-is-legal-in-california
import './charts/cannabis-local-ordinances/build/bundle.js';


window.onload = (event) => {
  setupAnalytics();
};
controlPages();
