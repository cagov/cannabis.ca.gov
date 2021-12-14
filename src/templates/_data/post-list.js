module.exports = function (
  dataset = [],
  fieldDate = "date",
  category = "announcements,press-releases",
  count = 5,
  order = "desc",
  endpoint = "https://cannabis.ca.gov/wp-json/wp/v2",
  showExcerpt = false,
  showPublishedDate = true,
  noResults = "No posts found",
  showPagination = false,
  readMore = "<a href=&quot;/about-us/announcements&quot; data-type=&quot;URL&quot; data-id=&quot;/about-us/announcements&quot;>View all announcements</a>",
  // <a href="/about-us/announcements" data-type="URL" data-id="/about-us/announcements">View all announcements</a>
  filter = "none",
  link = "https://cannabis.ca.gov/2021/02/16/cannabis-advisory-committee-to-hold-virtual-meeting-3/",
  title = "Cannabis Advisory Committee To Hold Virtual Meeting",
) {
  return `<cagov-post-list class="post-list cagov-stack" data-category="${category}" data-count="${5}" data-order="${order}" data-endpoint="${endpoint}" data-show-excerpt="${showExcerpt}" data-show-published-date="${showPublishedDate}" data-no-results="${noResults}" data-show-pagination="${showPagination}" data-read-more="${readMore}" data-filter="${filter}">
      <div class="post-list-results">

      </div>
      
      ${readMore}
      </div>
    </cagov-post-list>`;
};


// ${dataset.map(
//   (post) => `<div class="post-list-items">
// <div class="post-list-item">
//   <div class="link-title"><a href="${link}">
//     ${title}
//   </a></div>
// <div class="date">${post.data[fieldDate]}</div>
// </div>`
// )
// .join("\n")}