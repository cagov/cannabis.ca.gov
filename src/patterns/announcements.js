// fetch last 3 announcements for homepage
const fetch = require('node-fetch')

module.exports = function() {
  return new Promise((resolve, reject) => {
    fetch('https://cannabis.ca.gov/wp-json/wp/v2/posts?categories=14,16&per_page=3&order=desc&page=1')
    .then(res => res.json())
    .then(json => {
        resolve(json);
    });
  });
};
