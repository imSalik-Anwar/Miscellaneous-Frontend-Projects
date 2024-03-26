const box1 = document.getElementById('box-1');
const box2 = document.getElementById('box-2');
const box3 = document.getElementById('box-3');
const box4 = document.getElementById('box-4');
const box5 = document.getElementById('box-5');
const box6 = document.getElementById('box-6');
const box7 = document.getElementById('box-7');
const box8 = document.getElementById('box-8');

box1.addEventListener('click', fill);
box2.addEventListener('click', fill);
box3.addEventListener('click', fill);
box4.addEventListener('click', fill);
box5.addEventListener('click', fill);
box6.addEventListener('click', fill);
box7.addEventListener('click', fill);
box8.addEventListener('click', fill);

let order = [];
let counter = 1;

function fill(event){
    const target = event.target;
    const targetId = target.id;
    target.innerText = counter++;
    console.log(targetId);
    target.style.backgroundColor = "seagreen";
    order.push(targetId);
    if(order.length == 8){
        let timeout = 500;
        for(let i = 7; i >= 0; i--){
            setTimeout(() => {
                document.getElementById(order[i]).style.backgroundColor = "white";
                document.getElementById(order[i]).innerText = "";
            }, timeout);
            timeout += 500;
        }
        setTimeout(() => {
            while(order.length){
                order.pop();
            }
            counter = 1;
        }, 4500);
    }
}
