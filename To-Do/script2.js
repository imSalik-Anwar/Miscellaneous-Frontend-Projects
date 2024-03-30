const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const priorityInput = document.getElementById('dropdown-options');
const addTaskButton = document.getElementById('add-task-btn');
const tickMarks = document.querySelectorAll('.fa-circle-check');
const trashIcons = document.querySelectorAll('.fa-trash-can');
const sect2 = document.getElementById('section-2');
const sect3 = document.getElementById('section-3');
const sect4 = document.getElementById('section-4');
// array to store in local storage
let array = [];
let taskId = 1;
renderData();

// when add task button is clicked, add the task to the list
addTaskButton.addEventListener('click', event => {
    event.preventDefault();
    // show error message if input is wrong
    if(!taskInput.value || !dateInput.value || !priorityInput.value){
        document.getElementById('warning-message').classList.remove('hide');
        return;
    }
    document.getElementById('warning-message').classList.add('hide');
    // gather input details, store it in array and add task in relative section
    const taskName = taskInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;
    array.push({
        id: taskId,
        name: taskName,
        date: date,
        priority: priority,
        completed: false,
    });
    localStorage.setItem('data', JSON.stringify(array));
    taskId++;
    // render local storage data
    renderData();
});
// console.log(trashIcons)
    trashIcons.forEach(trashCan => {
        trashCan.addEventListener('click', function(event) {
            // Access the parent div (task) of the clicked trash can symbol
            let taskDiv = event.target.parentElement.parentElement;  
            // Remove the corresponding object from the array in local storage
            let objectsArray = JSON.parse(localStorage.getItem('data')) || [];
            let updatedArray = objectsArray.filter(obj => parseInt(obj.id) !== parseInt(taskDiv.id));
            localStorage.clear();
            localStorage.setItem('data', JSON.stringify(updatedArray));
            // Remove the parent div (task) from the DOM
            taskDiv.remove();
            renderData();
        });
    });
    // console.log(tickMarks)
    tickMarks.forEach(tickMark => {
        tickMark.addEventListener('click', function(event) {
            console.log('inside tickMarks')
            // Access the parent div (task) of the clicked trash can symbol
            let taskDiv = this.parentElement.parentElement;  
            // Remove the corresponding object from the array in local storage
            let objectsArray = JSON.parse(localStorage.getItem('data')) || [];
            for(let obj of objectsArray){
                if(obj.id === parseInt(taskDiv.id)){
                    obj.completed = true;
                    break;
                }
            }
            localStorage.clear();
            localStorage.setItem('data', JSON.stringify(objectsArray));
            renderData();
        });
    });

function renderData(event){
    removeExistingData();
    addBackHeadings();
    let taskArray = JSON.parse(localStorage.getItem('data'));
    const currentDate = new Date();

    for(let task of taskArray){
        const taskDate = new Date(task.date);
        if(taskDate > currentDate){
            // task is in the future
            if(!task.completed){
                addTask(task, 'section-3');
            } else {
                addTask(task, 'section-4', 'completed');
            }
        }
        else if(taskDate.getFullYear() === currentDate.getFullYear() &&
        taskDate.getMonth() === currentDate.getMonth() &&
        taskDate.getDate() === currentDate.getDate()){
            // task is today
            if(!task.completed){
                addTask(task, 'section-2');
            } else {
                addTask(task, 'section-4', 'completed');
            }
        } 
        else {
            // background red if task is not marked completed
            if(!task.completed){
                addTask(task, 'section-3', 'red');
            } else {
                addTask(task, 'section-4', 'completed');
            }
        }
    }
};

function addTask(task, sectionId, isCompleted){
    const taskContainer = document.getElementById(sectionId);

    const newTask = document.createElement('div');
    newTask.setAttribute('class', 'current-task');
    newTask.id = task.id;

    const newTaskName = document.createElement('div');
    newTaskName.setAttribute('class', 'current-task-name');
    newTaskName.innerText = task.name;

    const newTaskDate = document.createElement('div');
    newTaskDate.setAttribute('class', 'current-task-date');
    newTaskDate.innerText = task.date;

    const newTaskPriority = document.createElement('div');
    newTaskPriority.setAttribute('class', 'current-task-priority');
    newTaskPriority.innerText = 'Priority: '+task.priority;

    const newTaskIcon = document.createElement('div');
    newTaskIcon.setAttribute('class', 'current-task-icons');
    if(sectionId === 'section-2' || sectionId === 'section-3'){
        const tickMark = document.createElement('i');
        tickMark.setAttribute('class', 'fa-regular fa-circle-check');
        newTaskIcon.append(tickMark);

        const deleteMark = document.createElement('i');
        deleteMark.setAttribute('class', 'fa-regular fa-trash-can');
        newTaskIcon.append(deleteMark);
    }
    else if(sectionId === 'section-4'){
        const deleteMark = document.createElement('i');
        deleteMark.setAttribute('class', 'fa-regular fa-trash-can');
        newTaskIcon.append(deleteMark);
    }

    newTask.append(newTaskName);
    newTask.append(newTaskDate);
    newTask.append(newTaskPriority);
    newTask.append(newTaskIcon);

    if(isCompleted === 'red'){
        newTask.style.backgroundColor = "red";
    }
    else if(isCompleted === 'completed'){
        newTask.style.backgroundColor = "white";
        newTask.style.border = "1px solid black";
        newTask.style.color = " black";
    }

    taskContainer.append(newTask);
}

function removeExistingData(){
    while (sect2.firstChild) {
        sect2.removeChild(sect2.firstChild);
    }
    while (sect3.firstChild) {
        sect3.removeChild(sect3.firstChild);
    }
    while (sect4.firstChild) {
        sect4.removeChild(sect4.firstChild);
    }
}
function addBackHeadings(){
    let hs2 = document.createElement('h4');
    let hs3 = document.createElement('h4');
    let hs4 = document.createElement('h4');

    hs2.innerText = "Today's To-Do List";
    hs3.innerText = "Future To-Do List";
    hs4.innerText = "Completed To-Do List";

    sect2.append(hs2);
    sect3.append(hs3);
    sect4.append(hs4);
}