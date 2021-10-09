module.exports = function (dataset, monthStrings) {

  const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let html = `
    <div class="post-list-results">
      <div class="post-list-items">
        ${dataset.map(post => `<div class="post-list-item">
          <div class="link-title">
            <a href="${post.data.wordpress_url}">${post.data.title}</a>
          </div>
          <div class="date">${dateFormat(post.data.date, monthStrings)}</div>
        </div>`).join("\n")}
      </div>
      <a href="/about-us/announcements" data-type="URL" data-id="/about-us/announcements">View all announcements</a>
    </div>
  `;
  return html;
}

function dateFormat(dateString, monthStrings) {
  let d = new Date(dateString);
  return `${monthStrings[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}