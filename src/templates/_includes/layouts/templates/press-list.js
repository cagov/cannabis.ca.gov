module.exports = function (dataset) {
  return `<div class="post-list cagov-stack" data-category="announcements,press-releases" data-count="5" data-order="desc" data-endpoint="https://cannabis.ca.gov/wp-json/wp/v2" data-show-excerpt="false" data-show-published-date="true" data-no-results="No posts found" data-show-pagination="false" data-read-more="<a href=&quot;/about-us/announcements&quot; data-type=&quot;URL&quot; data-id=&quot;/about-us/announcements&quot;>View all announcements</a>" data-filter="none">
        <div class="post-list-results">
        ${dataset.map(post => `<div class="post-list-items">
          <div class="post-list-item">
            <div class="link-title">
              <a href="h${post.data.wordpress_url}">
              ${post.data.title}
              </a>
            </div>
          <div class="date">${ new Date(post.data.date).toLocaleString().split(',')[0]}</div>
        </div>`).join("\n")}
      </div><a href="/about-us/announcements" data-type="URL" data-id="/about-us/announcements">View all announcements</a>
    </div>
  </div>`;
}
