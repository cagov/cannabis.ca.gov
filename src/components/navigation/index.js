
let btnmenu = document.querySelector('.menu-btn');

// On Load
window.onload = menumobile;


// mobile or not mobile - that is the question!
function menumobile () {
    var header = document.querySelector('header');
    var innerwidth = header.offsetWidth;
    var menubox = document.querySelector('.navigation');
    //this is mobile
    if (innerwidth < 767) {
        menubox.classList.add("mobile");
        btnmenu.setAttribute("aria-expanded", "false");

    }
    // not mobile
    else if (innerwidth > 767) {
        menubox.classList.remove("mobile");
        btnmenu.removeAttribute("aria-expanded");
    }
};

// Menu button click (mobile)
btnmenu.addEventListener('click', event => {  
    var menubox = document.querySelector('.navigation');
    var menuattr = btnmenu.getAttribute('aria-expanded');
    var menutext =  document.querySelector('.menu-btn-text');
    if (menuattr == "true") {
        menuattr = "false";
        menubox.classList.remove("show");
        menutext.innerHTML = 'Menu';
    }
    else {
        menuattr = "true";
        menubox.classList.add("show");
        menutext.innerHTML = 'Close';
    }
    btnmenu.setAttribute("aria-expanded", menuattr);
});

// on resize function
document.getElementsByTagName("BODY")[0].onresize = function() {
    var menubox = document.querySelector('.navigation');
    menubox.classList.remove("show");
    menumobile();   
};