// Manual JS with fixes for CAweb 1.5.7 and later
// This to make sure featured search is visible and displayed correctly
$(document).ready(function () {
    $(".navigation-search").addClass("full-width-nav container");
    $("#head-search").addClass("featured-search").insertBefore("#navigation");
    // get rid fo divi styles
    $("#divi-style-parent-inline-inline-css").html("");
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

// Temporary logo replacement until moved to code option.
$(".logo-small").prepend('').css('background-color', '#FFF');

// Adding return to top
var $returnTop = $('').appendTo('.main-content-ds');

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
// let newScript2 = document.createElement("script");
// newScript2.src = "https://ethn.io/17561.js";
// newScript2.async = "true";
// document.querySelector('head').appendChild(newScript2);

// Adding external link icon to the external links
var ext = '';
// Check if link is external function
function link_is_external(link_element) {
  return (link_element.host !== window.location.host);
}

// Add GTM pixel script
let newScript_pixel = document.createElement("script");
newScript_pixel.src = "https://tag.simpli.fi/sifitag/0ea36ba0-8601-013a-c608-06a60fe5fe77";
newScript_pixel.async = "true";
document.querySelector('head').appendChild(newScript_pixel);

// Include source code for Cannabis Local Ordinances
// Source code located at https://github.com/cagov/cannabis.ca.gov/tree/main/src/js/charts/cannabis-local-ordinances
// View README.md for more infomation
// This source code is compiled and some of the external assets are also hosted here and consumed by this UI.
let cannabis_local_ordinances = document.createElement("script");
cannabis_local_ordinances.src = "https://headless.cannabis.ca.gov/assets/bundle.1.0.0.js?2022-04-11";
cannabis_local_ordinances.async = "true";
document.querySelector('head').appendChild(cannabis_local_ordinances);
