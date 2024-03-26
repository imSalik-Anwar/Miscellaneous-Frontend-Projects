let count = document.getElementById('count')
let message = document.getElementById('message')
let increament = document.getElementById('inc')
let decreament = document.getElementById('dcm')
let clear = document.getElementById('clr')

let counter = 0;
increament.addEventListener('click', () => {
    counter++;
    count.textContent = counter;
    message.classList.add('hide')
    decreament.disabled = false;
    decreament.style.cursor = 'pointer'
    clear.disabled = false;
    clear.style.color = 'white'
    clear.style.cursor = 'pointer'
    clear.style.borderColor = 'white'
})
decreament.addEventListener('click', () => {
    if(counter > 0){
        counter--;
        count.textContent = counter;
    } else {
        message.classList.remove('hide')
        decreament.disabled = true;
        decreament.style.cursor = 'not-allowed'
        clear.disabled = false;
        clear.style.color = 'white'
        clear.style.cursor = 'pointer'
        clear.style.borderColor = 'white'
    }
})
clear.addEventListener('click', () => {
    if(counter >= 0){
        counter = 0;
        count.textContent = counter;
        message.classList.add('hide')
        decreament.disabled = false;
        clear.disabled = true;
        clear.style.color = 'gray'
        clear.style.cursor = 'not-allowed'
        clear.style.borderColor = 'gray'
    }
})