let addTaskbtnDiv = document.getElementById("add-task-btn-div")
let toDo = document.getElementById("to-do")
let taskNumber = 1;

let addTaskbtn = document.createElement("button")
addTaskbtn.className = "add-task-btn"
addTaskbtn.innerHTML = "Add new task"
addTaskbtnDiv.prepend(addTaskbtn)

addTaskbtn.addEventListener("click", addTask)

function addTask(eventDetails){
    // create a parent div to hold the task and options
    let taskHolder = document.createElement("div")
    taskHolder.className = "task-holder"
    taskHolder.id = `task-holder-${taskNumber}`
    taskHolder.setAttribute("draggable", "true")
    // create a new task and add to the task holder
    let task = document.createElement("div")
    task.className = "task"
    task.innerHTML = `Task ${taskNumber++}`
    task.setAttribute("contenteditable", "true")
    taskHolder.append(task)
    task.focus()
    // if task is left empty, delete entire task holder
    task.addEventListener("blur", (eventDetails) => {
        let targetTask = eventDetails.target
        let parent = targetTask.parentNode
        if(!targetTask.innerHTML.trim()){
            parent.remove()
        }
    })
    // create options to changes task status, and append it to task holder
    let status = document.createElement("select")
    status.className = "status"
    status.innerHTML = `<option value="to-do">To-do</option>
    <option value="in-progress">In-progress</option>
    <option value="completed">Completed</option>
    <option id="delete" value="delete">Delete</option>`
    taskHolder.append(status)
    // prepend the task holder to to-do column
    toDo.prepend(taskHolder)
    // change task's position when task status is changed
    status.addEventListener("change", (eventDetails) => {
        let Status = eventDetails.target.value
        if(Status == "delete"){
            const response = confirm("Are you sure you want to delete the task?");
            if(response){
                taskHolder.remove()
            }
        } else {
            document.getElementById(Status).prepend(taskHolder)
        }
    })

    // drag and drop
    taskHolder.addEventListener("dragstart", (eventDetails)=>{
        let cardDragged  = eventDetails.target
        eventDetails.dataTransfer.setData("text/plain" ,  cardDragged.id)
        cardDragged.style.opacity = "0.5"

    })

    taskHolder.addEventListener("dragend", (eventDetails)=>{
        let cardDragged  = eventDetails.target
        cardDragged.style.opacity = 1 // resetting the opacity when drag is complete
    })

    let dragEvents = ["dragover", "dragenter", "drop"]
    dragEvents.forEach(dropEvent=>{
           document.querySelectorAll(".column").forEach(column =>{
                 column.addEventListener(dropEvent, (eventDetails)=>{
                      eventDetails.preventDefault()

                      if(dropEvent == "drop"){
                          const cardId = eventDetails.dataTransfer.getData("text/plain")
                          const card = document.getElementById(cardId)
                          column.append(card)
                      }
                 })
           })
    })
}