const btnclose = document.querySelector('button.btn-close');
const cagovalert = document.querySelector('.cagov-alert');

btnclose.addEventListener('click', event => {
    cagovalert.remove();
});