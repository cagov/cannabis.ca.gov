// fetch last 3 announcements for homepage
// https://staginginye.prod3.sites.ca.gov/wp-json/wp/v2/posts?categories=14,16&per_page=10&order=desc&page=1

const fetch = require('node-fetch')

module.exports = function() {
  return new Promise((resolve, reject) => {
    fetch('https://staginginye.prod3.sites.ca.gov/wp-json/wp/v2/posts?categories=14,16&per_page=3&order=desc&page=1')
    .then(res => res.json())
    .then(json => {
        resolve(json);
    });
  });
};
