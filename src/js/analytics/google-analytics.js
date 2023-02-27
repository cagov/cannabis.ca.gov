// Based on template provided here:
// https://webstandards.ca.gov/add-analytics-to-your-site/
(function () {
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-PJDVH1C2JS";
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
gtag("config", "G-PJDVH1C2JS"); // DCC (Cannabis) GA4 measurement ID

