module.exports = function (dataset) {
  let html = `
    <div class="post-list-results">
      <div class="post-list-items">
        ${dataset.map(post => `<div class="post-list-item">
          <div class="link-title">
            <a href="${post.data.wordpress_url}">${post.data.title}</a>
          </div>
          <div class="date">${ new Date(post.data.date).toLocaleString().split(',')[0]}</div>
        </div>`).join("\n")}
      </div>
      <a href="/about-us/announcements" data-type="URL" data-id="/about-us/announcements">View all announcements</a>
    </div>
  `;
  return html;
}

