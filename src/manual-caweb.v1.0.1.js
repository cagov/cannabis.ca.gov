// This to make sure featured search is visible and displayed correctly
$( document ).ready(function() {
    $(".navigation-search").addClass("full-width-nav container");
    $("#head-search").addClass("featured-search").insertBefore("#navigation");

// Move mobile icons before brandin
$(".mobile-controls").insertBefore(".branding");
});