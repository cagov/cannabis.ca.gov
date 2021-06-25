
var btnlang = document.querySelector('button#languages-btn');
var droplang = document.querySelector('.dropdown-content');
var expandattr = btnlang.getAttribute('aria-expanded');

btnlang.addEventListener('click', event => {

    if (expandattr == "true") {
        expandattr = "false";
        droplang.classList.remove("show");
    }
    else {
        expandattr = "true";
        droplang.classList.add("show");
    }
    btnlang.setAttribute("aria-expanded", expandattr);

});