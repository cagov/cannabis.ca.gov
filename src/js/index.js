// Main build file for the JavaScript static site generation bundle.
import '@cagov/ds-accordion';
import '@cagov/ds-back-to-top';
import '@cagov/ds-page-navigation';
import '@cagov/ds-site-navigation';
import '@cagov/ds-page-feedback/dist/index.js';
import '@cagov/ds-google-translate';
import '@cagov/ds-link-icon/src/index.js';
import '@cagov/ds-minus';
import '@cagov/ds-pagination';
import { controlPages } from '../components/pagination/control.js'
import '@cagov/ds-plus';
import '@cagov/ds-statewide-header/src/index.js';
import '@cagov/ds-page-alert/src/index.js';
import './google-analytics.js';
import setupAnalytics from './setup-analytics.js';

window.onload = (event) => {
  setupAnalytics();
};
controlPages();




