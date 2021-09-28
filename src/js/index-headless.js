import '@cagov/ds-accordion';
import '@cagov/ds-feedback';
import '@cagov/ds-minus';
import '@cagov/ds-pagination';
import '@cagov/ds-plus';
import '@cagov/ds-google-translate';
import '@cagov/ds-dropdown-menu';
import '@cagov/ds-content-navigation';
import '@cagov/ds-pdf-icon/src/index.js';
import '@cagov/ds-back-to-top/src/index.js';
import '@cagov/ds-statewide-header/src/index.js';

import '../components/post-list-headless/index.js';
import '../components/page-alert/index.js';

import './headless/google-analytics.js';
import setupAnalytics from './headless/index.js';
window.onload = (event) => {
  setupAnalytics();
};