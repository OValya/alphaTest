
const modalForm = document.querySelector('.pagecrm-modal-form');
const closeBtn = document.querySelector('.pagecrm-close-btn');
const modalSuccessMessage = document.querySelector('.pagecrm-modal-success-message');
const orderBtns = document.querySelectorAll('.pagecrm-js-order-btn');

document.addEventListener('submit', (event) => {
    const form = event.target;
    event.preventDefault();
    const data = new FormData(form);
    for (let [key, value] of data) {
        console.log(`${key} — ${value}`)
    }
    if(!modalForm.classList.contains('pagecrm-hidden')) modalForm.classList.add('pagecrm-hidden');
    modalSuccessMessage.classList.remove('pagecrm-hidden');
});

closeBtn.addEventListener('click', () => {
    modalSuccessMessage.classList.add('pagecrm-hidden');

})

function orderForm(){

  modalForm.classList.remove('pagecrm-hidden');
}

orderBtns.forEach((btn) => {
    btn.addEventListener('click', orderForm);
})



window.addEventListener('scroll', function() {
    if(window.scrollY > 80)
        document.querySelector('.pagecrm-header').style.backgroundColor = '#E9DEFF'
    else
        document.querySelector('.pagecrm-header').style.backgroundColor = 'rgba(29, 1, 65, 0.3)'
});

/*todo: добавить валидацию, добавить закрытие по клику вне формы*/
