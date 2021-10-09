module.exports = function (dataset) {
  return `<cagov-post-list class="post-list cagov-stack" data-category="announcements,press-releases" data-count="5" data-order="desc" data-endpoint="https://cannabis.ca.gov/wp-json/wp/v2" data-show-excerpt="false" data-show-published-date="true" data-no-results="No posts found" data-show-pagination="false" data-read-more="<a href=&quot;/about-us/announcements&quot; data-type=&quot;URL&quot; data-id=&quot;/about-us/announcements&quot;>View all announcements</a>" data-filter="none">
      <div class="post-list-results">
      ${dataset.map(post => `<div class="post-list-items">
        <div class="post-list-item">
          <div class="link-title"><a href="https://cannabis.ca.gov/2021/02/16/cannabis-advisory-committee-to-hold-virtual-meeting-3/">
            Cannabis Advisory Committee To Hold Virtual Meeting
          </a></div>
        <div class="date">${post.data.date}</div>
      </div>`).join("\n")}
    </div><a href="/about-us/announcements" data-type="URL" data-id="/about-us/announcements">View all announcements</a></div></cagov-post-list>`;
}
