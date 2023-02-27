// Based on template provided here:
// https://webstandards.ca.gov/add-analytics-to-your-site/
(function () {
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-75V2BNQ3DR";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();
// Global site tag (gtag.js) - Google Analytics
window.dataLayer = window.dataLayer || [];
window.gtag = function () {
  dataLayer.push(arguments);
};
gtag("js", new Date());
gtag("config", "G-69TD0KNT0F"); // Statewide GA4 measurement ID
gtag("config", "G-75V2BNQ3DR"); // DCC (Cannabis) GA4 measurement ID

