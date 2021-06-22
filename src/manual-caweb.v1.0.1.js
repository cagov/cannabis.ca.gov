// This to make sure featured search is visible and displayed correctly
$(document).ready(function () {
    $(".navigation-search").addClass("full-width-nav container");
    $("#head-search").addClass("featured-search").insertBefore("#navigation");

// Move mobile icons before brandin
$(".mobile-controls").insertBefore(".branding");
// place alert button after alert text
$(".alert-link").insertAfter(".alert-text");
});
// Insert web component bundle for client side web components like accordion
// Compiled here: https://github.com/cagov/cannabis.ca.gov/blob/main/src/js/index.js
// Used for development while updating external bundles.
let newScript = document.createElement("script");

newScript.type = "module";
newScript.src = "https://files.covid19.ca.gov/js/components/bundle/index.min.js";
document.querySelector('head').appendChild(newScript);
// Temporary logo replacement until moved to code option.
$(".logo-small").prepend('<img src="https://staginginye.prod3.sites.ca.gov/wp-content/uploads/sites/2/2021/06/logo_square.png" alt="Department of Cannabis Control Icon" />').css('background-color', '#FFF');

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
