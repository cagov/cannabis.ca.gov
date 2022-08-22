// This to make sure featured search is visible and displayed correctly
$(document).ready(function () {
    $(".navigation-search").addClass("full-width-nav container");
    $("#head-search").addClass("featured-search").insertBefore("#navigation");

// Move mobile icons before brandin
$(".mobile-controls").insertBefore(".branding");
// menu toggle button switch places with search toggle button in mobile
$(".toggle-menu").insertBefore(".toggle-search");
// place alert button after alert text
$(".alert-link").insertAfter(".alert-text");
// Adding aria-label to the site logo	
$(".header-organization-banner a").attr("aria-label", "Department of Cannabis home");
// Fix aria hidden a11y issue in search on desktop
if (!mobileView()) {
    $("#SearchInput").removeAttr('aria-hidden');
    $("#head-search #Search .search-textfield").removeAttr('aria-hidden');
    $("#head-search #Search .gsc-search-button").removeAttr('aria-hidden');
    }
});
// Insert web component bundle for client side web components like accordion
// Compiled here: https://github.com/cagov/cannabis.ca.gov/blob/main/src/js/index.js
// Used for development while updating external bundles.
let newScript = document.createElement("script");

newScript.type = "module";
newScript.src = "https://files.covid19.ca.gov/js/components/bundle/v2/index.min.js";
document.querySelector('head').appendChild(newScript);
// Temporary logo replacement until moved to code option.
$(".logo-small").prepend('<a href="/"><img src="https://cannabis.ca.gov/wp-content/uploads/sites/2/2021/06/logo_square.png" alt="Department of Cannabis Control Icon" /></a>').css('background-color', '#FFF');

// Adding return to top
var $returnTop = $('<span class="return-top"/>').appendTo('.main-content-ds');

$(window).on('scroll', function () {
    var currentScrollTop = $(document).scrollTop();
    var scrollDistanceToMakeCompactHeader = 220;
    if (currentScrollTop >= scrollDistanceToMakeCompactHeader) {
        $returnTop.addClass('is-visible');
    } else {
        $returnTop.removeClass('is-visible');
    }
});

$returnTop.on('click', function () {
    $('html,body').animate({
        scrollTop: 0
    }, 400, function () {
        $(window).scroll();
    });
    return;
});

// Adding ethnio script
let newScript2 = document.createElement("script");
newScript2.src = "https://ethn.io/17561.js";
newScript2.async = "true";
document.querySelector('head').appendChild(newScript2);

// Adding pdf span to the links with class pdf
var pdf = '<span class="pdf-link-icon no-underline-icon" aria-hidden="true">.PDF</span><span class="sr-only"> (this is a pdf file)</span>';

// selector is looking for links with pdf extension in the href
var pdfLink = document.querySelectorAll("a[href*='.pdf']");
for (var i=0; i < pdfLink.length; i++) {
  pdfLink[i].innerHTML+=pdf; // += concatenates to pdf links
}


// Adding external link icon to the external links
var ext = '<span class="ca-gov-icon-external-link link-icon" aria-hidden="true"></span>';
// Check if link is external function
function link_is_external(link_element) {
  return (link_element.host !== window.location.host);
}

/*
// Looping thru all link inside of the internal pages main content body
var externalLink = document.querySelectorAll(".container .row .col-lg-10 a");
for (var i = 0; i < externalLink.length; i++) {
  var anchorLink = externalLink[i].href.indexOf("#") > -1;
  var localHost = externalLink[i].href.indexOf("localhost") > -1;
  var localUrl = externalLink[i].href.indexOf("cannabis.ca.gov") > -1;
  var localEmail = externalLink[i].href.indexOf("@") > -1;
  if (link_is_external(externalLink[i]) && !localUrl && !localHost && !anchorLink && !localEmail) {
    externalLink[i].innerHTML += ext; // += concatenates to external links

  }
}*/

