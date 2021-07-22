
let btnsearch = document.querySelector('.search-btn');
let btnsearchclose = document.querySelector('.search-close');
// On Load
window.onload = detectmobile;
btnsearch.setAttribute("aria-expanded", "false");

// Search button click (mobile)
btnsearch.addEventListener('click', event => {  
    var searchbox = document.querySelector('.search-container');
    var searchattr = btnsearch.getAttribute('aria-expanded');
    if (searchattr == "true") {
        searchattr = "false";
        searchbox.classList.remove("show");
    }
    else {
        searchattr = "true";
        searchbox.classList.add("show");
    }
    btnsearch.setAttribute("aria-expanded", searchattr);
});

// Close button 
btnsearchclose.addEventListener('click', event => {  
    event.preventDefault();
    let btnsearch = document.querySelector('.search-btn');
    var searchbox = document.querySelector('.search-container');
    searchbox.classList.remove("show");
    btnsearch.setAttribute("aria-expanded", "false");
});

// mobile or not mobile - that is the question!
function detectmobile () {
    var header = document.querySelector('header');
    var innerwidth = header.offsetWidth;
    var searchbox = document.querySelector('.search-container');
    //this is mobile
    if (innerwidth < 767) {
        searchbox.classList.add("mobile");
        btnsearch.setAttribute("aria-expanded", "false");

    }
    // not mobile
    else if (innerwidth > 767) {
        searchbox.classList.remove("mobile");
        btnsearch.removeAttribute("aria-expanded");
    }
};



// on resize function
document.getElementsByTagName("BODY")[0].onresize = function() {
    var searchbox = document.querySelector('.search-container');
    searchbox.classList.remove("show");
    detectmobile();   
};