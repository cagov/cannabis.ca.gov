const controlPages = function () {
  if(document.querySelector('cagov-pagination')) {
    document.querySelector('cagov-pagination').addEventListener('paginationClick', function (e) { 
    writePostsHTML(e.detail);
    history.replaceState({page: 3}, `${document.title} page ${e.detail}`, `?page=${e.detail}`)
   }, false);

   const urlParams = new URLSearchParams(window.location.search);
   if(parseInt(urlParams.get('page')) > 0) {
     writePostsHTML(urlParams.get('page'));
   }
  }
}

const writePostsHTML = function (page) {
  fetch(`/about-us/announcements/${page - 1}`)
  .then(response => response.text())
  .then(text => {
    document.querySelector('.post-list-results').innerHTML = text;
  });
}

export { controlPages };